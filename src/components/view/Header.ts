import { View } from './View';
import { EventEmitter } from '../base/Events';

export class Header extends View<void> {
    private basketCounter: HTMLElement;
    private basketButton: HTMLButtonElement;
    
    constructor(container: HTMLElement, events: EventEmitter) {
        super(container, events);
        
        this.basketCounter = this.getElement<HTMLElement>('.header__basket-counter');
        this.basketButton = this.getElement<HTMLButtonElement>('.header__basket');
        
        this.basketButton.addEventListener('click', () => {
            this.events.emit('basket:open');
        });
    }
    
    setCounter(count: number): void {
        this.setText(this.basketCounter, String(count));
    }
}