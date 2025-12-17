import './scss/styles.scss';

import { Buyer } from './components/models/Buyer';
import { Products } from './components/models/Product';
import { Cart } from './components/models/Cart';
import { apiProducts } from './utils/data';
import { ProductApiData } from './components/models/ProductData';
import { API_URL } from './utils/constants';
import { Api } from './components/base/Api';

// Product
console.log('==Products==');
const productsModel = new Products();
productsModel.setItems(apiProducts.items);
console.log('Массив товаров:', productsModel.getItems());
console.log('Количество товаров:', productsModel.getItems().length);

// Cart
console.log('==Cart==');
const cartCheck = new Cart();

if (productsModel.getItems().length > 0) {
    const firstProduct = productsModel.getItems()[0];
    const secondProduct = productsModel.getItems()[1] || productsModel.getItems()[0];
    
    cartCheck.addItem(firstProduct);
    console.log('Добавлен товар в корзину:', firstProduct);
    
    cartCheck.addItem(secondProduct);
    console.log('Добавлен товар в корзину:', secondProduct);
    
    console.log('Количество товаров в корзине:', cartCheck.getCount());
    console.log('Общая сумма товаров в корзине:', cartCheck.getTotalPrice());
    
    console.log(`Товар "${firstProduct.title}" в корзине:`, cartCheck.hasItem(firstProduct.id));
    console.log(`Товар "${secondProduct.title}" в корзине:`, cartCheck.hasItem(secondProduct.id));
    
    console.log('Удаление товара:', firstProduct.title);
    cartCheck.deleteItem(firstProduct);
    console.log('Количество товаров после удаления:', cartCheck.getCount());
    console.log('Общая сумма после удаления:', cartCheck.getTotalPrice());
    console.log(`Товар "${firstProduct.title}" в корзине после удаления:`, cartCheck.hasItem(firstProduct.id));
    
    console.log('Очистка корзины');
    cartCheck.clear();
    console.log('Количество товаров после очистки:', cartCheck.getCount());
    console.log('Общая сумма после очистки:', cartCheck.getTotalPrice());
    console.log('Корзина пустая:', cartCheck.getCount() === 0);
}



console.log('==Buyer==');

const buyerCheck = new Buyer();

buyerCheck.setData({
    email: 'test@example.com',
    phone: '+79999999999',
    address: 'Test Address',
    payment: 'online'
});

console.log('Данные Buyer:', buyerCheck.getData());

const validation = buyerCheck.validate();
console.log('Проверка валидации:', validation);

buyerCheck.clear();
console.log('Очистка данных:', buyerCheck.getData());

console.log("-- Api --")

const baseApi = new Api(API_URL);
console.log("server", baseApi)
const productApiData = new ProductApiData(baseApi);
const productList = new Products();


productApiData.getProduct()
    .then(products => {
        productList.setItems(products);
        console.log('Товары загружены:', productList.getItems());
    })
    .catch(error => console.error('Ошибка:', error));

