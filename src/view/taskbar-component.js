import {createElement} from '../framework/render.js';
import {AbstractComponent} from '../framework/view/abstract-component.js';

function createTaskBarComponentTemplate() {
    return (
        `<ul class="task-bar">
        </ul>`
    );
}

export default class TaskBarComponent extends AbstractComponent {
      get template() {
        return createTaskBarComponentTemplate();
      }
}
