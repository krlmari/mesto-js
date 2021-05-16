import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

initialCards.reverse().forEach(function (element) {
  prependCard(addCard(element.name, element.link));
});

function handleEscClose(evt) {
  if (evt.key === "Escape") {
    closePopup(getOpenedPopup());
  }
}

// Open and close 'popup' (profile and mesto, card):
function openPopup(popup) {
  popup.classList.add("popup__opened");
  document.body.classList.add("body__overflow");

  document.addEventListener("keydown", handleEscClose);
}

function closePopup(popup) {
  popup.classList.remove("popup__opened");
  document.body.classList.remove("body__overflow");

  document.removeEventListener("keydown", handleEscClose);
}

editButton.addEventListener("click", () => openPopup(popupProfile));
closeButtonProfile.addEventListener("click", () => closePopup(popupProfile));

addButton.addEventListener("click", () => openPopup(popupMesto));
closeButtonMesto.addEventListener("click", () => closePopup(popupMesto));

popupCard
  .querySelector(".popup__card_close-button")
  .addEventListener("click", function () {
    closePopup(popupCard);
  });

// Edit form profile:
function submitFormProfile(evt) {
  evt.preventDefault();

  const name = nameInputProfile.value;
  const job = jobInputProfile.value;

  profileName.textContent = name;
  profileDescription.textContent = job;

  closePopup(popupProfile);
}
formProfile.addEventListener("submit", submitFormProfile);

// Add cards:
function openPopupCard(link, name) {
  cardImagePopup.src = link;
  cardTextPopup.textContent = name;
  openPopup(popupCard);
}
function addCard(nameCard, linkCard) {
  const card = new Card(
    nameCard,
    linkCard,
    "#elements-template",
    openPopupCard
  );
  return card.generateCard();
}

function prependCard(element) {
  elementsList.prepend(element);
}

function getOpenedPopup() {
  return document.querySelector(".popup__opened");
}

popupList.forEach((popup) => {
  popup.addEventListener("click", function (evt) {
    if (evt.target === evt.currentTarget) {
      closePopup(popup);
    }
  });
});

// Edit form mesto:
function submitFormMesto(evt) {
  evt.preventDefault();

  const nameCard = titleInputMesto.value;
  const linkCard = srcInputMesto.value;

  prependCard(addCard(nameCard, linkCard));

  formMesto.reset();

  closePopup(popupMesto);
}
formMesto.addEventListener("submit", submitFormMesto);

const selectors = {
  inputSelector: ".form__input",
  submitButtonSelector: ".form__save-button",
  inactiveButtonClass: "form__save-button_inactive",
  inputErrorClass: "form__input_type_error",
  errorActiveClass: "form__input-error_active",
};

const profileFormValidator = new FormValidator(selectors, formProfile);
profileFormValidator.enableValidation();

const mestoFormValidator = new FormValidator(selectors, formMesto);
mestoFormValidator.enableValidation();
