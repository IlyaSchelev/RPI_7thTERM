import { createElement } from '../framework/render.js';
import { AbstractComponent } from '../framework/view/abstract-component.js';

function createFormAddTaskComponentTemplate() {
    return (
        `<section class="new-task">
            <h3>Новая задача</h3>
            <input type="text" class="task-input" placeholder="Название задачи..." />
            <button type="button" class="add-task-button">+ Добавить</button>
        </section>`
    );
}

export default class FormAddTaskComponent extends AbstractComponent {

  #handleClick = null;

  constructor({ onClick }) {
    super();
    this.#handleClick = onClick;

    this.element.querySelector('.add-task-button').addEventListener('click', this.#clickHandler);
  }

  get template() {
    return createFormAddTaskComponentTemplate();
  }

  #clickHandler = (evt) => {
    evt.preventDefault();

    const taskInputValue = this.element.querySelector('.task-input').value.trim();
    
    if (taskInputValue) {
      this.#handleClick(taskInputValue);  
      this.element.querySelector('.task-input').value = '';  
    } else {
      alert('Введите название задачи');
    }
  }
}
