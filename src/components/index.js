import {  } from './validate.js';
import { cardsContainer } from './card.js';
import { closeButtons, placeNameInput, linkInput, popupAdd } from './constants.js';
import {} from './utils.js';
import { closePopup } from './popup.js';
import {} from './utils.js';

//добавление карточки
popupAdd.addEventListener('submit', (evt) => {
  cardsContainer.prepend(createCard(placeNameInput.value, linkInput.value));
  handleFormSubmit(evt);
  closePopup(popupAdd);
  evt.target.reset();
}); 

closeButtons.forEach(closeButtons => closeButtons.addEventListener('click', function() {
  closePopup(popupAdd);
}));

closeButtons.forEach(closeButtons => closeButtons.addEventListener('click', function() {
  closePopup(openedPic);
}));
