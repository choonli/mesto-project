export default class Popup {
  constructor(popupSelector) {
    this.popup = document.querySelector(popupSelector);
    this._closeByEscape = this._closeByEscape.bind(this);
    this._closeByClick = this._closeByClick.bind(this);
  }

  open() {
    this.popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._closeByEscape);
  }

  close() {
    this.popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._closeByEscape);
  }

  _closeByEscape(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _closeByClick(evt) {
    if (evt.target === this.popup || evt.target.classList.contains('popup__close-button')) {
      this.close();
    }
  }

  setEventListeners() {
    this.popup.addEventListener('click', this._closeByClick);
  }
}
