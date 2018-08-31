/**
 * Created by Administrator on 2017/2/19.
 */
require.config({
    paths:{
        a: 'js/a',
        b: 'js/b',
        c: 'js/c'
    }
});
require(['c','a'], function(c){
    c.hello();
});