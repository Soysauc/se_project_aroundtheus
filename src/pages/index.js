import "../pages/index.css";
import FormValidator from "../scripts/FormValidator.js";
import Card from "../scripts/Card.js";
import { openPopup, closePopup, handleEscPress } from "../scripts/utils.js";

import {
  validationSettings,
  selectors,
  initialCards,
} from "../scripts/Constants.js";

import UserInfo from "../scripts/UserInfo.js";
import Section from "../scripts/Section.js";
import PopupWithImage from "../scripts/PopupWithImage.js";
import PopupWithForm from "../scripts/PopupWithForm.js";

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
  closePopup(imagePreview);
});

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitleEl.textContent;
  profileDescriptionInput.value = profileDescriptionEl.textContent;
  openPopup(profileEditPopup);
});

profileEditCloseButton.addEventListener("click", () => {
  closePopup(profileEditPopup);
});

profileEditForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const titleValue = profileTitleInput.value;
  const descriptionValue = profileDescriptionInput.value;
  profileTitleEl.textContent = titleValue;
  profileDescriptionEl.textContent = descriptionValue;
  closePopup(profileEditPopup);
});

//------
// Class Instances
//const userInfo = new UserInfo(selectors.userName, selectors.userAboutMe);

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
const addFormPopup = new PopupWithForm({
  popupSelector: selectors.addPopup,
  handleFormSubmit: (item) => {
    renderCard(item);
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
const addCardForm = document.querySelector("#add-profile-form");

const linkInput = document.querySelector("#image-input");
const titleInput = document.querySelector("#title-input");

addCardButton.addEventListener("click", function () {
  openPopup(addCardPopup);
});
addCloseButton.addEventListener("click", function () {
  closePopup(addCardPopup);
});

addCardForm.addEventListener("submit", function (event) {
  event.preventDefault();
  renderCard(
    createCard({
      name: titleInput.value,
      link: linkInput.value,
    }),
    cardListEl
  );
  closePopup(addCardPopup);
  addCardForm.reset();
  addFormValidator.disableButton();
});
//new Card
function createCard(cardData) {
  const card = new Card(cardData, "#card-template", (link, name) => {
    const popupImage = imagePreview.querySelector(".popup__image");
    const popupImageTitle = imagePreview.querySelector(".popup__image-title");
    popupImageTitle.textContent = name;
    popupImage.src = link;
    popupImage.alt = name;
    openPopup(imagePreview);
  });
  return card;
}
