import ProjectVote from './ProjectVote'
import Link from './Link'

export const CATEGORIES = {
    GAME:'Game',
    TOOL:'Tool',
    OTHER:'Other'
};

export default class Project {

    constructor(teamid = 0, name = '', overview = '', whitepaper = {}, category = CATEGORIES.GAME, tags = [], links = []){
        this.teamid = teamid;
        this.name = name;
        this.overview = overview;
        this.whitepaper = whitepaper;
        this.category = category;
        this.tags = tags;
        this.links = links;
        this.votes = new ProjectVote();

        this.team = null;
    }

    static fromJson(json){
        let p = Object.assign(new Project(), json);
        // p.whitepaper = JSON.parse(json.whitepaper);
        p.links = json.links.map(Link.fromJson);
        p.votes = ProjectVote.fromJson(json.votes);
        return p;
    }

    clone(){ return Project.fromJson(JSON.parse(JSON.stringify(this))); }

    serialize(){
        const clone = this.clone();
        clone.whitepaper = JSON.stringify(clone.whitepaper);
        delete clone.team;
        return clone;
    }

}