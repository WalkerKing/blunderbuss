require.config({
    paths:{
        jquery: "../../libs/jquery",
        swiper: "../../plugs/swiper.min",
        commonObj: "../js/common"
    }
});
require(['jquery', 'swiper', 'commonObj'], function( jquery, swiper, commonObj ){
    var topSlider = new Swiper('#topSlider', {
        slidersPerView: 1,
        centeredSlides: true,
        autoplay: 3000,
        loop: true,
        autoplayDisableOnInteraction: true
    });
    commonObj.loadCanvas();
    $(window).scroll(commonObj.scrollHandler);
    $("#productul").on("touchmove", commonObj.scrollHandler);
    $("#addnums").on("click",commonObj.addnums);
    $("#reducenums").on("click",commonObj.reducenums);
    $(".addcart").on("click",commonObj.addcatAnimate);
    if($(".cartnums").val()<1){
        $(".cartnums").hide();
    }else{
        $(".cartnums").show();
    }
});
