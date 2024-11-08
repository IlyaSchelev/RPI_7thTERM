import HeaderComponent from './view/header-component.js';
import FormAddTaskComponent from './view/form-add-task-component.js';
import TaskBarComponent from './view/taskbar-component.js';
import ListTaskComponent from './view/list-task-component.js';
import TaskComponent from './view/task-component.js';
import ClearButtonComponent from './view/clear-button-component.js';
import TasksBoardPresenter from './presenter/tasks-board-presenter.js';
import TasksModel from './model/tasks-model.js';
import {AbstractComponent} from './framework/view/abstract-component.js';
import TasksApiService from './tasks-api-service.js';
import {render, RenderPosition} from './framework/render.js';

const END_POINT = 'https://67226b092108960b9cc45a64.mockapi.io';
const bodyContainer = document.querySelector('.board-app');
const formContainer = document.querySelector('.add-task');
const tasksBoardContainer = document.querySelector('.taskboard');
const tasksModel = new TasksModel({
    tasksApiService: new TasksApiService(END_POINT)
})
const tasksBoardPresenter = new TasksBoardPresenter({
 boardContainer: tasksBoardContainer, tasksModel,
});
const formAddTaskComponent = new FormAddTaskComponent({
    onClick: handleNewTaskButtonClick,
});

function handleNewTaskButtonClick(taskTitle) {
    tasksBoardPresenter.createTask(taskTitle);  
}




render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
render(formAddTaskComponent, formContainer, RenderPosition.AFTERBEGIN);
render(new TaskBarComponent(), tasksBoardContainer, RenderPosition.BEFOREBEGIN);

await tasksModel.init();
await tasksBoardPresenter.init();
