'use strict';

class Viewer {
  constructor(options) {
    this._el = options.element;

  }

  hide() {
    this._el.classList.add('js-hidden');
  }

  show() {
    this._el.classList.remove('js-hidden');
  }
}

module.exports = Viewer;