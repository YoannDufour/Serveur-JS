const mongoose = require('mongoose');
const Product = mongoose.model('Product');

class ProductFunctions {

    static getProductById(productId) {
        return new Promise(function (resolve, reject) {
            Product.find({"_id": productId}).populate("associe").exec(function (err, product) {
                if (err) {
                    return reject({
                        message: "Produit Non existant sur la base de donnée",
                        status: 404
                    });
                }
                resolve(product[0]);
            });
        })
    }

}

module.exports = ProductFunctions;