import TasksListComponent from '../view/list-task-component.js';
import TaskComponent from '../view/task-component.js';
import TaskBoardComponent from '../view/taskbar-component.js';
import { Status, StatusLabel } from '../const.js';
import { render } from '../framework/render.js';

export default class TasksBoardPresenter {
    #boardContainer;
    #tasksModel;
    #boardTasks;
    #tasksBoardComponent = new TaskBoardComponent();

    constructor({ boardContainer, tasksModel }) {
        this.#boardContainer = boardContainer;
        this.#tasksModel = tasksModel;
    }

    init() {
        this.#boardTasks = [...this.#tasksModel.getTasks()];

        render(this.#tasksBoardComponent, this.#boardContainer);

        Object.values(Status).forEach((status) => {
            const tasksByStatus = this.#boardTasks.filter(task => task.status === status);
            const hasTasks = tasksByStatus.length > 0;  // Проверка наличия задач для статуса

            const tasksListComponent = new TasksListComponent({
                status,
                title: StatusLabel[status],  // Заголовок для каждого статуса
                hasTasks  // Передаем флаг наличия задач
            });

            render(tasksListComponent, this.#tasksBoardComponent.element);

            if (hasTasks) {
                tasksByStatus.forEach(task => {
                    this.#renderTask(task, tasksListComponent.element.querySelector('.task-list'));
                });
            }
        });
    }

    #renderTask(task, container) {
        const taskComponent = new TaskComponent({ task });
        render(taskComponent, container);
    }
}
