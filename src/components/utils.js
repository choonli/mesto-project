import { profileBio, profileName, nameInput, bioInput, popupProfile, popupForm } from './constants.js';
import { closePopup } from './popup.js';

//редактирование имени и информации о себе
export function handleFormSubmit(evt) {
  evt.preventDefault();
    
  profileName.textContent = nameInput.value;
  profileBio.textContent = bioInput.value;
  
  closePopup(popupProfile);
  popupForm.reset();
};