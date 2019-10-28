var app = new Vue({
    el: '#app',
    data: {
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
        cart: 0,
    },
    methods: {
        addToCart: function() {
            this.cart += 1
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
        }
    },
});