import {createElement} from '../framework/render.js';
import ListTaskComponent from './list-task-component.js';

function createTaskBarComponentTemplate() {
    return `<section class="task-bar"></section>`;
}

export default class TaskBarComponent {
  constructor(tasksByStatus) {
    this.tasksByStatus = tasksByStatus;
  }

  getTemplate() {
    return createTaskBarComponentTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
      this.renderTaskLists();
    }

    return this.element;
  }

  renderTaskLists() {
    const taskBarElement = this.element;

    Object.keys(this.tasksByStatus).forEach(status => {
      let className;
      switch (status) {
        case 'К выполнению':
          className = 'todo';
          break;
        case 'В процессе':
          className = 'in-progress';
          break;
        case 'Готово':
          className = 'done';
          break;
        case 'Корзина':
          className = 'trash';
          break;
      }
      

      const taskListComponent = new ListTaskComponent(status, this.tasksByStatus[status], className);
      taskBarElement.appendChild(taskListComponent.getElement());
    });
  }

  removeElement() {
    this.element = null;
  }
}
