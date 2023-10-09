export default class FormValidation {
  constructor(config, formElement) {
    this.formElement = formElement;
    this.inputSelector = config.inputSelector;
    this.fieldsetSelector = config.fieldsetSelector;
    this.submitButtonSelector = config.submitButtonSelector;
    this.inactiveButtonClass = config.inactiveButtonClass;
    this.inputErrorClass = config.inputErrorClass;
    this.errorClass = config.errorClass;
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

  _disableButton(buttonElement) {
    buttonElement.classList.add('popup__submit-button_disabled');
    buttonElement.disabled = true;
  }

  _toggleButtonState (inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
      buttonElement.classList.add(this.inactiveButtonClass);
    } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(this.inactiveButtonClass);
    }
  }

  _setEventListeners() {
    const inputList = Array.from(this.formElement.querySelectorAll(this.inputSelector));
    const buttonElement = this.formElement.querySelector(this.submitButtonSelector);
    
    this._toggleButtonState(inputList, buttonElement);
  
    this.formElement.addEventListener('reset', () => {
      this._disableButton(buttonElement)
    });
  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._toggleButtonState(inputList, buttonElement);
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


// const showInputError = (formElement, inputElement, errorMessage, config) => {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.add(config.inputErrorClass);
//   errorElement.textContent = errorMessage;
//   errorElement.classList.add(config.errorClass);
// };

// const hideInputError = (formElement, inputElement, config) => {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.remove(config.inputErrorClass);
//   errorElement.classList.remove(config.errorClass);
//   errorElement.textContent = '';
// };

// const checkInputValidity = (formElement, inputElement, config) => {
//   if (inputElement.validity.patternMismatch) {
//     inputElement.setCustomValidity(inputElement.dataset.errorMessage);
//   } else {
//     inputElement.setCustomValidity("");
//   }

//   if (!inputElement.validity.valid) {
//     showInputError(formElement, inputElement, inputElement.validationMessage, config);
//   } else {
//     hideInputError(formElement, inputElement, config);
//   }
// };

// const setEventListeners = (formElement, config) => {
//   const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
//   const buttonElement = formElement.querySelector(config.submitButtonSelector);
  
//   toggleButtonState(inputList, buttonElement, config);

//   formElement.addEventListener('reset', () => {
//     disableButton(buttonElement, config)
//   });

//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener('input', function () {
//       toggleButtonState(inputList, buttonElement, config);
//       checkInputValidity(formElement, inputElement, config);
//     });
//   });
// };

// export function enableValidation(config) {
//   const formList = Array.from(document.querySelectorAll(config.formSelector));
//   formList.forEach((formElement) => {
//     formElement.addEventListener('submit', function (evt) {
//       evt.preventDefault();
//     });
//     setEventListeners(formElement, config);
//   });
// };

// const toggleButtonState = (inputList, buttonElement, config) => {
//   if (hasInvalidInput(inputList)) {
//     buttonElement.disabled = true;
//     buttonElement.classList.add(config.inactiveButtonClass);
//   } else {
//     buttonElement.disabled = false;
//     buttonElement.classList.remove(config.inactiveButtonClass);
//   }
// };

// const hasInvalidInput = (inputList) => {
//   return inputList.some((inputElement) => {
//     return !inputElement.validity.valid;
//   })
// };

// function disableButton(buttonElement) {
//   buttonElement.classList.add('popup__submit-button_disabled');
//   buttonElement.disabled = true;
// }
