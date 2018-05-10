export default class Settings {

    constructor(){
        this.stopped = 0;
        this.votingEnabled = 0;
        this.projectsEnabled = 0;
        this.appKey = '';
        this.proof = '';
    }

    static fromJson(json){
        return Object.assign(new Settings(), json);
    }

}