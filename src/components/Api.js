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
}
