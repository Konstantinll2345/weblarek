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
            this.validateForm();
        });
        
        this.formElement.addEventListener('submit', (event) => {
            event.preventDefault();
            if (this.validateForm()) {
                this.events.emit('order:submit', {
                    payment: this.selectedPayment,
                    address: this.addressInput.value.trim()
                });
            }
        });
    }
    
    private selectPayment(payment: TPayment): void {
        this.selectedPayment = payment;
        
        this.toggleClass(this.onlineButton, 'button_alt-active', payment === 'online');
        this.toggleClass(this.offlineButton, 'button_alt-active', payment === 'offline');
        
        this.validateForm();
    }
    
    private validateForm(): boolean {
        const isValid = !!this.selectedPayment && this.addressInput.value.trim().length > 0;
        this.setSubmitDisabled(!isValid);
        return isValid;
    }
    
    setPayment(payment: TPayment): void {
        this.selectPayment(payment);
    }
    
    setAddress(address: string): void {
        this.addressInput.value = address;
        this.validateForm();
    }
    
    render(data?: Partial<OrderFormData>): HTMLElement {
        super.render(data);
        
        if (data) {
            if (data.payment) {
                this.selectPayment(data.payment);
            }
            if (data.address) {
                this.addressInput.value = data.address;
            }
        }
        
        this.validateForm();
        return this.container;
    }
}