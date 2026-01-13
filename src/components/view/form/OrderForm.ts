import { Form } from './Form';
import { TPayment } from '../../../types';
import { EventEmitter } from '../../base/Events';

interface OrderFormData {
    payment: TPayment;
    address: string;
}

export class OrderForm extends Form<OrderFormData> {
    private onlineButton: HTMLButtonElement;
    private offlineButton: HTMLButtonElement;
    private addressInput: HTMLInputElement;
    private selectedPayment: TPayment = '';
    
        constructor(container: HTMLElement, events: EventEmitter) {
        super(container, events);
        
        this.onlineButton = this.getElement<HTMLButtonElement>('button[name="card"]');
        this.offlineButton = this.getElement<HTMLButtonElement>('button[name="cash"]');
        this.addressInput = this.getElement<HTMLInputElement>('input[name="address"]');
        

        this.onlineButton.addEventListener('click', () => {
            this.selectPayment('online');
            this.events.emit('order:payment', { payment: 'online' });
        });
        
        this.offlineButton.addEventListener('click', () => {
            this.selectPayment('offline');
            this.events.emit('order:payment', { payment: 'offline' });
        });
        
        this.addressInput.addEventListener('input', () => {
            this.events.emit('order:address', { address: this.addressInput.value });
        });
        
        this.formElement.addEventListener('submit', (event) => {
            event.preventDefault();
            this.events.emit('order:submit', {
                payment: this.selectedPayment,
                address: this.addressInput.value.trim()
            });
        });
    }
    
    private selectPayment(payment: TPayment): void {
        this.selectedPayment = payment;
        this.toggleClass(this.onlineButton, 'button_alt-active', payment === 'online');
        this.toggleClass(this.offlineButton, 'button_alt-active', payment === 'offline');
    }
    
    setFormError(errors: { payment?: string; address?: string }): void {
        const errorMessages: string[] = [];
        
        if (errors.payment) {
            errorMessages.push(errors.payment);
        }
        
        if (errors.address) {
            errorMessages.push(errors.address);
            this.addressInput.classList.add('form__input-error');
        } else {
            this.addressInput.classList.remove('form__input-error');
        }
        
        if (errorMessages.length > 0) {
            this.setText(this.errorsElement, errorMessages.join(', '));
        } else {
            this.clearErrors();
        }
    }
    
    protected clearFormErrors(): void {
        this.setText(this.errorsElement, '');
        this.addressInput.classList.remove('form__input-error');
    }
    
    updateSubmitButton(isValid: boolean): void {
        this.setSubmitDisabled(!isValid);
    }
    
    setPayment(payment: TPayment): void {
        this.selectPayment(payment);
    }
    
    setAddress(address: string): void {
        this.addressInput.value = address;
    }
    
    render(data?: Partial<OrderFormData>): HTMLElement {
        super.render(data);
        
        if (data) {
            if (data.payment) {
                this.selectPayment(data.payment);
            }
            if (data.address !== undefined) {
                this.addressInput.value = data.address;
            }
        }
        
        return this.container;
    }
}