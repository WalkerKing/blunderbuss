Function.prototype._call = function (context) {
    if (typeof this !== 'function') {
        throw 'not a function'
    }
    context = context || window
    let args = [...arguments].slice(1)
    context.fn = this
    let result = context.fn(...args)
    delete context.fn
    return result
}

Function.prototype._apply = function (context) {
    if (typeof this !== 'function') {
        throw 'not a function'
    }
    context = context || window

    context.fn = this

    let result
    if (arguments[1]) {
        result = context.fn(...arguments[1])
    } else {
        result = context.fn()
    }
    delete context.fn
    return result
}

Function.prototype._bind = function (context) {
    if (typeof this !== 'function') {
        throw 'not a function'
    }

    // _this是原函数
    let _this = this
    // 保留调用时传入的参数
    let args = [...arguments].slice(1)
    return function F() {
        if (this instanceof F) {
            return new _this(...args, ...arguments)
        } else {
            return _this.apply(context, args.concat(...arguments))
        }
    }
}
let ctx = {
    a: 1,
    b: 2
}
let ctx2 = {
    a: 10
}
var a = global.a = 10
let fun = function() {
    console.log(this.a)
    return 1
}

console.log(fun._call(ctx))
let fun2 = fun.bind(ctx)
fun2.call(ctx2)