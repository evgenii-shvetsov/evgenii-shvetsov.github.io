'use strict';

function makeGETRequest(url, callback) {
    /*const xhr = window.XMLHttpRequest ? new window.XTMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');*/
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
}

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

class GoodsList {
    constructor() {
        this.goods = [];
    }
    fetchGoods() {
        makeGETRequest('catalog.json', (goods) => {
            this.goods = JSON.parse(goods);
            this.render()
        })
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

        /* return this.goods.reduce((totalPrice, good) => totalPrice += good.price, 0) */

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
    console.log(`Общая стоимость всех товаров: ${list.countTotalPrice()}$`)
};