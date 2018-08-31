if( window.$ === undefined ){
    throw new Error('render_preview.js依赖jquery，请确保调用本插件之前已引入jquery');
}
$(function(){
    $.fn.render = function( options ){
        var setting = $.extend( {
            order_id: '58be76fac98cea1b718b4933',   //  默认使用天猫咖啡桌的订单
            render_type: '360', //  渲染类型，默认360渲染
            rotation_range: '0,360',    //  旋转范围，默认0-360
            deltaX: 30,     //  用户鼠标拖动50个px，换一张图片
            current_angle: 0,   //  当前显示的图片的角度
            canvas_size:{width:'1000',height:'600'}, //  设置画布大小
            render_qty:36,  //  设置360度需要渲染的总张数
            drag_enable: true,  //  设置是否可以拖拽
            mouse_scroll: true, //  设置是否支持鼠标滚动
            camera_setting:{},  //  设置镜头
            light_setting:{},   //  设置灯光
            scene_setting:{},   //  设置场景
            img_src:'http://imagefile.zesthome.com.cn/modules/lemon/uploads/image/'
        }, options);

        $(this).css({
            width: setting.canvas_size.width + 'px',
            height: setting.canvas_size.height + 'px'
        });
        $(this).children('.renderArea').css({
            width: setting.canvas_size.width + 'px',
            height: setting.canvas_size.height + 'px'
        });

        return this.each(function(){
            var render_obj = {
                showArea: $(this).children('.renderArea'),
                i: 0,
                img_arr: [],
                current_angle: setting.current_angle, //  记录当前显示的图片的编号
                delta_angle: 0,
                timer: null,    //  定时器
                loading_img_src: 'img/loading_sofa.gif',
                init: function(){
                    this.delta_angle = 360 / setting.render_qty;
                    this.renderStart();
                    this.handle( this.showArea );
                    this.showImage( setting.current_angle );
                },
                //  下载图片的方法，如果下载成功将图片路径保存至img_arr中
                loadImage: function(){
                    var that = this;
                    for( var angle in this.img_arr ){
                        var img = new Image();
                        img.src = setting.img_src + this.img_arr[angle];
                        img.onload = function(){
                            that.img_arr[ angle ] = setting.img_src + that.img_arr[ angle ];
                        };
                    }
                },
                //  显示
                showImage: function( angle ){
                    debugger;
                    this.showArea.css({
                        backgroundImage: 'url('+ this.img_arr[ angle ] +')',
                        backgroundPosition: 'center'
                    });
                },
                renderStart: function(){
                    var that = this;
                    $.getJSON('img.json',function( val ){
                        that.img_arr = val;
                        that.loadImage();
                    });
                },
                handle: function handle($this){
                    var that = this;
                    $this.on('mousedown',function(e){
                        var x1 = e.pageX;
                        $this.on('mousemove',function(e){
                            var x2 = e.pageX,
                                deltaX = x2 - x1;
                            // 获取当前鼠标位置，与x1对比，deltaX = x2 - x1
                            if( deltaX > setting.deltaX ){
                                //  鼠标右移，图片逆时针
                                x1 = x2;
                                that.current_angle += that.delta_angle;
                                if( that.current_angle > 360 ){ that.current_angle -= 360; }
                                console.log(that.current_angle);
                                $this.attr( 'data-angle',that.current_angle );
                                that.showImage( that.current_angle );
                            }else if( deltaX < -setting.deltaX ){
                                x1 = x2;
                                that.current_angle -= that.delta_angle;
                                if( that.current_angle < 0){ that.current_angle += 360; }
                                console.log(that.current_angle);
                                $this.attr( 'data-angle',that.current_angle );
                                that.showImage( that.current_angle );
                            }
                        }).on('mouseup', function(e){
                            // 解除绑定
                            $this.unbind('mousemove mouseup');
                            // 取到当前canvas的data-angle属性，发ajax开始渲染
                            that.showImage( that.current_angle );
                        })
                    });
                }
            };
            render_obj.init();
        });
    };
});
