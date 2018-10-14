const SimpleCarousel = function(id, options) {
  this.id = id || 'simple-carousel';
  this.class = options.class || 'item';
  this.w = options.width;
  this.height = options.height;
  this.duration = options.duration || 4000;

  this.container = document.getElementById(this.id);
  this.carouselItems = document.getElementsByClassName(this.class);
  this.items = this.carouselItems;
  this._init()
}

SimpleCarousel.prototype._init = function () {
  var self = this;
  setInterval(function() {
    self.switch();
  }, self.duration);
}

SimpleCarousel.prototype.switch = function () {
  var self = this;
  var items = self.items;

  var activeItem = getActiveItem(self.items);
  var nextItem = next(activeItem, self.items.length);

  self.items[activeItem].style.display = 'none';
  self.items[nextItem].style.display = 'table';

  function getActiveItem() {
    activeItem = -1;

    for (var i = 0; i < self.items.length; i++) {
      if (self.items[i].style.display === 'table') {
        activeItem = i;
      }
    }

    return activeItem;
  }

  function prev(num, length) {
    if (num === 0) return length - 1;
    else return num - 1;
  }

  function next(num, length) {
    if(num === length - 1) return 0;
    else return num + 1;
  }
}

const loadCarousel = function () {
  new SimpleCarousel('testimonials', {class: 'testimonial', duration: 4000 })
}

const loadFullPage = function(element) {
  new fullpage('#fullpage', {
    licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
    sectionsColor: ['#000', '#fff', 'whitesmoke', '#000'],
    anchors: ['welcome', 'ready', 'set', 'launch', '<3'],
    sectionsSelector: '.section',
    responsiveHeight: 0,
    navigation: true,
    offsetSections: true,
    afterRender: function () {
      element.classList.remove('hidden')
    },
    afterLoad: function(origin, destination, direction) {
      if (!origin) return
      if (origin.index === 3 && direction === 'down') {
        fullpage_api.setAutoScrolling(false);
      }
    },
    onLeave: function (origin, destination, direction) {
      if (!origin) return
      if (origin.index === 4 && direction === 'up') {
        fullpage_api.setAutoScrolling(true);
      }
    }
  })
}

const showProgressIndicator = () => {
  const scroll = document.body.scrollTop || document.documentElement.scrollTop
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
  const scrolled = (scroll/height)
  document.getElementsByTagName('progress')[0].setAttribute('value', scrolled);
}

const app = () => {
  const fullpage = document.getElementById('fullpage')
  const carousel = document.getElementById('testimonials')
  if (fullpage) loadFullPage(fullpage)
  if (carousel) loadCarousel();
}

/**
 * Onload
 */
window.onload = () => app()
/*
  * Progress bar
  */
window.onscroll = () => showProgressIndicator()

