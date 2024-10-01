import HeaderComponent from './view/header-component.js';
import FormAddTaskComponent from './view/form-add-task-component.js';
import TaskBarComponent from './view/taskbar-component.js';
import {render, RenderPosition} from './framework/render.js';

const bodyContainer = document.querySelector('.board-app');
const formContainer = document.querySelector('.add-task');
const tasksBoardContainer = document.querySelector('.taskboard');

// Пример данных задач с русскими названиями статусов
const tasksByStatus = {
  'К выполнению': ['Задача 1', 'Задача 2', 'Задача 3'],
  'В процессе': ['Задача 4', 'Задача 5', 'Задача 6'],
  'Готово': ['Задача 7', 'Задача 8', 'Задача 9'],
  'Корзина': ['Задача 10', 'Задача 11', 'Задача 12']
};


render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
render(new FormAddTaskComponent(), formContainer);
render(new TaskBarComponent(tasksByStatus), tasksBoardContainer);
