import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(selectorPopup, imagePopup, textPopup) {
    super(selectorPopup);
    this._imagePopup = document.querySelector(imagePopup);
    this._textPopup = document.querySelector(textPopup);
    }

    open(link, name) {
        this._imagePopup.src = link;
        this._textPopup.textContent = name;
        super.open();
    }
}
