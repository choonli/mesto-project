export default class FormValidation {
  constructor(config, formElement) {
    this.formElement = formElement;
    this.inputSelector = config.inputSelector;
    this.fieldsetSelector = config.fieldsetSelector;
    this.submitButtonSelector = config.submitButtonSelector;
    this.inactiveButtonClass = config.inactiveButtonClass;
    this.inputErrorClass = config.inputErrorClass;
    this.errorClass = config.errorClass;
    this.inputList = Array.from(this.formElement.querySelectorAll(this.inputSelector));
    this._buttonElement = this.formElement.querySelector(this.submitButtonSelector);
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this.formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this.errorClass);
  }

  _hideInputError(inputElement, errorMessage) {
    const errorElement = this.formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this.errorClass);
  }
  
  _checkInputValidity(inputElement) {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity("");
    }
  
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  _disableButton(_buttonElement) {
    this._buttonElement.classList.add(this.inactiveButtonClass);
    this._buttonElement.disabled = true;
  }

  _toggleButtonState (inputList, _buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      this._disableButton;
    } else {
      this._buttonElement.disabled = false;
      this._buttonElement.classList.remove(this.inactiveButtonClass);
    }
  }

  _setEventListeners() {
    this._toggleButtonState(this.inputList, this._buttonElement);
  
    this.formElement.addEventListener('reset', () => {
      this._disableButton(this._buttonElement)
    });
  
    this.inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._toggleButtonState(this.inputList, this._buttonElement);
        this._checkInputValidity(inputElement);
      });
    });
  }

  enableValidation() {
    this.formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })

    this._setEventListeners();
  }
}