'use strict';

const compiledTemplate = require('./../templates/phoneCatalogue.hbs');

class Catalogue {
  constructor(options) {
    this._el = options.element;

    this._onPhoneClick = this._onPhoneClick.bind(this);

    this._el.addEventListener('click', this._onPhoneClick);
  }

  getElement() {
    return this._el;
  }

  render(phones) {
    this._el.innerHTML = compiledTemplate({
      phones: phones
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