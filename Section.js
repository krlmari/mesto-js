export default class Section {
  constructor({ renderer }, selectorConteiner) {
    this._renderer = renderer;
    this._selectorConteiner = document.querySelector(selectorConteiner);
  }

  renderer(items) {
    items.reverse().forEach((item) => this._renderer(item));
  }

  addItem(element) {
    this._selectorConteiner.prepend(element);
  }
}
