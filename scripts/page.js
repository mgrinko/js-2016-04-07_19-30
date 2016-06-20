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
    this._sendRequest({
      url: '/server/data/phones.json',
      success: this._renderPhones.bind(this, pattern.toLowerCase())
    });
  }

  _renderPhones(pattern, phones) {
    phones = phones.filter(function(phone) {
      let lowerPhoneName = phone.name.toLowerCase();

      return lowerPhoneName.indexOf(pattern) !== -1;
    });

    this._phones = phones;

    this._catalogue.render(this._phones);
  }

  _onPhonesSelected(event) {
    let phoneId = event.detail;

    this._sendRequest({
      url: `/server/data/phones/${phoneId}.json`,
      success: this._showSelectedPhone.bind(this)
    });
  }

  _showSelectedPhone(phoneDetails) {
    this._viewer.render(phoneDetails);
    this._catalogue.hide();
    this._viewer.show();
  }

  _onValueChanged(event) {
    let phones = this._loadPhonesByPattern(event.detail);

    this._catalogue.render(phones);
  }

  _sendRequest({ url, method = 'GET', success, error = console.error }) {
    var xhr = new XMLHttpRequest();

    xhr.open(method, url, true);

    xhr.send();

    xhr.onload = function() {
      if (xhr.status === 200) {
        var data = JSON.parse(xhr.responseText);

        success(data);
      } else {
        error(new Error(xhr.status + ':' + xhr.statusText));
      }
    };

    xhr.onerror = function() {
      error(new Error(xhr.status + ':' + xhr.statusText));
    };
  }
}

module.exports = Page;