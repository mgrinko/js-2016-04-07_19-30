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

  on(eventName, selector, handler) {
    if (typeof selector === 'function') {
      handler = selector;
      selector = null;
    }

    this._el.addEventListener(eventName, event => {
      if (selector && !event.target.closest(selector)) {
        return;
      }

      handler.call(this._el, event);
    });
  }

  off(eventName, handler) {
    this._el.removeEventListener(eventName, handler);
  }

  trigger(eventName, data) {
    let event = new CustomEvent(eventName, {
      detail: data
    });

    this._el.dispatchEvent(event);
  }
}

module.exports = BaseComponent;