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

}