export default class Api {
	constructor(options) {
		this._url = options.baseUrl;
		this._headers = options.headers;
	}

	_sendFetch(path, parameters) {
		return fetch(`${this._url}/${path}`, parameters).then((res) => {
			if (res.ok) {
				return res.json();
			}

			return Promise.reject(`Ошибка: ${res.status}`);
		});
	}

	getInitalCards() {
		return this._sendFetch(`cards`, { headers: this._headers });
	}

	getInitalInfo() {
		return this._sendFetch(`users/me`, { headers: this._headers });
	}

	addNewCards(newPost) {
		return this._sendFetch(`cards`, {
			method: 'POST',
			body: JSON.stringify({
				name: newPost.title,
				link: newPost.src
			}),
			headers: this._headers
		});
	}

	updateUserInfo(newUserInfo) {
		return this._sendFetch(`users/me`, {
			method: 'PATCH',
			headers: this._headers,
			body: JSON.stringify({
				name: newUserInfo.name,
				about: newUserInfo.description
			})
		});
	}

	deleteCard(id) {
		return this._sendFetch(`cards/${id}`, {
			method: 'DELETE',
			headers: this._headers
		});
	}

	updateUserAvatar(newUserAvatar) {
		return this._sendFetch(`users/me/avatar`, {
			method: 'PATCH',
			headers: this._headers,
			body: JSON.stringify({
				avatar: newUserAvatar.src
			})
		});
	}

	putLike(id) {
		return this._sendFetch(`cards/likes/${id}`, {
			method: 'PUT',
			headers: this._headers
		});
	}

	deleteLike(id) {
		return this._sendFetch(`cards/likes/${id}`, {
			method: 'DELETE',
			headers: this._headers
		});
	}
}
