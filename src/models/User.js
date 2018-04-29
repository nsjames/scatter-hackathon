import Link from './Link'

export const UserTypes = {
    HACKER:'Hacker',
    DOODLER:'Doodler',
    BIGMOUTH:'Big Mouth',
    VOTER:'Voter'
};

export default class User {

    constructor(publicKey = '', name = '', type = UserTypes.VOTER, bio = '', links = []){
        this.keyid = 0;
        this.key = publicKey;
        this.name = name;
        this.type = type;
        this.bio = bio;
        this.links = links;
        this.last_active = 0;
    }

    static fromJson(json){
        let p = Object.assign(new User(), json);
        p.links = json.links.map(link => Link.fromJson(link));
        return p;
    }


}