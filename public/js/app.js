var app = new Vue({
    el: '#app',
    data: {
        products: {}
    },
    created: function () {
        let vm = this;
        fetch('http://localhost:3000/api/product/').then((response) => {
            return response.json().then((json) => {
                vm.products = json;
            })
        })
    },
    methods: {
        testdelete: function (product, index) {
            //var self = this; sans arrow function
            console.log(product);
            console.log('je passe');
            const options = {
                method: 'delete',
                headers: {

                    'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'Authorization': 'azeaze'
                },
                body:{

                }
            };
            console.log(options);
            fetch('http://localhost:3000/api/product/' + product._id, options)
                .then((response) => {
                    this.products.splice(index, 1)
                    /* .then(function (response) {
                    self.products.splice(index, 1)*/
                }, err => {
                    console.error('Request failed', err);
                })
        }
    }
});