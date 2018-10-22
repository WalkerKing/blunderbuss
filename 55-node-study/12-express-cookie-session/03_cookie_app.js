const express = require('express');
const app = new express();
const cookieParser = require('cookie-parser');

app.use(cookieParser('123'));
app.get('/ly', function (req, res) {
    var city = req.query.city;
    var cities = req.signedCookies.cities;
    !cities && (cities = []);
    cities.push(city);
    res.cookie('cities', cities, {maxAge: 100000, signed: true});
    res.send('cookie设置成功');
});


app.get('/', function (req, res) {
    console.log(req.signedCookies);
    res.send(req.signedCookies.cities);
});

app.listen(3000, '127.0.0.1')
console.log('sever listen at 127.0.0.1:3000');