import { Form } from './Form';
import { EventEmitter } from '../../base/Events';

interface ContactsFormData {
    email: string;
    phone: string;
}

export class ContactsForm extends Form<ContactsFormData> {
    private emailInput: HTMLInputElement;
    private phoneInput: HTMLInputElement;
    
    constructor(container: HTMLElement, events: EventEmitter) {
        super(container, events);
        
        this.emailInput = this.getElement<HTMLInputElement>('input[name="email"]');
        this.phoneInput = this.getElement<HTMLInputElement>('input[name="phone"]');
        
        this.emailInput.addEventListener('input', () => {
            this.events.emit('contacts:email', { 
                email: this.emailInput.value 
            });
        });
        
        this.phoneInput.addEventListener('input', () => {
            this.events.emit('contacts:phone', { 
                phone: this.phoneInput.value 
            });
        });
        
        this.formElement.addEventListener('submit', (event) => {
            event.preventDefault();
            this.events.emit('contacts:submit', {
                email: this.emailInput.value.trim(),
                phone: this.phoneInput.value.trim()
            });
        });
    }
    
    setFormErrors(errors: { email?: string; phone?: string }): void {
        const errorMessages: string[] = [];
        
        if (errors.email) {
            errorMessages.push(errors.email);
            this.emailInput.classList.add('form__input-error');
        } else {
            this.emailInput.classList.remove('form__input-error');
        }

        if (errors.phone) {
            errorMessages.push(errors.phone);
            this.phoneInput.classList.add('form__input-error');
        } else {
            this.phoneInput.classList.remove('form__input-error');
        }
        
        if (errorMessages.length > 0) {
            this.setText(this.errorsElement, errorMessages.join(', '));
        } else {
            this.clearErrors();
        }
    }
    
    protected clearFormErrors(): void {
        this.setText(this.errorsElement, '');
        this.emailInput.classList.remove('form__input-error');
        this.phoneInput.classList.remove('form__input-error');
    }
    
    updateSubmitButton(isValid: boolean): void {
        this.setSubmitDisabled(!isValid);
    }
    
    setEmail(email: string): void {
        this.emailInput.value = email;
    }
    
    setPhone(phone: string): void {
        this.phoneInput.value = phone;
    }
    
    render(data?: Partial<ContactsFormData>): HTMLElement {
        super.render(data);
        
        if (data) {
            if (data.email !== undefined) {
                this.emailInput.value = data.email;
            }
            if (data.phone !== undefined) {
                this.phoneInput.value = data.phone;
            }
        }
        
        return this.container;
    }
}