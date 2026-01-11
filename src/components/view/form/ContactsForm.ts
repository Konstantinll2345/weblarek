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
            this.events.emit('contacts:email', { email: this.emailInput.value });
            this.validateForm();
        });
        
        this.phoneInput.addEventListener('input', () => {
            this.events.emit('contacts:phone', { phone: this.phoneInput.value });
            this.validateForm();
        });
        
        this.formElement.addEventListener('submit', (event) => {
            event.preventDefault();
            if (this.validateForm()) {
                this.events.emit('contacts:submit', {
                    email: this.emailInput.value.trim(),
                    phone: this.phoneInput.value.trim()
                });
            }
        });
    }
    
    private validateForm(): boolean {
        const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.emailInput.value);
        const phoneValid = this.phoneInput.value.replace(/\D/g, '').length >= 11;
        const isValid = emailValid && phoneValid;
        
        this.setSubmitDisabled(!isValid);
        
        if (!isValid) {
            const errors = [];
            if (!emailValid) errors.push('Некорректный email');
            if (!phoneValid) errors.push('Некорректный телефон');
            this.setErrors(errors.join(', '));
        } else {
            this.clearErrors();
        }
        
        return isValid;
    }
    
    setEmail(email: string): void {
        this.emailInput.value = email;
        this.validateForm();
    }
    
    setPhone(phone: string): void {
        this.phoneInput.value = phone;
        this.validateForm();
    }
    
    render(data?: Partial<ContactsFormData>): HTMLElement {
    super.render(data);
        
        if (data) {
            if (data.email) {
                this.emailInput.value = data.email;
            }
            if (data.phone) {
                this.phoneInput.value = data.phone;
            }
        }
        
        this.validateForm();
        return this.container;
    }
}