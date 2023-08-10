import {} from './validate.js';
import { openedPic } from './card.js';
import { popupProfile, closeButtons, profileBio, profileName, popupAdd, nameInput, bioInput, editButton } from './constants.js';
import {} from './utils.js';

const popupForm = document.querySelector('.popup__form')

//функция открытия/закрытия попапа редактирования
export function openPopup(popup) {
  popup.classList.add('popup_opened');
}

editButton.addEventListener('click', function() {
  openPopup(popupProfile);
});
 

export function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

closeButtons.forEach(closeButtons => closeButtons.addEventListener('click', function() {
  closePopup(popupProfile);
	closePopup(popupAdd);
	closePopup(openedPic);
}));


//редактирование имени и информации о себе
export function handleFormSubmit(evt) {
  evt.preventDefault();
  
  profileName.textContent = nameInput.value;
  profileBio.textContent = bioInput.value;

  closePopup(popupProfile);
  popupForm.reset();
};

popupProfile.addEventListener('submit', handleFormSubmit); 

//закрытие попапов клавишей esc 
document.addEventListener('keydown', function(e) {
  if (e.key == "Escape") {
    closePopup(popupProfile);
		closePopup(popupAdd);
		closePopup(openedPic);
  }
});


  