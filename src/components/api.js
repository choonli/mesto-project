const configUrl = {
  url: "https://nomoreparties.co/v1/plus-cohort-28",
  headers: {
    authorization: "06b149ae-6f10-4c61-8b9f-edccc9c12171",
    "Content-Type": "application/json",
  }
};

function checkResponse(res) {
  if (!res.ok) {
   Promise.reject(`Ошибка: ${res.status}`)
  }
  return res.json();
}

export function getUserInfo() {
  return fetch(`${configUrl.url}/users/me`, {
    headers: configUrl.headers
  })
  .then(checkResponse)
}

export function getCards () {
  return fetch(`${configUrl.url}/cards`, {
    headers: configUrl.headers
  })
  .then(checkResponse)
}


export function editUser(newUser) {
  return fetch(`${configUrl.url}/users/me`, {
    method: "PATCH",
    headers: configUrl.headers,
    body: JSON.stringify({
      name: newUser.name,
      about: newUser.about,
    })
  })
  .then(checkResponse);
}

export function addNewCard(newCard) {
  return fetch(`${configUrl.url}/cards`, {
    method: 'POST',
    headers: configUrl.headers,
    body: JSON.stringify({
      name: newCard.name,
      link: newCard.link,
    })
  })
.then(checkResponse);
}


export function deleteCard(cardId) {
  return fetch(`${configUrl.url}/cards/${cardId}`, {
    method: 'DELETE',
    headers: configUrl.headers,
  })
  .then(checkResponse);
}

export function addLike(cardId) {
  return fetch(`${configUrl.url}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: configUrl.headers,
  })
  .then(checkResponse);
}

export function removeLike(cardId) {
  return fetch(`${configUrl.url}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: configUrl.headers,
  })
  .then(checkResponse);
}

export function updateAva({avatar: link}) {
  return fetch(`${configUrl.url}/users/me/avatar`, {
    method: "PATCH",
    headers: configUrl.headers,
    body: JSON.stringify({
      avatar: link,
    })
  })
  .then(checkResponse);
}