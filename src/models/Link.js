export default class Link {

    constructor(name = '', url = ''){
        this.name = name;
        this.url = url;
    }

    static fromJson(json){
        return Object.assign(new Link(), json);
    }

}