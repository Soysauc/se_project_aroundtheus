//---------------------------------------------------------
//Popup content
//---------------------------------------------------------
const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditPopup = document.querySelector(".popup");
const profileEditCloseButton = document.querySelector(".popup__close");
const profileEditForm = document.querySelector("#edit-profile-form");
const editForm = document.querySelector(".popup__form");
const profileTitleEl = document.querySelector(".profile__title");
const profileDescriptionEl = document.querySelector(".profile__description");
const profileTitleInput = profileEditForm.querySelector(
  ".popup__input_type_name"
);

const cardListEl = document.querySelector(".card__list");

const profileDescriptionInput = profileEditForm.querySelector(
  ".popup__input_type_description"
);

function closePopup() {
  profileEditPopup.classList.remove("popup_is-opened");
}

function openPopup() {
  profileEditPopup.classList.add("popup_is-opened");
}

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitleEl.textContent;
  profileDescriptionInput.value = profileDescriptionEl.textContent;
  openPopup();
});
profileEditCloseButton.addEventListener("click", closePopup);

profileEditForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const titleValue = profileTitleInput.value;
  const descriptionValue = profileDescriptionInput.value;

  profileTitleEl.textContent = titleValue;
  profileDescriptionEl.textContent = descriptionValue;
  closePopup();
});
//---------------------------------------------------------
//as per cards thus follows
//---------------------------------------------------------
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

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

initialCards.forEach(function (cardData) {
  const cardEl = cardTemplate.cloneNode(true);
  const imageEl = cardEl.querySelector(".card__image");
  const cardTitle = cardEl.querySelector(".card__text");
  const cardButton = cardEl.querySelector(".card__button");
  imageEl.src = cardData.link;
  imageEl.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  cardListEl.appendChild(cardEl);
  cardButton.addEventListener("click", () => {
    cardButton.classList.toggle("card__button_active");
  });
  const cardTrash = cardEl.querySelector(".card__trash");
});

const cardsList = document.querySelector(".card__list");

function renderCard(card, container) {
  container.append(card);
}

//------------------------
//sprint 5
//------------------------
