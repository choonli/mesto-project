import {  } from './validate.js';
import { cardsContainer } from './card.js';
import { closeButtons, popupAdd, placeNameInput, linkInput, popupAdd } from './constants.js';
import {} from './utils.js';
import {} from './popup.js';
import {} from './utils.js';
import { selectors } from '../src/constants.js';

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




