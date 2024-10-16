import {createElement} from '../framework/render.js';
import {AbstractComponent} from '../framework/view/abstract-component.js';

function createClearButtonComponentTemplate() {
    return (
        `<button class="clear">✖ Очистить</button>`
    );
}

export default class ClearButtonComponent extends AbstractComponent {

    get template() {
        return createClearButtonComponentTemplate();
    }

    // getElement() {
    //     if (!this.element) {
    //         this.element = createElement(this.getTemplate());
    //     }

    //     return this.element;
    // }

    // removeElement() {
    //     this.element = null;
    // }
}
