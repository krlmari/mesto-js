export default class UserInfo {
	constructor({ selectorName, selectorDescription }) {
		this._selectorName = document.querySelector(selectorName);
		this._selectorDescription = document.querySelector(selectorDescription);
	}

	getUserInfo() {
		return {
			name: this._selectorName.textContent,
			description: this._selectorDescription.textContent
		};
	}

	setUserInfo(data) {
		this._selectorName.textContent = data.name;
		this._selectorDescription.textContent = data.description;
	}
}
