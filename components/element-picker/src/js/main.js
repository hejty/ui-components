import {onTransitionEnd} from './animation-helper';

class ElementPicker {
  constructor({element, container}) {
    this.element = element;
    this.container = container;
    this.shown = false;
    this.placeholder = null;
  }

  hide(callback) {
    if (!this.shown) {
      if (typeof callback === 'function') {
        callback();
      }

      return;
    }

    onTransitionEnd(this.container, () => {
      // move element to its original place and remove placeholder
      const container = this.element.parentNode;
      container.parentNode.removeChild(container);

      const elementParent = this.placeholder.parentNode;
      elementParent.replaceChild(this.element, this.placeholder);

      this.container.style.transition = '';

      // update status
      this.placeholder = null;
      this.shown = false;

      if (typeof callback === 'function') {
        callback();
      }
    });

    // content fade in animation
    this.container.style.filter = '';
  }

  show(callback) {
    if (this.shown) {
      return;
    }

    // move element outside the content and leave a placeholder
    const elementParent = this.element.parentNode;
    const bcr = this.element.getBoundingClientRect();
    const elementStyles = window.getComputedStyle(this.element);
    const placeholder = document.createElement('div');

    placeholder.style.width = bcr.width + 'px';
    placeholder.style.height = bcr.height + 'px';
    placeholder.style.margin = elementStyles.margin;

    elementParent.replaceChild(placeholder, this.element);

    const newContainer = document.createElement('div');

    newContainer.style.width = bcr.width + 'px';
    newContainer.style.height = bcr.height + 'px';
    newContainer.style.left = bcr.left + 'px';
    newContainer.style.top = bcr.top + 'px';
    newContainer.style.position = 'absolute';
    newContainer.style.zIndex = '101';

    newContainer.appendChild(this.element);

    document.body.appendChild(newContainer);

    // content fade out animation
    if (typeof callback === 'function') {
      onTransitionEnd(this.container, callback);
    }

    this.container.style.transition = 'filter 0.3s ease-in-out';
    this.container.style.filter = 'blur(5px)';

    // update status
    this.placeholder = placeholder;
    this.shown = true;
  }

}

export default ElementPicker;
