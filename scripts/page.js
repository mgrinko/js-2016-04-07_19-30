'use strict';

let Filter = require('./filter.js');
let Sorter = require('./sorter.js');
let Catalogue = require('./catalogue.js');
let Viewer = require('./viewer.js');

let phones = require("json!./../server/data/phones.json");

class Page {
  constructor(options) {
    this._el = options.element;
    this._phones = this._getPhonesByPattern();

    this._filter = new Filter({
      element: this._el.querySelector('[data-component="filter"]')
    });

    this._sorter = new Sorter({
      element: this._el.querySelector('[data-component="sorter"]')
    });

    this._catalogue = new Catalogue({
      element: this._el.querySelector('[data-component="phoneCatalogue"]')
    });

    this._viewer = new Viewer({
      element: this._el.querySelector('[data-component="phoneViewer"]')
    });

    this._catalogue.render(this._phones);
    this._viewer.hide();


    this._catalogue.getElement()
      .addEventListener('phoneSelected', this._onPhonesSelected.bind(this));

    this._filter.getElement()
      .addEventListener('valueChanged', this._onValueChanged.bind(this));
  }

  _getPhonesByPattern(pattern = '') {
    pattern = pattern.toLowerCase();

    return phones.filter(function(phone) {
      let lowerPhoneName = phone.name.toLowerCase();

      return lowerPhoneName.indexOf(pattern) !== -1;
    });
  }

  _onPhonesSelected(event) {
    alert(event.detail);
  }

  _onValueChanged(event) {
    let phones = this._getPhonesByPattern(event.detail);

    this._catalogue.render(phones);
  }
}

module.exports = Page;