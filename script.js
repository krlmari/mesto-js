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

const elementTemplate = document.querySelector("#elements-template").content;

const formProfile = popupProfile.querySelector("form");
const nameInputProfile = formProfile.querySelector("#input-name");
const jobInputProfile = formProfile.querySelector("#input-description");

const formMesto = popupMesto.querySelector("form");
const titleInputMesto = popupMesto.querySelector("#input-title");
const srcInputMesto = popupMesto.querySelector("#input-src");

const openPopupCard = document.querySelector(".popup__card");
const cardImagePopup = openPopupCard.querySelector(".popup__card_image");
const cardTextPopup = openPopupCard.querySelector(".popup__card_text");
const cardContentPopup = openPopupCard.querySelector(".popup__card_content");

const profileName = profile.querySelector(".profile__name");
const profileDescription = profile.querySelector(".profile__description");
const elementsElement = elementTemplate.querySelector(".elements__element");

const initialCards = [
  {
    name: "Архыз",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

initialCards.reverse().forEach(function (element) {
  prependCard(addCard(element.name, element.link));
});

function keyDownEscape(evt) {
  if (evt.key === "Escape") {
    closePopup(getOpenPopup());
  }
}

// Open and close 'popup' (profile and mesto):
function openPopup(popup) {
  popup.classList.add("popup__opened");
  document.body.classList.add("body__overflow");

  document.addEventListener("keydown", keyDownEscape);
}

function closePopup(popup) {
  popup.classList.remove("popup__opened");
  document.body.classList.remove("body__overflow");

  document.removeEventListener("keydown", keyDownEscape);
}

editButton.addEventListener("click", () => openPopup(popupProfile));
closeButtonProfile.addEventListener("click", () => closePopup(popupProfile));

addButton.addEventListener("click", () => openPopup(popupMesto));
closeButtonMesto.addEventListener("click", () => closePopup(popupMesto));

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
function addCard(nameCard, linkCard) {
  const element = elementsElement.cloneNode(true);

  element.querySelector(".elements__name").textContent = nameCard;
  element.querySelector(".elements__image").src = linkCard;

  // like:
  element
    .querySelector(".elements__like")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("elements__like_active");
    });

  // delete:
  element
    .querySelector(".elements__delete")
    .addEventListener("click", function () {
      element.remove();
    });

  // Open card:
  element
    .querySelector(".elements__image")
    .addEventListener("click", function () {
      openPopup(openPopupCard);
      cardImagePopup.src = linkCard;
      cardTextPopup.textContent = nameCard;
    });

  return element;
}

function prependCard(element) {
  elementsList.prepend(element);
}

openPopupCard
  .querySelector(".popup__card_close-button")
  .addEventListener("click", function () {
    closePopup(openPopupCard);
  });

function getOpenPopup() {
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

// Forms:

const showInputError = (formElement, inputElement, errorMessage, selectors) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(selectors.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(selectors.errorActiveClass);
};

const hideInputError = (formElement, inputElement, selectors) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(selectors.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(selectors.errorActiveClass);
};

const checkInputValid = (formElement, inputElement, selectors) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      selectors
    );
  } else {
    hideInputError(formElement, inputElement, selectors);
  }
};

const setEventListener = (formElement, selectors) => {
  const inputList = Array.from(
    formElement.querySelectorAll(selectors.inputSelector)
  );
  const saveButton = formElement.querySelector(selectors.submitButtonSelector);

  toggleButtonSave(inputList, saveButton, selectors);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValid(formElement, inputElement, selectors);
      toggleButtonSave(inputList, saveButton, selectors);
    });
  });
};

const enableValidation = (selectors) => {
  const formList = Array.from(
    document.querySelectorAll(selectors.formSelector)
  );
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListener(formElement, selectors);
  });
};

const hasValidInput = (inpuList) => {
  return inpuList.some((elementInput) => {
    return !elementInput.validity.valid;
  });
};

const toggleButtonSave = (inputList, elementButton, selectors) => {
  if (hasValidInput(inputList)) {
    elementButton.classList.add(selectors.inactiveButtonClass);
    elementButton.setAttribute("disabled", true);
  } else {
    elementButton.classList.remove(selectors.inactiveButtonClass);
    elementButton.removeAttribute("disabled");
  }
};
