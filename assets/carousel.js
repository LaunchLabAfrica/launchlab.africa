(function (){
  var SimpleCarousel = function(id, options) {
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
    }, 4000);
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
})()
