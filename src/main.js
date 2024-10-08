import HeaderComponent from './view/header-component.js';
import FormAddTaskComponent from './view/form-add-task-component.js';
import TaskBarComponent from './view/taskbar-component.js';
import ListTaskComponent from './view/list-task-component.js';
import TaskComponent from './view/task-component.js';
import {render, RenderPosition} from './framework/render.js';

const bodyContainer = document.querySelector('.board-app');
const formContainer = document.querySelector('.add-task');
const tasksBoardContainer = document.querySelector('.taskboard');


render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
render(new FormAddTaskComponent(), formContainer, RenderPosition.AFTERBEGIN);
render(new TaskBarComponent(), tasksBoardContainer, RenderPosition.BEFOREBEGIN);
