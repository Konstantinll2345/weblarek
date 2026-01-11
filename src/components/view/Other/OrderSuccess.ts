import { View } from '../View';
import { EventEmitter } from '../../base/Events';
interface SuccessData {
    total: number;
}

export class OrderSuccess extends View<SuccessData> {
    private descriptionElement: HTMLElement;
    private buttonElement: HTMLButtonElement;
    
    constructor(container: HTMLElement, events: EventEmitter) {
        super(container, events);
        
        this.descriptionElement = this.getElement<HTMLElement>('.order-success__description');
        this.buttonElement = this.getElement<HTMLButtonElement>('.order-success__close');
        
        this.buttonElement.addEventListener('click', () => {
            this.events.emit('success:close');
        });
    }
    
    setTotal(total: number): void {
        this.setText(this.descriptionElement, `Списано ${total} синапсов`);
    }
    
    render(data?: Partial<SuccessData>): HTMLElement {
        super.render(data);
        
        if (data?.total !== undefined) {
            this.setTotal(data.total);
        }
        
        return this.container;
    }
}