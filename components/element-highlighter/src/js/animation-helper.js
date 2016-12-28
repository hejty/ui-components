function onTransitionEnd(element, callback) {
  element.addEventListener('transitionend', function onEnd(e) {
    if (e.target !== element) {
      return;
    }

    element.removeEventListener('transitionend', onEnd);

    if (typeof callback === 'function') {
      callback();
    }
  });
}

export {
  onTransitionEnd
};
