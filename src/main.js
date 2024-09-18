import HeaderComponent from '../src/view/header-component.js';
import FormAddTaskComponent from '../src/view/form-add-task-component.js';
import TaskBarComponent from '../src/view/taskbar-component.js';
import ListTaskComponent from '../src/view/list-task-component.js';
import TaskComponent from '../src/view/task-component.js';
import {render, RenderPosition} from './framework/render.js';


const bodyContainer = document.querySelector('.board-app');
const formContainer = document.querySelector('.add-task');
const barcontainer = document.querySelector('.taskboard');
const listcontainer = document.querySelector('.taskboard');
const taskcontainer = document.querySelector('.taskboard');


render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
render(new FormAddTaskComponent(), formContainer);
render(new TaskBarComponent(), barcontainer);
render(new ListTaskComponent(), listcontainer);
render(new TaskComponent(), taskcontainer);
