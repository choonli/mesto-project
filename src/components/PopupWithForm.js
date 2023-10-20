import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this.submitCallback = submitCallback;
    this.formElement = this.popup.querySelector('.popup__form');
    this.submitBtn = this.formElement.querySelector('.popup__submit-button');
    this.inputs = this.formElement.querySelectorAll('.popup__input')
  }

  _getInputValues() {
    const inputValues = {};

    this.inputs.forEach((input) => {
      inputValues[input.name] = input.value;      
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this.formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.submitCallback(this._getInputValues());
    })
  }

  close() {
    super.close();
    this.formElement.reset();
  }

  renderLoading(text) {
    this.submitBtn.textContent = text;
  }
}