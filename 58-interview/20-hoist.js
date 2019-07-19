var num = 100;
function print() {
    console.log(num)
    var num
}
print();

(function (num) {
    console.log(num)
    var num = 10
})(100);

(function (num) {
    console.log(num)
    var num = 10
    function num() {}
})(100);