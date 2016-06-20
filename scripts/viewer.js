'use strict';

const CLASSES = {
  hidden: 'js-hidden'
};
const compiledTemplate = require('./../templates/phoneViewer.hbs');

class Viewer {
  constructor(options) {
    this._el = options.element;

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
}

module.exports = Viewer;