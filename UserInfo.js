export default class UserInfo {
    constructor(selectorName, selectorDescription) {
        this._selectorName = document.querySelector(selectorName);
        this._selectorDescription = document.querySelector(selectorDescription);
    }

    getUserInfo(name, description) {
        this.name = name;
        this.description = description;
    }

    setUserInfo() {
        this._selectorName = this.name;
        this._selectorDescription = this.description;
    }
}