import {} from './validate.js';
import { openedPic } from './card.js';
import { popupProfile, popupAdd } from './constants.js';

//функция открытия/закрытия попапа 
export function openPopup(popup) {
  popup.classList.add('popup_opened');
}

export function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

//закрытие попапов клавишей esc 
document.addEventListener('keydown', function(e) {
  if (e.key == "Escape") {
    closePopup(popupProfile);
		closePopup(popupAdd);
		closePopup(openedPic);
  }
});

//закрытие попапов по клику на оверлей 
const popups = document.querySelectorAll('.popup');
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close-button')) {
      closePopup(popup);
    }
  });
});


  