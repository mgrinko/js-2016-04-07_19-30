'use strict';

let Filter = require('./filter.js');
let Sorter = require('./sorter.js');
let Catalogue = require('./catalogue.js');
let Viewer = require('./viewer.js');

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

    this._loadPhones()
      .then(this._showPhones.bind(this));

    this._catalogue.on('phoneSelected', this._onPhonesSelected.bind(this));

    this._viewer.on('back', this._onBackToCatalogue.bind(this));

    this._filter.on('valueChanged', this._onFilterValueChanged.bind(this));
  }


  _onPhonesSelected(event) {
    let phoneId = event.detail;
    let requestPromise = this._sendRequest(`/data/phones/${phoneId}.json`);
    let mouseHasLeftPromise = this._createMouseHasLeftPromise();

    mouseHasLeftPromise
      .then(() => requestPromise)
      .then(this._showSelectedPhone.bind(this));
  }

  _onFilterValueChanged(event) {
    let filterValue = event.detail;

    this._loadPhones(filterValue)
      .then(this._showPhones.bind(this));
  }

  _onBackToCatalogue() {
    this._loadPhones(this._filter.getValue())
      .then(this._showPhones.bind(this));
  }

  _createMouseHasLeftPromise() {
    return new Promise((resolve, reject) => {
      this._catalogue.on('mouseHasLeft', () => { resolve() });
    });
  }

  _loadPhones(filterValue = '') {
    return this._sendRequest('/data/phones.json')
      .then(function(phones) {
        return filterPhones(phones, filterValue.toLowerCase());
      });

    function filterPhones(phones, pattern) {
      return phones.filter(function(phone) {
        let lowerPhoneName = phone.name.toLowerCase();

        return lowerPhoneName.indexOf(pattern) !== -1;
      });
    }
  }

  _showPhones(phones) {
    this._catalogue.render(phones);
    this._viewer.hide();
    this._catalogue.show();
  }

  _showSelectedPhone(phoneDetails) {
    this._viewer.render(phoneDetails);
    this._catalogue.hide();
    this._viewer.show();
  }

  _sendRequest(url, { method = 'GET' } = {}) {
    return fetch(url)
      .then(response => response.text())
      .then(textResponse => JSON.parse(textResponse));

    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();

      xhr.open(method, url, true);

      xhr.send();

      xhr.onload = function() {
        if (xhr.status === 200) {
          var data = JSON.parse(xhr.responseText);

          resolve(data);
        } else {
          reject(new Error(xhr.status + ':' + xhr.statusText));
        }
      };

      xhr.onerror = function() {
        reject(new Error(xhr.status + ':' + xhr.statusText));
      };
    });
  }
}

module.exports = Page;