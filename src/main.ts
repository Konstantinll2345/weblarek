import './scss/styles.scss';
import { EventEmitter } from './components/base/Events';
import { Products } from './components/models/Product';
import { Cart } from './components/models/Cart';
import { Buyer } from './components/models/Buyer';
import { ProductApiData } from './components/models/ProductData';
import { Api } from './components/base/Api';
import { Gallery } from './components/view/Gallery';
import { Header } from './components/view/Header';
import { Modal } from './components/view/Modal';
import { CardCatalog } from './components/view/card/CardCatalog';
import { CardPreview } from './components/view/card/CardPreview';
import { CardBasket } from './components/view/card/CardBasket';
import { Basket } from './components/view/Basket';
import { OrderForm } from './components/view/form/OrderForm';
import { ContactsForm } from './components/view/form/ContactsForm';
import { OrderSuccess } from './components/view/OrderSuccess';
import { IOrder } from './types';
import { API_URL } from './utils/constants';

function cloneTemplate<T extends HTMLElement>(template: HTMLTemplateElement): T {
    if (!template.content.firstElementChild) {
        throw new Error(`Template ${template.id} has no content`);
    }
    return template.content.firstElementChild.cloneNode(true) as T;
}

// Инициализация EventEmitter
const events = new EventEmitter();

// Инициализация моделей
const products = new Products(events);
const cart = new Cart(events);
const buyer = new Buyer(events);

// Инициализация API
const baseApi = new Api(API_URL);
const productApiData = new ProductApiData(baseApi);

// Получаем элементы из DOM
const galleryContainer = document.querySelector<HTMLElement>('.gallery');
const headerContainer = document.querySelector<HTMLElement>('.header');
const modalContainer = document.querySelector<HTMLElement>('#modal-container');
const basketTemplate = document.querySelector<HTMLTemplateElement>('#basket');
const orderTemplate = document.querySelector<HTMLTemplateElement>('#order');
const contactsTemplate = document.querySelector<HTMLTemplateElement>('#contacts');
const successTemplate = document.querySelector<HTMLTemplateElement>('#success');
const cardCatalogTemplate = document.querySelector<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = document.querySelector<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = document.querySelector<HTMLTemplateElement>('#card-basket');

// Проверка наличия элементов
if (!galleryContainer || !headerContainer || !modalContainer || !basketTemplate || 
    !orderTemplate || !contactsTemplate || !successTemplate || !cardCatalogTemplate || 
    !cardPreviewTemplate || !cardBasketTemplate) {
    throw new Error('Не все необходимые элементы найдены в DOM');
}

// Инициализация UI компонентов
const gallery = new Gallery(galleryContainer, events);
const header = new Header(headerContainer, events);
const modal = new Modal(modalContainer, events);
const basket = new Basket(cloneTemplate(basketTemplate), events);
const orderForm = new OrderForm(cloneTemplate(orderTemplate), events);
const contactsForm = new ContactsForm(cloneTemplate(contactsTemplate), events);
const success = new OrderSuccess(cloneTemplate(successTemplate), events);

// Вспомогательная функция для проверки валидности формы заказа
function validateOrderForm(): { isValid: boolean; errors: { payment?: string; address?: string } } {
    const buyerData = buyer.getData();
    const errors: { payment?: string; address?: string } = {};
    let isValid = true;
    
    if (!buyerData.payment || !buyerData.payment.trim()) {
        errors.payment = "Не выбран способ оплаты";
        isValid = false;
    }
    
    if (!buyerData.address || !buyerData.address.trim()) {
        errors.address = "Не указан адрес";
        isValid = false;
    }
    
    return { isValid, errors };
}

// Вспомогательная функция для проверки валидности формы контактов
function validateContactsForm(): { isValid: boolean; errors: { email?: string; phone?: string } } {
    const buyerData = buyer.getData();
    const errors: { email?: string; phone?: string } = {};
    let isValid = true;
    
    if (!buyerData.email || !buyerData.email.trim()) {
        errors.email = "Не указан email";
        isValid = false;
    }
    
    if (!buyerData.phone || !buyerData.phone.trim()) {
        errors.phone = "Не указан телефон";
        isValid = false;
    }
    
    return { isValid, errors };
}

events.on('products:changed', () => {
    const items = products.getItems();
    
    const catalogCards = items.map((product) => {
        const cardElement = cloneTemplate(cardCatalogTemplate);
        const card = new CardCatalog(cardElement, events, () => {
            events.emit('card:select', { id: product.id });
        });
        
        return card.render({
            id: product.id,
            title: product.title,
            image: product.image, 
            price: product.price,
            category: product.category
        });
    });
    
    gallery.setItems(catalogCards);
});

events.on('card:select', (data: { id: string }) => {
    const product = products.getItem(data.id);
    if (!product) return;
    
    products.setPreviewItem(product);
    const cardElement = cloneTemplate(cardPreviewTemplate);
    const card = new CardPreview(cardElement, events, () => {
        events.emit('card:add', { id: product.id });
    });
    
    card.render({
        id: product.id,
        title: product.title,
        image: product.image,
        price: product.price,
        category: product.category,
        description: product.description
    });
    
    card.setButtonState(cart.hasItem(product.id));
    modal.setContent(card);
    modal.open();
});

events.on('card:add', (data: { id: string }) => {
    const product = products.getItem(data.id);
    if (!product) return;
    
    if (cart.hasItem(product.id)) {
        cart.deleteItem(product);
    } else {
        cart.addItem(product);
    }
    
    const previewProduct = products.getPreviewItem();
    if (previewProduct?.id === product.id && modal.isOpen()) {
        const cardElement = cloneTemplate(cardPreviewTemplate);
        const card = new CardPreview(cardElement, events, () => {
            events.emit('card:add', { id: product.id });
        });
        card.render({
            id: product.id,
            title: product.title,
            image: product.image,
            price: product.price,
            category: product.category,
            description: product.description
        });
        card.setButtonState(cart.hasItem(product.id));
        modal.setContent(card);
    }
});

events.on('cart:changed', () => {
    header.setCounter(cart.getCount());
    const previewProduct = products.getPreviewItem();
    if (previewProduct && modal.isOpen()) {
        const inCart = cart.hasItem(previewProduct.id);
        const cardElement = cloneTemplate(cardPreviewTemplate);
        const card = new CardPreview(cardElement, events, () => {
            events.emit('card:add', { id: previewProduct.id });
        });
        card.render({
            id: previewProduct.id,
            title: previewProduct.title,
            image: previewProduct.image,
            price: previewProduct.price,
            category: previewProduct.category,
            description: previewProduct.description
        });
        card.setButtonState(inCart);
        modal.setContent(card);
    }
});

events.on('basket:open', () => {
    const items = cart.getItems();
    basket.clearList();
    
    items.forEach((item, index) => {
        const cardElement = cloneTemplate(cardBasketTemplate);
        const card = new CardBasket(cardElement, events, () => {
            events.emit('basket:remove', { id: item.id });
        });
        
        const cardInstance = card.render({
            id: item.id,
            title: item.title,
            price: item.price
        });
        
        card.setIndex(index + 1);
        basket.addItem(cardInstance);
    });

    basket.render({
        total: cart.getTotalPrice(),
        isEmpty: items.length === 0
    });
    
    modal.setContent(basket);
    modal.open();
});

events.on('basket:remove', (data: { id: string }) => {
    const product = products.getItem(data.id);
    if (!product) return;
    
    cart.deleteItem(product);

    if (modal.isOpen()) {
        events.emit('basket:open');
    }
});

events.on('basket:checkout', () => {
    const buyerData = buyer.getData();
    orderForm.render(buyerData);
    const validation = validateOrderForm();
    orderForm.updateSubmitButton(validation.isValid);
    orderForm.setFormError(validation.errors);
    
    modal.setContent(orderForm);
});

events.on('order:payment', (data: { payment: 'online' | 'offline' }) => {
    buyer.setData({ payment: data.payment });
    orderForm.selectPayment(data.payment);
    const validation = validateOrderForm();
    orderForm.updateSubmitButton(validation.isValid);
    orderForm.setFormError(validation.errors);
});

events.on('order:address', (data: { address: string }) => {
    buyer.setData({ address: data.address });
    const validation = validateOrderForm();
    orderForm.updateSubmitButton(validation.isValid);
    orderForm.setFormError(validation.errors);
});

events.on('order:submit', (data: { payment: 'online' | 'offline', address: string }) => {
    buyer.setData(data);
    
    const orderValidation = validateOrderForm();
    
    if (!orderValidation.isValid) {
        console.log('Первая форма не валидна:', orderValidation.errors);
        return;
    }
    
    const buyerData = buyer.getData();
    contactsForm.render({
        email: buyerData.email,
        phone: buyerData.phone
    });

    const contactsValidation = validateContactsForm();
    contactsForm.updateSubmitButton(contactsValidation.isValid);
    contactsForm.setFormErrors(contactsValidation.errors);
    
    modal.setContent(contactsForm);
});

events.on('contacts:email', (data: { email: string }) => {
    buyer.setData({ email: data.email });
    const validation = validateContactsForm();
    contactsForm.updateSubmitButton(validation.isValid);
    contactsForm.setFormErrors(validation.errors);
});

events.on('contacts:phone', (data: { phone: string }) => {
    buyer.setData({ phone: data.phone });
    const validation = validateContactsForm();
    contactsForm.updateSubmitButton(validation.isValid);
    contactsForm.setFormErrors(validation.errors);
});

events.on('contacts:submit', async (data: { email: string, phone: string }) => {
    buyer.setData(data);
    
    const validation = buyer.validate();
    
    if (!validation.isValid) {
        console.log('Форма не валидна, ошибки:', validation.errors);
        return;
    }
    
    const orderData: IOrder = {
        ...buyer.getData(),
        items: cart.getItems().map(item => item.id),
        total: cart.getTotalPrice()
    };
    
    try {
        const result = await productApiData.submitOrder(orderData);
        
        success.render({ total: result.total });
        modal.setContent(success);
        
        cart.clear();
        buyer.clear();
        
        header.setCounter(0);
        
    } catch (error) {
        console.error('Ошибка при оформлении заказа:', error);
        alert('Произошла ошибка при оформлении заказа');
    }
});

events.on('success:close', () => {
    modal.close();
});

events.on('modal:close', () => {
    products.setPreviewItem(null);
});

productApiData.getProduct()
    .then(productsData => {
        products.setItems(productsData);
        console.log('Товары загружены:', productsData.length);
    })
    .catch(error => {
        console.error('Ошибка при загрузке товаров:', error);
        alert('Не удалось загрузить товары. Пожалуйста, обновите страницу.');
    });