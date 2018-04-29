import User from './User'
import Link from './Link'

export default class Team {

    constructor(name = '', bio = '', members = [], tags = [], links = [], publicKey = ''){
        this.keyid = 0;
        this.key = publicKey;
        this.name = name;
        this.bio = bio;
        this.members = members;
        this.member_count = members.length;
        this.tags = tags;
        this.links = links;
        this.ideaid = 0;

        // Merged locally only.
        this.users = [];
    }

    static fromJson(json){
        const p = Object.assign(new Team(), json);
        p.links = json.links.map(link => Link.fromJson(link));
        return p;
    }

    clone(){ return Team.fromJson(JSON.parse(JSON.stringify(this))); }

    serialize(){
        const clone = this.clone();
        delete clone.users;
        return clone;
    }

}