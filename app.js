'use strict';

var images = [
  'https://js.cx/carousel/1.png',
  'https://js.cx/carousel/2.png',
  'https://js.cx/carousel/3.png',
  'https://js.cx/carousel/4.png',
  'https://js.cx/carousel/5.png',
  'https://js.cx/carousel/6.png',
  'https://js.cx/carousel/7.png',
  'https://js.cx/carousel/8.png',
  'https://js.cx/carousel/9.png',
  'https://js.cx/carousel/10.png'
];

class Carousel {
  constructor(options) {
    this._el = options.el;
    this._images = options.images;
    this._showCount = options.showCount;

    this._imageWidth = 130;
    this._position = 0;

    this._render(this._images);

    this._list = this._el.querySelector('.images');

    this._el.querySelector('.prev').onclick = this._onPrevClick.bind(this);
    this._el.querySelector('.next').onclick = this._onNextClick.bind(this);
  }

  _onPrevClick(event) {
    this._position = Math.min(this._position + this._imageWidth * this._showCount, 0)
    this._list.style.marginLeft = this._position + 'px';
  }

  _onNextClick(event) {
    this._position = Math.max(this._position - this._imageWidth * this._showCount, - this._imageWidth * (this._images.length - this._showCount));
    this._list.style.marginLeft = this._position + 'px';
  }

  _render(images) {
    var itemsHTML = images.map(this._createItemHtml).join('');

    this._el.classList.add('carousel');
    var test = '<div>' + itemsHTML + '</div>';
    this._el.innerHTML = `
        <button class="arrow prev">⇦</button>
        <div class="gallery">
          <ul class="images">${itemsHTML}</ul>
        </div>
        <button class="arrow next">⇨</button>
      `;

    this._el.querySelector('.gallery').style.width = this._imageWidth * this._showCount + 'px';
  }

  _createItemHtml(link) {
    return `<li><img src="${link}"></li>`;
  }
}

new Carousel({
  el: document.getElementById('carousel'),
  images: images,
  showCount: 2
});

new Carousel({
  el: document.getElementById('carousel1'),
  images: images,
  showCount: 3
});

new Carousel({
  el: document.getElementById('carousel2'),
  images: images,
  showCount: 4
});