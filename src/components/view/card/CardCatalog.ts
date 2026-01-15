import { Card } from './Card';
import { EventEmitter } from '../../base/Events';
import { IProduct } from '../../../types';

export class CardCatalog extends Card {
   private onClick: () => void;

    constructor(container: HTMLElement, events: EventEmitter, onClick: () => void) {
        super(container, events);
        this.onClick = onClick;
         this.container.addEventListener('click', (event) => {
            event.preventDefault();
            this.onClick();
        });
    }
    
    render(data?: Partial<IProduct>): HTMLElement {
        return super.render(data);
    }
}