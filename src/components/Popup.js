export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscPress = this._handleEscPress.bind(this);
    this._handleOverlay = this._handleOverlay.bind(this);
    this._closeButton = this._popupElement.querySelector(".popup__close");
    this.closePopup = this.closePopup.bind(this);
  }

  openPopup() {
    this._popupElement.classList.add("popup_is-opened");
    this.setEventsListeners();
  }

  closePopup() {
    this._popupElement.classList.remove("popup_is-opened");
    this.removeEventsListeners();
  }

  setEventsListeners() {
    this._closeButton.addEventListener("click", this.closePopup);
    document.addEventListener("keydown", this._handleEscPress);
    this._popupElement.addEventListener("mousedown", this._handleOverlay);
  }

  removeEventsListeners() {
    this._closeButton.removeEventListener("click", this.closePopup);
    document.removeEventListener("keydown", this._handleEscPress);
    this._popupElement.removeEventListener("mousedown", this._handleOverlay);
  }

  _handleEscPress(e) {
    if (e.key === "Escape") {
      this.closePopup();
    }
  }

  _handleOverlay(e) {
    if (e.target.classList.contains("popup")) {
      this.closePopup();
    }
  }
}
