import "../pages/index.css";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";

import { validationSettings, selectors } from "../utils/constants.js";

import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation";
import Api from "../components/Api";

const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditForm = document.querySelector("#edit-profile-form");
const profileTitleInput = profileEditForm.querySelector(
  ".popup__input_type_name"
);
const profileDescriptionInput = profileEditForm.querySelector(
  ".popup__input_type_description"
);
const previewCloseButton = document.querySelector("#image_preview-close");
previewCloseButton.addEventListener("click", function () {
  cardPreviewPopup.closePopup();
});

const confirmationPopup = new PopupWithConfirmation(selectors.deletePopup);
const avatarFormValidator = new FormValidator(
  validationSettings,
  selectors.avatarFormEl
);
const avatarFormPopup = new PopupWithForm({
  popupSelector: selectors.avatarPopup,
  handleFormSubmit: (data) => {
    avatarFormPopup.renderLoading(true);
    api
      .updateAvatar(data)
      .then((data) => {
        userInfo.setUserInfo({
          title: data.name,
          description: data.about,
          avatar: data.avatar,
        });
        avatarFormPopup.closePopup();
      })
      .catch((err) => console.log(`An error occured ${err}`))
      .finally(() => avatarFormPopup.renderLoading(false));
  },
});

profileEditButton.addEventListener("click", () => {
  const { name, description } = userInfo.getUserInfo();
  profileTitleInput.value = name;
  profileDescriptionInput.value = description;
  editFormValidator.disableButton();
  editFormPopup.openPopup();
});

// -----------------------
let userId = null;
let cardSection = null;
// -----------------------

function createCard(cardData) {
  const card = new Card(
    {
      data: { ...cardData, currentUserId: userId },
      handleImageClick: (imgData) => {
        cardPreviewPopup.open(imgData);
      },
      handleDeleteClick: (cardId) => {
        confirmationPopup.openPopup(() => {
          confirmationPopup.renderLoading(true);
          api
            .deleteCard(cardId)
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
    },
    selectors.cardTemplate
  );
  return card.getView();
}

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  authToken: "08a19e41-d9fe-403d-98ff-e77a4df3ef16",
});

const userInfo = new UserInfo(
  ".profile__title",
  ".profile__description",
  ".profile__image"
);
const cardPreviewPopup = new PopupWithImage(selectors.imagePreview);

Promise.all([api.getInitialCards(), api.getUserInfo()]).then((data) => {
  userId = data[1]._id;
  userInfo.setUserInfo({
    title: data[1].name,
    description: data[1].about,
  });

  cardSection = new Section(
    { items: data[0], renderer: renderCard },
    selectors.cardListEl
  );
  cardSection.renderItems();
});

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
    api
      .updateProfile(data)
      .then((data) => {
        userInfo.setUserInfo({ title: data.name, description: data.about });
        editFormPopup.closePopup();
      })
      .catch((err) => {
        console.log(`An error occured ${err}`);
      })
      .finally(() => editFormPopup.renderLoading(false));
  },
});

editFormPopup.setEventsListeners();
cardPreviewPopup.setEventsListeners();
confirmationPopup.setEventsListeners();

selectors.profileImageEdit.addEventListener("click", () => {
  avatarFormValidator.disableButton();
  avatarFormPopup.openPopup();
});

const addFormPopup = new PopupWithForm({
  popupSelector: selectors.addPopup,
  handleFormSubmit: (data) => {
    api.loadCard({ link: data.link, name: data.title }).then((data) => {
      renderCard(data);
      addFormPopup.closePopup();
      addFormValidator.disableButton();
    });
  },
});

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
