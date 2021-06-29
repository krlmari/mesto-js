import './index.css';
import {
	formProfile,
	formMesto,
	formAvatar,
	addButton,
	editButton,
	editButtonAvatar,
	baseUrl,
	cohortId,
	mestoToken
} from '../constants/Сonstants.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';

let cardList;
let currentUserId = null;

const api = new Api({
	baseUrl: `${baseUrl}/${cohortId}`,
	headers: {
		authorization: mestoToken,
		'Content-Type': 'application/json'
	}
});

function addCard(data) {
	const card = new Card(
		data,
		'#elements-template',
		openPopupCard,
		handleCardDelete,
		currentUserId,
		handleCardLike
	);
	return card.generateCard();
}

function openPopupCard(link, name) {
	openCardPopup.open(name, link);
}

const userInfo = new UserInfo({
	selectorName: '.profile__name',
	selectorDescription: '.profile__description',
	selectorAvatar: '.profile__avatar'
});

/* Для открытия карточек */

const openCardPopup = new PopupWithImage('.popup__card', '.popup__card_image', '.popup__card_text');
openCardPopup.setEventListeners();

/* Взять из сервера карточки и ифнормацию о пользователе и добавить на страницу: */

Promise.all([ api.getInitalCards(), api.getInitalInfo() ])
	.then(([ cards, info ]) => {
		currentUserId = info._id;
		userInfo.setUserInfo(info);
		cardList = new Section(
			{
				items: cards,
				renderer: (element) => {
					cardList.addItem(addCard(element));
				}
			},
			'.elements'
		);
		cardList.renderItems();
	})
	.catch((err) => {
		console.error(err);
	});

/* Валидация форм: */

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
const avatarFormValidator = new FormValidator(selectors, formAvatar);
avatarFormValidator.enableValidation();

/* Добавить новую карточку из формы: */

const addCardPopup = new PopupWithForm('.popup-mesto', {
	submitForm: () => {
		addCardPopup.renderLoading(true);
		const inputValues = addCardPopup.getInputValues();
		api
			.addNewCards(inputValues)
			.then((data) => {
				cardList.addItem(addCard(data));
				addCardPopup.close();
			})
			.catch((err) => console.log(`Что-то пошло не так: ${err}`))
			.finally(() => {
				addCardPopup.renderLoading(false);
			});
	}
});
addCardPopup.setEventListeners();
addButton.addEventListener('click', () => addCardPopup.open());

/* Обновить информацию на сервере о пользователе из формы: */

const addInfoPopup = new PopupWithForm('.popup-profile', {
	submitForm: () => {
		addInfoPopup.renderLoading(true);
		const inputValues = addInfoPopup.getInputValues();
		api
			.updateUserInfo(inputValues)
			.then((data) => {
				userInfo.setUserInfo(data);
				addInfoPopup.close();
			})
			.catch((err) => console.log(`Что-то пошло не так: ${err}`))
			.finally(() => {
				addInfoPopup.renderLoading(false);
			});
	}
});
addInfoPopup.setEventListeners();
editButton.addEventListener('click', () => addInfoPopup.open());

/* Обновление аватара пользователя */

const addAvatarPopup = new PopupWithForm('.popup__update-avatar-form', {
	submitForm: () => {
		addAvatarPopup.renderLoading(true);
		const inputValue = addAvatarPopup.getInputValues();
		api
			.updateUserAvatar(inputValue)
			.then((data) => {
				userInfo.setNewAvatar(data);
				addAvatarPopup.close();
			})
			.catch((err) => console.log(`Что-то пошло не так: ${err}`))
			.finally(() => {
				addAvatarPopup.renderLoading(false);
			});
	}
});
addAvatarPopup.setEventListeners();
editButtonAvatar.addEventListener('click', () => addAvatarPopup.open());

/* Удаление карточки по id:  */

function handleCardDelete(data) {
	popupDeleteCard.open(data);
}

const popupDeleteCard = new PopupWithSubmit('.popup__delete-card', (data) => {
	popupDeleteCard.renderLoading(true);
	api
		.deleteCard(data.id)
		.then(() => {
			data.element.remove();
			popupDeleteCard.close();
		})
		.catch((err) => {
			console.error(err);
		})
		.finally(() => {
			popupDeleteCard.renderLoading(false);
		});
});
popupDeleteCard.setEventListeners();

/* Лайк карточки */

function handleCardLike(isLiked, cardId) {
	if (isLiked) return api.deleteLike(cardId);
	return api.putLike(cardId);
}
