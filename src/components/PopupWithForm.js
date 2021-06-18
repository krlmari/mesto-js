import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
	constructor(selectorPopup, { submitForm }) {
		super(selectorPopup);
		this._submitForm = submitForm;
		this._formPopup = this._popup.querySelector('.form');
		this._inputList = this._popup.querySelectorAll('.form__input');
	}

	_getInputValues() {
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
			this._submitForm(this._getInputValues());
		});
	}

	close() {
		super.close();
		this._formPopup.reset();
	}
}
