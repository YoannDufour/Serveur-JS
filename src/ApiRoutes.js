const express = require('express')
const productRoutes = require('./modules/product/ProductRoutes');
const categoryRoutes = require('./modules/category/CategoryRoutes')
const adminRoutes = require('./modules/admin/AdminRoutes')
const router = express.Router();

router.use('/category',categoryRoutes);
router.use('/product', productRoutes);
router.use('/admin',adminRoutes);
module.exports = router; // On recupère ça quand on fait un require sur apiRoute.js

