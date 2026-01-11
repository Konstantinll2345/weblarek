import { Card } from './Card';
import { EventEmitter } from '../../base/Events';
import { IProduct } from '../../../types';

export class CardPreview extends Card {
    private descriptionElement: HTMLElement;
    private buttonElement: HTMLButtonElement;
    
    constructor(container: HTMLElement, events: EventEmitter) {
        super(container, events);
        
        this.descriptionElement = this.getElement<HTMLElement>('.card__text');
        this.buttonElement = this.getElement<HTMLButtonElement>('.card__button');
        
        this.buttonElement.addEventListener('click', (event) => {
            event.preventDefault();
            if (this.container.dataset.id) {
                this.events.emit('card:add', { id: this.container.dataset.id });
            }
        });
    }
    
    setButtonText(text: string): void {
        this.setText(this.buttonElement, text);
    }
    
    setButtonState(inCart: boolean): void {
        this.setButtonText(inCart ? 'Удалить из корзины' : 'Купить');
    }
    
    setDescription(description: string): void {
        this.setText(this.descriptionElement, description);
    }
    
    render(data?: Partial<IProduct>): HTMLElement {
        const element = super.render(data);
        
        if (data?.description) {
            this.setDescription(data.description);
        }
        
        return element;
    }
}