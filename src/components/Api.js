export default class Api {
  constructor({ baseUrl, authToken }) {
    this._baseUrl = baseUrl;
    this._authToken = authToken;
  }
  //create a response() for the then and catch
  //getCardList()?
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._authToken,
      },
    })
      .then((res) => {
        res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.log(err); // log the error to the console
      });
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._authToken,
      },
    })
      .then((res) => {
        res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.log(err); // log the error to the console
      });
  }
  //--
  updateProfile(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._authToken,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => {
      res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
    });
  }

  //--
  loadCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: this._authToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        link,
      }),
    });
  }
  //--
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._authToken,
    }).then((res) => {
      res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
    });
  }

  updateAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._authToken,
      body: JSON.stringify({
        avatar: data.link,
      }),
    }).then((res) => {
      res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
    });
  }

  getLikes(cardId) {
    return fetch(`${this._baseUrl}/cards/likes${cardId}`, {
      headers: this._authToken,
    }).then((res) => {
      res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
    });
  }

  addLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      headers: this._authToken,
      method: "PUT",
    }).then((res) => {
      res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
    });
  }

  removeLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      headers: this._authToken,
      method: "DELETE",
    }).then((res) => {
      res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
    });
  }
}
