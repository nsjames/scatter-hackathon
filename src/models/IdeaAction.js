export default class IdeaAction {

    constructor(keyid = 0, ideaid = 0){
        this.keyid = keyid;
        this.ideaid = ideaid;
    }

    static fromJson(json){
        return Object.assign(new IdeaAction(), json);
    }

}