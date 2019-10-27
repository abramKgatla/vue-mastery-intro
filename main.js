var app = new Vue({
    el: '#app',
    data: {
        brand: 'Vue Mastery',
        product: 'Socks',
        image: './assets/vmSocks-green.jpg',
        inStock: false,
        details: [
            "80% cotton", "20% polyester", "Gender-neutral"
        ],
        variants: [{
                variantId: 2234,
                variantColor: "Green",
                variantImage: './assets/vmSocks-green.jpg'
            },
            {
                variantId: 223,
                variantColor: "Blue",
                variantImage: "./assets/vmSocks-blue.jpg"
            },
        ],
        cart: 0,
    },
    methods: {
        addToCart: function() {
            this.cart += 1
        },
        updateProduct: function(variantImage) {
            this.image = variantImage
        }
    },
    computed: {
        title: function() {
            return this.brand + ' ' + this.product
        }
    },
});