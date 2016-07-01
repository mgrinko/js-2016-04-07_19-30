'use strict';

const CLASSES = {
  hidden: 'js-hidden'
};

class BaseComponent {
  constructor(el) {
    this._el = el;
  }

  getElement() {
    return this._el;
  }

  hide() {
    this._el.classList.add(CLASSES.hidden);
  }

  show() {
    this._el.classList.remove(CLASSES.hidden);
  }
}

module.exports = BaseComponent;