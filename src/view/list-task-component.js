import {createElement} from '../framework/render.js';
import TaskComponent from './task-component.js';

function createListTaskComponentTemplate(title, className) {
    return `
      <div class="task-block ${className}">
        <h3>${title}</h3>
        <ul class="task-list"></ul>
      </div>
    `;
}

export default class ListTaskComponent {
  constructor(title, tasks, className) {
    this.title = title;
    this.tasks = tasks;
    this.className = className; // добавляем класс для колонки
  }

  getTemplate() {
    return createListTaskComponentTemplate(this.title, this.className);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
      this.renderTasks();
    }

    return this.element;
  }

  renderTasks() {
    const taskListElement = this.element.querySelector('.task-list');
    this.tasks.forEach(task => {
      const taskComponent = new TaskComponent(task);
      taskListElement.appendChild(taskComponent.getElement());
    });
  }

  removeElement() {
    this.element = null;
  }
}
