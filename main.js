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
            
            <div>
                <h2>Reviews</h2>
                <p v-if="!reviews.length">There are no reviews yet</p>
                <ul>
                    <li v-for="review in reviews">
                    <p>{{review.name}}</p>
                    <p>Ratting: {{review.rating}}</p>
                    <p>{{review.review}}</p>
                    </li>

                </ul>
            </div>

            <product-review @review-submitted="addReview"></product-review>
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
            reviews: []
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
        },
        addReview(productReview) {
            this.reviews.push(productReview)
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

//the .prevent stops the default behaviour of the button to refresh the page
//the is an easier way do deal with form validation errors e.g data property name: we just added the word required in the p tag
Vue.component('product-review', {
    template: `
    <form class="review-form" @submit.prevent="onSubmit">

    <p v-if="errors.length">
    <b>Please correct the following error(s):</b>
    <ul>
    <li v-for="error in errors">{{error}}</li>
    </ul>
    </p>

    <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name" required>
    </p>    

    <p>
        <label for="review">Review:</label>
        <textarea id="review" v-model=review></textarea>
    </p>        

    <p>
        <label for="rating">Rating:</label>

        <select id="rating" v-model.number="rating">
        <option>5</option>
        <option>4</option>
        <option>3</option>
        <option>2</option>
        <option>1</option>
        </select>
    </p>

    <p>
        <input type="submit" value="Submit">
    </p>
    </form>
    `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            errors: []
        }
    },
    methods: {
        onSubmit() {
            if (this.review && this.rating) {
                let productReview = {
                        name: this.name,
                        review: this.review,
                        rating: this.rating
                    }
                    //using $emit to send up the productReview variable to parent component, using newly created review-submitted to go there
                this.$emit('review-submitted', productReview)
                this.name = null,
                    this.review = null,
                    this.rating = null
            } else {
                if (!this.review) this.errors.push("Review required")
                if (!this.rating) this.errors.push("Rating required")
            }
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