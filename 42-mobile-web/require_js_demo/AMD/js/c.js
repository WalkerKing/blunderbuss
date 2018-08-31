/**
 * Created by Administrator on 2017/2/19.
 */
define(['a'], function(a){
    var c = {
        hello: function(){
            console.dir('调用了c的hello方法');
            // var a = require('a');
            a.hello();
        }
    };
    return c;
});