import { AbstractComponent } from '../framework/view/abstract-component.js';

function createListTaskComponentTemplate(status, title, hasTasks) {
    return (
        `<li class="column ${status}">
            <h2 class="task">${title}</h2>
            <ul class="task-list">
                ${hasTasks ? '' : '<li class="task-placeholder">Перетащите карточку</li>'}
            </ul>
        </li>`
    );
}

export default class ListTaskComponent extends AbstractComponent {
    constructor({ status, title, hasTasks, onTaskDrop }) {
        super();
        this.status = status;
        this.title = title;
        this.hasTasks = hasTasks;
        this.#setDropHandler(onTaskDrop);
    }

    get template() {
        return createListTaskComponentTemplate(this.status, this.title, this.hasTasks);
    }

    #setDropHandler(onTaskDrop) {
        const container = this.element;

        container.addEventListener('dragover', (event) => {
            event.preventDefault();
        });

        container.addEventListener('drop', (event) => {
            event.preventDefault();
            const taskId = event.dataTransfer.getData('text/plain');
            onTaskDrop(taskId, this.status);
        });

    }

}
