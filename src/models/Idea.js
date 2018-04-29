export default class Idea {

    constructor(description = '', teamids = []){
        this.id = 0;
        this.description = description;
        this.upvotes = 0;
        this.flags = 0;
        this.teamids = teamids;

        this.teams = [];
    }

    static fromJson(json){
        return Object.assign(new Idea(), json);
    }

    clone(){ return Idea.fromJson(JSON.parse(JSON.stringify(this))); }

    serialize(){
        const clone = this.clone();
        delete clone.teams;
        return clone;
    }

}