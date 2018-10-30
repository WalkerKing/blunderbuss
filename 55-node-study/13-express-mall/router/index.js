const express = require('express');
const router = express.Router();
const admin = require('./admin/index');
const index = require('./mall/index');

router.use('/', index);
router.use('/admin', admin);

module.exports = router;