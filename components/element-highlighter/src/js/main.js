import {onTransitionEnd} from './animation-helper';

const OVERLAY_CLASS = 'buic-eh-overlay';
const OVERLAY_ACTIVE_CLASS = 'buic-eh-overlay--active';
const NEW_CONTAINER_CLASS = 'buic-eh-container';

class ElementHighlighter {
  constructor({element, container}) {
    this.element = element;
    this.container = container;

    this.shown = false;
    this.placeholder = null;
    this.overlay = null;
  }

  hide(callback) {
    if (!this.shown) {
      if (typeof callback === 'function') {
        callback(null);
      }

      return;
    }

    onTransitionEnd(this.overlay, () => {
      const newContainer = this.element.parentNode;

      // move element to its original place and remove overlay
      this.placeholder.parentNode.replaceChild(this.element, this.placeholder);
      newContainer.parentNode.removeChild(newContainer);
      this.overlay.parentNode.removeChild(this.overlay);

      if (typeof callback === 'function') {
        callback(this.overlay);
      }

      // update status
      this.placeholder = null;
      this.overlay = null;
      this.shown = false;
    });

    // start animation
    this.overlay.classList.remove(OVERLAY_ACTIVE_CLASS);
  }

  show(callback) {
    if (this.shown) {
      if (typeof callback === 'function') {
        callback(null);
      }

      return;
    }

    const containerBcr = this.container.getBoundingClientRect();
    const elementBcr = this.element.getBoundingClientRect();
    const elementStyles = window.getComputedStyle(this.element);
    const elementParent = this.element.parentNode;

    // replace original position of the highlighted element with a placeholder
    const placeholder = document.createElement('div');

    placeholder.style.width = elementBcr.width + 'px';
    placeholder.style.height = elementBcr.height + 'px';
    placeholder.style.margin = elementStyles.margin;

    elementParent.replaceChild(placeholder, this.element);

    // crate an overlay
    const overlay = document.createElement('div');

    overlay.classList.add(OVERLAY_CLASS);
    overlay.style.width = containerBcr.width + 'px';
    overlay.style.height = containerBcr.height + 'px';
    overlay.style.left = containerBcr.left + 'px';
    overlay.style.top = containerBcr.top + 'px';

    // create a container for highlighted element to make sure it maintains size
    const newContainer = document.createElement('div');

    newContainer.classList.add(NEW_CONTAINER_CLASS);
    newContainer.style.width = elementBcr.width + 'px';
    newContainer.style.height = elementBcr.height + 'px';
    newContainer.style.left = elementBcr.left + 'px';
    newContainer.style.top = elementBcr.top + 'px';

    // put all elements together
    newContainer.appendChild(this.element);
    document.body.appendChild(overlay);
    document.body.appendChild(newContainer);

    // start animation
    if (typeof callback === 'function') {
      onTransitionEnd(overlay, () => callback(overlay));
    }

    overlay.getBoundingClientRect();
    overlay.classList.add(OVERLAY_ACTIVE_CLASS);

    // update status
    this.overlay = overlay;
    this.placeholder = placeholder;
    this.shown = true;
  }

}

export default ElementHighlighter;
