import { View } from './View';
import { EventEmitter } from '../base/Events';
interface BasketData {
    total: number;
    isEmpty: boolean;
}

export class Basket extends View<BasketData> {
    private listElement: HTMLElement;
    private totalElement: HTMLElement;
    private buttonElement: HTMLButtonElement;
    
    constructor(container: HTMLElement, events: EventEmitter) {
        super(container, events);
        
        this.listElement = this.getElement<HTMLElement>('.basket__list');
        this.totalElement = this.getElement<HTMLElement>('.basket__price');
        this.buttonElement = this.getElement<HTMLButtonElement>('.basket__button');
        
        this.buttonElement.addEventListener('click', () => {
            this.events.emit('basket:checkout');
        });
    }
    
    setTotal(total: number): void {
        this.setText(this.totalElement, `${total} синапсов`);
    }
    
    setButtonDisabled(state: boolean): void {
        this.setDisabled(this.buttonElement, state);
    }
    
    clearList(): void {
        this.listElement.innerHTML = '';
    }
    
    addItem(item: HTMLElement): void {
        this.listElement.appendChild(item);
    }
    
    render(data?: Partial<BasketData>): HTMLElement {
        super.render(data);
        
        if (data?.total !== undefined) {
            this.setTotal(data.total);
        }
        
        if (data?.isEmpty !== undefined) {
            this.setButtonDisabled(data.isEmpty);
        }
        
        return this.container;
    }
}