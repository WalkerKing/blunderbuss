let MyPromise = function (fn) {
    this.val = null;
    this.rejectFn = function () { };
    this.resolveFn = function () { };
    fn(this.resolve.bind(this), this.reject.bind(this));
}

MyPromise.prototype.resolve = function (val) {
    let _this = this;
    _this.val = val;
    setTimeout(function () {
        _this.resolveFn(_this.val);
    });
}

MyPromise.prototype.reject = function (val) {
    let _this = this;
    _this.val = val;
    setTimeout(function () {
        _this.rejectFn(_this.val);
    });
}

MyPromise.prototype.then = function (resolveCb, rejectCb) {
    this.resolveFn = resolveCb;
    this.rejectFn = rejectCb;
}

// test
let fn = function (resolve, reject) {
    let num = Math.random();
    if (num >= 0.5) {
        resolve('num gt .5');
    } else {
        reject('num lt .5');
    }
}

let p = new MyPromise(fn);
p.then(function (val) {
    console.log('resolve:' + val);
}, function (val) {
    console.log('reject:' + val);
});

// bug
/*
// 在Promise规范当中，规定Promise只能从初始pending状态变到resolved或者rejected状态，是单向变化的，也就是说执行了resolve就不会再执行reject，反之亦然。
var fn = function (resolve, reject) {
    resolve('hello');
    reject('hello again');
}

var p1 = new Promise(fn);
p1.then(function (data) {
    console.log('resolve: ', data)
}, function (data) {
    console.log('reject: ', data)
});
//'resolve: hello'

var p2 = new MyPromise(fn);
p2.then(function (data) {
    console.log('resolve: ', data)
}, function (data) {
    console.log('reject: ', data)
});
*/