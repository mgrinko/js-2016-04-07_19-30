'use strict';

const CLASSES = {
  hidden: 'js-hidden'
};
const compiledTemplate = require('./../templates/phoneCatalogue.hbs');

class Catalogue {
  constructor(options) {
    this._el = options.element;

    this._onPhoneClick = this._onPhoneClick.bind(this);
    this._onPhoneMouseLeave = this._onPhoneMouseLeave.bind(this);

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

    this._phoneElement = event.target.closest('[data-element="phone"]');

    this._triggerPhoneSelectedEvent(this._phoneElement.dataset.phoneId);

    this._phoneElement.onmouseleave = this._onPhoneMouseLeave;
  }

  _onPhoneMouseLeave() {
    let event = new CustomEvent("mouseHasLeft");

    this._el.dispatchEvent(event);

    this._phoneElement.onmouseleave = null;
  }

  _triggerPhoneSelectedEvent(phoneId) {
    let event = new CustomEvent("phoneSelected", {
      detail: phoneId
    });

    this._el.dispatchEvent(event);
  }
}

module.exports = Catalogue;