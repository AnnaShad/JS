const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class ProductList{
    constructor(container='.products'){
        this.container = container;
        this.goods = [];
        this.sumPrice();
        this._getProducts()
                .then(data => {
                    this.goods = data;
                    this.render()
                }) 
        
    }
 

    _getProducts(){

        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            }); 
    }
    render(){
        const block = document.querySelector(this.container);
        for(let product of this.goods){
            const item = new ProductItem(product);
            block.insertAdjacentHTML("beforeend", item.render());
        } 
    }
    sumPrice() {
        let  sum = 0
        this.goods.forEach(good => {  
            let goodSum = good.price;
            sum += goodSum;
        }); 
        console.log(`Сумма всех товаров ${sum}`); 
    }
}


class ProductItem{
    constructor(product, img = "https://picsum.photos/200"){
        this.product_name = product.product_name;
        this.id = product.id;
        this.price = product.price;
        this.img = img;
        
    }
    render(){
        return `<div class="goods-item">
            <img src = ${this.img} alt="">
            <h3>${this.product_name}</h3>
            <p>${this.price}$</p>
            <button class = "buy-btn">Купить</button>
        </div>`;
    }
}


let list = new ProductList();


class BasketList {
    constructor(cont='.backet') {
        this.cont = cont;
        this.basket = [];
        this._basketProduct()
            .then(data => {
                this.basket = data.contents;
                this.rend()
            })

    }


    _basketProduct() {

        return fetch(`${API}/getBasket.json`)
            .then(res => res.json())
            .catch(error => {
                console.log(error);
            });
    }
    rend() {
        const bloc = document.querySelector(this.cont);
        for (let prod of this.basket) {
            const item = new BasketItem(prod);
            bloc.insertAdjacentHTML("beforeend", item.rend());
        }
    }
    
}


class BasketItem {
    constructor(prod, img = "https://picsum.photos/50") {
        this.product_name = prod.product_name;
        this.id_product = prod.id_product;
        this.price = prod.price;
        this.quantity = prod.quantity;
        this.img = img;

    }
    rend() {
        return `<div class="backet-one">
                        <div class="backet-two bk">
                            <div class="backet-img"><img src= ${this.img} alt=""></div>
                            <div class="backet-four">
                                <h3 class="name">${this.product_name}</h3>
                                <p class="quantity">Quantity <span>${this.quantity}</span></p>
                                <p class="each">2545</p>
                            </div>
                        </div>
                        <div class="backet-three">
                            <h3 class="backet-price">${this.price}</h3>
                        </div>
                 </div>`;
    }
}


let list2 = new BasketList();