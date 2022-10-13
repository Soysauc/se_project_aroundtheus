export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keyup", handleEscPress);
  popup.addEventListener("mousedown", closePopupOnRemoteClick);
}

export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keyup", handleEscPress);
  popup.removeEventListener("mousedown", closePopupOnRemoteClick);
}

export function handleEscPress(e) {
  if (e.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closePopup(openedPopup);
  }
}

function closePopupOnRemoteClick(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
}
