import { AbstractComponent } from '../framework/view/abstract-component.js';

function createListTaskComponentTemplate(status, title) {
    return (
        `<li class="column ${status}">
          <h2 class="task">${title}</h2> 
          <ul class="task-list">
          </ul>
        </li>`
    );
}

export default class ListTaskComponent extends AbstractComponent {
    constructor({ status, title }) {
        // Вызов родительского конструктора
        super();
        this.status = status;
        this.title = title;  // Заголовок передается при создании
    }

    get template() {
        // Используем заголовок и статус для создания корректной структуры
        return createListTaskComponentTemplate(this.status, this.title);
    }
}
