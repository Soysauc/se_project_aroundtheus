import "../pages/index.css";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";

import {
  validationSettings,
  selectors,
  // initialCards, //remove this
} from "../utils/constants.js";

import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Popup from "../components/Popup";
import Api from "../components/Api";

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
  const { name, description } = userInfo.getUserInfo();

  profileTitleInput.value = name;
  profileDescriptionInput.value = description;
  editFormPopup.openPopup();
});
//old version
// function createCard(cardData) {
//   const card = new Card(cardData, "#card-template", (link, name) => {
//     cardPreviewPopup.open({
//       link,
//       title: name,
//     });
//   });
//   return card;
// }
function createCard(cardData) {
  const card = new Card(
    {
      cardData,
      handleImageClick: (imgData) => {
        cardPreviewPopup.open(imgData);
      },
      handleDeleteClick: () => {
        confirmationPopup.openPopup(() => {
          confirmationPopup.renderLoading(true);
          api
            .deleteCard(data._id)
            .then(() => {
              card.removeCard();
              confirmationPopup.closePopup();
            })
            .catch((err) => console.log(`An error occured: ${err}`))
            .finally(() => confirmationPopup.renderLoading(false));
        });
      },
      handleLikeClick: () => {
        if (card.isLiked()) {
          api
            .removeLike(card._cardId)
            .then((res) => {
              card.setLikes(res.likes);
            })
            .catch((err) => {
              console.log(`An error occured: ${err}`);
            });
        } else {
          api
            .addLike(card._cardId)
            .then((res) => {
              card.setLikes(res.likes);
            })
            .catch((err) => {
              console.log(`An error occured: ${err}`);
            });
        }
      },
      userId: userInfo.getId(),
    },
    selectors.cardTemplate
  );
  return card.getView();
}

//-------------------------------------------------Sprint 9
const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authToken: "08a19e41-d9fe-403d-98ff-e77a4df3ef16",
    "Content-Type": "application/json",
  },
});

//-------------------------------------------------Sprint 9

const userInfo = new UserInfo(".profile__title", ".profile__description");
const cardPreviewPopup = new PopupWithImage(selectors.imagePreview);
//---please dont mess this up ln 95
Promise.all(api.getInitialCards()).then((cardData) => {
  const cardSection = new Section(
    { cards: cardData, items: initialCards, renderer: renderCard },
    selectors.cardListEl
  );
});

Promise.all(api.getUserInfo()).then((userData) => {
  userInfo.setUserInfo({
    title: userData.name,
    description: userData.about,
  });
});
//-------sprint 9
//formValidation
const addFormEl = document.querySelector("#add-profile-form");
const editFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);
editFormValidator.enableValidation();
avatarFormValidator.enableValidation();

const addFormValidator = new FormValidator(validationSettings, addFormEl);
addFormValidator.enableValidation();
//----------------------

const editFormPopup = new PopupWithForm({
  popupSelector: selectors.editPopup,
  handleFormSubmit: (data) => {
    editFormPopup.renderLoading(true);
    api.updateProfile(data);
    then((data) => {
      userInfo.setUserInfo(data);
      editFormPopup.closePopup();
    })
      .catch((err) => {
        console.log(`An error occured ${err}`);
      })
      .finally(() => editFormPopup.renderLoading(false));
    // userInfo.setUserInfo(data);
    // editFormValidator.disableButton();
  },
});

editFormPopup.setEventsListeners();
cardPreviewPopup.setEventsListeners();
confirmationPopup.setEventsListeners();

editProfileButton.addEventListener("click", () => {
  const { name, about } = userInfo.getUserInfo();
  inputName.value = name;
  inputAboutMe.value = about;
  editFormValidator.disableButton();
  editFormPopup.openPopup();
});
avatarEditButton.addEventListener("click", () => {
  avatarFormValidator.disableButton();
  avatarFormPopup.openPopup();
});

const addFormPopup = new PopupWithForm({
  popupSelector: selectors.addPopup,
  handleFormSubmit: (data) => {
    cardSection.addItem(createCard(data).getView());
    api.loadCard(data).then((data) => {
      renderCard(data);
      addFormPopup.closePopup();
      addFormValidator.disableButton();
    });
    //do i need to re-add if i have it in my Api.js folder?
    //.catch((err) => console.log(`An error occured ${err}`))
    // .finally(() => addFormPopup.renderLoading(false));
  },
});

const confirmationPopup = new PopupWithConfirmation(selectors.deletePopup);
const avatarFormValidator = new FormValidator(
  validationConfig,
  selectors.avatarForm
);
const avatarFormPopup = new PopupWithForm({
  popupSelector: selectors.avatarPopup,
  handleFormSubmit: (data) => {
    avatarFormPopup.renderLoading(true);
    api
      .updateAvatar(data)
      .then((data) => {
        userInfo.setUserInfo(data);
        avatarFormPopup.closePopup();
      })
      .catch((err) => console.log(`An error occured ${err}`))
      .finally(() => avatarFormPopup.renderLoading(false));
  },
});
//----------------

// initialCards.reverse().forEach((cardData) => {
//   const card = createCard(cardData);
//   renderCard(card, cardListEl);
// });
//the following was old
// function renderCard(card, container) {
//   container.prepend(card.getView());
// }
const renderCard = (data) => {
  const card = createCard(data);
  cardSection.addItem(card);
};

const addCloseButton = document.querySelector("#add_close-button");
const addCardButton = document.querySelector(".profile__add-button");

addCardButton.addEventListener("click", function () {
  addFormPopup.openPopup();
});

addCloseButton.addEventListener("click", function () {
  addFormPopup.closePopup();
});
