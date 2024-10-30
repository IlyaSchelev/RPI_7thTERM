import TaskComponent from '../view/task-component.js';
import { render } from '../framework/render.js';

export default class TaskPresenter {
    #taskContainer;
    #task;
    #taskComponent;

    constructor({ taskContainer, task }) {
        this.#taskContainer = taskContainer;
        this.#task = task;
    }

    init() {
        this.#taskComponent = new TaskComponent({ task: this.#task });

        // Рендерим компонент задачи
        render(this.#taskComponent, this.#taskContainer);
    }

    
    
}
