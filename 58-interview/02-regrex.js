let s = '数组调用数组a该方法时没有使用参数，将按a字母顺序对数a组中的元素进行a排序，说得更精确';
let r = s.indexOf('数组',2);
r = s.search('数组')
r = s.match(/数组/)
r = /数组/g.exec(s)
s.replace(/(a)/g, function(kwords, $1) {
    console.log(arguments);
});