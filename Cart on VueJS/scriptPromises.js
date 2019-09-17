'use strict';

Vue.component('goods-list', {
    props: ['goods'],
    template: `
      <div class="goods-list">
        <goods-item v-for="good in goods"
        :key='good.id'
        @add-to-cart-item='addToCartList'
        :good="good"></goods-item>
      </div>
    `,
    methods: {
        addToCartList(good) {
            this.$emit('add-to-cart-list', good);
        },
        
    }

});


Vue.component('goods-item', {
    props: ['good'],
    template: `
        <div class="goods-item">
            <h3>{{good.product_name}}</h3>
            <p class='price-text'>{{good.price}} $</p>
            <button class='buy-good' @click='addToCart'>Купить</button>
        </div>
    `,
    methods: {
        addToCart() {
            this.$emit('add-to-cart-item', this.good);
        }
    }
});

Vue.component('search', {
    data() {
        return {
            searchLine: ''
        }
    },
    template: `
        <div class="search">
            <form @submit.prevent="$emit('search', searchLine)"> 
                <input type="text" class="goods-search" v-model='searchLine'>
                <button class="search-button" type="submit">Искать</button>
            </form>
        </div>
    `
});

Vue.component('cart', {
    data (){
        return {
            cartInfo: false,
        }
    },
    
    props: ['goodsInCart'],
    template: `
        <div class="cart" v-if='toggleCart' >
            <button class='cart-button' @click='cartShow'>Корзина</button>
        </div>
    `,
    computed: {
        toggleCart() {
            if (this.goodsInCart.length === 0) {
                return false;
            } else {
                return true;
            }
        },
    },

    methods: {
        cartShow(){
        this.$emit('cart-info-show')
        },
    }
    
});


Vue.component('cart-list', {
    props: ['goodsInCart'],
    template: `
      <div class="cart-list" v-if='toggleCart'>
        <cart-item v-for="prod in goodsInCart"
        :key='prod.id'
        @remove-from-cart-item='removeFromCartList'
        :prod="prod"></cart-item>
       <p>Общая стоимость покупок: {{ totalCartPrice }}$</p>
      </div>
    `,
    methods: {
        removeFromCartList(prod) {
            this.$emit('remove-from-cart-list', prod);
        },
    },
    computed:{
        totalCartPrice(){
            return this.goodsInCart.reduce((sum, prod) => {
                return sum + prod.price
            },0)
        },
        toggleCart() {
            if (this.goodsInCart.length === 0) {
                return false;
            } else {
                return true;
            }
        }
    }
});

Vue.component('cart-item',{
    props: ['prod'],
    template: `
        <div class="cart-item">
            <li>{{prod.product_name}} <span>{{prod.price}} $</span>
            <button @click='removeFromCart'><img src="img/delete.png" alt="del"></button></li>
        </div>
    `,
    methods: {
        removeFromCart() {
            this.$emit('remove-from-cart-item', this.prod);
        }
    }
});









const app = new Vue({
    el: '#app',
    data: {
        goods: [],
        filteredGoods: [],
        goodsInCart: [],
        cartInfo: true,
    },

    methods: {

        filterGoods(value) {
            const regexp = new RegExp(value, 'i');
            this.filteredGoods = this.goods.filter(good => regexp.test(good.product_name))
        },

        addToCart(good) {
            this.makePostRequest('/addToCart', JSON.stringify(good))
        },

        removeFromCart(prod) {
            console.log("removeFromCart");
            this.makePostRequest('/removeFromCart', JSON.stringify(prod))
        },

        cartShow(){
            return this.cartInfo = !this.cartInfo;
        },


        makeGETRequest(url) {
            const xhr = window.XMLHttpRequest ? new window.XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");

            xhr.open('GET', url, true);
            xhr.send();

            return new Promise((resolve, reject) => {
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            resolve(JSON.parse(xhr.responseText));
                        };
                        reject(new Error('Error'));
                    }
                };
            });
        },

        makePostRequest(url, data) {
            const xhr = window.XMLHttpRequest ? new window.XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");

            xhr.open('POST', url, true);
            xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8')

            xhr.send(data);

            return new Promise((resolve, reject) => {
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            resolve(JSON.parse(xhr.responseText));
                        };
                        reject(new Error('Error'));
                    }
                };
            });
        },

       /* updatedsd() {
            this.goods = await this.makeGETRequest('/catalogData');
            this.filteredGoods = this.goods;
            this.goodsInCart = await this.makeGETRequest('/cartData');
        },*/

    },
    async created() {
        try {
            this.goods = await this.makeGETRequest('/catalogData');
            this.filteredGoods = this.goods;
            this.goodsInCart = await this.makeGETRequest('/cartData');
        } catch (err) {
            console.error(err);
        };
    },


    async created() {
        try {
            this.goods = await this.makeGETRequest('/catalogData');
            this.filteredGoods = this.goods;
            this.goodsInCart = await this.makeGETRequest('/cartData');
        } catch (err) {
            console.error(err);
        };
    },
});