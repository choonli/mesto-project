import { removeCard, toggleLike } from '../index.js';
import { addCard } from './api.js';
import { openPopup } from './popup.js';

const placeTemplate = document.querySelector('#card-place').content;
export const cardsContainer = document.querySelector('.cards')
const popupPic = document.querySelector('.popup__zoom-pic');
const popupPicDescription = document.querySelector('.popup__pic-description');
export const openedPic = document.querySelector('.popup_opened_pic');
  
export function createCard(cardName, imageLink, likes, cardId, userId, user) {
  const card = placeTemplate.querySelector('.card').cloneNode(true);

  card.querySelector('.card__heading').textContent = cardName;
  card.querySelector('.card__image').src = imageLink;
  card.querySelector('.card__image').alt = cardName;
  
  card.querySelector('.card__trash-button').addEventListener('click', function() {
    const deleteCard = card.querySelector('.card__trash-button').closest('.card');
    deleteCard.remove();
  });
  
  card.querySelector('.card__like-button').addEventListener('click', function() {
    toggleLike(cardId, cardLike);
  });
  
  card.querySelector('.card__image').addEventListener('click', function() {
    openPopup(openedPic);
    popupPic.src = card.querySelector('.card__image').src;
    popupPicDescription.textContent = card.querySelector('.card__heading').textContent;
    popupPic.alt = card.querySelector('.card__heading').textContent;
  });

  //like
  const like = card.querySelector('.card__like-count');
  like.textContent = likes.length;
  const cardLike = card.querySelector('.card__like-button');

  if (likes.find((item) => {
    return item._id === user;
  })) {
    cardLike.classList.add('card__like-button_active');
  }

  //delete
  const deleteButton = card.querySelector('.card__trash-button');

  if (userId !== user) {
    deleteButton.remove();
  } else {
    deleteButton.addEventListener('click', function() {
      removeCard(cardId, deleteButton);
    })
  }
    
  return card;
}