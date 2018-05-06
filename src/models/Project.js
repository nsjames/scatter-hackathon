import ProjectVote from './ProjectVote'
import Link from './Link'

export const CATEGORIES = {
    DAPP:'Dapp',
    TOOL:'Tool'
};

export const LINK_NAMES = {
    GITHUB:'GitHub',
    LIVE_DEMO:'Live Demo'
};

export default class Project {

    constructor(teamid = 0, whitepaper = {}, category = CATEGORIES.DAPP, links = []){
        this.teamid = teamid;
        this.whitepaper = whitepaper;
        this.category = category;
        this.links = links;
        this.votes = new ProjectVote();
        this.account = '';

        this.team = null;
    }

    static fromJson(json){
        let p = Object.assign(new Project(), json);
        // p.whitepaper = JSON.parse(json.whitepaper);
        if(json.hasOwnProperty('links')) p.links = json.links.map(Link.fromJson);
        if(json.hasOwnProperty('votes')) p.votes = ProjectVote.fromJson(json.votes);
        return p;
    }

    clone(){ return Project.fromJson(JSON.parse(JSON.stringify(this))); }

    serialize(){
        const clone = this.clone();
        delete clone.team;
        return clone;
    }

}