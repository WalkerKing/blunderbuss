 function Set(){
    this.values = {};                   //  保存集合中的数据
    this.n = 0;                         //  保存集合中的元素个数
    this.add.apply(this, arguments);    //  把所有参数加入到集合中
}
//  向集合中添加元素
Set.prototype.add = function(){
    for(var i = 0; i< arguments.length; i++){
        var val = arguments[i];
        var str = Set._v2s(val);
        if(!this.values.hasOwnProperty(str)){
            this.values[str] = val;
            this.n++;
        }
    }
    return this;    //  支持链式调用
};
//  删除集合中的元素
Set.prototype.delete = function(){
    
};
//  判断集合中是否包含这个数字
Set.prototype.contains = function(value){

}
//  返回集合的大小
Set.prototype.size = function(){
    return this.n;
};
//  遍历集合中的所有元素,在指定的上下文中调用f
Set.prototype.foreach = function(f, context){

};
Set._v2s = function(val){
    switch(val){
        case undefined: return 'u';         //特殊的原始值,值只有一个字母代码
        case null: return 'n';
        case true: return 't';
        case false: return 'f';
        default: switch(typeof val){
            case 'number': return '#' + val;    //  数字以#开头
            case 'string' : return '"' + val;   //  字符串以 " 开头
            default: return '@' + objectid(val);
        }
    }
    function objectid(o){
        var prop = '|**objectid**|';    //私有数次那个,用以存放id
        if(!o.hasOwnProperty(prop)){
            o[prop] = Set._v2s.next++;
        }
        return o[prop];
    }
};
Set._v2s.next = 100;    //  设置初始id为100