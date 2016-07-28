class FlipCard {
  constructor({element}) {
    this.element = element;
  }
  flip() {
    this.element.classList.toggle('fc-box--flipped');
  }
}

export default FlipCard;
