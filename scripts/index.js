const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg ",
  },
];
const imagePreview = document.querySelector("#image_preview");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditPopup = document.querySelector(".popup");
const profileEditCloseButton = document.querySelector("#edit_close-button");
const profileEditForm = document.querySelector("#edit-profile-form");
const editForm = document.querySelector(".popup__form");
const profileTitleEl = document.querySelector(".profile__title");
const profileDescriptionEl = document.querySelector(".profile__description");
const profileTitleInput = profileEditForm.querySelector(
  ".popup__input_type_name"
);
const cardListEl = document.querySelector(".card-list");
const profileDescriptionInput = profileEditForm.querySelector(
  ".popup__input_type_description"
);
const previewCloseButton = document.querySelector("#image_preview-close");
previewCloseButton.addEventListener("click", function () {
  closePopup(imagePreview);
});

function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
}

function openPopup(popup) {
  popup.classList.add("popup_is-opened");
}

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

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

initialCards.reverse().forEach((cardData) => {
  const card = createCard(cardData);
  renderCard(card, cardListEl);
});

function renderCard(card, container) {
  container.prepend(card);
}

const addSaveButton = document.querySelector("#add_submit");
const addCloseButton = document.querySelector("#add_close-button");

const addCardButton = document.querySelector(".profile__add-button");
const profileSave = document.querySelector(".popup__submit");
const addCardForm = document.querySelector("#add-profile-form");
const addCardPopup = document.querySelector("#add-popup");
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
});

function createCard(cardData) {
  const cardEl = cardTemplate.cloneNode(true);
  const likeButton = cardEl.querySelector(".card__button");
  likeButton.addEventListener("click", function () {
    likeButton.classList.toggle("card__button_active");
  });
  const cardTrash = cardEl.querySelector(".card__trash");
  cardTrash.addEventListener("click", function () {
    cardEl.remove();
  });

  const imageEl = cardEl.querySelector(".card__image");

  imageEl.addEventListener("click", function () {
    const popupImage = imagePreview.querySelector(".popup__image");
    const popupImageTitle = imagePreview.querySelector(".popup__image-title");
    popupImageTitle.textContent = cardData.name;
    popupImage.src = cardData.link;
    popupImage.alt = cardData.name;
    openPopup(imagePreview);
  });

  const titleEl = cardEl.querySelector(".card__text");

  imageEl.src = cardData.link;

  imageEl.alt = cardData.name;

  titleEl.textContent = cardData.name;

  return cardEl;
}
