// 防抖函数: 它在用户不触发事件的时，才触发动作，并且抑制了本来在事件中要执行的动作。
let debounce = function (fn, wait) {
    let timer = null;
    return function () {
        let context = this;
        let args = arguments;
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn.apply(context, args)
        }, wait)
    }
}

// 节流函数
let throttle = function (fn, threshhold) {
    var timeout
    var start = new Date;
    var threshhold = threshhold || 360
    return function () {
        var context = this, args = arguments, curr = new Date() - 0
        clearTimeout(timeout)//总是干掉事件回调
        if (curr - start >= threshhold) {
            console.log("now", curr, curr - start)//注意这里相减的结果，都差不多是160左右
            fn.apply(context, args) //只执行一部分方法，这些方法是在某个时间段内执行一次
            start = curr
        } else {
            //让方法在脱离事件后也能执行一次
            timeout = setTimeout(function () {
                fn.apply(context, args)
            }, threshhold);
        }
    }
}


// let fun = debounce(function (e) {
//     console.log(e)
// }, 500, false);
// window.onresize = function (e) {
//     fun(e)
// }


var resize = throttle(function (e) {
    console.log(e)
});

// 绑定监听
window.addEventListener('resize', resize)
// window.onresize = function (e) {
//     fun(e)
// };
