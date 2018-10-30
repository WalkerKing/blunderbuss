const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('admin/login');
});

router.post('/doLogin',(req, res) => {
    res.send('admin user');    
});

module.exports = router;