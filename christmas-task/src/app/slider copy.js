// Create Slider that contains value, valuemin, valuemax, and valuenow
// @ts-nocheck
export class Slider {
  constructor(imgEl) {
    this.imgElem = imgEl;
    this.sliderRail = imgEl.parentElement;

    this.labelEl = null;
    this.minImgEl = null;
    this.maxImgEl = null;

    this.valueNow = 50;

    this.railMin = 0;
    this.railMax = 100;
    this.railWidth = 0;
    this.railBorderWidth = 1;

    this.thumbWidth = 20;
    this.thumbHeight = 24;

    this.keyCode = Object.freeze({
      left: 37,
      up: 38,
      right: 39,
      down: 40,
      pageUp: 33,
      pageDown: 34,
      end: 35,
      home: 36,
    });
  }
  // Initialize slider
  init() {
    if (this.imgElem.previousElementSibling) {
      console.log(
        `1 - this.domNode.previousElementSibling`,
        this.imgElem.previousElementSibling
      );
      this.minImgEl = this.imgElem.previousElementSibling;
      console.log(' - 1 - this.minDomNode  ', this.minImgEl);
      this.railMin = parseInt(this.minImgEl.getAttribute('aria-valuemin'));
    } else {
      this.railMin = parseInt(this.imgElem.getAttribute('aria-valuemin'));
    }

    if (this.imgElem.nextElementSibling) {
      console.log(
        `2 - this.domNode.nextElementSibling`,
        this.imgElem.nextElementSibling
      );
      this.maxImgEl = this.imgElem.nextElementSibling;
      console.log('  - 2 - this.maxDomNode', this.maxImgEl);
      this.railMax = parseInt(this.maxImgEl.getAttribute('aria-valuemax'));
    } else {
      this.railMax = parseInt(this.imgElem.getAttribute('aria-valuemax'));
    }

    this.valueNow = parseInt(this.imgElem.getAttribute('aria-valuenow'));

    this.railWidth = parseInt(this.sliderRail.style.width.slice(0, -2));

    if (this.imgElem.id === 'min-qty') {
      this.labelEl = this.imgElem.parentElement.previousElementSibling;
    }

    if (this.imgElem.id === 'max-qty') {
      this.labelEl = this.imgElem.parentElement.nextElementSibling;
    }

    if (this.imgElem.tabIndex != 0) {
      this.imgElem.tabIndex = 0;
    }

    this.imgElem.addEventListener('keydown', this.handleKeyDown.bind(this));
    this.imgElem.addEventListener('mousedown', this.handleMouseDown.bind(this));
    this.imgElem.addEventListener('focus', this.handleFocus.bind(this));
    this.imgElem.addEventListener('blur', this.handleBlur.bind(this));

    this.moveSliderTo(this.valueNow);
  }

  moveSliderTo(value) {
    var valueMax = parseInt(this.imgElem.getAttribute('aria-valuemax'));
    var valueMin = parseInt(this.imgElem.getAttribute('aria-valuemin'));

    if (value > valueMax) {
      value = valueMax;
    }

    if (value < valueMin) {
      value = valueMin;
    }

    this.valueNow = value;
    this.dolValueNow = value;

    this.imgElem.setAttribute('aria-valuenow', this.valueNow);
    this.imgElem.setAttribute('aria-valuetext', this.dolValueNow);

    if (this.minImgEl) {
      this.minImgEl.setAttribute('aria-valuemax', this.valueNow);
    }

    if (this.maxImgEl) {
      this.maxImgEl.setAttribute('aria-valuemin', this.valueNow);
    }

    var pos = Math.round(
      ((this.valueNow - this.railMin) *
        (this.railWidth - 2 * (this.thumbWidth - this.railBorderWidth))) /
        (this.railMax - this.railMin)
    );

    if (this.minImgEl) {
      this.imgElem.style.setProperty(
        'left',
        pos + this.thumbWidth - this.railBorderWidth + 'px'
      );
    } else {
      this.imgElem.style.setProperty('left', pos - this.railBorderWidth + 'px');
    }

    if (this.labelEl) {
      this.labelEl.innerHTML = this.dolValueNow.toString();
    }
  }

  handleKeyDown(event) {
    var flag = false;

    switch (event.keyCode) {
      case this.keyCode.left:
      case this.keyCode.down:
        this.moveSliderTo(this.valueNow - 1);
        flag = true;
        break;

      case this.keyCode.right:
      case this.keyCode.up:
        this.moveSliderTo(this.valueNow + 1);
        flag = true;
        break;

      case this.keyCode.pageDown:
        this.moveSliderTo(this.valueNow - 10);
        flag = true;
        break;

      case this.keyCode.pageUp:
        this.moveSliderTo(this.valueNow + 10);
        flag = true;
        break;

      case this.keyCode.home:
        this.moveSliderTo(this.railMin);
        flag = true;
        break;

      case this.keyCode.end:
        this.moveSliderTo(this.railMax);
        flag = true;
        break;

      default:
        break;
    }

    if (flag) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
  handleFocus(event) {
    this.imgElem.classList.add('focus');
    this.sliderRail.classList.add('focus');
  }
  handleBlur(event) {
    this.imgElem.classList.remove('focus');
    this.sliderRail.classList.remove('focus');
  }
  handleMouseDown(event) {
    var self = this;

    var handleMouseMove = function (event) {
      var diffX = event.pageX - self.sliderRail.offsetLeft;
      self.valueNow =
        self.railMin +
        parseInt(((self.railMax - self.railMin) * diffX) / self.railWidth);
      self.moveSliderTo(self.valueNow);

      event.preventDefault();
      event.stopPropagation();
    };

    var handleMouseUp = function (event) {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    // bind a mousemove event handler to move pointer
    document.addEventListener('mousemove', handleMouseMove);

    // bind a mouseup event handler to stop tracking mouse movements
    document.addEventListener('mouseup', handleMouseUp);

    event.preventDefault();
    event.stopPropagation();

    // Set focus to the clicked handle
    this.imgElem.focus();
  }
}

// handleMouseMove has the same functionality as we need for handleMouseClick on the rail
// Slider.prototype.handleClick = function (event) {

//  var diffX = event.pageX - this.railDomNode.offsetLeft;
//  this.valueNow = parseInt(((this.railMax - this.railMin) * diffX) / this.railWidth);
//  this.moveSliderTo(this.valueNow);

//  event.preventDefault();
//  event.stopPropagation();

// };

// Initialise Sliders on the page
window.addEventListener('load', function () {
  var sliderThumbs = document.querySelectorAll('.slider__thumb');

  const sliderThumbElementList = [];

  if (sliderThumbs) {
    for (let node of sliderThumbs) {
      if (node.nodeType === Node.ELEMENT_NODE) {
        sliderThumbElementList.push(node);
      }
    }
  }

  for (let thumb of sliderThumbElementList) {
    const slider = new Slider(thumb);
    slider.init();
  }
});
