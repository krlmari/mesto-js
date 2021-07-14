import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
	constructor(selectorPopup, { submitForm }) {
		super(selectorPopup);
		this._submitForm = submitForm;
		this._formPopup = this._popup.querySelector('.form');
		this._inputList = this._popup.querySelectorAll('.form__input');
		this._buttonSubmit = this._formPopup.querySelector('.form__save-button');
	}

	open() {
		super.open();
	}

	renderLoading(isLoading) {
		if (isLoading) {
			this._buttonSubmit.textContent = `Сохранение...`;
		} else {
			this._buttonSubmit.textContent = `Сохранение`;
		}
	}

	getInputValues() {
		const inputValues = {};

		this._inputList.forEach((element) => {
			inputValues[element.name] = element.value;
		});

		return inputValues;
	}

	setEventListeners() {
		super.setEventListeners();
		this._formPopup.addEventListener('submit', (evt) => {
			evt.preventDefault();
			this._submitForm(this.getInputValues());
		});
	}

	close() {
		super.close();
		this._formPopup.reset();
	}
}
