let obj1 = {
    a: 1,
    b: () => {
        console.log(this.a)
    }
}

let obj2 = {
    a: 2
}

obj1.b.call(obj2)


let obj = {
    fun: () => {
        // console.log(arguments)
        // console.log(this)
        console.log(new.target)
    }

}
obj.fun()



function Foo() {
    console.log(new.target)
    if (!new.target) throw "Foo() must be called with new";
    console.log("Foo instantiated with new");
}

// Foo(); // throws "Foo() must be called with new"
new Foo(); // logs "Foo instantiated with new"