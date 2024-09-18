import {createElement} from '../framework/render.js';


function createListTaskComponentTemplate() {
    return (
        ``
      );
}


export default class ListTaskComponent {
  getTemplate() {
    return createListTaskComponentTemplate();
  }


  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }


    return this.element;
  }


  removeElement() {
    this.element = null;
  }
}
