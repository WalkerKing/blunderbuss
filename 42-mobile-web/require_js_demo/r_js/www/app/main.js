define(function (require) {
    // Load any app-specific modules
    // with a relative require call,
    // like:
    var messages = require('./messages');

    // Load library/vendor modules using
    // full IDs, like:
    var print = require('print');

    print(messages.getHello());
});

//另一中写法
// define(["app/messages","print"],function(messages,print){

// print(messages.getHello());
// })

