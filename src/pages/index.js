import './index.css';
import Api from '../components/Api.js'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import { popupAdd, avaPopup, popupProfile, addButton, avaBtn, editButton, 
  placeTemplate, selectors, formEditProfile, formAddCard, 
  avaForm, openedPic, nameInput, bioInput
} from '../utils/constants.js'

let userId;

//Api
const api = new Api({
  url: "https://nomoreparties.co/v1/plus-cohort-28",
  headers: {  
    authorization: "06b149ae-6f10-4c61-8b9f-edccc9c12171",
    "Content-Type": "application/json"
  }
})

//Section
const container = new Section({
  items: [],
  renderer: (item) => {
    const card = createCard(item);
    container.addItem(card);
  }
}, '.cards');


//UserInfo
const userInfo = new UserInfo({
  userName: '.profile__name',
  userAbout: '.profile__bio',
  userAvatar: '.profile__avatar'
});

//PopupWithForm
const popupWithFormAdd = new PopupWithForm('.popup__add', (values) => {
  popupWithFormAdd.renderLoading('Сохранение...');

  api.addNewCard(values['placename'], values['imglink'])
  .then((res) => {
    container.addItem(createCard(res))
    popupWithFormAdd.close();
  })
  .catch((err) => console.log(`Ошибка: ${err}`))
  .finally(() => popupWithFormAdd.renderLoading('Создать'))
});

addButton.addEventListener('click', function() {
  popupWithFormAdd.open();
});

popupWithFormAdd.setEventListeners();

const popupWithFormEdit = new PopupWithForm('.popup-profile', (values) => {
  popupWithFormEdit.renderLoading('Сохранение...');

  api.editUser(values['username'], values['user-bio'])
  .then((res) => {
    userInfo.setUserInfo(res.name, res.about);
    popupWithFormEdit.close();
  })
  .catch((err) => console.log(`Ошибка: ${err}`, err))
  .finally(() => popupWithFormEdit.renderLoading('Сохранить'))
});

editButton.addEventListener('click', function() {
  popupWithFormEdit.open();
  const info = userInfo.getUserInfo();
  nameInput.value = info.name;
  bioInput.value = info.about;
});

popupWithFormEdit.setEventListeners();

const popupWithFormAva = new PopupWithForm('.popup__ava-update', (values) => {
  popupWithFormAva.renderLoading('Сохранение...');

  api.updateAva(values['avalink'])
  .then((res) => {
    userInfo.setUserAva(res.avatar);
    popupWithFormAva.close();
  })
  .catch((err) => console.log(`Ошибка: ${err}`))
  .finally(() => popupWithFormAva.renderLoading('Сохранить'))
});

avaBtn.addEventListener('click', function() {
  popupWithFormAva.open();
});

popupWithFormAva.setEventListeners();

//PopupWithImage
const popupWithImage = new PopupWithImage('.popup_opened_pic');

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

popupWithImage.setEventListeners();

//FormValidator
const profileValidation = new FormValidator(selectors, formEditProfile);
const addPicValidation = new FormValidator(selectors, formAddCard);
const avaValidation = new FormValidator(selectors, avaForm);

profileValidation.enableValidation();
addPicValidation.enableValidation();
avaValidation.enableValidation();

//Card
function createCard(data) {
  const card = new Card({
    data: data,
    handleCardClick: handleCardClick,
    handleAddLike: addLike,
    handleRemoveLike: removeLike,
    handleDelete: handleDelete
  }, placeTemplate, userId, api)

  const cardElement = card.createCard();
  return cardElement;
};


Promise.all([api.getUserInfo(), api.getCards()])
.then(([user, cards]) => {
  userId = user._id;
  userInfo.setUserInfo(user.name, user.about);
  userInfo.setUserAva(user.avatar);
  container.renderItems(cards);
})
.catch((err) => console.log(`Ошибка: ${err}`));

//like
function addLike(card) {
  api.addLike(card.getId())
  .then((res) => {
    card.addLike(res);
  })
  .catch((err) => console.log(`Ошибка: ${err}`))
}

function removeLike(card) {
  api.removeLike(card.getId())
  .then((res) => {
    card.removeLike(res);
  })
  .catch((err) => console.log(`Ошибка: ${err}`))
}

//delete
function handleDelete(card) {
  api.deleteCard(card.getId())
    .then((res) => {
      card.deleteCard(res);
    })
    .catch((err) => console.log(`Ошибка: ${err}`))
}
