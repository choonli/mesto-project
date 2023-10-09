//объявляем постоянные переменные
export const popupProfile = document.querySelector('.popup-profile');
export const formEditProfile = popupProfile.querySelector('.popup__form');
export const nameInput = formEditProfile.querySelector('.name__input');
export const bioInput = formEditProfile.querySelector('.bio__input');
export const formSaveEditBtn = popupProfile.querySelector('.popup__submit-button');

export const popupAdd = document.querySelector('.popup__add');
export const formAddCard = popupAdd.querySelector('.popup__form');
export const formSaveAddBtn = popupAdd.querySelector('.popup__submit-button');
export const popupForm = document.querySelector('.popup__form');
export const profileAva = document.querySelector('.profile__avatar');
export const avaBtn = document.querySelector('.profile__ava-edit-button');
export const avaPopup = document.querySelector('.popup__ava-update');
export const avaSaveBtn = avaPopup.querySelector('.popup__submit-button');
export const avaForm = document.querySelector('#ava-form')
export const avaInput = avaPopup.querySelector('.ava__input');


export const editButton = document.querySelector('.profile__edit-button');
export const profileName = document.querySelector('.profile__name');
export const profileBio = document.querySelector('.profile__bio');
export const placeNameInput = document.querySelector('#placename');
export const linkInput = document.querySelector('#img-link');

export const closeButtons = document.querySelectorAll('.popup__close-button');
export const addButton = document.querySelector('.profile__add-button');
export const placeTemplate = document.querySelector('#card-place').content;
export const cardImg = placeTemplate.querySelector('.card__image');
export const openedPic = document.querySelector('.popup_opened_pic');

export const cardsContainer = document.querySelector('.cards');
export const trashButton = document.querySelector('.card__trash-button');

export const selectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  fieldsetSelector: '.popup__set',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}