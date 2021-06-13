export default class Popup {
  constructor(selectorPopup) {
    this._popup = document.querySelector(selectorPopup);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add("popup__opened");
    document.body.classList.add("body__overflow");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup__opened");
    document.body.classList.remove("body__overflow");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close(this._popup);
    }
  }

  setEventListeners() {
    this._popup
      .querySelector(".popup__card_close-button")
      .addEventListener("click", function () {
        this.close(_popup);
      });
  }
}