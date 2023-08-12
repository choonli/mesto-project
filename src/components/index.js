import '../pages/index.css'
import { enableValidation } from './validate.js';
import { cardsContainer, openedPic, createCard} from './card.js';
import { closeButtons, placeNameInput, linkInput, popupAdd, addButton, editButton, popupProfile, selectors } from './constants.js';
import { handleFormSubmit } from './utils.js';
import { closePopup, openPopup } from './popup.js';

popupAdd.addEventListener('submit', (evt) => {
  cardsContainer.prepend(createCard(placeNameInput.value, linkInput.value));
  handleFormSubmit(evt);
  closePopup(popupAdd);
  evt.target.reset();
}); 

addButton.addEventListener('click', function() {
  openPopup(popupAdd);
});

editButton.addEventListener('click', function() {
  openPopup(popupProfile);
});

closeButtons.forEach(closeButtons => closeButtons.addEventListener('click', function() {
  closePopup(popupProfile);
	closePopup(popupAdd);
	closePopup(openedPic);
}));

popupProfile.addEventListener('submit', handleFormSubmit); 

enableValidation(selectors);