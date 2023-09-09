import './/pages/index.css';
import { enableValidation } from './components/validate.js';
import { cardsContainer, createCard} from './components/card.js';
import { placeNameInput, linkInput, popupAdd, addButton, 
  editButton, popupProfile, selectors, profileAva, avaBtn, 
  avaPopup,  nameInput, bioInput, profileName, profileBio, 
  avaInput, avaForm, formEditProfile, formAddCard } from './components/constants.js';
import { handleSubmit } from './components/utils.js';
import { closePopup, openPopup } from './components/popup.js';
import { addLike, addNewCard, deleteCard,
  editUser, getCards, getUserInfo,
  removeLike, updateAva }
from './components/api.js';

//редактирование имени и информации о себе
function submitEditProfileForm(evt) {
  evt.preventDefault();
    
  profileName.textContent = nameInput.value;
  profileBio.textContent = bioInput.value;

  closePopup(popupProfile);
  popupForm.reset();
};

Promise.all([getUserInfo(), getCards()])
.then(([user, cards]) => {
  profileName.textContent = user.name;
  profileBio.textContent = user.about;
  profileAva.src = user.avatar;
 
  cards.forEach((item) => {
   const card = createCard(item.name, item.link, item.likes, item._id, item.owner._id, user._id);
    cardsContainer.append(card); 
  })
})
.catch((error) => console.log(`Ошибка: ${error}`));

export function removeCard(cardId, item) {
  deleteCard(cardId)
  .then(() => {
    item.closest('.card').remove();
  })
  .catch((err) => console.log(`Ошибка: ${err}`));
}

function editAva(evt) {
  evt.preventDefault();

  function makeRequest() {
    return updateAva({avatar: avaInput.value})
    .then(() => {
      profileAva.src = avaInput.value;
      closePopup(avaPopup);
    })
  }
  handleSubmit(makeRequest, evt);
}

avaForm.addEventListener('submit', editAva);

function updateProfile(evt) {
  evt.preventDefault();

  function makeRequest() {
    return editUser({name: nameInput.value, about: bioInput.value})
    .then((user) => {
      profileName.textContent = user.name;
      profileBio.textContent = user.about;
      closePopup(popupProfile);
    })
  }
  handleSubmit(makeRequest, evt);
}

formEditProfile.addEventListener('submit', updateProfile);

function addCard(evt) {
  evt.preventDefault();

  function makeRequest() {
    const cardData = {
      name: placeNameInput.value,
      link: linkInput.value
    }
    return addNewCard(cardData)
    .then((res) => {
      const newCard = createCard(res.name, res.link, res.likes, res._id);
      cardsContainer.prepend(newCard);
      closePopup(popupAdd);
    })
  }
  handleSubmit(makeRequest, evt);
}

formAddCard.addEventListener('submit', addCard)

export function toggleLike(cardId, element) {
  const card = element.closest('.card');
  const likeCount = card.querySelector('.card__like-count');

  if (element.classList.contains('card__like-button_active')) {
    removeLike(cardId)
    .then((res) => {
      element.classList.remove('card__like-button_active');
      likeCount.textContent = res.likes.length;
    })
    .catch((err) => console.log(`Ошибка: ${err}`))
  } else {
    addLike(cardId)
    .then((res) => {
      element.classList.add('card__like-button_active');
      likeCount.textContent = res.likes.length;
    })
    .catch((err) => console.log(`Ошибка: ${err}`))
  }
}

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

enableValidation(selectors);


