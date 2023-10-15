export default class Card {
  constructor({data, handleCardClick, handleLike, handleDelete}, placeTemplate, userId) {
    this.cardName = data.name;
    this.imageLink = data.link;
    this.likes = data.likes;
    this.cardId = data._id;
    this.ownerId = data.owner._id;
    this.userId = userId;
    this.placeTemplate = placeTemplate;
    this.handleCardClick = handleCardClick;
    this.handleLike = handleLike;
    this.handleDelete = handleDelete;
  }

  _getTemplate() {
    const cardElement = this.placeTemplate.querySelector('.card').cloneNode(true);
    return cardElement;
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

    this.updateLikeCount(this.likes);

    this._setEventListeners();

    this.likeCount.textContent = this.likes.length;
    this.caption.textContent = this.cardName;
    this.image.src = this.imageLink;
    this.image.alt = this.cardName;

    return this.cardElement
  }

  _setEventListeners() {
    this.likeButton.addEventListener('click', () => {
      this.handleLike(this.cardId, this.likeButton)
    });
    this.deleteButton.addEventListener('click', () => {
      this.handleDelete(this.cardId, this.deleteButton);
    });
    this.image.addEventListener('click', () => {
      this.handleCardClick(this.cardName, this.imageLink);
    });
  }

  handleDelete() {
    this.cardElement.remove();
    this.cardElement = null;
  }

  checkingLike() {
    return this.likes.some((like) => like._id === this.userId);
  }

  _toggleLike() {
    if (this.checkingLike()) {
      this.likeButton.classList.add('card__like-button_active');
    } else {
      this.likeButton.classList.remove('card__like-button_active');
    }
  }


  updateLikeCount(likesCount) {
    this._ikes = likesCount;
    this.likeCount.textContent = this.likes.length;
    this._toggleLike();
  }
}
