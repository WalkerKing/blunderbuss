const express = require('express');
const router = express.Router();

// 表单提交
router.get('/:name', (req, res, next) => {
    // let form = fs.readFileSync('./form.html', {encoding: 'utf8'});
    // res.send(form);
    // res.sendFile(__dirname + '/form.html');
    
    // let person = req.params.name;
    let data = {age: 29, hobbies: ['eating', 'fighting', 'studying']}
    res.render('form', {data: data})
});

module.exports = router;
