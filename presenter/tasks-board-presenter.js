import TasksListComponent from '../view/list-task-component.js';
import TaskBoardComponent from '../view/taskbar-component.js';
import { Status, StatusLabel } from '../const.js';
import { render } from '../framework/render.js';
import TasksModel from '../model/tasks-model.js';
import TaskPresenter from './task-presenter.js'; 

export default class TasksBoardPresenter {
    #boardContainer;
    #tasksModel;
    #boardTasks;
    #tasksBoardComponent = new TaskBoardComponent();
    #taskPresenters = new Map(); 
    
    constructor({ boardContainer, tasksModel }) {
        this.#boardContainer = boardContainer;
        this.#tasksModel = tasksModel;
        this.#tasksModel.addObserver(this.#handleModelChange.bind(this));
    }

    #handleModelChange() {
        this.#clearBoard();
        this.#renderTasksList();
    }

    #clearBoard() {
        this.#tasksBoardComponent.element.innerHTML = '';
    }


    createTask(title) {
        if (!title) {
            return;
        }

        
        const newTask = this.#tasksModel.addTask(title);

        
        this.init();
    }

    init() {
        this.#boardTasks = [...this.#tasksModel.getTasks()];
    
        render(this.#tasksBoardComponent, this.#boardContainer);
    
        // Рендерим все статусы, кроме "корзины"
        Object.values(Status).forEach((status) => {
            if (status !== Status.TRASH) {
                this.#renderTasksList(status);
            }
        });
    
        // Отдельно рендерим "корзину"
        this.#renderTrashList();
    }
    

    #renderTasksList(status) {
        if (!status || !StatusLabel[status]) return;
    
        let statusContainer = this.#tasksBoardComponent.element.querySelector(`.${status}`);
        if (!statusContainer) {
            statusContainer = document.createElement('li');
            statusContainer.className = `column ${status}`;
            this.#tasksBoardComponent.element.appendChild(statusContainer);
        }
        
        const tasksByStatus = this.#boardTasks.filter(task => task.status === status);
        const hasTasks = tasksByStatus.length > 0;
    
        const tasksListComponent = new TasksListComponent({
            status,
            title: StatusLabel[status],
            hasTasks,
            onTaskDrop: this.#handleTaskDrop.bind(this)
        });
    
        
        statusContainer.innerHTML = '';
        render(tasksListComponent, statusContainer); 
    
        if (hasTasks) {
            tasksByStatus.forEach(task => {
                this.#renderTask(task, tasksListComponent.element.querySelector('.task-list'));
            });
        }
    }
    
    

    #handleTaskDrop(taskId, newStatus) {
        this.#tasksModel.updateTaskStatus(taskId, newStatus);
        this.#clearBoard();
        this.#renderAllTasksLists(); 
    }

    #renderAllTasksLists() {
        Object.keys(StatusLabel).forEach((status) => this.#renderTasksList(status));
    }

    
    

    #renderTask(task, container) {
        const taskPresenter = new TaskPresenter({ taskContainer: container, task });
        taskPresenter.init();

        this.#taskPresenters.set(task.id, taskPresenter);
    }

    #renderTrashList() {
        let trashContainer = this.#tasksBoardComponent.element.querySelector(`.${Status.TRASH}`);
        if (!trashContainer) {
            trashContainer = document.createElement('li');
            trashContainer.className = `column ${Status.TRASH}`;
            this.#tasksBoardComponent.element.appendChild(trashContainer);
        }
    
        const tasksByStatus = this.#boardTasks.filter(task => task.status === Status.TRASH);
        const hasTasks = tasksByStatus.length > 0;
    
        const tasksListComponent = new TasksListComponent({
            status: Status.TRASH,
            title: StatusLabel[Status.TRASH],
            hasTasks
        });
    
        trashContainer.innerHTML = ''; // Очищаем контейнер перед рендерингом
        render(tasksListComponent, trashContainer); // Рендерим компонент корзины
    
        if (hasTasks) {
            tasksByStatus.forEach(task => {
                this.#renderTask(task, tasksListComponent.element.querySelector('.task-list'));
            });
        }
    }
    

    
}
