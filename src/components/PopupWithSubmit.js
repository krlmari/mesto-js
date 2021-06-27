import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
	constructor(popupDeleteCardSelector, submitHandler) {
		super(popupDeleteCardSelector);
		this._submitHandler = submitHandler;
		this._formPopup = this._popup.querySelector('.form');
		this._buttonSubmit = this._formPopup.querySelector('.popup__delete-button');
	}

	open(data) {
		super.open();
		this._data = data;
	}

	setEventListeners() {
		super.setEventListeners();
		this._popup.querySelector('.form').addEventListener('submit', (evt) => {
			evt.preventDefault();
			this._submitHandler(this._data);
		});
	}

	renderLoading(isLoading) {
		if (isLoading) {
			this._buttonSubmit.textContent = `Удаление...`;
		} else {
			this._buttonSubmit.textContent = `Да`;
		}
	}
}
