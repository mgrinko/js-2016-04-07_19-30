'use strict';

const CLASSES = {
  hidden: 'js-hidden'
};
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

  hide() {
    this._el.classList.add(CLASSES.hidden);
  }

  show() {
    this._el.classList.remove(CLASSES.hidden);
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