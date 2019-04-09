const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const _ = require("lodash");
const PF = require('./ProductFunctions');

class ProductMiddlewares {

    static loadProductFromParams(req, res, next, productId) {
        PF.getProductById(productId).then(function (product) {
            req.data.product = product;
            return next();
        }, err => next(err));

    }

    static showProduct(req, res, next) {
        if (!req.data.product) {
            return next({message: "Produit introuvable"});
        }
        res.send(req.data.product);
    }


    static showAllProducts(req, res, next) {
        Product.find({}, function (err, allProducts) {
            if (err) {
                return next(err);
            }
            res.send(allProducts);
        });
    }

    static createProduct(req, res, next) {
        const p = new Product(req.body);
        p.save(function (err, productSaved) {
            if (err) {
                return next(err);
            }
            res.send(productSaved);
        });
    }

    static updateProductV2(req, res, next) {
        if (!req.data.product) {
            if (err) {
                return reject({
                    message: "Produit Non existant sur la base de donnée",
                    status: 404
                });
            }
        }
        Product.update(req.data.product,{$set:req.body}, function (err, data) {
            if (err) {
                return next(err);
            }
            res.send({
                message: "Produit mit à jour avec succès"
            });
        });
    }

    static updateProduct(req, res, next) {
        req.data.product = _.extend(req.data.product, req.body);
        req.data.product.save((err, productUpdated) => {
            if (err) {
                return next(err);
            } else {
                res.send(productUpdated);
            }
        });
    }

    static deleteProduct(req, res, next) {
        req.data.product.delete(function (err, data) {
            if (err) {
                return next(err);
            }
            res.send({
                message: "Produit supprimé avec succès"
            });
        });
    }
}

module.exports = ProductMiddlewares;