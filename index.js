import Section from './Section.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Popup from './Popup.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';

const initialCards = [
	{
		name: 'Архыз',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
	},
	{
		name: 'Челябинская область',
		link:
			'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
	},
	{
		name: 'Иваново',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
	},
	{
		name: 'Камчатка',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
	},
	{
		name: 'Холмогорский район',
		link:
			'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
	},
	{
		name: 'Байкал',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
	}
];

const cardList = new Section(
	{
		items: initialCards,
		renderer: (element) => {
			cardList.addItem(addCard(element.name, element.link));
		}
	},
	'.elements'
);

cardList.renderItems();

function addCard(nameCard, linkCard) {
	const card = new Card(nameCard, linkCard, '#elements-template', openPopupCard);
	return card.generateCard();
}

function openPopupCard(link, name) {
	openCardPopup.open(link, name);
}

const addCardPopup = new PopupWithForm('.popup-mesto', {
	submitForm: (data) => {
		cardList.addItem(addCard(data.title, data.src));
		addCardPopup.close();
	}
});
addCardPopup.setEventListeners();
addButton.addEventListener('click', () => addCardPopup.open());

const userInfo = new UserInfo({
	selectorName: '.profile__name',
	selectorDescription: '.profile__description'
});

const addInfoPopup = new PopupWithForm('.popup-profile', {
	submitForm: (data) => {
		userInfo.setUserInfo(data);
		addInfoPopup.close();
	}
});
addInfoPopup.setEventListeners();
editButton.addEventListener('click', () => addInfoPopup.open());

const openCardPopup = new PopupWithImage('.popup__card', '.popup__card_image', '.popup__card_text');
openCardPopup.setEventListeners();

const selectors = {
	inputSelector: '.form__input',
	submitButtonSelector: '.form__save-button',
	inactiveButtonClass: 'form__save-button_inactive',
	inputErrorClass: 'form__input_type_error',
	errorActiveClass: 'form__input-error_active'
};

const profileFormValidator = new FormValidator(selectors, formProfile);
profileFormValidator.enableValidation();

const mestoFormValidator = new FormValidator(selectors, formMesto);
mestoFormValidator.enableValidation();
