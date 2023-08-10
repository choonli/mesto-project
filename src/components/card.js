import { openPopup } from './popup.js';
import { addButton, popupAdd } from './constants.js';
import {} from './utils.js';

const placeTemplate = document.querySelector('#card-place').content;
export const cardsContainer = document.querySelector('.cards')
const popupPic = document.querySelector('.popup__zoom-pic');
const popupPicDescription = document.querySelector('.popup__pic-description');
export const openedPic = document.querySelector('.popup_opened_pic');

//шесть карточек «из коробки»
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
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
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
  
initialCards.forEach(function(item) {
  cardsContainer.prepend(createCard(item.name, item.link));
});
  
function createCard (name, link) {
  const card = placeTemplate.querySelector('.card').cloneNode(true);

  card.querySelector('.card__heading').textContent = name;
  card.querySelector('.card__image').src = link;
  card.querySelector('.card__image').alt = name;
  
  card.querySelector('.card__trash-button').addEventListener('click', function() {
    const deleteCard = card.querySelector('.card__trash-button').closest('.card');
    deleteCard.remove();
  });
  
  card.querySelector('.card__like-button').addEventListener('click', function() {
    card.querySelector('.card__like-button').classList.toggle('card__like-button_active');
  });
  
  card.querySelector('.card__image').addEventListener('click', function() {
    openPopup(openedPic);
    popupPic.src = card.querySelector('.card__image').src;
    popupPicDescription.textContent = card.querySelector('.card__heading').textContent;
    popupPic.alt = card.querySelector('.card__heading').textContent;
  });
    
  return card;
}

addButton.addEventListener('click', function() {
  openPopup(popupAdd);
});