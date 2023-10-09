export default class Section {
  constructor({items, renderer}, containerSelector) {
    this.containerSelector = document.querySelector(containerSelector);
    this.items = items;
    this.renderer = renderer;
  }

  renderItems() {
    this.items.forEach(item => {
      this.renderer(item);  
    });
  }

  addItem(element) {
    this.containerSelector.prepend(element);
  }
}