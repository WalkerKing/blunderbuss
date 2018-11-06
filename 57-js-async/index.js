var fn = function (resolve, reject) {
    console.log('begin to execute!');
    var number = Math.random();
    if (number <= 0.5) {
        resolve('less than 0.5');
    } else {
        reject('greater than 0.5');
    }
}

var p = new Promise(fn);
p.then(function (data) {
    console.log('resolve: ', data);
}, function (data) {
    console.log('reject: ', data);
})