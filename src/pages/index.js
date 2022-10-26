import "../pages/index.css";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";

import {
  validationSettings,
  selectors,
  initialCards,
} from "../utils/constants.js";

import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Popup from "../components/Popup";

const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditCloseButton = document.querySelector("#edit_close-button");
const profileEditForm = document.querySelector("#edit-profile-form");
const profileTitleInput = profileEditForm.querySelector(
  ".popup__input_type_name"
);
const imagePreview = document.querySelector(selectors.imagePreview);
const profileDescriptionInput = profileEditForm.querySelector(
  ".popup__input_type_description"
);
const profileTitleEl = document.querySelector(selectors.profileTitleEl);
const profileDescriptionEl = document.querySelector(
  selectors.profileDescriptionEl
);
const profileEditPopup = document.querySelector(selectors.editPopup);
const cardListEl = document.querySelector(selectors.cardListEl);
const addCardPopup = document.querySelector(selectors.addPopup);
const previewCloseButton = document.querySelector("#image_preview-close");
previewCloseButton.addEventListener("click", function () {
  cardPreviewPopup.closePopup();
});

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitleEl.textContent;
  profileDescriptionInput.value = profileDescriptionEl.textContent;
  editFormPopup.openPopup();
  // openPopup(profileEditPopup);
});

const userInfo = new UserInfo(".profile__title", ".profile__description");

const cardPreviewPopup = new PopupWithImage(selectors.imagePreview);

const cardSection = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  selectors.cardListEl
);
//formValidation
const addFormEl = document.querySelector("#add-profile-form");
const editFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(validationSettings, addFormEl);
addFormValidator.enableValidation();
//----------------------
const editFormPopup = new PopupWithForm({
  popupSelector: selectors.editPopup,
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data);

    editFormPopup.closePopup();
    editFormValidator.disableButton();
  },
});
editFormPopup.setEventsListeners();

const addFormPopup = new PopupWithForm({
  popupSelector: selectors.addPopup,
  handleFormSubmit: (item) => {
    cardSection.addItem(createCard(item).getView());
    addFormPopup.closePopup();
    addFormValidator.disableButton();
  },
});
//----------------

initialCards.reverse().forEach((cardData) => {
  const card = createCard(cardData);
  renderCard(card, cardListEl);
});

function renderCard(card, container) {
  container.prepend(card.getView());
}

const addCloseButton = document.querySelector("#add_close-button");
const addCardButton = document.querySelector(".profile__add-button");

addCardButton.addEventListener("click", function () {
  addFormPopup.openPopup();
});

addCloseButton.addEventListener("click", function () {
  addFormPopup.closePopup();
});

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", (link, name) => {
    cardPreviewPopup.open({
      link,
      title: name,
    });
  });
  return card;
}
