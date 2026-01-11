import { EventEmitter } from '../base/Events';

export abstract class View<T> {
    protected container: HTMLElement;
    protected events: EventEmitter;
    
    constructor(container: HTMLElement, events: EventEmitter) {
        this.container = container;
        this.events = events;
    }
    
    protected getElement<U extends HTMLElement>(selector: string): U {
        const element = this.container.querySelector<U>(selector);
        if (!element) {
            throw new Error(`Элемент ${selector} не найден в ${this.constructor.name}`);
        }
        return element;
    }
    
    protected setText(element: HTMLElement | null, value: unknown): void {
        if (element && value !== undefined && value !== null) {
            element.textContent = String(value);
        }
    }
    
    protected setImage(element: HTMLImageElement | null, src: string, alt?: string): void {
        if (element) {
            element.src = src;
            if (alt !== undefined) element.alt = alt;
        }
    }
    
    protected setDisabled(element: HTMLElement | null, state: boolean): void {
        if (element && 'disabled' in element) {
            (element as HTMLButtonElement).disabled = state;
        }
    }
    
    protected toggleClass(element: HTMLElement | null, className: string, state: boolean): void {
        if (element) element.classList.toggle(className, state);
    }
    
    render(data?: Partial<T>): HTMLElement {
        Object.assign(this as object, data ?? {});
        return this.container;
    }
}