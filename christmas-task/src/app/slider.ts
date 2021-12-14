export class Slider {
  private imgElem: HTMLElement;
  private sliderRail: HTMLElement;
  private labelEl: Element | null | undefined;
  private minImgEl: Element | null;
  private maxImgEl: Element | null;
  private valueNow: number;
  private railMin: number;
  private railWidth: number;
  private railMax: number;
  private railBorderWidth: number;
  private thumbWidth: number;
  private thumbHeight: number;
  private keyCode: Readonly<{
    left: number;
    up: number;
    right: number;
    down: number;
    pageUp: number;
    pageDown: number;
    end: number;
    home: number;
  }>;
  private dolValueNow: number | undefined;

  constructor(imgEl: HTMLElement) {
    this.imgElem = imgEl;
    this.sliderRail = imgEl.parentElement!;

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
    // console.log(`this.domNode`, this.imgElem);
    if (this.imgElem.previousElementSibling) {
      this.minImgEl = this.imgElem.previousElementSibling;

      this.railMin = parseInt(
        this.minImgEl.getAttribute('aria-valuemin') as string
      );
    } else {
      this.railMin = parseInt(
        this.imgElem.getAttribute('aria-valuemin') as string
      );
    }

    if (this.imgElem.nextElementSibling) {
      this.maxImgEl = this.imgElem.nextElementSibling;
      this.railMax = parseInt(
        this.maxImgEl.getAttribute('aria-valuemax') as string
      );
    } else {
      this.railMax = parseInt(
        this.imgElem.getAttribute('aria-valuemax') as string
      );
    }

    this.valueNow = parseInt(
      this.imgElem.getAttribute('aria-valuenow') as string
    );

    this.railWidth = parseInt(
      this.sliderRail.style.width.slice(0, -2) as string
    );

    if (this.imgElem.id === 'min-qty') {
      this.labelEl = this.imgElem.parentElement?.previousElementSibling;
    }

    if (this.imgElem.id === 'max-qty') {
      this.labelEl = this.imgElem.parentElement?.nextElementSibling;
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

  moveSliderTo(value: number) {
    var valueMax = parseInt(
      this.imgElem.getAttribute('aria-valuemax') as string
    );
    var valueMin = parseInt(
      this.imgElem.getAttribute('aria-valuemin') as string
    );

    if (value > valueMax) {
      value = valueMax;
    }

    if (value < valueMin) {
      value = valueMin;
    }

    this.valueNow = value;
    this.dolValueNow = value;

    this.imgElem.setAttribute('aria-valuenow', String(this.valueNow));
    this.imgElem.setAttribute('aria-valuetext', String(this.dolValueNow));

    if (this.minImgEl) {
      this.minImgEl.setAttribute('aria-valuemax', String(this.valueNow));
    }

    if (this.maxImgEl) {
      this.maxImgEl.setAttribute('aria-valuemin', String(this.valueNow));
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

  handleKeyDown(event: {
    keyCode: any;
    preventDefault: () => void;
    stopPropagation: () => void;
  }) {
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
  handleFocus(event: any) {
    this.imgElem.classList.add('focus');
    this.sliderRail.classList.add('focus');
  }
  handleBlur(event: any) {
    this.imgElem.classList.remove('focus');
    this.sliderRail.classList.remove('focus');
  }
  handleMouseDown(event: {
    preventDefault: () => void;
    stopPropagation: () => void;
  }) {
    var self = this;

    var handleMouseMove = function (event: {
      pageX: number;
      preventDefault: () => void;
      stopPropagation: () => void;
    }) {
      var diffX = event.pageX - self.sliderRail.offsetLeft;
      self.valueNow =
        self.railMin +
        parseInt(
          String(((self.railMax - self.railMin) * diffX) / self.railWidth)
        );
      self.moveSliderTo(self.valueNow);

      event.preventDefault();
      event.stopPropagation();
    };

    var handleMouseUp = function (event: any) {
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
