const mongoose = require('mongoose');
const Category = mongoose.model('Category');
const Product = mongoose.model('Product');
const _ = require("lodash");
const PF = require('./CategoryFunctions');

class CategoryMiddlewares {

    static loadCategoryFromParams(req, res, next, categoryId) {
        PF.getCategoryById(categoryId).then(function (category) {
            req.data.category = category;
            return next();
        }, err => next(err));

    }

    static showCategory(req, res, next) {
        if (!req.data.category) {
            return next({message: "Categorie introuvable"});
        }
        res.send(req.data.category);
    }


    static showAllCategorys(req, res, next) {
        Category.find({}, function (err, allCategorys) {
            if (err) {
                return next(err);
            }
            res.send(allCategorys);
        });
    }

    static createCategory(req, res, next) {
        const p = new Category(req.body);
        p.save(function (err, categorySaved) {
            if (err) {
                return next(err);
            }
            res.send(categorySaved);
        });
    }

    static updateCategory(req, res, next) {
        if (!req.data.category) {
            if (err) {
                return reject({
                    message: "Categorie Non existant sur la base de donnée",
                    status: 404
                });
            }
        }
        Category.update(req.data.category, req.body, function (err, data) {
            if (err) {
                return next(err);
            }
            res.send({
                message: "Categorie mit à jour avec succès"
            });
        });
    }

    static updateCategoryV2(req, res, next) {
        req.data.category = _.extend(req.data.category, req.body);
        req.data.category.save((err, categoryUpdated) => {
            if (err) {
                return next(err);
            } else {
                res.send(categoryUpdated);
            }
        });
    }

    static deleteCategory(req, res, next) {
        req.data.category.delete(function (err, data) {
            if (err) {
                return next(err);
            }
            res.send({
                message: "Categorie supprimé avec succès"
            });
        });
    }

    static getCategoryProducts(req, res, next) {
        Product.find({"associe": req.params.categoryId}).exec(function (err, products) {
            if (err) {
                return next(err);
            }
            res.send(products);
        });
    }
}

module.exports = CategoryMiddlewares;