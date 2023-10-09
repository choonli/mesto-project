import { removeCard, toggleLike } from '../index.js';


const popupPic = document.querySelector('.popup__zoom-pic');
const popupPicDescription = document.querySelector('.popup__pic-description');

export default class Card {
  constructor({cardName, imageLink, likes, cardId, userId, user, isCardOwner}, placeTemplate, handleCardClick) {
    this.cardName = cardName;
    this.imageLink = imageLink;
    this.user = user;
    this.likes = likes;
    this.cardId = cardId;
    this.userId = userId;
    this.user = user;
    this.placeTemplate = placeTemplate;
    this.handleCardClick = handleCardClick;
    this.isCardOwner = isCardOwner;
  }

  _getTemplate() {
    const card = this.placeTemplate.querySelector('.card').cloneNode(true);
    
    return card;
  }
  
  _deleteCard() {
    this._element.remove();
  }

  _toggleDelete() {
    const deleteButton = this._element.querySelector('.card__trash-button');
    deleteButton.addEventListener('click', () => {
    this._deleteCard();
    })
  }

  _openPopup() {
    const cardImg = this._element.querySelector('.card__image');
    cardImg.addEventListener('click', () => {
      this.handleCardClick();
      popupPic.src = this.imageLink;
      popupPicDescription.textContent = this.cardName;
      popupPic.alt = this.cardName;
    });
  }

  _toggleLike() {
    const cardLike = this._element.querySelector('.card__like-button');
    cardLike.addEventListener('click', () => {
      toggleLike(this.cardId, cardLike);
    });
  }

  createCard() {
    this._element = this._getTemplate();
    this._openPopup();
    this._toggleLike();
    this._toggleDelete();

    this.cardImg = this._element.querySelector('.card__image');

    this._element.querySelector('.card__heading').textContent = this.cardName;
    this.cardImg.src = this.imageLink;
    this.cardImg.alt = this.cardName;

    const like = this._element.querySelector('.card__like-count');
    like.textContent = this.likes.length;
    const cardLike = this._element.querySelector('.card__like-button');

    if (this.likes.find((item) => {
      return item._id === this.user;
    })) {
      cardLike.classList.add('card__like-button_active');
    }

    const deleteButton = this._element.querySelector('.card__trash-button');

    if (!this.isCardOwner) {
      deleteButton.remove();
    }
      
    return this._element;
  }
}

// export function createCard(cardName, imageLink, likes, cardId, userId, user) {
//   const card = placeTemplate.querySelector('.card').cloneNode(true);
//   const cardImg = card.querySelector('.card__image');

//   card.querySelector('.card__heading').textContent = cardName;
//   cardImg.src = imageLink;
//   cardImg.alt = cardName;
  
//   card.querySelector('.card__trash-button').addEventListener('click', function() {
//     const deleteCard = card.querySelector('.card__trash-button').closest('.card');
//     deleteCard.remove();
//   });
  
//   card.querySelector('.card__like-button').addEventListener('click', function() {
//     toggleLike(cardId, cardLike);
//   });
  
//   cardImg.addEventListener('click', function() {
//     openPopup(openedPic);
//     popupPic.src = cardImg.src;
//     popupPicDescription.textContent = card.querySelector('.card__heading').textContent;
//     popupPic.alt = card.querySelector('.card__heading').textContent;
//   });

//   //like
//   const like = card.querySelector('.card__like-count');
//   like.textContent = likes.length;
//   const cardLike = card.querySelector('.card__like-button');

//   if (likes.find((item) => {
//     return item._id === user;
//   })) {
//     cardLike.classList.add('card__like-button_active');
//   }

  //delete
  // const deleteButton = card.querySelector('.card__trash-button');

  // if (userId !== user) {
  //   deleteButton.remove();
  // } else {
  //   deleteButton.addEventListener('click', function() {
  //     removeCard(cardId, deleteButton);
  //   })
  // }
    
//   return card;
// }