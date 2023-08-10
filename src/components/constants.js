//объявляем постоянные переменные
export const popupProfile = document.querySelector('.popup-profile');
export const formEdit = popupProfile.querySelector('.popup__form');
export const nameInput = formEdit.querySelector('.name__input');
export const bioInput = formEdit.querySelector('.bio__input');
export const formSaveEditBtn = popupProfile.querySelector('.popup__submit-button');

export const popupAdd = document.querySelector('.popup__add');
export const formAdd = popupAdd.querySelector('.popup__form');
export const formSaveAddBtn = popupAdd.querySelector('.popup__submit-button');


export const editButton = document.querySelector('.profile__edit-button');
export const profileName = document.querySelector('.profile__name');
export const profileBio = document.querySelector('.profile__bio');
export const placeNameInput = document.querySelector('#placename');
export const linkInput = document.querySelector('#imglink');

export const closeButtons = document.querySelectorAll('.popup__close-button');
export const addButton = document.querySelector('.profile__add-button');

export const selectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}