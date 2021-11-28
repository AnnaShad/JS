// const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

Vue.component('cart', {
    data(){
      return {
          cartUrl: '/getBasket.json',
          cartItems: [],
          
          showCart: false
      }
    },
    mounted(){
        this.$parent.getJson(`/api/cart`)
            .then(data => {
                for (let item of data.contents){
                    this.$data.cartItems.push(item);
                }
            });
    },
    methods: {
        addProduct(item){
            let find = this.cartItems.find(el => el.id_product === item.id_product);
            if(find){
                this.$parent.putJson(`/api/cart/${find.id_product}`, {quantity: 1})
                    .then(data => {
                        if(data.result === 1){
                            find.quantity++
                        }
                    })
            } else {
                const prod = Object.assign({quantity: 1}, item);
                this.$parent.postJson(`/api/cart`, prod)
                    .then(data => {
                        if(data.result === 1){
                            this.cartItems.push(prod)
                        }
                    })
            }

            // this.$parent.getJson(`${API}/addToBasket.json`)
            //     .then(data => {
            //         if(data.result === 1){
            //             let find = this.cartItems.find(el => el.id_product === item.id_product);
            //             if(find){
            //                 find.quantity++;
            //             } else {
            //                 const prod = Object.assign({quantity: 1}, item);
            //                 this.cartItems.push(prod)
            //             }
            //         }
            //     })
        },
        remove(item){
            this.$parent.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        if(item.quantity>1){
                            item.quantity--;
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1);
                        }
                    }
                })
        },
    },
    template: `<div class="cb">
<button class="cart-button" type="button" @click="showCart = !showCart">Корзина</button>
        <div class="cart-block" v-show="showCart">
            <cart-item v-for="item of cartItems" :key="item.id_product" :img="item.img" :cart-item="item" @remove="remove">
            </cart-item>
        </div>
        </div>
    `
});



Vue.component('cart-item', {
    props: ['cartItem', 'img'],
    template: `
    <div class="cart-item">
            <div class="backet-two bk">
                <div class="backet-img"><img :src="img" alt="Some img"></div>
                    <div class="backet-four">
                        <div class="name">{{ cartItem.product_name }}</div>
                        <div class="quantity">Quantity: {{ cartItem.quantity }} </div>
                        <div class="each">$ {{ cartItem.price }} each</div>
                    </div>
                <div class="backet-three">
                    <div class="backet-price">{{cartItem.quantity*cartItem.price}}$</div>
                    <button class="close" @click="$emit('remove', cartItem)">&times;</button></div>
                </div>
            </div>
        
        
            
             
    `
})



    
               