export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keyup", handleEscPress);
}

export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keyup", handleEscPress);
}

export function handleEscPress(e) {
  if (e.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closePopup(openedPopup);
  }
}

document.addEventListener("mousedown", function (e) {
  if (e.target.classList.contains("popup")) {
    closePopup(e.target);
  }
});
