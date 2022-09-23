function showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessagesEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.add(inputErrorClass);
  errorMessagesEl.textContent = inputEl.validationMessage;
  errorMessagesEl.classList.add(errorClass);
}
function hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessagesEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.remove(inputErrorClass);
  errorMessagesEl.textContent = "";
  errorMessagesEl.classList.remove(errorClass);
}
function checkInputValidity(formEl, inputEl, options) {
  if (!inputEl.validity.valid) {
    return showInputError(formEl, inputEl, options);
  }
  hideInputError(formEl, inputEl, options);
}
function hasInvalidInput(inputList) {
  return !inputList.every((inputEl) => inputEl.validity.valid);
}

//disableButton
function disableButton(submitButton, inactiveButtonClass) {
  submitButton.classList.add(inactiveButtonClass);
  submitButton.disabled = true;
}

function enableButton(submitButton, inactiveButtonClass) {
  submitButton.classList.remove(inactiveButtonClass);
  submitButton.disabled = false;
}

function toggleButtonState(inputEls, submitButton, { inactiveButtonClass }) {
  if (hasInvalidInput(inputEls)) {
    return disableButton(submitButton, inactiveButtonClass);
  }
  return enableButton(submitButton, inactiveButtonClass);
}

//yeet
function setEventListeners(formEl, options) {
  const { inputSelector, inactiveButtonClass } = options;
  const inputEls = [...formEl.querySelectorAll(inputSelector)];
  const submitButton = formEl.querySelector(".popup__button");
  // disable submit button by default
  disableButton(submitButton, inactiveButtonClass);
  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", (e) => {
      // validateInputs(formEl, submitButton, inputEl, inputEls, options);
      checkInputValidity(formEl, inputEl, options);
      toggleButtonState(inputEls, submitButton, options);
    });
  });
  // validateInputs(formEl, submitButton, inputEl, inputEls, options);
}

function validateInputs(formEl, options) {
  const { inputSelector } = options;
  const inputEls = [...formEl.querySelectorAll(inputSelector)];
  const submitButton = formEl.querySelector(".popup__button");

  inputEls.forEach((inputEl) => {
    // validateInputs(formEl, submitButton, inputEl, inputEls, options);
    checkInputValidity(formEl, inputEl, options);
    toggleButtonState(inputEls, submitButton, options);
  });
}

function enableValidation(options) {
  const formEls = [...document.querySelectorAll(options.formSelector)];
  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    setEventListeners(formEl, options);
  });
}
const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
enableValidation(config);
