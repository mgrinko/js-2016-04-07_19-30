'use strict';

const CLASSES = {
  hidden: 'js-hidden'
};
const compiledTemplate = require('./../templates/phoneViewer.hbs');

class Viewer {
  constructor(options) {
    this._el = options.element;
    this._el.addEventListener('click', this._onBackButtonClick.bind(this));
  }

  hide() {
    this._el.classList.add(CLASSES.hidden);
  }

  show() {
    this._el.classList.remove(CLASSES.hidden);
  }

  render(phoneDetails) {
    compiledTemplate(phoneDetails);
  }

  getElement() {
    return this._el;
  }

  _onBackButtonClick(event) {
    if (!event.target.closest('[data-element="backButton"]')) {
      return;
    }

    this._triggerBackEvent();
  }

  _triggerBackEvent() {
    let event = new CustomEvent('back');

    this._el.dispatchEvent(event);
  }
}

module.exports = Viewer;