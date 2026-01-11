import { View } from './View';
import { EventEmitter } from '../base/Events';

export class Gallery extends View<void> {
    constructor(container: HTMLElement, events: EventEmitter) {
        super(container, events);
    }
    
    setItems(items: HTMLElement[]): void {
        this.container.innerHTML = '';
        items.forEach(item => {
            this.container.appendChild(item);
        });
    }
    
    clear(): void {
        this.container.innerHTML = '';
    }
}