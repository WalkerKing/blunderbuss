const express = require('express');
const router = express.Router();
const admin = require('./admin');
const mall = require('./mall');

router.use('/', mall);
router.use('/admin', admin);

module.exports = router;