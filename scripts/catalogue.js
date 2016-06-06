'use strict';

class Catalogue {
  constructor(options) {
    this._el = options.element;

  }

  render(phones) {
    this._el.innerHTML = 'Phone catalogue'
  }
}