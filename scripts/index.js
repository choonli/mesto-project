const editButton = document.querySelector('.profile__edit-button')
const popup = document.querySelector('.popup')
const closeButton = document.querySelectorAll('.popup__close-button')
const profileName = document.querySelector('.profile__name')
const profileBio = document.querySelector('.profile__bio')
const nameInput = document.querySelector('.name__input')
const bioInput = document.querySelector('.bio__input')


//функция открытия/закрытия попапа редактирования
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

editButton.addEventListener('click', function() {
  openPopup(popup);
});

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

closeButton.forEach(closeButton => closeButton.addEventListener('click', function() {
  closePopup(popup);
}));


//редактирование имени и информации о себе
function handleFormSubmit(evt) {
  evt.preventDefault();
  
  profileName.textContent = nameInput.value;
  profileBio.textContent = bioInput.value;

  closePopup(popup);
};

popup.addEventListener('submit', handleFormSubmit); 


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

const cardsContainer = document.querySelector('.cards')
const placeTemplate = document.querySelector('#card-place').content;

const placeDescription = initialCards.map(function (item) {
 return {
  name: item.name,
  link: item.link
 }
});

function renderCard({name, link}) {
  const placeElmnt = placeTemplate.querySelector('.card').cloneNode(true);
  placeElmnt.querySelector('.card__heading').textContent = name;
  placeElmnt.querySelector('.card__image').src = link;

  cardsContainer.prepend(placeElmnt);
}

function render() {
  placeDescription.forEach(renderCard);
}

render();


//форма добавления карточки
const popupContainer = document.querySelector('.popups');
const popupTemplate = document.querySelector('#popup').content;
const newPopup = popupTemplate.querySelector('.popup').cloneNode(true);
newPopup.querySelector('.popup__heading').textContent = 'Новое место';
newPopup.querySelector('.popup__submit-button').textContent = 'Создать';

popupContainer.append(newPopup);

const addButton = document.querySelector('.profile__add-button');
addButton.addEventListener('click', function() {
  openPopup(newPopup);
});

function closeAddPopup(newPopup) {
  const closeButton = newPopup.querySelector('.popup__close-button');
  closeButton.addEventListener('click', function() {
    newPopup.classList.remove('popup_opened');
  })
}

closeAddPopup(newPopup);


//добавление карточки
const placeNameInput = document.querySelector('#placename');
const linkInput = document.querySelector('#imglink');


function addCard(evt) {
  const newCard = placeTemplate.querySelector('.card').cloneNode(true);

  evt.preventDefault();
  
  newCard.querySelector('.card__heading').textContent = placeNameInput.value;
  newCard.querySelector('.card__image').src = linkInput.value;

  const likeButton = newCard.querySelector('.card__like-button');
  likeButton.addEventListener('click', function() {
    like(likeButton);
  });

  const trashButton = newCard.querySelector('.card__trash-button');
  trashButton.addEventListener('click', function() {
    const card = trashButton.closest('.card');
    card.remove();
  });

  newCard.querySelector('.card__image').addEventListener('click', function() {
    document.querySelector('.popup_opened_pic').classList.add('popup_opened');
    document.querySelector('.popup__zoom-pic').src = newCard.querySelector('.card__image').src;
    document.querySelector('.popup__pic-description').textContent = newCard.querySelector('.card__heading').textContent;
  });

  document.getElementById('popup__form').reset();

  closePopup(newPopup);

  cardsContainer.prepend(newCard);
};


newPopup.addEventListener('submit', addCard); 


//лайк карточки
const likeButton = document.querySelectorAll('.card__like-button');

function like(likeButton) {
  likeButton.classList.toggle('card__like-button_active');
};

likeButton.forEach(likeButton => likeButton.addEventListener('click', function () {
  like(likeButton);
}));


//удаление карточки
const trashButton = document.querySelectorAll('.card__trash-button');

trashButton.forEach(trashButton => trashButton.addEventListener('click', function() {
  const card = trashButton.closest('.card');
  card.remove();
}));


//открытие попапа с картинкой
const openedPic = document.querySelector('.popup_opened_pic');

document.querySelectorAll('.card').forEach((item) =>{
  item.querySelector('.card__image').addEventListener('click', function() {
      document.querySelector('.popup_opened_pic').classList.add('popup_opened');
      document.querySelector('.popup__zoom-pic').src = item.querySelector('.card__image').src;
      document.querySelector('.popup__pic-description').textContent = item.querySelector('.card__heading').textContent;
  })
});

closeButton.forEach(closeButton => closeButton.addEventListener('click', function() {
  closePopup(openedPic);
}));

