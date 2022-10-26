import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);

    this._popupForm = this._popupElement.querySelector(".popup__content");
    this._inputList = this._popupForm.querySelectorAll(".popup__input");
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => (inputValues[input.name] = input.value));
    return inputValues;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this._handleFormSubmit(this._getInputValues());
    // meaghan's recommendations
    this.closePopup();
  };

  setEventsListeners() {
    super.setEventsListeners();
    this._popupForm.addEventListener("submit", this.handleSubmit);
  }

  removeEventsListeners() {
    super.removeEventsListeners();
    this._popupForm.removeEventListener("submit", this.handleSubmit);
  }

  closePopup() {
    this._popupForm.reset();
    super.closePopup();
  }
}
