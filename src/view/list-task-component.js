import {createElement} from '../framework/render.js';
import TaskComponent from './task-component.js'; // Импортируем TaskComponent

function createListTaskComponentTemplate() {
    return (
        `<li class="column backlog">
          <h2 class="backlog">Бэклог</h2>
          <ul class="task-list">
          </ul>
        </li>`
    );
}

export default class ListTaskComponent {
    getTemplate() {
        return createListTaskComponentTemplate();
    }

    getElement() {
        if (!this.element) {
            this.element = createElement(this.getTemplate());
            this.renderTasks(); 
        }
        return this.element;
    }

    renderTasks() {
        const taskListElement = this.element.querySelector('.task-list');
        for (let i = 0; i < 4; i++) {
            const taskComponent = new TaskComponent();
            taskListElement.append(taskComponent.getElement());
        }
    }

    removeElement() {
        this.element = null;
    }
}
