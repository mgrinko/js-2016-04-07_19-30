'use strict';

let BaseComponent = require('./baseComponent.js');

const compiledTemplate = require('./../templates/phoneViewer.hbs');

class Viewer extends BaseComponent {
  constructor(options) {
    super(options.element);

    this.on('click', '[data-element="backButton"]', this._onBackButtonClick.bind(this));
  }

  render(phoneDetails) {
    this._el.innerHTML = compiledTemplate(phoneDetails);
  }

  _onBackButtonClick(event) {
    this._triggerBackEvent();
  }

  _triggerBackEvent() {
    let event = new CustomEvent('back');

    this._el.dispatchEvent(event);
  }
}

module.exports = Viewer;