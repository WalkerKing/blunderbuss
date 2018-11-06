let MyPromise = function (fn) {
    this.val = null;
    this.status = 'pendding';
    this.rejectFn = function () { };
    this.resolveFn = function () { };
    fn(this.resolve.bind(this), this.reject.bind(this));
}

MyPromise.prototype.resolve = function (val) {
    let _this = this;
    if (_this.status === 'pendding') {
        _this.val = val;
        _this.status = 'resolved';
        setTimeout(function () {
            _this.resolveFn(_this.val);
        });
    }
}

MyPromise.prototype.reject = function (val) {
    let _this = this;
    if (_this.status === 'pendding') {
        _this.val = val;
        _this.status = 'rejected';
        setTimeout(function () {
            _this.rejectFn(_this.val);
        });
    }

}

MyPromise.prototype.then = function (resolveCb, rejectCb) {
    this.resolveFn = resolveCb;
    this.rejectFn = rejectCb;
    return new MyPromise(function (resolveNext, rejectNext) {
        
    });
}


// bug
/*
// 在Promise规范当中，规定Promise只能从初始pending状态变到resolved或者rejected状态，是单向变化的，也就是说执行了resolve就不会再执行reject，反之亦然。

*/

var fn = function (resolve, reject) {
    resolve('hello');
    reject('hello again');
}

// var p1 = new Promise(fn);
// p1.then(function (data) {
//     console.log('resolve: ', data)
// }, function (data) {
//     console.log('reject: ', data)
// });
//'resolve: hello'

var p2 = new Promise(fn);
p2.then(function (data) {
    console.log('resolve: ', data)
}, function (data) {
    console.log('reject: ', data)
})
p2.then(function (data) {
    console.log('resolve: ', data)
}, function (data) {
    console.log('reject: ', data)
})