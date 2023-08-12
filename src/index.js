import './/pages/index.css';
import { enableValidation } from './components/validate.js';
import { cardsContainer, openedPic, createCard} from './components/card.js';
import { closeButtons, placeNameInput, linkInput, popupAdd, addButton, editButton, popupProfile, selectors } from './components/constants.js';
import { handleFormSubmit } from './components/utils.js';
import { closePopup, openPopup } from './components/popup.js';

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