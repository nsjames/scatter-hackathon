export default class ProjectVote {

    constructor(use_of_blockchain = 0, usefulness = 0, originality = 0, user_experience = 0, fun = 0){
        this.use_of_blockchain = use_of_blockchain;
        this.usefulness = usefulness;
        this.originality = originality;
        this.user_experience = user_experience;
        this.fun = fun;
    }

    static fromJson(json){
        return Object.assign(new ProjectVote(), json);
    }

    toArray(){
        return Object.keys(this).map(key => {
            return [key.split('_').join(' '), this[key], key]
        });
    }

}

export class ProjectVR {

    constructor(){
        this.projectid = 0;
        this.vote = new ProjectVote();
    }

    static fromJson(json){
        let p = Object.assign(new ProjectVR(), json);
        p.vote = ProjectVote.fromJson(json.vote);
        return p;
    }

}

export class VoteRecord {

    constructor(){
        this.userid = 0;
        this.votes = [];
    }

    static fromJson(json){
        let p = Object.assign(new VoteRecord(), json);
        p.votes = json.votes.map(ProjectVR.fromJson);
        return p;
    }

}