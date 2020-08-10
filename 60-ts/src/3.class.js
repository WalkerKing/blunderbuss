var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Greeter = /** @class */ (function () {
    function Greeter(message) {
        this.greeting = message;
    }
    Greeter.prototype.greet = function () {
        return 'Hello,' + this.greeting;
    };
    return Greeter;
}());
var greeter = new Greeter('world');
console.log(greeter.greet());
var Animal = /** @class */ (function () {
    function Animal(theName) {
        this.name = theName;
    }
    Animal.prototype.move = function (distanceInmeters) {
        if (distanceInmeters === void 0) { distanceInmeters = 0; }
        console.log("Animal moved " + distanceInmeters + ".");
    };
    return Animal;
}());
//Dog是一个 派生类，它派生自 Animal 基类，通过 extends关键字。 派生类通常被称作 子类，基类通常被称作 超类。
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Dog.prototype.bark = function () {
        console.log('Woof! Woof!');
    };
    return Dog;
}(Animal));
// const dog = new Dog();
// dog.bark();
// dog.move(10);
// dog.bark();
// 派生类包含了一个构造函数，它 必须调用 super()，它会执行基类的构造函数。 而且，在构造函数里访问 this的属性之前，我们 一定要调用 super()。 这个是TypeScript强制执行的一条重要规则。
var Snake = /** @class */ (function (_super) {
    __extends(Snake, _super);
    function Snake(name) {
        return _super.call(this, name) || this;
    }
    Snake.prototype.move = function (distanceInmeters) {
        if (distanceInmeters === void 0) { distanceInmeters = 5; }
        console.log('Slithering......');
        _super.prototype.move.call(this, distanceInmeters);
    };
    return Snake;
}(Animal));
var Horse = /** @class */ (function (_super) {
    __extends(Horse, _super);
    function Horse(name) {
        return _super.call(this, name) || this;
    }
    Horse.prototype.move = function (distanceInmeters) {
        if (distanceInmeters === void 0) { distanceInmeters = 45; }
        console.log('Galloping...');
        _super.prototype.move.call(this, distanceInmeters);
    };
    return Horse;
}(Animal));
var sam = new Snake('Sammy the python');
var tom = new Horse('Tommy the Palomino');
sam.move();
tom.move(34);
// proxyTable: {
//         '/user/get-list': {
//             target: 'http://adminapi.dev.koibone.net/',
//             changeOrigin: true,
//             // pathRewrite: {
//             //     '^/api': '/'
//             // }
//         },
//     }
