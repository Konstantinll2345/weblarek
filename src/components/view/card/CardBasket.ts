import { Card } from './Card';
import { EventEmitter } from '../../base/Events';
import { IProduct } from '../../../types';

export class CardBasket extends Card {
    private indexElement: HTMLElement;
    private deleteButton: HTMLButtonElement;
    
    constructor(container: HTMLElement, events: EventEmitter) {
        super(container, events);
        
        this.indexElement = this.getElement<HTMLElement>('.basket__item-index');
        this.deleteButton = this.getElement<HTMLButtonElement>('.basket__item-delete');
        
        this.deleteButton.addEventListener('click', (event) => {
            event.preventDefault();
            if (this.container.dataset.id) {
                this.events.emit('basket:remove', { id: this.container.dataset.id });
            }
        });
    }
    
    setIndex(index: number): void {
        this.setText(this.indexElement, String(index));
    }
    
    render(data?: Partial<IProduct>): HTMLElement {
        const element = super.render(data);
        return element;
    }
}