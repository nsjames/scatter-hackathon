export default class JoinRequest {

    constructor(teamid = 0, userids = []){
        this.teamid = teamid;
        this.userids = userids;
        this.users = [];
    }

    static fromJson(json){
        return Object.assign(new JoinRequest(), json);
    }

}