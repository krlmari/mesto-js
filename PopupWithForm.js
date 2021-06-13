import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(selectorPopup, submitForm) {
        super(selectorPopup);
        this._submitForm = submitForm;
        this._formPopup = this._popup.querySelector('form');
        this._inputList = this._popup.querySelector('form__input');
    }

    _getInputValues() {
        const inputValues = {};
        
        this._inputList.array.forEach(element => {
            inputValues[element.name] = element.value;
        });

        return inputValues;
    }

    setEventListeners () {
        super.setEventListeners();
        this._formPopup.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._submitForm;
        });
    }

    close() {
        super.close();
        this._formPopup.reset();
    }
}