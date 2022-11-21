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
    this._imageElement.addEventListener("click", () =>
      this._handleImageClick({ link: this._link, title: this._name })
    );
    this._likeButton.addEventListener("click", this._handleLikeClick);
  }

  _renderLikes() {
    this._totalLikes.textContent = this._likes.length;
    if (this.isLiked()) {
      this._likeButton.classList.add("card__button_active");
    } else {
      this._likeButton.classList.remove("card__button_active");
    }
  }
  setLikes(likes) {
    this._likes = likes;
    this._renderLikes();
  }
  isLiked() {
    return this._likes.some((item) => item._id === this._userId);
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }
  _addDeleteIcon() {
    this._deleteButton.classList.remove("card__trash_hidden");
    this._deleteButton.addEventListener("click", () =>
      this._handleDeleteClick(this._cardId)
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
    const cardEl = this._getTemplate();
    this._imageElement = cardEl.querySelector(".card__image");
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    const nameEl = cardEl.querySelector(".card__text");
    nameEl.textContent = this._name;
    this._likeButton = cardEl.querySelector(".card__button");
    this._deleteButton = cardEl.querySelector(".card__trash");
    this._totalLikes = cardEl.querySelector(".card__counter");
    this.setLikes(this._likes);
    if (this._ownerId === this._userId) {
      this._addDeleteIcon();
    }

    this._setEventListeners();
    return cardEl;
  }
}
