import './scss/styles.scss';

import { Buyer } from './components/models/Buyer';
import { Product } from './components/models/Product';
import { Card } from './components/models/Card';
import { apiProducts } from './utils/data';
import { ProductApiData } from './components/models/ProductData';
import { API_URL } from './utils/constants';
import { Api } from './components/base/Api';

// Product
console.log('Product');
const productsModel = new Product();
productsModel.setItems(apiProducts.items);
console.log('Массив товаров:', productsModel.getItems());
console.log('Количество товаров:', productsModel.getItems().length);

// Card
console.log('Card');
const cardСheck = new Card();

if (productsModel.getItems().length > 0) {
    const firstProduct = productsModel.getItems()[0];
    cardСheck .addItem(firstProduct);
    console.log('Товар в корзине:', firstProduct.title);
}

console.log('Количество товаров в корзине:', cardСheck .getCount());
console.log('Общая сумма тоавара в корзине:', cardСheck .getTotalPrice());


console.log('Buyer');
const buyerCheck = new Buyer({
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
const API_URLL = 'https://larek-api.nomoreparties.co/api/weblarek'; //Будьте так добры указать на ошибку, мб я не правильно ипортивал домен?, на данный момент пришлось жестко задать ссылку для убеждения работы кода. Заранее спасибо. //
const baseApi = new Api(API_URLL);//должно быть API_URL но не работает, кароче туплю на ровном месте.//
console.log("server", baseApi)
const productApiData = new ProductApiData(baseApi);
const productList = new Product();


productApiData.getProduct()
    .then(products => {
        productList.setItems(products);
        console.log('Товары загружены:', productList.getItems());
    })
    .catch(error => console.error('Ошибка:', error));