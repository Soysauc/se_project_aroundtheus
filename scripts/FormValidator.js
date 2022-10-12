class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._form = formElement;
  }
  //is the errorMessage argument needed?
  _showInputError(inputEl, errorMessage) {
    const errorMessagesEl = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._inputErrorClass);
    errorMessagesEl.textContent = errorMessage; //formerly only inputEl.validationMessage
    errorMessagesEl.classList.add(this._errorClass);
  }
  _hideInputError(inputEl) {
    const errorMessagesEl = formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this._inputErrorClass);
    errorMessagesEl.textContent = ""; //formerly only ""
    errorMessagesEl.classList.remove(this._errorClass);
  }

  // What can I do to these parameters? 26:45
  _toggleButtonState(inputEls, submitButton, { inactiveButtonClass }) {
    if (hasInvalidInput(inputEls)) {
      return disableButton(submitButton, inactiveButtonClass);
    }
    return enableButton(submitButton, inactiveButtonClass);
  }
  // for ToggleButtonState's Buttons
  // This also may be different
  _hasInvalidInput(inputList) {
    return !inputList.every((inputEl) => inputEl.validity.valid);
  }
  // Here
  _checkInputValidity() {}

  _setEventListeners() {
    this._inputEls = [...this._form.querySelectorAll(this._inputSelector)];
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
    inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        checkInputValidity(this._form, inputEl, options);
        toggleButtonState(inputEls, submitButton, options);
      });
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    this._setEventListeners(); //formerly formEl and options as arguments
  }
}
const editFormValidator = new FormValidator();
editFormValidator.enableValidation();

const settings = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

export default FormValidator;
