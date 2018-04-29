import Team from '../models/Team';
import Idea from '../models/Idea';
import User from '../models/User';
import Project from '../models/Project';
import JoinRequest from '../models/JoinRequest';
import murmur from 'murmurhash'

import {store} from '../store/store';
import Eos from 'eosjs';

const host = () => {
    const h = process.env.NETWORK_HOST;
    const p = process.env.NETWORK_PORT;
    return `http://${h}:${p}`;
};

let signProvider = args => {
    console.log('no sign provider!', args);
};

let app = null;
const appauth = () => ({authorization:[app]});

const code = 'hackathon';

const getEos = () => Eos.Localnet({httpEndpoint:host(), signProvider, debug:false});

const read = (table, index, limit = 10, scope = 'hackathon') => {
    const eos = getEos();
    const bounds = index ? {lower_bound:index, upper_bound:index+limit} : {};
    return eos.getTableRows(Object.assign({
        json:true,
        code,
        scope,
        table,
        limit
    }, bounds));
};

const write = () => {
    return getEos().contract(code);
};

const format = (result, model) => {
    result.rows = result.rows.map(model.fromJson);
    return result;
};

const rowsOnly = result => result.rows;
const firstOnly = result => result.rows.length ? rowsOnly(result)[0] : null;

export default class ContractService {

    constructor(){};

    static setSignProvider(_signProvider){ signProvider = _signProvider; }
    static setApp(_app){ app = _app; }

    /******************************************************/
    /******************     READ    ***********************/
    /******************************************************/

    static async getRows(table, model, start = 0, limit = 500){
        return read(table, start, limit).then(res => format(res, model));
    }

    static async getAllRows(table, model, idkey){
        let rows = [];
        let lastKey = 0;
        const getResults = async () => {
            const limit = 500;
            const result = await await this.getRows(table, model, lastKey, lastKey+limit);
            rows = rows.concat(result.rows);
            lastKey = result.rows.length ? rows[rows.length-1][idkey] : lastKey+limit;
            return result.more;
        };
        while(await getResults()) null;
        return rows;
    }

    static async getSignHash(){
        return read('proof').then(res => res.rows[0].hash);
    }

    static async getSignature(scatter, publicKey){
        const signHash = await ContractService.getSignHash();
        return await scatter.requestArbitrarySignature(publicKey, signHash,'You must sign this hash to prove your ownership of this identity', true)
            .catch(() => null);
    }

    static async getTeams(start = 0, limit = 20){           return this.getRows('teams', Team, start, limit).then(rowsOnly); }
    static async getUsers(start = 0, limit = 20){           return this.getRows('users', User, start, limit).then(rowsOnly); }
    static async getIdeas(start = 0, limit = 20){           return this.getRows('ideas', Idea, start, limit).then(rowsOnly); }
    static async getProjects(start = 0, limit = 20){        return this.getRows('projects', Project, start, limit).then(rowsOnly); }

    static async getAllTeams(){                             return this.getAllRows('teams', Team, 'keyid'); }
    static async getAllUsers(){                             return this.getAllRows('users', User, 'keyid'); }
    static async getAllIdeas(){                             return this.getAllRows('ideas', Idea, 'id'); }
    static async getAllProjects(){                          return this.getAllRows('projects', Project, 'teamid'); }

    static async getUUIDFromName(table, name){
        return read(table, murmur.v2(name),1)
            .then(res => res.rows.length ? res.rows[0].keyid : null)
            .catch(() => null)
    }

    static async getUserFromPublicKey(publicKey){
        const uuid = murmur.v2(publicKey);
        return read('users',uuid,1).then(res => firstOnly(format(res, User)));
    }

    static async getTeamFromPublicKey(publicKey){
        const uuid = murmur.v2(publicKey);
        return this.getTeam('', uuid);
    }

    static async getUser(name, uuid = null){
        const pkeyUUID = uuid ? uuid : await this.getUUIDFromName('usernames', name);
        if(pkeyUUID === null) return null;
        return read('users',pkeyUUID,1).then(res => firstOnly(format(res, User)));
    }

    // Gets sub objects as well
    static async getTeam(name, uuid = null){
        const pkeyUUID = uuid ? uuid : await this.getUUIDFromName('teamnames', name);
        if(pkeyUUID === null) return null;
        return read('teams',pkeyUUID,1).then(async res => {
            const team = firstOnly(format(res, Team));
            if(team) await Promise.all(team.members.map(async userid => {
                const user = await this.getUser('', userid).catch(() => null);
                if(user) team.users.push(user);
                return userid;
            }));
            return team;
        });
    }

    // Gets sub objects as well
    static async getTeamMemberRequests(teamid){
        return read('joinrequests',0,1,teamid).then(async res => {
            const joinRequest = firstOnly(format(res, JoinRequest));
            if(joinRequest) await Promise.all(joinRequest.userids.map(async userid => {
                const user = await this.getUser('', userid).catch(() => null);
                if(user) joinRequest.users.push(user);
                return userid;
            }));
            return joinRequest;
        });
    }

    // Gets sub objects as well
    static async getTeamsForMember(userid){
        return read('memberteams',0,1,userid).then(async res => {
            let teams = [];
            if(res.rows.length){
                res.rows[0].teamids.map(async teamid => {
                    const team = await this.getTeam('', teamid);
                    if(team) teams.push(team);
                });
            }
            return teams;
        });
    }

    // Gets sub objects as well
    static async getProject(name, teamuuid = null){
        const pkeyUUID = teamuuid ? teamuuid : await this.getUUIDFromName('projnames', name);
        if(pkeyUUID === null) return null;
        return read('projects',pkeyUUID,1).then(async res => {
            const project = firstOnly(format(res, Project));
            if(project) project.team = await this.getTeam(project.teamid);
            return project;
        });
    }

    // Gets sub objects as well
    static async getIdea(uuid){
        return read('ideas',uuid,1).then(async res => {
            const idea = firstOnly(format(res, Idea));
            if(idea) await Promise.all(idea.teamids.map(async teamid => {
                const user = await this.getTeam('', teamid).catch(() => null);
                if(user) idea.teams.push(user);
                return teamid;
            }));
            return idea;
        });
    }

    static async getDonationsCount(uuid){
        return read('donations',uuid,1).then(async res => {
            if(!res.rows.length) return 0;
            return res.rows[0].trxs.length;
        });
    }


    /******************************************************/
    /******************     WRITE    **********************/
    /******************************************************/

    static async createUser(user, sig, recaptcha){ return (await write()).user(user, user.key, sig, recaptcha, appauth()); }
    static async updateUser(user, sig){ return (await write()).userupdate(user, sig, appauth()); }
    static async touchUser(user, sig){ return (await write()).usertouch(user.key, sig, appauth()); }
    static async createIdea(idea, user, sig){ return (await write()).idea(idea.serialize(), user.key, sig, appauth()); }
    static async ideaVote(act, user, sig){ return (await write()).ideavote(act, user.key, sig, appauth()); }
    static async ideaFlag(act, user, sig){ return (await write()).ideaflag(act, user.key, sig, appauth()); }
    static async createTeam(team, user, sig){ return (await write()).team(team.serialize(), user.key, sig, appauth()); }
    static async updateTeam(team, sig){ return (await write()).teamupdate(team.serialize(), sig, appauth()); }
    static async joinTeam(team, user, sig){ return (await write()).teamjoin(team.keyid, user.keyid, sig, appauth()); }
    static async answerTeamJoinRequest(team, user, accepted, sig){ return (await write()).teamanswer(team.keyid, user.keyid, accepted ? 1 : 0, sig, appauth()); }
    static async teamKick(team, user, sig){ return (await write()).teamkick(team.keyid, user.keyid, sig, appauth()); }
    static async teamwork(team, idea, sig){ return (await write()).teamwork(team.keyid, idea.id, sig, appauth()); }
    static async createProject(project, sig){ return (await write()).project(project.serialize(), sig, appauth()); }
    static async updateProject(project, sig){ return (await write()).projectup(project.serialize(), sig, appauth()); }
    static async vote(vote, projectid, userid, sig){ return (await write()).vote(vote, projectid, userid, sig, appauth()); }
    static async donation(user, trx, sig){ return (await write()).donation(user.keyid, trx, sig, appauth()); }






}
