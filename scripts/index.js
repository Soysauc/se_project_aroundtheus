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
console.log(cardListEl);
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

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card__item");
initialCards.forEach(function (cardData) {
  // clone template
  const cardEl = cardTemplate.cloneNode(true);
  // find .card__image
  const imageEl = cardEl.querySelector(".card__image");
  // find card title
  const cardTitle = cardEl.querySelector(".card__text");
  // replace image sre
  imageEl.src = cardData.link;
  // replace image alt
  imageEl.alt = cardData.name;
  // replace title
  cardTitle.textContent = cardData.name;
  // append to list
  cardListEl.appendChild(cardEl);
});

const cardsList = document.querySelector(".card__list");

// function generateCard(card) {
//   const cardElement = cardTemplate.cloneNode(true);
//   cardElement.querySelector(".card__text").textContent = card.name;
//   const imageEl = cardElement.querySelector(".card__image");
//   imageEl.style.backgroundImage = `url(${card.link})`;

//   imageEl.addEventListener("click", function () {
//     previewImgCloseup.src = card.link;
//     toggleModalWindow(preViewImgModalWindow);
//   });

//   return cardElement;
// }

// function renderCard(card, container) {
//   container.append(card);
// }
//---------------------------------------------------------
// templates
//---------------------------------------------------------

// editForm.addEventListener("submit", formSubmitHandler);
// profileEditButton.addEventListener("click", () =>
//   toggleModalWindow(editModalWindow)
// );
// profileAddButton.addEventListener("click", () =>
//   toggleModalWindow(addModalWindow)
// );
// editModalCloseButton.addEventListener("click", () =>
//   toggleModalWindow(editModalWindow)
// );
// addModalCloseButton.addEventListener("click", () =>
//   toggleModalWindow(addModalWindow)
// );
// ImgCloseupModalCloseButton.addEventListener("click", () =>
//   toggleModalWindow(preViewImgModalWindow)
//);
function renderCard(card, container) {
  container.append(card);
}
// initialCards.forEach(function (card) {
//   const newCard = generateCard(card);
//   renderCard(newCard, cardList);
// });

// initialCards.forEach(function (card) {
//   const newCard = generateCard(card);
//   renderCard(newCard, cardList);
// });

// method for adding the child in the list beggining is .prepend from Sergey
/*cardsarray.forEach(item => {
  const template = document.query...('.template');
  const clone = template.clone();
  clone.query...(img).src = item.link
  prepend

});*/
