import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this.popupImage = this.popup.querySelector('.popup__zoom-pic');
    this.popupDescription = this.popup.querySelector('.popup__pic-description');
  }

  open(name, link) {
    super.open();
    this.popupImage.src = link;
    this.popupImage.alt = name;
    this.popupDescription.textContent = name;
  }
}