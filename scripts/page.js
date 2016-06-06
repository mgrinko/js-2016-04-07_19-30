'use strict';

class Page {
  constructor(options) {
    this._el = options.element;

    this._filter = new Filter();
    this._sorter = new Sorter();
    this._catalogue = new Catalogue();
    this._view = new Viewer();


  }
}