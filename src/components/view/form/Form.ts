import { View } from '../View';
import { EventEmitter } from '../../base/Events';

export abstract class Form<T> extends View<T> {
    protected submitButton: HTMLButtonElement;
    protected errorsElement: HTMLElement;
    protected formElement: HTMLFormElement;
    
    constructor(container: HTMLElement, events: EventEmitter) {
        super(container, events);
        
        this.formElement = container as HTMLFormElement;
        this.submitButton = this.getElement<HTMLButtonElement>('button[type="submit"]');
        this.errorsElement = this.getElement<HTMLElement>('.form__errors');
    }
    
    protected setErrorText(text: string): void {
        this.setText(this.errorsElement, text);
    }
    
    protected clearErrors(): void {
        this.setText(this.errorsElement, '');
    }
    
    protected setSubmitDisabled(state: boolean): void {
        this.setDisabled(this.submitButton, state);
    }
    
    protected validate(): boolean {
        return true;
    }
}