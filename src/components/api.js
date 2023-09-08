

const configUrl = {
  url: "https://nomoreparties.co/v1/plus-cohort-28",
  headers: {
    authorization: "06b149ae-6f10-4c61-8b9f-edccc9c12171",
    "Content-Type": "application/json"
  }
}

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

export function editUserProfile (newProfile) {
  return fetch(`${configUrl.url}/users/me`, {
    method: 'PATCH',
    headers: configUrl.headers,
    body: JSON.stringify({
      name: newProfile.name,
      about: newProfile.about
    }),
  })
  .then(checkResponse);
}

export function addCard(card) {
  return fetch(`${configUrl.url}/cards`, {
    method: 'POST',
    headers: configUrl.headers,
    body: JSON.stringify({
      name: card.name,
      link: card.link
    })
  })
  .then(checkResponse)
}

export function editAva(link) {
  return fetch(`${configUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: configUrl.headers,
    body: JSON.stringify({
      avatar: link,
    })
  })
  .then(checkResponse);
}

