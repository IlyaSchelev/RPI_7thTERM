import TasksListComponent from '../view/list-task-component.js';
import TaskBoardComponent from '../view/taskbar-component.js';
import ClearButtonComponent from '../view/clear-button-component.js';
import LoadingViewComponent from '../view/loading-view-component.js';
import { Status, StatusLabel } from '../const.js';
import { render } from '../framework/render.js';
import TasksModel from '../model/tasks-model.js';
import TaskPresenter from './task-presenter.js'; 

export default class TasksBoardPresenter {
    #boardContainer;
    #tasksModel;
    #boardTasks;
    #tasksBoardComponent = new TaskBoardComponent();
    #clearButtonComponent = new ClearButtonComponent();
    #loadingComponent = new LoadingViewComponent();  // добавляем компонент загрузки
    #isLoading = true;  // изначально данные загружаются
    #taskPresenters = new Map();
    
    constructor({ boardContainer, tasksModel }) {
        this.#boardContainer = boardContainer;
        this.#tasksModel = tasksModel;
        this.#tasksModel.addObserver(this.#handleModelChange.bind(this));
    }

    #handleModelChange() {
        if (this.#isLoading) return;  // если данные еще загружаются, выходим
    
        this.#clearBoard();
        this.#renderBoard();
    }
    

    #clearBoard() {
        this.#boardContainer.innerHTML = '';  // очищаем контейнер
    }
    

    async #handleClearBasketClick() {
        console.log("Очистка корзины началась");
    
        try {
            await this.#tasksModel.clearBasketTasks();  
            this.#clearBoard();  
            this.#renderBoard();  
    
            console.log("Корзина очищена");
        } catch (err) {
            console.error('Ошибка при очистке корзины:', err);
        }
    }
    
    
    


    async createTask() {
        const taskTitle = document.querySelector('.task-input').value.trim();
        if (!taskTitle) {
            return;
        }

        try {
            await this.#tasksModel.addTask(taskTitle);
            document.querySelector('.task-input').value = '';
        } catch (err) {
            console.error('Ошибка при создании задачи', err);
        }
    
        this.#renderBoard();
    }

    async init() {
        render(this.#loadingComponent, this.#boardContainer);  // отображаем компонент загрузки

        await this.#tasksModel.init();  // ждем, пока данные загрузятся

        this.#isLoading = false;  // отключаем состояние загрузки после завершения
        this.#clearBoard();  // очищаем загрузочный компонент
        this.#renderBoard();  // рендерим основное содержимое
    }
     

    #renderBoard() {
        this.#boardTasks = [...this.#tasksModel.tasks]; 
        
        render(this.#tasksBoardComponent, this.#boardContainer);
    
        Object.values(Status).forEach((status) => {
            if (status !== Status.TRASH) {
                this.#renderTasksList(status);
            }
        });
    
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
    
    

    async #handleTaskDrop(taskId, newStatus) {

        try {
            await this.#tasksModel.updateTaskStatus(taskId, newStatus);
        } catch (err) {
            console.error('Ошибка при обновлении статуса задачи:', err)
        }

        this.#renderBoard(); 
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
        hasTasks,
        onTaskDrop: this.#handleTaskDrop.bind(this),
    });

    trashContainer.innerHTML = ''; 
    render(tasksListComponent, trashContainer);

    tasksByStatus.forEach(task => {
        this.#renderTask(task, tasksListComponent.element.querySelector('.task-list'));
    });

    render(this.#clearButtonComponent, trashContainer);

    // Update button disabled state
    const clearButtonElement = this.#clearButtonComponent.element;
    clearButtonElement.disabled = !hasTasks;

    clearButtonElement.removeEventListener('click', this.#handleClearBasketClick);
    clearButtonElement.addEventListener('click', () => {
        if (hasTasks) {
            this.#handleClearBasketClick();  
        } else {
            console.log('Корзина пуста, очистка невозможна.');
        }
    });
}

    
}
