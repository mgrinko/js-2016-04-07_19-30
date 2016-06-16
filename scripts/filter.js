'use strict';

class Filter {
  constructor(options) {
    this._el = options.element;
    this._field = this._el.querySelector('[data-element="filterField"]');

    this._field.addEventListener('input', this._onFieldValueChange.bind(this));
  }

  getElement() {
    return this._el;
  }

  _onFieldValueChange(event) {
    this._triggerValueChangedEvent();
  }

  _triggerValueChangedEvent() {
    let event = new CustomEvent("valueChanged", {
      detail: this._field.value
    });

    this._el.dispatchEvent(event);
  }
}

module.exports = Filter;