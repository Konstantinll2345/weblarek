import { Card } from './Card';
import { EventEmitter } from '../../base/Events';
import { IProduct } from '../../../types';

export class CardPreview extends Card {
    private descriptionElement: HTMLElement;
    private buttonElement: HTMLButtonElement;
      private onButtonClick: () => void;
    
    constructor(container: HTMLElement, events: EventEmitter, onButtonClick: () => void) {
        super(container, events);
        this.onButtonClick = onButtonClick;
        this.descriptionElement = this.getElement<HTMLElement>('.card__text');
        this.buttonElement = this.getElement<HTMLButtonElement>('.card__button');
        
        this.buttonElement.addEventListener('click', (event) => {
            event.preventDefault();
            this.onButtonClick();
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