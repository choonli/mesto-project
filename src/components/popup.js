export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._closeByEscape = this._closeByEscape.bind(this);
    this._closeByOverlay = this._closeByOverlay.bind(this);
  }

  open() {
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', this._closeByEscape);
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._closeByEscape);
  }

  _closeByEscape(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _closeByOverlay(evt) {
    if (evt.target === this._popupSelector || evt.target.classList.contains('popup__close-button')) {
      this.close();
    }
  }

  setEventListeners() {
    this._popupSelector.querySelector('.popup__close-button').addEventListener('click', () => this.close());

    this._popupSelector.addEventListener('click', this._closeByOverlay);
  }
}