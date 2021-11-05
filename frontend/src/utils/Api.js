const BASE_URL = `${window.location.protocol}${process.env.REACT_APP_API_URL || '//localhost:3001'}`;

class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  setToken(token) {
    this._headers = {
      ...this._headers,
      Authorization: `Bearer ${token}`,
    }
  }

  _getResponse(res) {
    if(res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers
    })
      .then(res => this._getResponse(res))
  }

  getUserData() {
    return fetch(`${this._url}/users/me`,
      {
        headers: this._headers
      })
      .then(res => this._getResponse(res))
  }

  getInitialData() {
    return Promise.all([this.getUserData(), this.getCards()]);
  }

  editProfile(name, job) {
    return fetch(`${this._url}/users/me`,
      {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          name: name,
          about: job
        })
      })
      .then(res => this._getResponse(res))
  }

  addNewCard(name, link) {
    return fetch(`${this._url}/cards`,
      {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
          name: name,
          link: link
        })
      })
      .then(res => this._getResponse(res))
  }

  likeCard(id) {
    return fetch(`${this._url}/cards/likes/${id}`,
      {
        method: "PUT",
        headers: this._headers
      })
      .then(res => this._getResponse(res))
  }

  dislikeCard(id) {
    return fetch(`${this._url}/cards/likes/${id}`,
      {
        method: "DELETE",
        headers: this._headers,
      })
      .then(res => this._getResponse(res))
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`,
      {
        method: "DELETE",
        headers: this._headers,
      })
      .then(res => this._getResponse(res))
  }

  uploadAvatar(url) {
    return fetch(`${this._url}/users/me/avatar`,
      {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          avatar: url
        })
      })
      .then(res => this._getResponse(res))
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._url}/cards/likes/${cardId}`,
      {
        method: isLiked ? "PUT" : "DELETE",
        headers: this._headers
      })
      .then(res => this._getResponse(res))
  }
}

const api = new Api({
  url: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  }
});

export default api;
