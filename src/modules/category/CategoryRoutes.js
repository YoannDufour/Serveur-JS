const express = require('express');
const CategoryMiddleWares = require('./CategoryMiddlewares');
const AuthM = require('../../AuthMiddlewares');
const router = express.Router();

router.param('categoryId', CategoryMiddleWares.loadCategoryFromParams);

router.route(`/`)// /ALL /api/category/
    .get(CategoryMiddleWares.showAllCategorys)
    .post(AuthM.hasValidAuthorizationToken, CategoryMiddleWares.createCategory);
router.route('/:categoryId/product')
    .get(CategoryMiddleWares.getCategoryProducts);
router.route('/:categoryId')// : pour la variable
    .get(CategoryMiddleWares.showCategory)
    .put(CategoryMiddleWares.updateCategory)
    .delete(AuthM.hasValidAuthorizationToken, CategoryMiddleWares.deleteCategory);


module.exports = router;
