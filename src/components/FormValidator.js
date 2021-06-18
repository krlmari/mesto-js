export default class FormValidator {
	constructor(selectors, formElement) {
		this._selectors = selectors;
		this._formElement = formElement;
	}

	_showInputError(inputElement, errorMessage) {
		const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

		inputElement.classList.add(this._selectors.inputErrorClass);
		errorElement.textContent = errorMessage;
		errorElement.classList.add(this._selectors.errorActiveClass);
	}

	_hideInputError(inputElement) {
		const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

		inputElement.classList.remove(this._selectors.inputErrorClass);
		errorElement.textContent = '';
		errorElement.classList.remove(this._selectors.errorActiveClass);
	}

	_checkInputValidity(inputElement) {
		if (!inputElement.validity.valid) {
			this._showInputError(inputElement, inputElement.validationMessage);
		} else {
			this._hideInputError(inputElement);
		}
	}

	_setEventListener() {
		this._inputList = Array.from(
			this._formElement.querySelectorAll(this._selectors.inputSelector)
		);
		this._submitButton = this._formElement.querySelector(this._selectors.submitButtonSelector);

		this._toggleButtonSubmit();

		this._inputList.forEach((inputElement) => {
			inputElement.addEventListener('input', () => {
				this._checkInputValidity(inputElement);
				this._toggleButtonSubmit();
			});
		});
	}

	_hasValidInput() {
		return this._inputList.some((elementInput) => {
			return !elementInput.validity.valid;
		});
	}

	_toggleButtonSubmit() {
		if (this._hasValidInput()) {
			this._submitButton.classList.add(this._selectors.inactiveButtonClass);
			this._submitButton.setAttribute('disabled', true);
		} else {
			this._submitButton.classList.remove(this._selectors.inactiveButtonClass);
			this._submitButton.removeAttribute('disabled');
		}
	}

	enableValidation() {
		this._setEventListener();
	}
}
