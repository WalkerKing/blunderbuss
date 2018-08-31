/**
 * Created by Administrator on 2016/9/7.
 */

var pmsg = function(){
    this.cmd    = '',
    this.subcmd = '',
    this.err    = 0 ,
    this.errmsg = '',
    this.userid = 0,
    this.passwd = '',
    this.ck     = '',
    this.val    =null
};
function isEmpObj(obj){
    if(obj == null) return 0;
    for(var n in obj){return 1}
    return 0;
}
var obj2str = function(_obj)
{
    if(isEmpObj(_obj) == 0)
        return "{}";
    return JSON.stringify(_obj);
};

var debugalert = function (_msg)
{
    //alert(_msg);
}
var Send = function(serveradd, msg, cb){
    var str = JSON.stringify(msg);
    $.ajax({
        type:"post",
        // url:'http://101.201.210.175/orange/'+serveradd,  //公网测试环境
        url:'http://192.168.1.251/orange/'+serveradd,  //内网测试环境
        dataType:'json',
        // contentType:'application/json;charset=utf-8',
        data:{"input":str},
        // jsonp:'callback',
        success:function(data){
            // input:str;
            console.log(data);
            //console.log("success");
            cb(0, data);
        },
        error:function(data){
            console.log("error" + obj2str(data));
            cb(1, null);
        }
    })

};
/*
var GetUser = function(){
    return 1;
};

var GetCK = function(){
    return "34343434";
}

*/