export default class Api {
  constructor({url, headers}) {
    this.url = url;
    this.headers = headers;
  }

  _checkResponse(res) {
   if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`)
   }
   return res.json();
  }

  getUserInfo() {
    return fetch(`${this.url}/users/me`, {
      headers: this.headers
    })
    .then(res => this._checkResponse(res));
  }

  getCards () {
    return fetch(`${this.url}/cards`, {
      headers: this.headers
    })
    .then(res => this._checkResponse(res));
  }
  
  editUser(name, about) {
    return fetch(`${this.url}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about,
      })
    })
    .then(res => this._checkResponse(res));
  }

  addNewCard(cardName, link) {
    return fetch(`${this.url}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: cardName,
        link: link,
      })
    })
    .then(res => this._checkResponse(res));
  }

  deleteCard(cardId) {
    return fetch(`${this.url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.headers,
    })
    .then(res => this._checkResponse(res))
    .catch(error => {
      //чек на ерроры + лог
      console.error('Error while deleting card:', error);
      throw error;
    });
  }

  addLike(cardId) {
    return fetch(`${this.url}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this.headers,
    })
    .then(res => this._checkResponse(res));
  }

  removeLike(cardId) {
    return fetch(`${this.url}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this.headers,
    })
    .then(res => this._checkResponse(res));
  }

  updateAva(link) {
    return fetch(`${this.url}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: link,
      })
    })
    .then(res => this._checkResponse(res));
  }

}