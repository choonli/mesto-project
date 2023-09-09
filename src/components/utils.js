import { profileBio, profileName, nameInput, bioInput, popupProfile, popupForm } from './constants.js';
import { closePopup } from './popup.js';
import { editUser } from './api.js';

//редактирование имени и информации о себе
export function handleFormSubmit(evt) {
  evt.preventDefault();
    
  profileName.textContent = nameInput.value;
  profileBio.textContent = bioInput.value;

  closePopup(popupProfile);
  popupForm.reset();
};

export function disableButton(buttonElement) {
  buttonElement.classList.add('popup__submit-button_disabled');
  buttonElement.disabled = true;
}

export function renderLoading(isLoading, button, initialText = 'Сохранить', loadingText = 'Сохранение...') {
  if (isLoading === true) {
    button.textContent = loadingText;
  } else {
    button.textContent = initialText;
  }
}

export function handleSubmit(request, evt, loadingText = 'Сохранение...') {
  evt.preventDefault();

  const submitBtn = evt.submitter;
  const initialText = submitBtn.textContent;

  renderLoading(true, submitBtn, initialText, loadingText);
  request()
    .then(() => {
      evt.target.reset();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`)
    })
    .finally(() => {
      renderLoading(false, submitBtn, initialText);
    });
}