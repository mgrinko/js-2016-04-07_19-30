'use strict';

const catalogueTemplate = require('raw!./../templates/phoneCatalogue.html');
const compiledTemplate = require('./../templates/phoneCatalogue.hbs');

class Catalogue {
  constructor(options) {
    this._el = options.element;

    this._el.addEventListener('click', this._onPhoneClick.bind(this))
  }

  getElement() {
    return this._el;
  }

  render(arrayOfPhones) {
    this._el.innerHTML = compiledTemplate({
      phones: arrayOfPhones
    });
  }

  _onPhoneClick(event) {
    if (!event.target.closest('[data-element="phoneLink"]')) {
      return;
    }

    let phoneElement = event.target.closest('[data-element="phone"]');

    this._triggerPhoneSelectedEvent(phoneElement.dataset.phoneId);
  }

  _triggerPhoneSelectedEvent(phoneId) {
    let event = new CustomEvent("phoneSelected", {
      detail: phoneId
    });

    this._el.dispatchEvent(event);
  }


}

module.exports = Catalogue;