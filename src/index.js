import './/pages/index.css';
import { enableValidation } from './components/validate.js';
import { cardsContainer, createCard} from './components/card.js';
import { placeNameInput, linkInput, popupAdd, addButton, editButton, popupProfile, selectors } from './components/constants.js';
import { handleFormSubmit } from './components/utils.js';
import { closePopup, openPopup } from './components/popup.js';

popupAdd.addEventListener('submit', (evt) => {
  cardsContainer.prepend(createCard(placeNameInput.value, linkInput.value));
  closePopup(popupAdd);
  evt.target.reset();
}); 

addButton.addEventListener('click', function() {
  openPopup(popupAdd);
});

editButton.addEventListener('click', function(evt) {
  openPopup(popupProfile);
});

popupProfile.addEventListener('submit', handleFormSubmit); 

enableValidation(selectors);