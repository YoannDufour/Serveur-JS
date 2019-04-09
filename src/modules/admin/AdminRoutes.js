const express = require('express');
const AuthM = require('../../AuthMiddlewares');
const router = express.Router();


router.route(`/`)
    .post(AuthM.isAdmin);
module.exports = router;