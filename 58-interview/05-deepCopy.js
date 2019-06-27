const deepCopy = function (p, c) {
    c = c || {};
    for (let i in p) {
        if(typeof p[i] === 'object'){
            c[i] = Array.isArray(p[i]) ? [] : {};
            deepCopy(p[i], c[i])
        }else{
            c[i] = p[i]
        }
    }
    return c
}

let a = {
    a: {
        d:[1,2,3],
        e:2
    },
    b: 2,
    c: 3
}
let ca = deepCopy(a);
ca.a.d = 10;
console.log(ca);
console.log(a);