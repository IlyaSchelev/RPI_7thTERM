import HeaderComponent from './view/header-component.js';
import FormAddTaskComponent from './view/form-add-task-component.js';
import TaskBarComponent from './view/taskbar-component.js';
import ListTaskComponent from './view/list-task-component.js';
import TaskComponent from './view/task-component.js';
import TasksBoardPresenter from './presenter/tasks-board-presenter.js';
import TasksModel from './model/tasks-model.js';
import {AbstractComponent} from './framework/view/abstract-component.js';
import {render, RenderPosition} from './framework/render.js';
import ClearButtonComponent from './view/clear-button-component.js';

const bodyContainer = document.querySelector('.board-app');
const formContainer = document.querySelector('.add-task');
const tasksBoardContainer = document.querySelector('.taskboard');
const tasksModel = new TasksModel();
const tasksBoardPresenter = new TasksBoardPresenter({
 boardContainer: tasksBoardContainer, tasksModel,
});
const formAddTaskComponent = new FormAddTaskComponent({
    onClick: handleNewTaskButtonClick,
});

function handleNewTaskButtonClick(taskTitle) {
    tasksBoardPresenter.createTask(taskTitle);  // Передаем taskTitle
}



render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
render(formAddTaskComponent, formContainer, RenderPosition.AFTERBEGIN);
render(new TaskBarComponent(), tasksBoardContainer, RenderPosition.BEFOREBEGIN);
render(new ClearButtonComponent(), tasksBoardContainer, RenderPosition.AFTEREND);

tasksBoardPresenter.init();
