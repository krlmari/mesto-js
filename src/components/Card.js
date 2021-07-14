export default class Card {
	constructor(
		data,
		cardSelector,
		handleCardClick,
		onDeleteBtnClick,
		currentUserId,
		handleCardLike
	) {
		this._data = data;
		this._cardSelector = cardSelector;
		this._handleCardClick = handleCardClick;
		this._onDeleteBtnClick = onDeleteBtnClick;
		this._currentUserId = currentUserId;
		this._handleCardLike = handleCardLike;
	}

	_getTemplate() {
		const cardElement = document
			.querySelector(this._cardSelector)
			.content.querySelector('.elements__element')
			.cloneNode(true);

		return cardElement;
	}

	_setEventListeners() {
		// like:
		this._cardElement.querySelector('.elements__like').addEventListener('click', () => {
			const likeButton = this._cardElement.querySelector('.elements__like');
			const likeCounter = this._cardElement.querySelector('.elements__count-like');

			this._handleCardLike(this._isLiked(), this._data._id)
				.then((data) => {
					likeButton.classList.toggle('elements__like_active');
					likeCounter.textContent = data.likes.length;
					this._data.likes = data.likes;
				})
				.catch((err) => console.log(`Что-то пошло не так: ${err}`));
		});

		// Проверка на овнера карточки
		if (this._currentUserId === this._data.owner._id) {
			this._cardElement
				.querySelector('.elements__delete')
				.classList.add('elements__delete-active');
		}

		// delete
		this._cardElement.querySelector('.elements__delete').addEventListener('click', () => {
			this._onDeleteBtnClick({
				id: this._data._id,
				element: this._cardElement
			});
		});

		// Open card:
		this._cardElement
			.querySelector('.elements__image')
			.addEventListener('click', () =>
				this._handleCardClick(this._data.name, this._data.link)
			);
	}

	_isLiked() {
		return this._data.likes.some((like) => like._id === this._currentUserId);
	}

	generateCard() {
		this._cardElement = this._getTemplate();
		this._setEventListeners();

		this._cardElement.querySelector('.elements__name').textContent = this._data.name;
		this._cardElement.querySelector('.elements__image').src = this._data.link;

		this._cardElement.querySelector('.elements__count-like').textContent = `${this._data.likes
			.length}`;

		if (this._isLiked()) {
			this._cardElement
				.querySelector('.elements__like')
				.classList.add('elements__like_active');
		}

		return this._cardElement;
	}
}
