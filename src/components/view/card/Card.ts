import { View } from '../View';
import { IProduct } from '../../../types';
import { categoryMap } from '../../../utils/constants';
import { EventEmitter } from '../../base/Events';
import { getFullImageUrl } from '../../../utils/utils';

export abstract class Card extends View<IProduct> {
    protected titleElement: HTMLElement;
    protected priceElement: HTMLElement;
    
    constructor(container: HTMLElement, events: EventEmitter) {
        super(container, events);
        this.titleElement = this.getElement<HTMLElement>('.card__title');
        this.priceElement = this.getElement<HTMLElement>('.card__price');
    }
    
    protected setCategory(category: string): void {
        const categoryElement = this.container.querySelector('.card__category');
        if (categoryElement instanceof HTMLElement) {
            this.setText(categoryElement, category);
            categoryElement.className = 'card__category';
            if (category in categoryMap) {
                const categoryClass = categoryMap[category as keyof typeof categoryMap];
                if (categoryClass) {
                    categoryElement.classList.add(categoryClass);
                }
            }
        }
    }
    
    protected setTitle(title: string): void {
        this.setText(this.titleElement, title);
    }
    
    protected setPrice(price: number | null): void {
        const priceText = price !== null ? `${price} синапсов` : '';
        this.setText(this.priceElement, priceText);
    }
    
        protected setImageData(src: string, alt?: string): void {
        const imageElement = this.container.querySelector('.card__image');
        if (imageElement instanceof HTMLImageElement) {
            const fullImageUrl = getFullImageUrl(src);
            
            imageElement.src = fullImageUrl;
            
            imageElement.onerror = () => {
                console.error(`Ошибка загрузки изображения: ${fullImageUrl}`);
                imageElement.src = '/src/images/placeholder.svg';
            };
            
            if (alt !== undefined) {
                imageElement.alt = alt;
            }
        }
    }
    
    render(data?: Partial<IProduct>): HTMLElement {
        super.render(data);
        
        if (data) {
            if (data.category) {
                this.setCategory(data.category);
            }
            if (data.title) {
                this.setTitle(data.title);
            }
            if (data.image) {
                this.setImageData(data.image, data.title);
            }
            if (data.price !== undefined) {
                this.setPrice(data.price);
            }
        }
        
        return this.container;
    }
}