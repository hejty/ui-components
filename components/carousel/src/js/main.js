class Carousel {
  constructor({element, slideChangeCallback = null}) {
    this.root = element;
    this.slider = this.root.querySelector('.carousel__slider');

    this._slideChangeCallback = slideChangeCallback;

    this.slider.style.width = `${this.slidesLength * 100}%`;

    this.sliderWidth = this.slider.getBoundingClientRect().width;
    this.slidesLength = this.slider.children.length;
    this.currentIndex = 1;
    this.lastSlideTranslateX = 0;
    this.currentSlideTranslateX = 0;

    this._onStart = this._onStart.bind(this);
    this._onMove = this._onMove.bind(this);
    this._onEnd = this._onEnd.bind(this);
    this._update = this._update.bind(this);

    this.enableDragging();

    window.addEventListener('resize', this._updateSliderWidth.bind(this));
  }

  next() {
    if (this._isLastSlide()) {
      this.goTo(this.currentIndex);
    } else {
      this.currentIndex++;
      this._animate();
    }
  }


  prev() {
    if (this._isFirstSlide()) {
      this.goTo(this.currentIndex);
    } else {
      this.currentIndex--;
      this._animate();
    }
  }

  goTo(index) {
    this.currentIndex = index;
    this._animate();
  }

  enableDragging() {
    this.root.addEventListener('touchstart', this._onStart);
    this.root.addEventListener('touchmove', this._onMove);
    this.root.addEventListener('touchend', this._onEnd);
    this.root.addEventListener('touchcancel', this._onEnd);

    this.root.addEventListener('mousedown', this._onStart);
    this.root.addEventListener('mousemove', this._onMove);
    document.addEventListener('mouseup', this._onEnd);
  }

  disableDragging() {
    // if slide is currently being dragged, let it go
    this._onEnd();

    this.root.removeEventListener('touchstart', this._onStart);
    this.root.removeEventListener('touchmove', this._onMove);
    this.root.removeEventListener('touchend', this._onEnd);
    this.root.removeEventListener('touchcancel', this._onEnd);

    this.root.removeEventListener('mousedown', this._onStart);
    this.root.removeEventListener('mousemove', this._onMove);
    document.removeEventListener('mouseup', this._onEnd);
  }

  _onStart(event) {
    this.startX = event.pageX || event.touches[0].pageX;
    this.currentX = this.startX;
    this.rafId = requestAnimationFrame(this._update);
  }

  _onMove(event) {
    if (event.pageX !== undefined) {
      this.currentX = event.pageX;
    } else {
      this.currentX = event.touches[0].pageX;
    }
    event.preventDefault();
  }

  _onEnd() {
    this.slider.style.transition = '';

    let index = Math.round(-this.currentSlideTranslateX/ 100) + 1;

    index = Math.max(1, index);
    index = Math.min(index, this.slidesLength);

    const hasIndexChanged = index !== this.currentIndex;

    this.goTo(index);

    this.lastSlideTranslateX = ((this.currentIndex - 1) * 100);

    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }

    if (hasIndexChanged && typeof this._slideChangeCallback === 'function') {
      this._slideChangeCallback(this, this.currentIndex);
    }
  }

  _update() {
    this.rafId = requestAnimationFrame(this._update);

    const screenX = this.currentX - this.startX;

    this.currentSlideTranslateX = (screenX / (this.sliderWidth) * 100) - this.lastSlideTranslateX;

    this.slider.style.transition = 'initial';
    this.slider.style.transform = `translateX(${(this.currentSlideTranslateX)}%)`;
  }

  _updateSliderWidth() {
    this.sliderWidth = this.slider.getBoundingClientRect().width;
  }

  _isLastSlide() {
    return this.currentIndex === this.slidesLength;
  }

  _isFirstSlide() {
    return this.currentIndex === 1;
  }

  _animate() {
    this.slider.style.transform = `translateX(${ - (this.currentIndex - 1) * 100}%)`;
  }
}

export default Carousel;
