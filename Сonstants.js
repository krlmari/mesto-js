const profile = document.querySelector(".profile");
const popup = document.querySelector(".popup");
const popupList = document.querySelectorAll(".popup");

const editButton = profile.querySelector(".profile__edit-button");
const addButton = profile.querySelector(".profile__add-button");

const popupProfile = document.querySelector(".popup-profile");
const closeButtonProfile = popupProfile.querySelector(".form__close-button");
const saveButtonPopup = popupProfile.querySelector(".form__save-button");

const popupMesto = document.querySelector(".popup-mesto");
const closeButtonMesto = popupMesto.querySelector(".form__close-button");
const saveButtonMesto = popupMesto.querySelector(".form__save-button");

const elementsList = document.querySelector(".elements");

const formProfile = popupProfile.querySelector("form");
const nameInputProfile = formProfile.querySelector("#input-name");
const jobInputProfile = formProfile.querySelector("#input-description");

const formMesto = popupMesto.querySelector("form");
const titleInputMesto = popupMesto.querySelector("#input-title");
const srcInputMesto = popupMesto.querySelector("#input-src");

const popupCard = document.querySelector(".popup__card");
const cardImagePopup = popupCard.querySelector(".popup__card_image");
const cardTextPopup = popupCard.querySelector(".popup__card_text");
const cardContentPopup = popupCard.querySelector(".popup__card_content");

const profileName = profile.querySelector(".profile__name");
const profileDescription = profile.querySelector(".profile__description");

const elementTemplate = document.querySelector("#elements-template").content;
const elementsElement = elementTemplate.querySelector(".elements__element");
