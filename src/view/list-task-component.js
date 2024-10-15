import { createElement } from '../framework/render.js';

function createListTaskComponentTemplate(status, title) {
    return (
        `<li class="column ${status}">
          <h2 class="task">${title}</h2> 
          <ul class="task-list">
          </ul>
        </li>`
    );
}

export default class ListTaskComponent {
    constructor({ status, title }) {
        this.status = status;
        this.title = title;  // Заголовок передается при создании
    }

    getTemplate() {
        // Используем заголовок и статус для создания корректной структуры
        return createListTaskComponentTemplate(this.status, this.title);
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
