// class Card {
//   constructor(data, cardSelector, handleImageClick) {
//     this._name = data.name;
//     this._link = data.link;

//     this._cardSelector = cardSelector;
//     this._handleImageClick = handleImageClick;
//   }

//   _setEventListeners() {
//     this._element
//       .querySelector(".card__button")
//       .addEventListener("click", () => this._handleLikeButton());

//     this._element
//       .querySelector(".card__button-delete")
//       .addEventListener("click", () => this._handleDeleteCard());

//     this._element
//       .querySelector(".card__image")
//       .addEventListener("click", () =>
//         this._handleImageClick(this._link, this._name)
//       );
//   }

//   _handleLikeButton() {
//     this._element
//       .querySelector(".card__button")
//       .classList.toggle("card__button_state_active");
//   }

//   _handleDeleteCard() {
//     this._element.remove();
//     this._element = null;
//   }

//   _getTemplate() {
//     return document
//       .querySelector(this._cardSelector)
//       .content.querySelector(".card")
//       .cloneNode(true);
//   }

//   getView() {
//     this._element = this._getTemplate();
//     const imageElement = this._element.querySelector(".card__image");
//     imageElement.src = this._link;
//     imageElement.alt = `Photo of ${this._name}`;
//     const cardText = this._element.querySelector(".card__text");
//     cardText.textContent = this._name;

//     this._setEventListeners();
//     return this._element;
//   }
// }

// export default Card;
