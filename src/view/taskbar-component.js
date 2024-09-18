import {createElement} from '../framework/render.js';


function createTaskBarComponentTemplate() {
    return (
        `<section class="columns">
            <article class="column backlog">
                <h2>Бэклог</h2>
                <div class="task">пункт</div>
                <div class="task">пункт</div>
                <div class="task">пункт</div>
            </article>
            <article class="column in-progress">
                <h2>В процессе</h2>
                <div class="task">пункт</div>
                <div class="task">пункт</div>
            </article>
            <article class="column done">
                <h2>Готово</h2>
                <div class="task">пункт</div>
            </article>
            <article class="column trash">
                <h2>Корзина</h2>
                <div class="task">пункт</div>
                <button class="clear">✖ Очистить</button>
            </article>
        </section>`
      );
}


export default class TaskBarComponent {
  getTemplate() {
    return createTaskBarComponentTemplate();
  }


  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }


    return this.element;
  }


  removeElement() {
    this.element = null;
  }
}
