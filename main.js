Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
         <div class="product">

            <div class="product-image">
                <img :src="image">
            </div>

            <div class="product-info">
                <h1>{{title}}</h1>
                <p v-if="inStock > 0">in stock</p>
                <p v-else>out of stock</p>
                <p>Shipping cost: {{shipping}}</p> 

                <ul>
                    <li v-for="detail in details">{{detail}}</li>
                </ul>

                <!--v-bind:key=" " & v-bind:styles=" "-->
                <div v-for="(variant, index) in variants" :key="variant.variantId" class="color-box" :style="{ backgroundColor: variant.variantColor }" @mouseover="updateProduct(index)">
                    <!--v-on:mouseover="udateProduct-->
                </div>

                <!-- v-on:click="cart += 1"> for simple increment-->
                <button v-on:click="addToCart" :disabled="!inStock" :class="{ disabledButton: !inStock}">
                Add to Cart</button>
               
            </div>
        </div>
    
    `,
    data() {
        return {
            brand: 'Vue Mastery',
            product: 'Socks',
            selectedVaraint: 0,
            details: [
                "80% cotton", "20% polyester", "Gender-neutral"
            ],
            variants: [{
                    variantId: 2234,
                    variantColor: "Green",
                    variantImage: './assets/vmSocks-green.jpg',
                    variantQuantity: 10
                },
                {
                    variantId: 223,
                    variantColor: "Blue",
                    variantImage: "./assets/vmSocks-blue.jpg",
                    variantQuantity: 0
                },
            ],
        }
    },
    methods: {
        addToCart: function() {
            //sends message to the parent for global event emition
            this.$emit('add-to-cart', this.variants[this.selectedVaraint].variantId)
        },
        updateProduct: function(index) {
            this.selectedVaraint = index
            console.log(index)
        }
    },
    computed: {
        title: function() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVaraint].variantImage
        },
        inStock: function() {
            return this.variants[this.selectedVaraint].variantQuantity
        },
        shipping() {
            if (this.premium) {
                return 'free'
            }
            return 49.90
        }
    }
})


var app = new Vue({
    el: '#app',
    data: {
        premium: false,
        cart: [],
    },
    methods: {
        updateCart: function(id) {
            this.cart.push(id)
        }
    },

});