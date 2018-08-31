var PublicRenderView = {};
var ua = navigator.userAgent.toLocaleLowerCase();
var pf = navigator.platform.toLocaleLowerCase();
var isAndroid = (/android/i).test(ua)||((/iPhone|iPod|iPad/i).test(ua) && (/linux/i).test(pf)) || (/ucweb.*linux/i.test(ua));
var isIOS =(/iPhone|iPod|iPad/i).test(ua) && !isAndroid;
var isWinPhone = (/Windows Phone|ZuneWP7/i).test(ua);
var mobileType = {
    pc:!isAndroid && !isIOS && !isWinPhone,
    ios:isIOS,
    android:isAndroid,
    winPhone:isWinPhone
};


var RenderViewCount = 0;
var RenderViewObjCount = 0;
    //当前框架信息


var RenderViewCurrent = {
    frameid:'',
    current:'',
    order:''
};   //当前角度


var RenderViewClear = '';
(function($){
    var _OrderId = 0;
    $.fn.extend({
        'Fuck':function(options){
            RenderViewCurrent.order = JSON.parse(JSON.stringify(options.order_infor.order));
            //判断当前角度
            if(RenderViewCurrent.frameid == options.order_infor.orderid){
                if(RenderViewCurrent.current != '0'){
                    options.detail_angle = RenderViewCurrent.current;
                }
            }else{
                RenderViewCurrent.frameid = options.order_infor.orderid;
                RenderViewCurrent.current = '0';;
            }

            window['RenderView-' + (++RenderViewObjCount)] = new Angle(this , options);//.init(this , options);
            try{
                if(this.attr('data-change')){

                    clearInterval(window[RenderViewClear].methods.pageTimer[RenderViewClear]);
                    //移动端抖动问题
                    window[RenderViewClear].methods.count = 0;
                    window[RenderViewClear] = null;
                    if(!mobileType.pc){
                        this.unbind('touchstart');
                        this.unbind('touchmove');
                        this.unbind('touchend');
                    }else{
                        this.unbind('mousedown');
                        this.unbind('mousemove');
                        this.unbind('mouseup');
                    }
                }
            }catch(err){}
            RenderViewClear = 'RenderView-' + RenderViewObjCount;
                
            if(options == 'close'){
                // clearInterval(window[RenderViewClear].methods.pageTimer[RenderViewClear]);
                // window[RenderViewClear].methods.pageTimer[RenderViewClear] = null;
            }else{
                var opts = $.extend({},window['RenderView-' + RenderViewObjCount].init(this , options));//new Angle(this , options).init(this , options));  //覆盖原默认参数
            }
            // var opts = $.extend({},methods,{orderid:'58847d32c98ceaf8308b46f4'});  //覆盖原默认参数
            // 初始化
            
            //opts.init(this,options);
            // opts.init(this,{orderid:'58847d32c98ceaf8308b46f4'});
        }
    })
    function Angle(){
        this.methods = {
            offset:20,    //偏移量
            num:36,		  //渲染数量
            count:0,
            oldurl: CONFIG.dataHost + '/api.php',   //  假名换真名
            url: CONFIG.renderHost + '/api.php',    //  渲染接口
            imgurl: CONFIG.IMGPath,
            arr:[],
            isArr:[],
            Val:{},
            data:{},
            dataNew:[],
            dataTrue:{
            
            },
            FrameNumber:'',
            NowImg:'',
            Img:new Image(),
            $this:'',
            pageTimer:{},
            TheEvents:function(){
                var Events = {
                };
                if(mobileType.pc){
                    Events.start = 'mousedown';
                    Events.move = 'mousemove';
                    Events.end = 'mouseup';
                }else{
                    Events.start = 'touchstart';
                    Events.move = 'touchstart';
                    Events.end = 'touchend';
                }
                return Events;
            },
        }
    };
    $.extend(Angle.prototype,{

        init:function($this,options){
            var ParentThis = this;
            this.methods.$this = $this;
            $this.attr('data-id','RenderView-' + (++RenderViewCount) )
            //调用渲染定时器

            //判断横竖平是否切换　，切换了　重新加载
            window.onresize = function (){
                //this.methods.Img.crossOrigin="Anonymous";
                var cc = $this.find('canvas')[0];
                var cxtc=c.getContext("2d");
                ParentThis.methods.Img.src = ParentThis.methods.NowImg;
                    //定义原点
                var ImgX = (cc.width - ParentThis.methods.Img.width) / 2;
                var ImgY = (cc.height - ParentThis.methods.Img.height) / 2;

                cxtc.clearRect(0,0,cc.width,cc.height);
                cxtc.drawImage(ParentThis.methods.Img,ImgX,ImgY)
            }
            var c = $this.find('canvas')[0];
            var cxt=c.getContext("2d");
            cxt.clearRect(0,0,c.width,c.height);
            if(options.camera.type == 3){
                $this.css('background','url("../src/img/design/renderview-loading-bak.gif") no-repeat center');
                $this.css('background-size','100px')
            }else{
                $this.css('background','url("../src/img/design/loading.svg") no-repeat center');
                $this.css('background-size','30px 100%');
            }
            this.setInter();
            $this.css('cursor','pointer');
            this.methods.Event = $this;
            this.methods.count = Number(this.methods.Event.attr('data-angle')) || 0,//0,      //计数
            this.methods.Argument = options;
            this.methods.data.bom_node_id = options.orderid;
            var Type;
            if(options.render_type == '360'){
                Type = 'circle';
            }
            this.methods.count = Number(options.detail_angle)/10;
            this.methods.data.type = Type;
            this.methods.data.scene_setting = options.scene;
            this.methods.data.camera_setting = options.camera;
            this.methods.data.light_setting = options.light;
            this.methods.data.size = ''; //分辨率
            this.methods.data.order = ''; //配置选项
            this.methods.data.other_setting = ''; //其他参数


            this.methods.dataTrue['1'] = options.order_infor;
            this.methods.dataTrue['2'] = options.light;
            this.methods.dataTrue['3'] = options.camera;
            this.methods.FrameNumber = options.number;
            var dd = $this.parent().parent().parent().parent();
            this.methods.oo = dd.attr('data-order');
            this.methods.ii = dd.attr('data-orderid');

            if(options.type == '360'){
                this.methods.num = options.render_qty;
            }

            //创建图片域
            $('body').append('<'+$this.attr('data-id')+' style="display:none;"></'+$this.attr('data-id')+'>');
            //执行此方法  调用渲染接口
            //清除定时器
            clearInterval(this.methods.pageTimer[this.methods.$this.attr('data-id')]);
            $this.unbind(this.methods.TheEvents().start);
            $this.unbind(this.methods.TheEvents().end);
            $this.unbind(this.methods.TheEvents().move);
            this.methods.arr = [];
            this.creatArr();
            this.loading(this.methods.Argument.orderid);
            this.loader($this);
            if(options.camera.type != 3){
                this.handle($this,this.methods.Argument.orderid);
            }
            if(options.render_type == '360' && options.drag){
                // type == -1  设置是否允许旋转
                //this.handle($this,this.methods.Argument.orderid);
            }
            if(options.render_type == '360' && options.rotate_at){
                var Rotation = setInterval(function(){
                    if(this.methods.count*10 > Number(options.rotate_at)){
                        this.methods.count--;
                    }else{
                        this.methods.count++;
                    }
                    this.methods.Event.css({
            //            'background-image':'url("'+ methods.imgurl + methods.arr[methods.count][0]+'")'
                    })
                    //设置ＲｅｎｄｅｒＶｉｅｗ　每次切换时的默认角度
                    this.methods.Argument.detail_angle = this.methods.count*10;
                    if(this.methods.count*10 == options.rotate_at){
                        clearInterval(Rotation);
                    }
                },Number(options.speed))
            }
            //methods.render(methods.count,methods.Argument.orderid,true);
            //$('#myCar').attr('data-angle','0');
        },
        creatArr:function(){
            // 根据图片数量生成数组
            var angle = 360/(360/this.methods.num);
            var Num = 360/this.methods.num;
            for(var i = 0 ; i < angle ; i++){
                this.methods.arr[i]=['src/img/loading_sofa.gif', (i * Num),false]
            };
        },
        onload:function(orderid){
        },
        isImg:function(arr,val){
            for(var i = 0; i < arr.length; i++){
                if(arr[i] == val){
                    return true;
                }
            }
            return false;
        },
        loading:function(orderid){
            var ParentThis = this;
            var CanvasW = this.methods.$this.find('canvas').attr('width');
            // 加载数据
            //var Angle = methods.Event.attr('data-angle') || 0;
            var pm = new pmsg();
            pm.cmd = 'mrender';
            pm.subcmd = 'render';
            //pm.val = methods.data;
            if(CanvasW == '137'){
                var dd = this.methods.$this.parent().parent().parent().parent();
                var ddhistory = this.methods.$this.parent().parent().parent();

                if(!dd.attr('data-order')){  //历史记录　单独加载
                    this.methods.oo = ddhistory.attr('data-order');
                    this.methods.ii = ddhistory.attr('data-orderid');
                }else{    // 其他页面加载
                    this.methods.oo = dd.attr('data-order');
                    this.methods.ii = dd.attr('data-orderid');
                }
                this.methods.dataTrue['1'].orderid = this.methods.ii;
                this.methods.dataTrue['1'].order = eval('('+this.methods.oo+')');
            }
            var options = {
                'options':this.methods.dataTrue,
                'number':this.methods.FrameNumber
            };
            PublicRenderView.pm = pm;
            pm.val = options;//methods.dataTrue;
            Send(this.methods.url , pm , function(ret,msg){
                //console.log(pm);
                //console.log(options);
                //console.log(RenderViewCurrent.order);
                //console.log(pm.val.options[1].order);
                //console.log(JSON.stringify(RenderViewCurrent.order))
                console.log('pm::::::'+JSON.stringify(pm.val.options[1].order))
                console.log('current::::::'+JSON.stringify(RenderViewCurrent.order))
                console.log(JSON.stringify(RenderViewCurrent.order) === JSON.stringify(pm.val.options[1].order));
                if(JSON.stringify(RenderViewCurrent.order) != JSON.stringify(pm.val.options[1].order) && pm.val.options[3].type == '-1'){
                    return; 
                }
                try{
                    if(!msg.val.cache){
                        if(pm.val.options[3].type == 3){
                            ParentThis.methods.$this.css('background','url("../src/img/design/renderview-loading-bak.gif") no-repeat center');
                            ParentThis.methods.$this.css('background-size','100px')
                        }else{
                            ParentThis.methods.$this.css('background','url("../src/img/design/loading.svg") no-repeat center');
                            ParentThis.methods.$this.css('background-size','30px 100%');
                        }

                        //ParentThis.methods.$this.css('background','url("../src/img/design/loading.svg   ") no-repeat center');
                        //if(CanvasW == '137'){
                        //    ParentThis.methods.$this.css('background-size','30px 100%');
                        //}else{
                        //    ParentThis.methods.$this.css('background-size','30px 100%');
                        //}
                    }else{
                        //ParentThis.methods.$this.css('background','');
                    }
                    var CacheLen = 0;
                    msg = msg.val.cache;
                    /**************************** New Angle Start ****************************/
                    var $ImgName = [];
                    for(var key in msg){
                        CacheLen++;
                        $ImgName.push(msg[key]);
                    }
                    if($ImgName.length == 0) return ;
                    var IMGpm = new pmsg();
                    IMGpm.cmd = 'sserverRelay';
                    IMGpm.subcmd = 'nameToSrcname';
                    IMGpm.val = {
                        'type':'image',
                        'name': $ImgName
                    };
                    Send(ParentThis.methods.oldurl , IMGpm , function(ret,cmsg){
                        try{
                            cmsg = cmsg.val;

                        }catch(e){ debugger;}
                        console.log(cmsg);
                        for(var key in msg){
                            ParentThis.methods.arr[key/10][0] = cmsg.srcname[msg[key]];
                            ParentThis.methods.arr[key/10][1] = key/10;
                            ParentThis.methods.arr[key/10][2] = true;

                            //var AddImg = ParentThis.methods.imgurl + ParentThis.methods.arr[key/10][0];
                            //var ImgBool = ParentThis.isImg(ParentThis.methods.isArr,AddImg)
                            //if(!ImgBool){
                            //    $('body').find(ParentThis.methods.$this.attr('data-id')).append('<img src="'+ParentThis.methods.imgurl + ParentThis.methods.arr[key/10][0]+'"/>')
                            //    //alert(ParentThis.methods.Argument.detail_angle);
                            //}
                        }
                        var AngleImgs = new Image();
                        AngleImgs.src=ParentThis.methods.imgurl + cmsg.srcname[msg[ParentThis.methods.Argument.detail_angle]];
                        AngleImgs.onload = function(){
                            for(var key in msg){
                                //ParentThis.methods.arr[key/10][0] = cmsg.srcname[msg[key]];
                                //ParentThis.methods.arr[key/10][1] = key/10;
                                //ParentThis.methods.arr[key/10][2] = true;

                                var AddImg = ParentThis.methods.imgurl + ParentThis.methods.arr[key/10][0];
                                var ImgBool = ParentThis.isImg(ParentThis.methods.isArr,AddImg)
                                if(!ImgBool){
                                    $('body').find(ParentThis.methods.$this.attr('data-id')).append('<img src="'+ParentThis.methods.imgurl + ParentThis.methods.arr[key/10][0]+'"/>')
                                    //alert(ParentThis.methods.Argument.detail_angle);
                                }
                            }
                        }
                        var HideAreaLen = $('body').find(ParentThis.methods.$this.attr('data-id')).find('img').length;
                        var HideAreaImg = $('body').find(ParentThis.methods.$this.attr('data-id')).find('img');
                        for(var i = 0 ; i < HideAreaLen ; i++){
                            ParentThis.methods.isArr.push(HideAreaImg.eq(i).attr('src'));
                        }
                        if(ParentThis.methods.imgurl + ParentThis.methods.arr[ParentThis.methods.count][0] != ParentThis.methods.Img.src){
                             ParentThis.render(ParentThis.methods.count,null,true,ParentThis.methods.$this)
                        }else{
                            //var c = ParentThis.methods.$this.find('canvas')[0];
                            //var cxt=c.getContext("2d");
                            //cxt.clearRect(0,0,c.width,c.height);
                        }
                        console.log(ParentThis.methods.arr);
                    });
                    if(CacheLen == '36'){   
                        clearInterval(ParentThis.methods.pageTimer[ParentThis.methods.$this.attr('data-id')]);
                    }
                    if(options.options[3].type == '3'){
                        if(CacheLen == '1'){   
                            clearInterval(ParentThis.methods.pageTimer[ParentThis.methods.$this.attr('data-id')]);
                        }
                    }

                    /**************************** New Angle End ****************************/


                    /**************************** Old Angle Start ****************************/
                    //for(var key in msg){
                    //    CacheLen++;
                    //    var cpm = new pmsg();
                    //    cpm.cmd = 'sserverRelay';
                    //    cpm.subcmd = 'nameToSrcname';
                    //    cpm.val = {
                    //        'type':'image',
                    //        'name': msg[key]
                    //    }
                    //    Send(ParentThis.methods.oldurl , cpm , function(ret,cmsg,count){
                    //        var Index = Number(count);
                    //        //console.log(count);
                    //        console.log('pm::::::'+JSON.stringify(pm.val.options[1].order))
                    //        console.log('current::::::'+JSON.stringify(RenderViewCurrent.order))
                    //        console.log(JSON.stringify(RenderViewCurrent.order) === JSON.stringify(pm.val.options[1].order));
                    //        //if(JSON.stringify(RenderViewCurrent.order) != JSON.stringify(pm.val.options[1].order)){
                    //        //    return; 
                    //        //}
                    //        cmsg = cmsg.val; 
                    //        ParentThis.methods.arr[Index/10][0] = cmsg.srcname[msg[count]];
                    //        ParentThis.methods.arr[Index/10][1] = count;
                    //        ParentThis.methods.arr[Index/10][2] = true;
                    //        //ParentThis.methods.isArr[Index/10] = ParentThis.methods.imgurl + cmsg.srcname[msg[count]];

                    //        //加入图片域
                    //        var HideAreaLen = $('body').find(ParentThis.methods.$this.attr('data-id')).find('img').length;
                    //        var HideAreaImg = $('body').find(ParentThis.methods.$this.attr('data-id')).find('img');
                    //        for(var i = 0 ; i < HideAreaLen ; i++){
                    //            ParentThis.methods.isArr.push(HideAreaImg.eq(i).attr('src'));
                    //        }
                    //        var AddImg = ParentThis.methods.imgurl + ParentThis.methods.arr[Index/10][0];
                    //        var ImgBool = ParentThis.isImg(ParentThis.methods.isArr,AddImg)
                    //        if(!ImgBool){
                    //            $('body').find(ParentThis.methods.$this.attr('data-id')).append('<img src="'+ParentThis.methods.imgurl + ParentThis.methods.arr[Index/10][0]+'"/>')
                    //        }
                    //        //for(var i = 0 ; i < HideAreaLen ; i++){
                    //        //}
                    //        if(ParentThis.methods.imgurl + ParentThis.methods.arr[ParentThis.methods.count][0] != ParentThis.methods.Img.src){
                    //             ParentThis.render(ParentThis.methods.count,null,true,ParentThis.methods.$this)
                    //        }else{
                    //            //var c = ParentThis.methods.$this.find('canvas')[0];
                    //            //var cxt=c.getContext("2d");
                    //            //cxt.clearRect(0,0,c.width,c.height);
                    //        }
                    //    },key)
                    //    if(CacheLen == '36'){   
                    //        clearInterval(ParentThis.methods.pageTimer[ParentThis.methods.$this.attr('data-id')]);
                    //    }
                    //    if(options.options[3].type == '3'){
                    //        if(CacheLen == '1'){   
                    //            clearInterval(ParentThis.methods.pageTimer[ParentThis.methods.$this.attr('data-id')]);
                    //        }
                    //    }
                    //}

                    /**************************** Old Angle End ****************************/

                }catch(err){

                }
                if(ParentThis.methods.arr[ParentThis.methods.count][2]){
                    ParentThis.methods.Event.css({
                        //'background-image':'url("'+ this.methods.imgurl + this.methods.arr[this.methods.count][0]+'")'
                    })
                }
            })
        },
        render:function(count,orderid,bool,$this){  //渲染
            RenderViewCurrent.current = count*10;
            var ParentThis = this;
            var c = this.methods.$this.find('canvas')[0];
            var cxt=c.getContext("2d");
            var img=new Image();
            var CanvasW = this.methods.$this.find('canvas').attr('width');
            this.methods.$this.css('overflow','hidden');
            // img.crossOrigin="Anonymous";
            this.methods.Img.src= this.methods.imgurl + this.methods.arr[this.methods.count][0];
            if(CanvasW == '137'){
                this.methods.Img.width = 150;
                this.methods.Img.height = 112;
            }
            //this.methods.Img.crossOrigin= "Anonymous";
            console.log(this.methods)
            if(this.methods.arr[this.methods.count][0] == 'src/img/loading_sofa.gif'){
                cxt.clearRect(0,0,c.width,c.height);
            
                if(this.methods.Argument.camera.type == 3){
                    $this.css('background','url("../src/img/design/renderview-loading-bak.gif") no-repeat center');
                    $this.css('background-size','100px')
                }else{
                    $this.css('background','url("../src/img/design/loading.svg") no-repeat center');
                    $this.css('background-size','30px 100%');
                }
                PublicRenderView.url = '';
                return false;
            }else{
                // $this.css('background','');
            }
            this.methods.NowImg = this.methods.imgurl + this.methods.arr[this.methods.count][0]; 
            PublicRenderView.url = this.methods.imgurl + this.methods.arr[this.methods.count][0];
            //this.methods.Img.crossOrigin="Anonymous";
            this.methods.Img.onload = function(){
                //定义原点
                $this.css('background','');
                var ImgX = (c.width - ParentThis.methods.Img.width) / 2;
                var ImgY = (c.height - ParentThis.methods.Img.height) / 2;
                cxt.clearRect(0,0,c.width,c.height);
                if(CanvasW == 137){
                    cxt.drawImage(ParentThis.methods.Img,ImgX-3,ImgY,ParentThis.methods.Img.width,ParentThis.methods.Img.height);
                }else{
                    cxt.drawImage(ParentThis.methods.Img,ImgX,ImgY);
                }
            }

        },
        indexs:function(degrees){   //获取当前角度下标，
            for(var i = 0 ; i < this.methods.num ; i++){
                if(this.methods.arr[i][1] == degrees){
                    return i;
                }
            }
        },
        setInter:function(){
        },
        arrRepeat:function(dom,url,len){
            for(var i = 0; i < len; i++){
                var name = dom.eq(i);
                if(name == url){
                    return false;
                }
            };
            return true;
        },
        loader:function(degrees,count,bool,orderid){
             var ParentThis = this;
             this.methods.pageTimer[this.methods.$this.attr('data-id')] = setInterval(function(){
                 ParentThis.loading();
             },800)
        },
        handle:function($this,orderid){
             var ParentThis = this;
             var _OrderId = orderid;
             if(!mobileType.pc){
                var TouchStart;
                $this.bind(ParentThis.methods.TheEvents().start,function(even){
                    ParentThis.methods.$this = $this;
                    $this.unbind(ParentThis.methods.TheEvents().end);
                    if(ParentThis.methods.Argument.drag == 'false'){
                        return false;
                    }
                    //点下的X轴
                    var ParentPageX = even.pageX;
                    TouchStart = even.originalEvent.touches[0].pageX;
                });
                $this.bind('touchmove',function(e){
                    e.preventDefault();
                    if(e.originalEvent.touches.length == '1'){
                        var Touch = e.originalEvent.touches[0];

                        var NowPageX = Touch.pageX;
                        //alert(e.pageX);
                        var Ranges = ParentThis.methods.Argument.rotation_range.split('*');
                        //更改坐标值
                        var PX = TouchStart - NowPageX;
                        //判断双向移动距离
                        if(PX >= ParentThis.methods.offset){
                            //左移
                            if(Ranges[0] && Number(Ranges[0]) >= ParentThis.methods.count*10){
                               // alert(1)
                                return false;
                            }
                            ParentThis.methods.count++
                            if(ParentThis.methods.count == ParentThis.methods.num){
                                ParentThis.methods.count = 0;
                            }
                            TouchStart = TouchStart - ParentThis.methods.offset;
                            // 保存角度值
                            $this.attr('data-angle',ParentThis.methods.count);
                            ParentThis.render(ParentThis.methods.count,_OrderId,false,$this)
                        }else if(PX <= -ParentThis.methods.offset){
                            if(Ranges[1] && Number(Ranges[1]) <= ParentThis.methods.count*10){
                               // alert(2)
                                return false;
                            }
                            //右移
                            ParentThis.methods.count--;
                            if(ParentThis.methods.count == -1){
                                ParentThis.methods.count = (ParentThis.methods.num-1);
                            }
                            TouchStart = TouchStart + ParentThis.methods.offset;
                            // 保存角度值
                            $this.attr('data-angle',ParentThis.methods.count);
                            ParentThis.render(ParentThis.methods.count,_OrderId,false,$this)
                        };
                        //设置ＲｅｎｄｅｒＶｉｅｗ　每次切换时的默认角度
                        ParentThis.methods.Argument.detail_angle = ParentThis.methods.count*10;


                    }
                })
             }else{

                 //鼠标 移动事件
                 //$this.on(this.methods.TheEvents().start,function(even){
                 $this.bind(ParentThis.methods.TheEvents().start,function(even){
                     //alert('start');
                     ParentThis.methods.$this = $this;
                     $this.unbind(ParentThis.methods.TheEvents().end);
                     //$('body').css('overflow','hidden');
                     if(ParentThis.methods.Argument.drag == 'false'){
                         return false;
                     }
                     //点下的X轴
                     var ParentPageX = even.pageX;
                     var lastX = even.pageX;
                     //获取操作区域
                     //移动
                     $this.bind(ParentThis.methods.TheEvents().move,function(e){
                         var NowPageX = e.pageX;
                         var Ranges = ParentThis.methods.Argument.rotation_range.split('*');
                         //更改坐标值
                         var PX = lastX - NowPageX;
                         //判断双向移动距离
                         //if(PX <= -this.methods.offset){
                         if(PX >= ParentThis.methods.offset){
                             //左移
                             if(Ranges[0] && Number(Ranges[0]) >= ParentThis.methods.count*10){
                                // alert(1)
                                 return false;
                             }
                             ParentThis.methods.count++;
                             if(ParentThis.methods.count == ParentThis.methods.num){
                                 ParentThis.methods.count = 0;
                             }
                             lastX = lastX - ParentThis.methods.offset;
                             // 保存角度值
                             $this.attr('data-angle',ParentThis.methods.count);
                             ParentThis.render(ParentThis.methods.count,_OrderId,false,$this)
                         }else if(PX <= -ParentThis.methods.offset){
                         //}else if(PX >= this.methods.offset){
                             if(Ranges[1] && Number(Ranges[1]) <= ParentThis.methods.count*10){
                                // alert(2)
                                 return false;
                             }
                             //右移
                             ParentThis.methods.count--;
                             if(ParentThis.methods.count == -1){
                                 ParentThis.methods.count = (ParentThis.methods.num-1);
                             }
                             lastX = lastX + ParentThis.methods.offset;
                             // 保存角度值
                             $this.attr('data-angle',ParentThis.methods.count);
                             ParentThis.render(ParentThis.methods.count,_OrderId,false,$this)
                         };
                         //设置ＲｅｎｄｅｒＶｉｅｗ　每次切换时的默认角度
                         ParentThis.methods.Argument.detail_angle = ParentThis.methods.count*10;
                     })
                     $this.bind(ParentThis.methods.TheEvents().end,function(event){
                         // 解除绑定
                         //alert('end');
                         //$('body').css('overflow','auto');
                         var upPageX = event.pageX;
                         var px = lastX - ParentPageX;
                         if(px <= -ParentThis.methods.offset){
                             ParentThis.render(ParentThis.methods.count,_OrderId,true,$this)
                         }else
                         if(px >= ParentThis.methods.offset){
                             ParentThis.render(ParentThis.methods.count,_OrderId,true,$this)
                         }
                         $this.unbind(ParentThis.methods.TheEvents().move);

                     })
                 });
            }
            $('section .box-tab div').eq(0).on('click',function(){
                is360Render = false;
                clearInterval(ParentThis.methods.pageTimer[ParentThis.methods.$this.attr('data-id')]);
            })
        }
    });


    var Defaluts = {
        // 待定参数
    }


    // 配置参数


})(jQuery);

/*
    1:  BOMID   type=1;
        type = 1;
        rocation: {   //旋转
            'x': ''
            'y': ''
            'z': ''
        }
        position:{    //位置
            'x': ''
            'y': ''
            'z': ''
        }
        order:{
            //选项
        }
        orderid:""
        tag :         //某一个物品影响一个物品的位置
    2:  light
        type = 2;
        rocation: {   //旋转
            'x': ''
            'y': ''
            'z': ''
        }
        position:{    //位置
            'x': ''
            'y': ''
            'z': ''
        }
   -1: 摄像机
        type = -1;
        start_angle:0  //起始角度
        position:{     //位置
            'x': ''
            'y': ''
            'z': ''
        }
        r:          //半径
        height:     //摄像机的高度
        res :       //分辨率
        render :    //渲染类型　　默认normal  circel  boom



    val: [
        {
            "type": "1",
            "rocation" {
            }
        },
        {
            "type": "2",
            "rocation" {
            }
        }
    ]


*/
