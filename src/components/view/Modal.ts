import { View } from './View';
import { EventEmitter } from '../base/Events';

export class Modal extends View<void> {
    private closeButton: HTMLButtonElement;
    private content: HTMLElement;
    
    constructor(container: HTMLElement, events: EventEmitter) {
        super(container, events);
        
        this.closeButton = this.getElement<HTMLButtonElement>('.modal__close');
        this.content = this.getElement<HTMLElement>('.modal__content');
        
        this.closeButton.addEventListener('click', () => this.close());
        this.container.addEventListener('click', (event) => {
            if (event.target === this.container) {
                this.close();
            }
        });
        
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && this.isOpen()) {
                this.close();
            }
        });
    }
    
    open(): void {
        this.container.classList.add('modal_active');
        document.body.style.overflow = 'hidden'; // Блокируем скролл страницы
    }
    
    close(): void {
        this.container.classList.remove('modal_active');
        document.body.style.overflow = ''; // Восстанавливаем скролл
        this.content.innerHTML = '';
        this.events.emit('modal:close');
    }
    
    isOpen(): boolean {
        return this.container.classList.contains('modal_active');
    }
    
    setContent(view: View<any>): void {
        this.content.innerHTML = '';
        this.content.appendChild(view.render());
    }
}