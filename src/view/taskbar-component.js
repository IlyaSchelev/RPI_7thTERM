import {createElement} from '../framework/render.js';
import ListTaskComponent from './list-task-component.js'; // Импортируем ListTaskComponent

function createTaskBarComponentTemplate() {
    return (
        `<ul class="task-bar">
        </ul>`
    );
}

export default class TaskBarComponent {
    getTemplate() {
        return createTaskBarComponentTemplate();
    }

    getElement() {
        if (!this.element) {
            this.element = createElement(this.getTemplate());
            this.renderLists(); 
        }
        return this.element;
    }

    renderLists() {
        for (let i = 0; i < 4; i++) {
            const listTaskComponent = new ListTaskComponent();
            this.element.append(listTaskComponent.getElement()); 
        }
    }

    removeElement() {
        this.element = null;
    }
}
