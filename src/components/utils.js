import { editUserProfile, getUserInfo } from './api.js';
import { profileBio, profileName, nameInput, bioInput, popupProfile, popupForm } from './constants.js';
import { closePopup } from './popup.js';

//редактирование имени и информации о себе
export function handleFormSubmit(evt) {
  evt.preventDefault();
    
  profileName.textContent = nameInput.value;
  profileBio.textContent = bioInput.value;

  editUserProfile({name: nameInput.value, about: bioInput.value});
  closePopup(popupProfile);
  popupForm.reset();
};

export function disableButton(buttonElement) {
  buttonElement.classList.add('popup__submit-button_disabled');
  buttonElement.disabled = true;
}

export const catchError = (err) => {
  textError.textContent = err;
  openPopup(popupErrorContainer);
}

export const request = (url, options) => {
  return fetch(url, options).then(checkResponse)
}

function renderLoading(isLoading, button, initialText, loadingText) {
  if (isLoading) {
      button.textContent = loadingText
  } else {
      button.textContent = initialText
  }
}

export function handleSubmit(request, evt, loadingText = 'Сохранение...') {
  evt.preventDefault();
  const submitButton = evt.submitter;
  const initialText = submitButton.textContent;
  renderLoading(true, submitButton, initialText, loadingText);
  const popup = document.querySelector('.popup_opened');
  request()
      .then(() => {
          evt.target.reset();
          closePopup(popup);
      })
      .catch(catchError)
      .finally(() => {
          renderLoading(false, submitButton, initialText, loadingText);
      });
}