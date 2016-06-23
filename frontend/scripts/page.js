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

    this._loadPhonesAndRender();
    this._viewer.hide();


    this._catalogue.getElement()
      .addEventListener('phoneSelected', this._onPhonesSelected.bind(this));

    this._viewer.getElement()
      .addEventListener('back', this._onBackToCatalogue.bind(this));

    this._filter.getElement()
      .addEventListener('valueChanged', this._onFilterValueChanged.bind(this));
  }


  _onPhonesSelected(event) {
    let phoneId = event.detail;
    let requestPromise = this._sendRequest(`/data/phones/${phoneId}.json`);
    let mouseHasLeftPromise = this._createMouseHasLeftPromise();

    Promise.all([requestPromise, mouseHasLeftPromise])
      .then(function(results) {
        this._showSelectedPhone(results[0]);
      }.bind(this))
      .catch(function(error) {
        console.error(error);
      });
  }

  _createMouseHasLeftPromise() {
    return new Promise(function(resolve, reject) {

      this._catalogue.getElement()
        .addEventListener('mouseHasLeft', function() {
          resolve();
        }.bind(this));


    }.bind(this));
  }

  _onBackToCatalogue() {
    this._loadPhonesAndRender(this._filter.getValue());
    this._viewer.hide();
  }

  _loadPhonesAndRender(filterValue = '') {
    this._sendRequest('/data/phones.json')
      .then(function(phones) {
        // ToDo: can be removed after server side fix
        phones = filterPhones(phones, filterValue.toLowerCase());

        this._catalogue.render(phones);
      }.bind(this));

    function filterPhones(phones, pattern) {
      return phones.filter(function(phone) {
        let lowerPhoneName = phone.name.toLowerCase();

        return lowerPhoneName.indexOf(pattern) !== -1;
      });
    }
  }

  _showSelectedPhone(phoneDetails) {
    this._viewer.render(phoneDetails);
    this._catalogue.hide();
    this._viewer.show();
  }

  _onFilterValueChanged(event) {
    let filterValue = event.detail;

    this._loadPhonesAndRender(filterValue);
  }

  _sendRequest(url, { method = 'GET' } = {}) {
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