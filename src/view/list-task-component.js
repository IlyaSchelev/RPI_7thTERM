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
    constructor({ status, title, hasTasks }) {
        super();
        this.status = status;
        this.title = title;
        this.hasTasks = hasTasks;  // Флаг для контроля наличия задач
    }

    get template() {
        return createListTaskComponentTemplate(this.status, this.title, this.hasTasks);
    }
}
