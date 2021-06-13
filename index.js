import Section from "./Section.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Popup from "./Popup.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";

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



const cardList = new Section({ 
    items: initialCards,
    renderer: (element) => {
    cardList.addItem(addCard(element.name, element.link));
  },
}, '.elements');

cardList.renderItems();



function addCard(nameCard, linkCard) {
  const card = new Card(
    nameCard,
    linkCard,
    "#elements-template",
    openPopupCard
  );
  return card.generateCard();
}



const popupMesto = new Popup(".popup-mesto");
const popupProfile = new Popup(".popup-profile");

editButton.addEventListener("click", () => popupProfile.open());
closeButtonProfile.addEventListener("click", () => popupProfile.close());

addButton.addEventListener("click", () => popupMesto.open());
closeButtonMesto.addEventListener("click", () => popupMesto.close());


/*
popupCard
  .querySelector(".popup__card_close-button")
  .addEventListener("click", function () {
    closePopup(popupCard);
  });
*/
  /*

// Edit form profile:
function submitFormProfile(evt) {
  evt.preventDefault();

  const name = nameInputProfile.value;
  const job = jobInputProfile.value;

  profileName.textContent = name;
  profileDescription.textContent = job;

  popupProfile.close();
}
formProfile.addEventListener("submit", submitFormProfile);

// Add cards:
*/



function openPopupCard(link, name) {
  cardImagePopup.src = link;
  cardTextPopup.textContent = name;
}



popupList.forEach((popup) => {
  popup.addEventListener("click", function (evt) {
    if (evt.target === evt.currentTarget) {
      closePopup(popup);
    }
  });
});



/*

// Edit form mesto:
function submitFormMesto(evt) {
  evt.preventDefault();

  const nameCard = titleInputMesto.value;
  const linkCard = srcInputMesto.value;

  prependCard(addCard(nameCard, linkCard));

  formMesto.reset();
  popupMesto.close();
}

formMesto.addEventListener("submit", submitFormMesto);

*/

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
