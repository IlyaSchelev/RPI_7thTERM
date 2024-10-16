// header-component.js

import { AbstractComponent } from '../framework/view/abstract-component.js';

function createHeaderComponentTemplate() {
  return `<header> <h1>Список задач</h1> </header>`;
}

export default class HeaderComponent extends AbstractComponent {
  // Переименован метод getTemplate в template
  get template() {
    return createHeaderComponentTemplate();
  }
}
