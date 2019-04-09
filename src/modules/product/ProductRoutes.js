const express = require('express');
const ProductMiddleWares = require('./ProductMiddlewares');
const AuthM = require('../../AuthMiddlewares');
const router = express.Router();

router.param('productId', ProductMiddleWares.loadProductFromParams);

router.route(`/`)// /ALL /api/product/
    .get(ProductMiddleWares.showAllProducts)
    .post(ProductMiddleWares.createProduct);
router.route('/:productId')// : pour la variable
    .get(ProductMiddleWares.showProduct)
    .put(ProductMiddleWares.updateProduct)
    .delete(AuthM.hasValidAuthorizationToken, ProductMiddleWares.deleteProduct);
module.exports = router;
