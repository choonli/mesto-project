import './/pages/index.css';
import { enableValidation } from './components/validate.js';
import { cardsContainer, createCard} from './components/card.js';
import { placeNameInput, linkInput, popupAdd, addButton, editButton, popupProfile, selectors, profileAva, avaBtn, avaPopup,  nameInput, bioInput, profileName, profileBio, avaInput, avaForm } from './components/constants.js';
import { handleFormSubmit, handleSubmit } from './components/utils.js';
import { closePopup, openPopup } from './components/popup.js';
import { getUserInfo, getCards, editAva, editUserProfile, addCard } from './components/api.js';

popupAdd.addEventListener('submit', (evt) => {
  cardsContainer.prepend(createCard(placeNameInput.value, linkInput.value));
  closePopup(popupAdd);
  evt.target.reset();
}); 

Promise.all([getUserInfo(), getCards()])
  .then(([user, initialCards]) => {
    profileName.textContent = user.name;
    profileBio.textContent = user.about;
    profileAva.src = user.avatar;
 
    initialCards.forEach((item) => {
      const card = createCard(item.name, item.link, item.likes, item._id, item.owner._id, user._id);
      cardsContainer.append(card); 
    })
  })
.catch((error) => console.log(`Ошибка: ${error}`));

function updateAva(evt) {
  evt.preventDefault();

  function makeRequest() {
    return editAva(avaInput.value).then(() => {
      avaInput.value = profileAva.src
    });
  }
  handleSubmit(makeRequest, evt)
}

export const setProfileInfo = (name, status, link) => {
  nameProfile.textContent = name
  statusProfile.textContent = status
  profileAva.setAttribute('src', link)
}

avaForm.addEventListener('submit', updateAva);

addButton.addEventListener('click', function() {
  openPopup(popupAdd);
});

avaBtn.addEventListener('click', function() {
  openPopup(avaPopup);
});


editButton.addEventListener('click', function(evt) {
  openPopup(popupProfile);
  nameInput.value = profileName.textContent;
  bioInput.value = profileBio.textContent;
});

popupProfile.addEventListener('submit', handleFormSubmit); 

enableValidation(selectors);

