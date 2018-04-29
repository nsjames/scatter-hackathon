const host = () => {
    const h = process.env.NETWORK_HOST;
    const p = process.env.NETWORK_PORT;
    return `http://${h}:${p}`;
};

import Eos from 'eosjs';
import ecc from 'eosjs-ecc';
import ContractService from '../src/services/ContractService'
import Team from '../src/models/Team';
import Idea from '../src/models/Idea';
import IdeaAction from '../src/models/IdeaAction';
import User from '../src/models/User';
import Link from '../src/models/Link';
import Project from '../src/models/Project';
import {UserTypes} from '../src/models/User';
import { assert } from 'chai';
import 'mocha';


/***
 * Must be running a testnode with the `hackathon` contract at the parameters specified in .env
 */
describe('Hack Til Dawn EOSIO Contract', () => {

    const identities = [];
    let users = [];
    let ideas = [];
    let teams = [];
    let projects = [];

    const ideaOwner = () => users.find(user => user.type === UserTypes.VOTER);
    const teamOwner = () => users.find(user => user.type === UserTypes.HACKER);
    const teamMember = () => users.find(user => user.type === UserTypes.DOODLER);
    const identityFor = user => identities.find(id => id.publicKey === user.key);

    const code = 'hackathon';
    const codekey = process.env.CONTRACT_TESTING_SELF_PRIVATE_KEY;

    const eosio = Eos.Localnet({httpEndpoint:host(), keyProvider:'5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3'});
    const eos = provs => Eos.Localnet({httpEndpoint:host(), keyProvider:provs});
    const _self = Eos.Localnet({httpEndpoint:host(), keyProvider:codekey});
    const _selfopts = {authorization:['hackathon@active']};

    let app = null;
    let appacc = null;
    let appopt = null;

    let signHash = '';

    const randomAccountName = () => {
        const size = Math.random() * 8 + 2;
        let text = "";
        const possible = "abcdefghij12345.";
        for(let i=0; i<size; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    };

    class Identity {
        constructor(publicKey, privateKey, name){
            this.publicKey = publicKey;
            this.privateKey = privateKey;
            this.name = name;
        }
        sign(data) { return ecc.Signature.signHash(data, this.privateKey).toString(); }
    }


    const getFakeIdentity = async () => {
        const privateKey = await ecc.randomKey();
        const publicKey = ecc.privateToPublic(privateKey);
        const name = randomAccountName();
        const identity = new Identity(publicKey, privateKey, name);
        identities.push(identity);
        return identity;
    };

    const createIdentityAndUser = async (forcedUserType = null) => {
        const identity = await getFakeIdentity();
        const userType = () => {
            const rand = Math.round(Math.random() * 3);
            return UserTypes[Object.keys(UserTypes)[rand]]
        }
        const created = await ContractService.createUser(
            new User(
                identity.publicKey,
                identity.name,
                forcedUserType ? forcedUserType : userType()
            ), identity.sign(signHash));
        return {identity, created};
    };

    it('should set the app key', done => {
        new Promise(async() => {
            const privateKey = await ecc.randomKey();
            const publicKey = ecc.privateToPublic(privateKey);
            app = {privateKey, publicKey};
            appacc = randomAccountName();
            const created = await eosio.newaccount({
                creator: 'eosio',
                name: appacc,
                owner: publicKey,
                active: publicKey,
                recovery: 'eosio'
            }).catch(() => {});
            assert(!!created, "Could not create app account");
            appopt = {keyProvider:privateKey, authorization:[appacc]};

            const hack = await eos([codekey, privateKey]).contract(code);
            const setkey = await hack.setkey(appacc, {authorization:[code, appacc]}).catch(() => {});
            assert(!!setkey, "Could not set the app key");

            ContractService.setApp(appacc);
            ContractService.setSignProvider(async signargs => {
                return signargs.sign(signargs.buf, app.privateKey)
            });
            done();


        });
    });

    it('should clean the database first', done => {
        _self.contract(code).then(async hack => {
            await hack.clean("clean", _selfopts).catch(() => {});
            done();
        });
    });

    it('should read signhash', done => {
        new Promise(async() => {
            signHash = await ContractService.getSignHash().catch(() => {});
            assert(!!signHash, "Could not get sign hash");
            done();
        });
    });

    it('should be able to create a user', done => {
        new Promise(async() => {
            const {identity, created} = await createIdentityAndUser(UserTypes.HACKER);
            assert(!!created, "Could not create user");
            done();
        });
    });

    it('should be able to get a list of users', done => {
        new Promise(async() => {
            users = await ContractService.getUsers();
            assert(users.length === 1, "Too many or too few users");
            done();
        });
    });

    it('should be able to update a user', done => {
        new Promise(async() => {
            const user = users[0];
            user.bio = 'Changed';
            const updated = await ContractService.updateUser(user, identityFor(user).sign(signHash));
            users = await ContractService.getUsers();
            assert(!!updated, "Could not update user");
            assert(users[0].bio === 'Changed', "Could not update user, bio doesn't match");
            done();
        });
    });

    it('should be able to create 3 more users and get them all', done => {
        new Promise(async() => {
            const insertUser = async userType => {
                const {identity, created} = await createIdentityAndUser(userType);
                assert(!!created, "Could not create user");
                return true;
            };

            await insertUser(UserTypes.DOODLER);
            await insertUser(UserTypes.BIGMOUTH);
            await insertUser(UserTypes.VOTER);

            users = await ContractService.getAllUsers();
            assert(users.length === identities.length, `Memory saved identities don't match blockchain saved identities. 
                                                           Memory: ${identities.length}, Saved: ${users.length}`);
            done();
        });
    });

    it('should be able to get an arbitrary user both by name and/or uuid', done => {
        new Promise(async() => {
            let randomIndex = Math.floor(Math.random() * users.length);
            const randomUser = users[randomIndex];
            const byUUID = await ContractService.getUser('', randomUser.keyid).catch(() => null);
            const byName = await ContractService.getUser(randomUser.name).catch(() => null);
            assert(!!byUUID && !!byName, "Could not fetch by either uuid or name");
            assert(randomUser.keyid === byUUID.keyid, "Did not get back the same user by uuid");
            assert(randomUser.keyid === byName.keyid, "Did not get back the same user by name");

            done();
        });
    });

    it('should be able to create a team', done => {
        new Promise(async() => {
            const team = new Team('TestTeam', 'Hello World', [], ['wallet'], [], teamOwner().key);
            const created = await ContractService.createTeam(team, teamOwner(), identityFor(teamOwner()).sign(signHash));
            assert(!!created, "Could not create team");
            teams = await ContractService.getTeams();
            assert(teams.length === 1, "Wrong team count on blockchain");
            done();
        });
    });

    it('should be able to update a team', done => {
        new Promise(async() => {
            const team = teams[0];
            team.links = [new Link('test', 'http://www.google.com')];
            const updated = await ContractService.updateTeam(team, identityFor(teamOwner()).sign(signHash));
            assert(!!updated, "Could not update team");
            teams = await ContractService.getTeams();
            assert(teams[0].links.length === 1, "Wrong team count on blockchain");
            done();
        });
    });

    it('should be able to get a team both by name and/or uuid', done => {
        new Promise(async() => {
            const team = teams[0];
            const byUUID = await ContractService.getTeam('', team.keyid).catch(() => null);
            const byName = await ContractService.getTeam(team.name).catch(() => null);
            assert(!!byUUID && !!byName, "Could not fetch by either uuid or name");
            assert(team.keyid === byUUID.keyid, "Did not get back the same team by uuid");
            assert(team.keyid === byName.keyid, "Did not get back the same team by name");

            done();
        });
    });

    it('should be able to create an idea', done => {
        new Promise(async() => {
            const idea = new Idea('Hello world');
            const created = await ContractService.createIdea(idea, ideaOwner(), identityFor(ideaOwner()).sign(signHash));
            assert(!!created, "Could not create idea");
            ideas = await ContractService.getIdeas();
            assert(ideas.length === 1, "Wrong idea count on blockchain");
            done();
        });
    });

    it('should allow a team to grab an idea', done => {
        new Promise(async() => {
            const idea = ideas[0];
            const team = teams[0];
            const created = await ContractService.teamwork(team, idea, identityFor(teamOwner()).sign(signHash));
            assert(!!created, "Could not commit the team to the idea");
            ideas = await ContractService.getIdeas();
            assert(ideas[0].teamids.length === 1, "Wrong idea team count on blockchain");
            done();
        });
    });

    it('should allow voting and flagging on ideas', done => {
        new Promise(async() => {
            const idea = ideas[0];
            const voter = ideaOwner();
            const voted = await ContractService.ideaVote(new IdeaAction(voter.keyid, idea.id), voter, identityFor(voter).sign(signHash));
            assert(!!voted, "Could not commit an idea vote");
            const flagged = await ContractService.ideaFlag(new IdeaAction(voter.keyid, idea.id), voter, identityFor(voter).sign(signHash));
            assert(!!flagged, "Could not commit an idea flag");
            ideas = await ContractService.getIdeas();
            assert(ideas[0].upvotes === 1, "Got wrong idea vote count");
            assert(ideas[0].flags === 1, "Got wrong idea flag count");
            await ContractService.ideaVote(new IdeaAction(voter.keyid, idea.id), voter, identityFor(voter).sign(signHash)).catch(() => {});
            assert(ideas[0].upvotes === 1, "Should have failed the vote but did not");
            done();
        });
    });

    it('should allow not allow a user who is a voter to request to join a team', done => {
        new Promise(async() => {
            const user = ideaOwner();
            const team = teams[0];
            const failed = await ContractService.joinTeam(team, user, identityFor(user).sign(signHash)).catch(() => {});
            const joinRequests = await ContractService.getTeamMemberRequests(team.keyid);
            assert(!joinRequests, "Allowed voter user to request to become a member of a team.");
            done();
        })
    });

    it('should allow a user to request to join a team', done => {
        new Promise(async() => {
            const user = teamMember();
            const team = teams[0];
            const requested = await ContractService.joinTeam(team, user, identityFor(user).sign(signHash));
            assert(!!requested, "Could not request to join a team");
            const joinRequests = await ContractService.getTeamMemberRequests(team.keyid);
            assert(!!joinRequests, "Did not allow user to request to become a member of a team.");
            assert(joinRequests.users.length === 1, "Did not have the right amount of join requests.");
            done();
        })
    });

    it('should allow a team owner to add a user to the team', done => {
        new Promise(async() => {
            const leader = teamOwner();
            const user = teamMember();
            const team = teams[0];
            const requested = await ContractService.answerTeamJoinRequest(team, user, true, identityFor(leader).sign(signHash));
            assert(!!requested, "Could not answer a join team request");
            const joinRequests = await ContractService.getTeamMemberRequests(team.keyid);
            assert(joinRequests.users.length === 0, "Did not remove user from join team requests.");
            teams = await ContractService.getTeams();
            assert(teams[0].members.length === 2, "Did not add the new member to the team.");
            done();
        })
    });

    it('should allow a team owner to kick a user from the team', done => {
        new Promise(async() => {
            const leader = teamOwner();
            const user = teamMember();
            const team = teams[0];
            const kicked = await ContractService.teamKick(team, user, identityFor(leader).sign(signHash));
            assert(!!kicked, "Could not kicked a user from the team");
            teams = await ContractService.getTeams();
            assert(teams[0].members.length === 1, "Did not kick the member from the team.");
            done();
        })
    });

    it('should allow a team to create a project', done => {
        new Promise(async() => {
            const leader = teamOwner();
            const team = teams[0];
            const project = new Project(team.keyid, 'SomeProject');
            const created = await ContractService.createProject(project, identityFor(leader).sign(signHash));
            assert(!!created, "Could not create a new project");
            projects = await ContractService.getProjects();
            assert(projects.length === 1, "Did not create the new project.");
            done();
        })
    });

    it('should allow a team to update a project', done => {
        new Promise(async() => {
            const leader = teamOwner();
            const project = projects[0];
            project.overview = 'Changed';
            const created = await ContractService.updateProject(project, identityFor(leader).sign(signHash));
            projects = await ContractService.getProjects();
            assert(projects[0].overview === 'Changed', "Did not update the project.");
            done();
        })
    });

    // it('should do reads', done => {
    //     new Promise(async() => {
    //         const firstTeams = await ContractService.getTeams();
    //         console.log('firstTeams', firstTeams);
    //
    //         done();
    //     });
    // });

});