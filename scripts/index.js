//объявляем постоянные переменные
const editButton = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup-profile');
const closeButtons = document.querySelectorAll('.popup__close-button');
const profileName = document.querySelector('.profile__name');
const profileBio = document.querySelector('.profile__bio');
const nameInput = document.querySelector('.name__input');
const bioInput = document.querySelector('.bio__input');
const cardsContainer = document.querySelector('.cards');
const placeTemplate = document.querySelector('#card-place').content;
const placeNameInput = document.querySelector('#placename');
const linkInput = document.querySelector('#imglink');
const popupPic = document.querySelector('.popup__zoom-pic');
const popupPicDescription = document.querySelector('.popup__pic-description');
const popupContainer = document.querySelector('.popups');
const popupAdd = document.querySelector('.popup__add');
const openedPic = document.querySelector('.popup_opened_pic');
const zoomPic = document.querySelector('.popup__zoom-pic');
const addButton = document.querySelector('.profile__add-button');
const popupOverlay = document.querySelectorAll('.popups');
const popupForm = document.querySelector('.popup__form');
const popupInput = popupForm.querySelector('.popup__input');

//функция открытия/закрытия попапа редактирования
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

editButton.addEventListener('click', function() {
  openPopup(popupProfile);
});

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

closeButtons.forEach(closeButtons => closeButtons.addEventListener('click', function() {
  closePopup(popupProfile);
}));

//закрытие попапов по клику на оверлей


//закрытие попапов клавишей esc 
document.addEventListener('keydown', function(e) {
  if (e.key == "Escape") {
    closePopup(popupProfile);
  }
});

document.addEventListener('keydown', function(e) {
  if (e.key == "Escape") {
    closePopup(popupAdd);
  }
});

document.addEventListener('keydown', function(e) {
  if (e.key == "Escape") {
    closePopup(openedPic);
  }
});

//редактирование имени и информации о себе
function handleFormSubmit(evt) {
  evt.preventDefault();
  
  profileName.textContent = nameInput.value;
  profileBio.textContent = bioInput.value;

  closePopup(popupProfile);
  popupForm.reset();
};

popupProfile.addEventListener('submit', handleFormSubmit); 


//шесть карточек «из коробки»
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

initialCards.forEach(function(item) {
  cardsContainer.prepend(createCard(item.name, item.link));
});

function createCard (name, link) {
  const card = placeTemplate.querySelector('.card').cloneNode(true);

  card.querySelector('.card__heading').textContent = name;
  card.querySelector('.card__image').src = link;
  card.querySelector('.card__image').alt = name;

  card.querySelector('.card__trash-button').addEventListener('click', function() {
    const deleteCard = card.querySelector('.card__trash-button').closest('.card');
    deleteCard.remove();
  });

  card.querySelector('.card__like-button').addEventListener('click', function() {
    card.querySelector('.card__like-button').classList.toggle('card__like-button_active');
  });

  card.querySelector('.card__image').addEventListener('click', function() {
    openPopup(openedPic);
    popupPic.src = card.querySelector('.card__image').src;
    popupPicDescription.textContent = card.querySelector('.card__heading').textContent;
    popupPic.alt = card.querySelector('.card__heading').textContent;
  });
  
  return card;
}

//форма добавления карточки
addButton.addEventListener('click', function() {
  openPopup(popupAdd);
});

//добавление карточки
popupAdd.addEventListener('submit', (evt) => {
  cardsContainer.prepend(createCard(placeNameInput.value, linkInput.value));
  handleFormSubmit(evt);
  closePopup(popupAdd);
  evt.target.reset();
}); 

closeButtons.forEach(closeButtons => closeButtons.addEventListener('click', function() {
  closePopup(popupAdd);
}));

closeButtons.forEach(closeButtons => closeButtons.addEventListener('click', function() {
  closePopup(openedPic);
}));

//валидация форм
const formError = popupForm.querySelector(`.${popupInput}-error`);

const showError = (input, errorMessage) => {
  input.classList.add('popup__input_type_error');
  formError.textContent = errorMessage;
  popupForm.classList.add('popup__input-error_active');
}

const hideError = (input) => {
  input.classList.remove('popup__input_type_error');
  popupForm.classList.remove('popup__input-error_active');
  formError.textContent = '';
}

const checkInputValidity = () => {
  if (!popupInput.validity.valid) {
    showError(popupInput, popupInput.validationMessage);
  } else {
    hideError(popupInput);
  }
}

popupForm.addEventListener('submit', function(evt) {
  evt.preventDefault();
});

popupInput.addEventListener('input', function() {
  checkInputValidity();
});
