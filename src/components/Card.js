export default class Card {
  constructor(
    { data, handleImageClick, handleDeleteClick, handleLikeClick, userId },
    cardSelector
  ) {
    this._name = data.name;
    this._link = data.link;
    this._cardId = data._id;
    this._likes = data.likes;
    this._userId = data.currentUserId;
    this._ownerId = data.owner._id;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._cardSelector = cardSelector;
    this._handleLikeClick = handleLikeClick;
  }

  _setEventListeners() {
    this._element
      .querySelector(".card__button")
      .addEventListener("click", () => this._handleLikeButton());

    this._element
      .querySelector(".card__trash")
      .addEventListener("click", () => this._handleDeleteCard());

    this._element
      .querySelector(".card__image")
      .addEventListener("click", () =>
        this._handleImageClick(this._link, this._name)
      );
    this._likeButton.addEventListener("click", this._handleLikeClick);
  }
  //render likes
  _handleLikeButton() {
    this._totalLikes.textContent = this._likes.length;
    this._element
      .querySelector(".card__button")
      .classList.toggle("card__button_active");
  }
  setLikes(likes) {
    this._likes = likes;
    this._handleLikeButton();
  }
  isLiked() {
    return this._likes.some((item) => item._id === this._userId);
  }
  //remove card
  _handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }
  _addDeleteIcon() {
    this._deleteButton.classList.remove("card__trash_hidden");
    this._deleteButton.addEventListener("click", () =>
      this._handleDeleteClick()
    );
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }
  getView() {
    this._element = this._getTemplate();
    this._imageElement = this._element.querySelector(".card__image");
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._elementname = this._element.querySelector(".card__text");
    this._elementname.textContent = this._name;
    this._likeButton = this._element.querySelector(".card__button");
    this._deleteButton = this._element.querySelector(".card__trash");
    this._totalLikes = this._element.querySelector(".card__counter");

    // this._renderlikes();

    if (this._ownerId === this._userId) {
      this._addDeleteIcon();
    }

    this._setEventListeners();
    return this._element;
  }
}
