'use strict';

const catalogueTemplate = `
  <ul class="phones">

    <% phones.forEach(function(phone) {%>

      <li class="thumbnail phone-listing" data-element="phone" data-phone-id="<%= phone.id %>">
        <a href="#/phones/<%= phone.id %>" class="thumb" data-element="phoneLink">
          <img src="<%= phone.imageUrl %>" alt="<%- phone.name %>">
        </a>
        <a href="#/phones/<%= phone.id %>" data-element="phoneLink"><%= phone.name %></a>
        <p><%- phone.snippet %></p>
      </li>

    <% }); %>
  </ul>
`;

class Catalogue {
  constructor(options) {
    this._el = options.element;

    this._el.addEventListener('click', this._onPhoneClick.bind(this))
  }

  getElement() {
    return this._el;
  }

  render(arrayOfPhones) {
    this._el.innerHTML = _.template(catalogueTemplate)({
      phones: arrayOfPhones
    });
  }

  _onPhoneClick(event) {
    if (!event.target.closest('[data-element="phoneLink"]')) {
      return;
    }

    let phoneElement = event.target.closest('[data-element="phone"]');

    this._triggerPhoneSelectedEvent(phoneElement.dataset.phoneId);
  }

  _triggerPhoneSelectedEvent(phoneId) {
    let event = new CustomEvent("phoneSelected", {
      detail: phoneId
    });

    this._el.dispatchEvent(event);
  }


}