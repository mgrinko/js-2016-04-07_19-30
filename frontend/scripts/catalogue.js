'use strict';

let BaseComponent = require('./baseComponent.js');

const compiledTemplate = require('./../templates/phoneCatalogue.hbs');

class Catalogue extends BaseComponent {
  constructor(options) {
    super(options.element);

    this._onPhoneClick = this._onPhoneClick.bind(this);
    this._onPhoneMouseLeave = this._onPhoneMouseLeave.bind(this);

    this._el.addEventListener('click', this._onPhoneClick);
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