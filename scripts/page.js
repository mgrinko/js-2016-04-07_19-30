'use strict';

let Filter = require('./filter.js');
let Sorter = require('./sorter.js');
let Catalogue = require('./catalogue.js');
let Viewer = require('./viewer.js');

let phones = require("json!./../server/data/phones.json");

class Page {
  constructor(options) {
    this._el = options.element;

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

    this._loadPhonesByPattern();
    this._viewer.hide();


    this._catalogue.getElement()
      .addEventListener('phoneSelected', this._onPhonesSelected.bind(this));

    this._filter.getElement()
      .addEventListener('valueChanged', this._onValueChanged.bind(this));
  }

  _loadPhonesByPattern(pattern = '') {
    pattern = pattern.toLowerCase();

    var xhr = new XMLHttpRequest();

    xhr.open('GET', '/server/data/phones.json', true);  // async

    xhr.send();

    xhr.onload = function() {
      var phones = JSON.parse(xhr.responseText);

      phones = phones.filter(function(phone) {
        let lowerPhoneName = phone.name.toLowerCase();

        return lowerPhoneName.indexOf(pattern) !== -1;
      });

      this._renderPhones(phones);
    }.bind(this);
  }

  _renderPhones(phones) {
    this._phones = phones;

    this._catalogue.render(this._phones);
  }

  _onPhonesSelected(event) {
    let phoneId = event.detail;

    var xhr = new XMLHttpRequest();

    xhr.open('GET', `/server/data/phones/${phoneId}.json`, true);  // async

    xhr.send();

    xhr.onload = function() {
      var phoneDetails = JSON.parse(xhr.responseText);

      this._viewer.render(phoneDetails);
      this._catalogue.hide();
      this._viewer.show();
    }.bind(this);
  }

  _onValueChanged(event) {
    let phones = this._loadPhonesByPattern(event.detail);

    this._catalogue.render(phones);
  }
}

module.exports = Page;