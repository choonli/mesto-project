import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this.popupImage = this._popupSelector.querySelector('.popup__zoom-pic');
    this.popupDescription = this._popupSelector.querySelector('.popup__pic-description');
  }

  open(name, link) {
    super.open();
    this.popupImage.src = link;
    this.popupDescription.alt = name;
    this.popupDescription.textContent = name;
  }

  close() {
    super.close();
  }
}