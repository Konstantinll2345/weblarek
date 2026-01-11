import { Card } from './Card';
import { EventEmitter } from '../../base/Events';

export class CardCatalog extends Card {
    constructor(container: HTMLElement, events: EventEmitter) {
        super(container, events);
        
        this.container.addEventListener('click', (event) => {
            event.preventDefault();
            if (this.container.dataset.id) {
                this.events.emit('card:select', { id: this.container.dataset.id });
            }
        });
    }
}