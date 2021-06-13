export default class Card {
  constructor(
    nameCard,
    linkCard,
    cardSelector,
    clickCallback,
    handleCardClick
  ) {
    this._nameCard = nameCard;
    this._linkCard = linkCard;
    this._cardSelector = cardSelector;
    this._clickCallback = clickCallback;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".elements__element")
      .cloneNode(true);

    return cardElement;
  }

  _openPopupCard() {
    popup.classList.add("popup__opened");
    document.body.classList.add("body__overflow");
  }

  _closePopupCard() {
    popup.classList.remove("popup__opened");
    document.body.classList.remove("body__overflow");
  }

  _setEventListeners() {
    // like:
    this._cardElement
      .querySelector(".elements__like")
      .addEventListener("click", function (evt) {
        evt.target.classList.toggle("elements__like_active");
      });

    // delete:
    this._cardElement
      .querySelector(".elements__delete")
      .addEventListener("click", () => {
        this._cardElement.remove();
      });

    // Open card:
    this._cardElement
      .querySelector(".elements__image")
      .addEventListener("click", () =>
        this._clickCallback(this._linkCard, this._nameCard)
      );
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    this._setEventListeners();

    this._cardElement.querySelector(".elements__name").textContent =
      this._nameCard;
    this._cardElement.querySelector(".elements__image").src = this._linkCard;

    return this._cardElement;
  }
}
