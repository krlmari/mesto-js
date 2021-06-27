export default class Popup {
	constructor(selectorPopup) {
		this._popup = document.querySelector(selectorPopup);
		this._handleEscClose = this._handleEscClose.bind(this);
		this._overlayClose = this._overlayClose.bind(this);
	}

	open() {
		this._popup.classList.add('popup__opened');
		document.body.classList.add('body__overflow');
		document.addEventListener('keydown', this._handleEscClose);
		this._popup.addEventListener('click', this._overlayClose);
	}

	close() {
		this._popup.classList.remove('popup__opened');
		document.body.classList.remove('body__overflow');
		document.removeEventListener('keydown', this._handleEscClose);
		this._popup.removeEventListener('click', this._overlayClose);
	}

	_overlayClose(evt) {
		if (evt.target === evt.currentTarget) {
			this.close(this._popup);
		}
	}

	_handleEscClose(evt) {
		if (evt.key === 'Escape') {
			this.close(this._popup);
		}
	}

	setEventListeners() {
		this._popup.querySelector('.form__close-button').addEventListener('click', () => {
			this.close(this._popup);
		});
	}
}
