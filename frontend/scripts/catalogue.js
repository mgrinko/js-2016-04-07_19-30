'use strict';

let BaseComponent = require('./baseComponent.js');

const compiledTemplate = require('./../templates/phoneCatalogue.hbs');

class Catalogue extends BaseComponent {
  constructor(options) {
    super(options.element);

    this._onPhoneClick = this._onPhoneClick.bind(this);
    this._onPhoneMouseLeave = this._onPhoneMouseLeave.bind(this);

    this.on('click', '[data-element="phoneLink"]', this._onPhoneClick);
  }

  render(phones) {
    this._el.innerHTML = compiledTemplate({
      phones: phones
    });
  }

  _onPhoneClick(event) {
    this._phoneElement = event.target.closest('[data-element="phone"]');

    this.trigger('phoneSelected', this._phoneElement.dataset.phoneId);

    this._phoneElement.onmouseleave = this._onPhoneMouseLeave;
  }

  _onPhoneMouseLeave() {
    this.trigger('mouseHasLeft');

    this._phoneElement.onmouseleave = null;
  }
}

module.exports = Catalogue;