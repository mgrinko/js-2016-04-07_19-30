'use strict';

let BaseComponent = require('./baseComponent.js');

class Filter extends BaseComponent {
  constructor(options) {
    super(options.element);

    this._field = this._el.querySelector('[data-element="filterField"]');

    this._field.addEventListener('input', this._onFieldValueChange.bind(this));
  }

  getValue() {
    return this._field.value;
  }

  _onFieldValueChange(event) {
    this._triggerValueChangedEvent();
  }

  _triggerValueChangedEvent() {
    let event = new CustomEvent('valueChanged', {
      detail: this.getValue()
    });

    this._el.dispatchEvent(event);
  }
}

module.exports = Filter;