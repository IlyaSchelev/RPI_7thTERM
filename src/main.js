import HeaderComponent from './view/header-component.js';
import FormAddTaskComponent from './view/form-add-task-component.js';
import TaskBarComponent from './view/taskbar-component.js';
import ListTaskComponent from './view/list-task-component.js';
import TaskComponent from './view/task-component.js';
import TasksBoardPresenter from './presenter/tasks-board-presenter.js';
import TasksModel from './model/tasks-model.js';
import {render, RenderPosition} from './framework/render.js';

const bodyContainer = document.querySelector('.board-app');
const formContainer = document.querySelector('.add-task');
const tasksBoardContainer = document.querySelector('.taskboard');
const tasksModel = new TasksModel();
const tasksBoardPresenter = new TasksBoardPresenter({
 boardContainer: tasksBoardContainer, tasksModel,
});


render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
render(new FormAddTaskComponent(), formContainer, RenderPosition.AFTERBEGIN);
render(new TaskBarComponent(), tasksBoardContainer, RenderPosition.BEFOREBEGIN);
render(tasksBoardPresenter.tasksBoardComponent, tasksBoardContainer, RenderPosition.BEFOREBEGIN);


tasksBoardPresenter.init();
