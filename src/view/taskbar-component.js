import {createElement} from '../framework/render.js';

function createTaskBarComponentTemplate() {
    return (
        `<ul class="task-bar">
        </ul>`
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
