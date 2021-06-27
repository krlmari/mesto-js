export default class UserInfo {
	constructor({ selectorName, selectorDescription, selectorAvatar }) {
		this._selectorName = document.querySelector(selectorName);
		this._selectorDescription = document.querySelector(selectorDescription);
		this._selectorAvatar = document.querySelector(selectorAvatar);
	}

	getUserInfo() {
		return {
			name: this._selectorName.textContent,
			about: this._selectorDescription.textContent,
			avatar: this._selectorAvatar.src
		};
	}

	setUserInfo(data) {
		this._selectorName.textContent = data.name;
		this._selectorDescription.textContent = data.about;
		this._selectorAvatar.src = data.avatar;
	}

	setNewAvatar(data) {
		this._selectorAvatar.src = data.avatar;
	}
}
