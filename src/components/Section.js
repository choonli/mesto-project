export default class Section {
  constructor({items, renderer}, containerSelector) {
    this.container = document.querySelector(containerSelector);
    this.items = items;
    this.renderer = renderer;
  }

  renderItems(items) {
    items.reverse().forEach(item => {
      this.renderer(item);  
    });
  }

  addItem(element) {
    this.container.prepend(element);
  }
}