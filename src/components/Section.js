export default class Section {
	constructor({ items, renderer }, selectorConteiner) {
		this._items = items;
		this._renderer = renderer;
		this._selectorConteiner = document.querySelector(selectorConteiner);
	}

	renderItems() {
		this._items.reverse().forEach((item) => this._renderer(item));
	}

	addItem(element) {
		this._selectorConteiner.prepend(element);
	}
}
