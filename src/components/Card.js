export default class Card {
  constructor({data, handleCardClick, handleAddLike, handleRemoveLike, handleDelete}, placeTemplate, userId) {
    this.cardName = data.name;
    this.imageLink = data.link;
    this.likes = data.likes;
    this.cardId = data._id;
    this.ownerId = data.owner._id;
    this.userId = userId;
    this.placeTemplate = placeTemplate;
    this.handleCardClick = handleCardClick;
    this.handleAddLike = handleAddLike;
    this.handleRemoveLike = handleRemoveLike;
    this.handleDelete = handleDelete;
  }

  _getTemplate() {
    const cardElement = this.placeTemplate.querySelector('.card').cloneNode(true);
    return cardElement;
  }

  getId() {
    return this.cardId;
  }

  createCard() {
    this.cardElement = this._getTemplate();
    this.likeButton = this.cardElement.querySelector('.card__like-button');
    this.deleteButton = this.cardElement.querySelector('.card__trash-button');
    this.image = this.cardElement.querySelector('.card__image');
    this.likeCount = this.cardElement.querySelector('.card__like-count');
    this.caption = this.cardElement.querySelector('.card__heading');

    // Проверка своя ли карточка
    if (!(this.userId == this.ownerId)) {
      this.deleteButton.style.display = 'none';
    }

    if (this.likes.find((obj) => {
      this.userId === obj.cardId
    }));

    this._setEventListeners();
    this._setButtonLike();

    this.likeCount.textContent = this.likes.length;
    this.caption.textContent = this.cardName;
    this.image.src = this.imageLink;
    this.image.alt = this.cardName;

    return this.cardElement
  }

  _setEventListeners() {
    this.likeButton.addEventListener('click', () => {
      if (this.likeButton.classList.contains('card__like-button_active')) {
        this.handleRemoveLike(this);
      } else {
        this.handleAddLike(this)
      }
    });
    this.deleteButton.addEventListener('click', () => {
      this.handleDelete(this);
    });
    this.image.addEventListener('click', () => {
      this.handleCardClick(this.cardName, this.imageLink);
    });
  }

  deleteCard() {
    this.cardElement.remove();
  }

  _setButtonLike() {
    if (this.likes.some((like) => like._id === this.userId)) {
      this.likeButton.classList.add('card__like-button_active')
    }
  }

  removeLike(item) {
    this.likeCount.textContent = item.likes.length;
    if (this.likeButton.classList.contains('card__like-button_active')) {
      this.likeButton.classList.remove('card__like-button_active');
    }
  }

  addLike(item) {
    this.likeCount.textContent = item.likes.length;
    if (!(this.likeButton.classList.contains('card__like-button_active'))) {
      this.likeButton.classList.add('card__like-button_active');
    }
  }
}
