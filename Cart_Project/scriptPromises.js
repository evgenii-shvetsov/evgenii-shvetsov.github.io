'use strict';

//Классический xhr запрос

/*function makeGETRequest(url, callback) {
    let xhr;

    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            callback(xhr.responseText);
        }
    }

    xhr.open('GET', url, true);
    xhr.send();
}*/

//Реализация через промис

/*function makeGETRequest(url) {
    return new Promise((resolve, reject) => {
        let xhr;

        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xhr.open('GET', url, true);

        xhr.onload = function () {
            if (this.status === 200) {
                resolve(this.response);
            } else {
                let error = new Error (this.statusText);
                error.code = this.status;
                reject(error);
            }
        };

        xhr.onerror = function() {
            reject (new Error ('Network Error'));
        };

        xhr.send();
    });
}*/

// Использование Fetch

//let makeGETRequest = fetch(url);

function status(response) {
    if (response.status >= 200 && response.status < 300){
        return Promise.resolve(response);
    } else {
        return Promise.reject (new Error (response.statusText))
    }
}

function json (response) {
    return response.json();
}

const API_URL = 'https://github.com/seacompany/seacompany.github.io/tree/master/Cart_Project';

fetch (`${API_URL}/catalog.json`)
    .then(status)
    .then(json)
    .then(function(data) {
        console.log('Request succeeded with JSON response', data);
    }).catch (function (error) {
        console.log('Request failed', error);
    });



class GoodsItem {
    constructor(img, title, description, price) {
        this.img = img;
        this.title = title;
        this.description = description;
        this.price = price;
    }
    render() {
        return `<div class='goods-item'>
                    <img>${this.img}</img>
                    <h3>${this.title}</h3> 
                    <p class='desc-text'>${this.description}</p>
                    <p class='price-text'>${this.price} $</p> 
                    <button class='buy-good'>Купить</button>
                </div>`;
    }
}

/*const API_URL = 'https://github.com/seacompany/seacompany.github.io/tree/master/Cart_Project';*/

class GoodsList {
    constructor() {
        this.goods = [];
    }
    fetchGoods() {
        /*fetchGoods() {
        makeGETRequest(`${API_URL}/catalog.json`, (goods) => {
            this.goods = JSON.parse(goods);
            this.render();
        })?????????
         */
    }
    

    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodsItem = new GoodsItem(good.img, good.title, good.description, good.price);
            listHtml += goodsItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
    }
    //метод, определяющий суммарную стоимость всех товаров
    countTotalPrice() {
        /* вариант через цикл for
        let totalPrice = 0;
        for (let i = 0; i < this.goods.length; i++){
            totalPrice += this.goods[i].price;
        }
        return totalPrice;*/

        /*return this.goods.reduce((totalPrice, good) => totalPrice += good.price, 0) */

        let priceArray = [];
        this.goods.forEach(good => priceArray.push(good.price));
        let totalPrice = priceArray.reduce((sum, current) => {
            return sum + current;
        }, 0);
        return totalPrice;
    }
}

//классы для корзины товаров и элементы корзины товаров.

class CartItem extends GoodsItem {
    constructor() {
        super()
    }
    render() {
        return `<div class='cart-item'>
                    <img>${this.img}</img>
                    <h3>${this.title}</h3> 
                    <p class='desc-text'>${this.description}</p>
                    <p class='price-text'>${this.price} $</p>
                </div>`;
    }
}

class Cart {
    constructor() {
        this.goods = [];
    }
    add(good) {
        this.goods.push(good);
        this.render();
    }

    remove(good) {
        const goodIndex = this.goods.findIndex(item => item.title = good.title);
        this.goods.splice(goodIndex, 1);
        this.render();
    }

    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const cartItem = new CartItem(good.img, good.title, good.description, good.price);
            listHtml += cartItem.render();
        });
        document.querySelector('.cart-list').innerHTML = listHtml;
    }
}


const list = new GoodsList();

window.onload = () => {
    list.fetchGoods();
    console.log(`Общая стоимость всех товаров: ${list.countTotalPrice()}$`);
};
