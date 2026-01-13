import { Card } from './Card';
import { EventEmitter } from '../../base/Events';
import { IProduct } from '../../../types';

export class CardCatalog extends Card {
    constructor(container: HTMLElement, events: EventEmitter) {
        super(container, events);
        
        this.container.addEventListener('click', (event) => {
            event.preventDefault();
            const id = this.container.dataset.id;
            if (id) {
                this.events.emit('card:select', { id });
            }
        });
    }
    
    render(data?: Partial<IProduct>): HTMLElement {
        const element = super.render(data);
        
        if (data?.id) {
            element.dataset.id = data.id;
        }
        
        return element;
    }
}