/**
 * Created by Administrator on 2016/9/12.
 */

/*U3D所需组件*/
var Module = {
  TOTAL_MEMORY: 268435456,
  errorhandler: null,			// arguments: err, url, line. This function must return 'true' if the error is handled, otherwise 'false'
  compatibilitycheck: null,
  dataUrl: "Release/Build_WebGL.data",
  codeUrl: "Release/Build_WebGL.js",
  memUrl: "Release/Build_WebGL.mem"
};
/*判断页面是否支持webGL*/
var isSupportWebGL = (function() {
  var x = 1;
  var browser = function() {
      var e, t = navigator.userAgent,
        n = t.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
      return /trident/i.test(n[1]) ? (e = /\brv[ :]+(\d+)/g.exec(t) || [], "IE " + (e[1] || "")) : "Chrome" === n[1] && (e = t.match(/\bOPR\/(\d+)/), null != e) ? "Opera " + e[1] : (n = n[2] ? [n[1], n[2]] : [navigator.appName, navigator.appVersion, "-?"], null != (e = t.match(/version\/(\d+)/i)) && n.splice(1, 1, e[1]), n.join(" "))
    } (),
    hasWebGL = function() {
      if (!window.WebGLRenderingContext) return 0;
      var e = document.createElement("canvas"),
        t = e.getContext("webgl");
      return t || (t = e.getContext("experimental-webgl")) ? 1 : 0
    } (),
    mobile = function(e) {
      return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(e) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0, 4))
    } (navigator.userAgent || navigator.vendor || window.opera);
  (function() {
    hasWebGL ? mobile ? (x = 0) || window.history.back() : -1 == browser.indexOf("Firefox") && -1 == browser.indexOf("Chrome") && -1 == browser.indexOf("Safari") && (x = 0) : (x = 0);
  })();
  return x;
})();
/***********************以上为全局变量声明**************************/

 $(function(){
  /*滚动条优化*/
  $('.scrollContainer').rollbar({zIndex: 80});
  $('.rollbar-handle').css('height', '70%');
  /*如果浏览器支持webGL再加载UnityLoader*/
  if (isSupportWebGL) {
    //$.getScript('Release/UnityLoader.js');
    OnUnityLoad();
  } else {
    $('#u3d').html('<h3>您当前使用的浏览器不支持WebGL，建议您使用Chrome/FireFox/QQ/UC/safari9其中一款</h3>');
    OnUnityLoad();
  }
 });
/*U3D加载完成开始执行以下脚本*/
function OnUnityLoad(){
  var SBOM = {}, SPU = {}, SECTION = {}, MATERIAL = {},   //  存储服务器返回的4张表
    FBX = [], MAPS = [],  //  存储真实文件路径
    PHOT = {};  //  存储当前U3D展示的爆款信息，后期为SPU中的默认的款式信息
  var fbxPathConfig = 'http://192.168.1.251/orange/modules/lemon/uploads/fbx/';
  var imgPathConfig = 'http://192.168.1.251/orange/modules/lemon/uploads/image/';

  var msg = new pmsg();
  msg.cmd = 'hmakesofa';
  msg.subcmd = 'make';
  msg.val = {
    //'_id':getRequest['pid']  //主键id
    '_id':'581056049d8e87854a8b456b'  //主键id

  };
  //Send('api.php',msg,cb);
  function cb(flag,data){
    if(!flag){
      /*取出sbom和spu放在全局*/
      //接受到数据需要做两件事，1. 展示爆款list  2. 加载右边可选区域
      SBOM = data.val.bom_nodes;
      SPU = data.val.spus;
      SECTION = data.val.sections;
      MATERIAL = data.val.material_nodes;
      var fbxFile = getKeyField(MATERIAL,'3');
      var mapsFile = getKeyField(MATERIAL,'6');
      //console.log(JSON.stringify(SECTION));
      /*发ajax去服务器拿真实文件路径*/
      (function(){
        var msg = new pmsg();
        msg.cmd = 'sserverRelay';
        msg.subcmd = 'nameToSrcname';
        msg.val = {
          'type':'fbx',
          'name':fbxFile
        };
        Send('api.php',msg,cb);
        function cb(flag,data){
          if(!flag){
            FBX = deepClone(data.val.srcname);
          }
        }
      })();
      (function(){
        var msg = new pmsg();
        msg.cmd = 'sserverRelay';
        msg.subcmd = 'nameToSrcname';
        msg.val = {
          'type':'image',
          'name':mapsFile
        };
        Send('api.php',msg,cb);
        function cb(flag,data){
          if(!flag){
            MAPS = deepClone(data.val.srcname);
          }
        }
      })();
      //调用窗口展示函数，展示可选区域
      PHOT = getHotsInfo('1');
      //showChooseWindow.init();
    }
  }
  /*只有浏览器支持webGl功能才发送渲染请求*/
  if(isSupportWebGL){
    var customSofaObj = {
      create:[],
      material:[],
      scene:[]
    };
    var customerObj1 = {
      create:[
        {"partId":"1","fbxPath":"http://101.201.210.175/guiqian/20161011/","fbxName":"baozhenP1.FBX","positionRelative":"","position":{"x":0.0,"y":0.6200000047683716,"z":0.1899999976158142},"rotation":{"x":-90.0,"y":180.0,"z":0.0},"scale":{"x":1.0,"y":1.0,"z":1.0},"ModelMaterial":{"partId":"","material":{"materialName":"","shader":{"shaderName":"","color_main":{"r":1.0,"g":1.0,"b":1.0,"a":1.0},"color_specular":{"r":0.0,"g":0.0,"b":0.0,"a":1.0},"texture":{"mainTex":"","normalTex":"","specularTex":"","widthReal":1.0,"heightReal":1.0,"widthUV":50.0,"heightUV":50.0},"tiling":{"x":1.0,"y":1.0},"offset":{"x":0.0,"y":0.0}}}}}
        ,
        {"partId":"2","fbxPath":"http://101.201.210.175/guiqian/20161011/","fbxName":"baozhenP2.FBX","positionRelative":"","position":{"x":0.0,"y":0.6100000143051148,"z":0.2800000011920929},"rotation":{"x":-90.0,"y":180.0,"z":0.0},"scale":{"x":1.0,"y":1.0,"z":1.0},"ModelMaterial":{"partId":"","material":{"materialName":"","shader":{"shaderName":"","color_main":{"r":1.0,"g":1.0,"b":1.0,"a":1.0},"color_specular":{"r":0.0,"g":0.0,"b":0.0,"a":1.0},"texture":{"mainTex":"","normalTex":"","specularTex":"","widthReal":1.0,"heightReal":1.0,"widthUV":50.0,"heightUV":50.0},"tiling":{"x":1.0,"y":1.0},"offset":{"x":0.0,"y":0.0}}}}}
        ,
        {"partId":"1","fbxPath":"http://101.201.210.175/guiqian/20161011/","fbxName":"baozhenP1.FBX","positionRelative":"","position":{"x":-2.619999885559082,"y":0.6100000143051148,"z":-0.3400000035762787},"rotation":{"x":-90.0,"y":-166.25,"z":-41.82899856567383},"scale":{"x":1.0,"y":1.0,"z":1.0},"ModelMaterial":{"partId":"","material":{"materialName":"","shader":{"shaderName":"","color_main":{"r":1.0,"g":1.0,"b":1.0,"a":1.0},"color_specular":{"r":0.0,"g":0.0,"b":0.0,"a":1.0},"texture":{"mainTex":"","normalTex":"","specularTex":"","widthReal":1.0,"heightReal":1.0,"widthUV":50.0,"heightUV":50.0},"tiling":{"x":1.0,"y":1.0},"offset":{"x":0.0,"y":0.0}}}}}
        ,
        {"partId":"2","fbxPath":"http://101.201.210.175/guiqian/20161011/","fbxName":"baozhenP2.FBX","positionRelative":"","position":{"x":-1.565999984741211,"y":0.6100000143051148,"z":-0.3919999897480011},"rotation":{"x":-90.0,"y":-171.69000244140626,"z":-41.82899856567383},"scale":{"x":1.0,"y":1.0,"z":1.0},"ModelMaterial":{"partId":"","material":{"materialName":"","shader":{"shaderName":"","color_main":{"r":1.0,"g":1.0,"b":1.0,"a":1.0},"color_specular":{"r":0.0,"g":0.0,"b":0.0,"a":1.0},"texture":{"mainTex":"","normalTex":"","specularTex":"","widthReal":1.0,"heightReal":1.0,"widthUV":50.0,"heightUV":50.0},"tiling":{"x":1.0,"y":1.0},"offset":{"x":0.0,"y":0.0}}}}}
        ,
        {"partId":"3","fbxPath":"http://101.201.210.175/guiqian/20161011/","fbxName":"baozhen_qianxian.FBX","positionRelative":"","position":{"x":0.0,"y":0.4399999976158142,"z":0.04100000113248825},"rotation":{"x":-90.0,"y":180.0,"z":0.0},"scale":{"x":1.0,"y":1.0,"z":1.0},"ModelMaterial":{"partId":"","material":{"materialName":"","shader":{"shaderName":"","color_main":{"r":1.0,"g":1.0,"b":1.0,"a":1.0},"color_specular":{"r":0.0,"g":0.0,"b":0.0,"a":1.0},"texture":{"mainTex":"","normalTex":"","specularTex":"","widthReal":1.0,"heightReal":1.0,"widthUV":50.0,"heightUV":50.0},"tiling":{"x":1.0,"y":1.0},"offset":{"x":0.0,"y":0.0}}}}}
        ,
        {"partId":"3","fbxPath":"http://101.201.210.175/guiqian/20161011/","fbxName":"baozhen_qianxian.FBX","positionRelative":"","position":{"x":-2.552000045776367,"y":0.4399999976158142,"z":-0.4699999988079071},"rotation":{"x":-90.0,"y":-207.42999267578126,"z":0.0},"scale":{"x":1.0,"y":1.0,"z":1.0},"ModelMaterial":{"partId":"","material":{"materialName":"","shader":{"shaderName":"","color_main":{"r":1.0,"g":1.0,"b":1.0,"a":1.0},"color_specular":{"r":0.0,"g":0.0,"b":0.0,"a":1.0},"texture":{"mainTex":"","normalTex":"","specularTex":"","widthReal":1.0,"heightReal":1.0,"widthUV":50.0,"heightUV":50.0},"tiling":{"x":1.0,"y":1.0},"offset":{"x":0.0,"y":0.0}}}}}
        ,
        {"partId":"5","fbxPath":"http://101.201.210.175/guiqian/20161011/","fbxName":"kaodian.FBX","positionRelative":"","position":{"x":0.0,"y":0.6899999976158142,"z":0.7400000095367432},"rotation":{"x":-90.0,"y":180.0,"z":0.0},"scale":{"x":1.0,"y":1.0,"z":1.0},"ModelMaterial":{"partId":"","material":{"materialName":"","shader":{"shaderName":"","color_main":{"r":1.0,"g":1.0,"b":1.0,"a":1.0},"color_specular":{"r":0.0,"g":0.0,"b":0.0,"a":1.0},"texture":{"mainTex":"","normalTex":"","specularTex":"","widthReal":1.0,"heightReal":1.0,"widthUV":50.0,"heightUV":50.0},"tiling":{"x":1.0,"y":1.0},"offset":{"x":0.0,"y":0.0}}}}}
        ,
        {"partId":"6","fbxPath":"http://101.201.210.175/guiqian/20161011/","fbxName":"kaodian_qianxian.FBX","positionRelative":"","position":{"x":0.0,"y":0.4580000042915344,"z":0.11100000143051148},"rotation":{"x":-90.0,"y":180.0,"z":0.0},"scale":{"x":1.0,"y":1.0,"z":1.0},"ModelMaterial":{"partId":"","material":{"materialName":"","shader":{"shaderName":"","color_main":{"r":1.0,"g":1.0,"b":1.0,"a":1.0},"color_specular":{"r":0.0,"g":0.0,"b":0.0,"a":1.0},"texture":{"mainTex":"","normalTex":"","specularTex":"","widthReal":1.0,"heightReal":1.0,"widthUV":50.0,"heightUV":50.0},"tiling":{"x":1.0,"y":1.0},"offset":{"x":0.0,"y":0.0}}}}}
        ,
        {"partId":"7","fbxPath":"http://101.201.210.175/guiqian/20161011/","fbxName":"neibei.FBX","positionRelative":"","position":{"x":-0.11999999731779099,"y":0.5080000162124634,"z":0.21699999272823335},"rotation":{"x":-90.0,"y":180.0,"z":0.0},"scale":{"x":1.0,"y":1.0,"z":1.0},"ModelMaterial":{"partId":"","material":{"materialName":"","shader":{"shaderName":"","color_main":{"r":1.0,"g":1.0,"b":1.0,"a":1.0},"color_specular":{"r":0.0,"g":0.0,"b":0.0,"a":1.0},"texture":{"mainTex":"","normalTex":"","specularTex":"","widthReal":1.0,"heightReal":1.0,"widthUV":50.0,"heightUV":50.0},"tiling":{"x":1.0,"y":1.0},"offset":{"x":0.0,"y":0.0}}}}}
        ,
        {"partId":"8","fbxPath":"http://101.201.210.175/guiqian/20161011/","fbxName":"neifu.FBX","positionRelative":"","position":{"x":0.0,"y":0.20000000298023225,"z":0.09000000357627869},"rotation":{"x":-90.0,"y":180.0,"z":0.0},"scale":{"x":1.0,"y":1.0,"z":1.0},"ModelMaterial":{"partId":"","material":{"materialName":"","shader":{"shaderName":"","color_main":{"r":1.0,"g":1.0,"b":1.0,"a":1.0},"color_specular":{"r":0.0,"g":0.0,"b":0.0,"a":1.0},"texture":{"mainTex":"","normalTex":"","specularTex":"","widthReal":1.0,"heightReal":1.0,"widthUV":50.0,"heightUV":50.0},"tiling":{"x":1.0,"y":1.0},"offset":{"x":0.0,"y":0.0}}}}}
        ,
        {"partId":"9","fbxPath":"http://101.201.210.175/guiqian/20161011/","fbxName":"qunbai.FBX","positionRelative":"","position":{"x":0.0,"y":-0.3499999940395355,"z":-0.8500000238418579},"rotation":{"x":-90.0,"y":180.0,"z":0.0},"scale":{"x":1.0,"y":1.0,"z":1.0},"ModelMaterial":{"partId":"","material":{"materialName":"","shader":{"shaderName":"","color_main":{"r":1.0,"g":1.0,"b":1.0,"a":1.0},"color_specular":{"r":0.0,"g":0.0,"b":0.0,"a":1.0},"texture":{"mainTex":"","normalTex":"","specularTex":"","widthReal":1.0,"heightReal":1.0,"widthUV":50.0,"heightUV":50.0},"tiling":{"x":1.0,"y":1.0},"offset":{"x":0.0,"y":0.0}}}}}
        ,
        {"partId":"10","fbxPath":"http://101.201.210.175/guiqian/20161011/","fbxName":"waibei.FBX","positionRelative":"","position":{"x":0.0,"y":0.3799999952316284,"z":1.0199999809265137},"rotation":{"x":-90.0,"y":180.0,"z":0.0},"scale":{"x":1.0,"y":1.0,"z":1.0},"ModelMaterial":{"partId":"","material":{"materialName":"","shader":{"shaderName":"","color_main":{"r":1.0,"g":1.0,"b":1.0,"a":1.0},"color_specular":{"r":0.0,"g":0.0,"b":0.0,"a":1.0},"texture":{"mainTex":"","normalTex":"","specularTex":"","widthReal":1.0,"heightReal":1.0,"widthUV":50.0,"heightUV":50.0},"tiling":{"x":1.0,"y":1.0},"offset":{"x":0.0,"y":0.0}}}}}
        ,
        {"partId":"11","fbxPath":"http://101.201.210.175/guiqian/20161011/","fbxName":"waifu.FBX","positionRelative":"","position":{"x":0.0,"y":0.07000000029802323,"z":0.11999999731779099},"rotation":{"x":-90.0,"y":180.0,"z":0.0},"scale":{"x":1.0,"y":1.0,"z":1.0},"ModelMaterial":{"partId":"","material":{"materialName":"","shader":{"shaderName":"","color_main":{"r":1.0,"g":1.0,"b":1.0,"a":1.0},"color_specular":{"r":0.0,"g":0.0,"b":0.0,"a":1.0},"texture":{"mainTex":"","normalTex":"","specularTex":"","widthReal":1.0,"heightReal":1.0,"widthUV":50.0,"heightUV":50.0},"tiling":{"x":1.0,"y":1.0},"offset":{"x":0.0,"y":0.0}}}}}
        ,
        {"partId":"12","fbxPath":"http://101.201.210.175/guiqian/20161011/","fbxName":"zhujiao_fangxing.FBX","positionRelative":"","position":{"x":0.0,"y":0.0,"z":0.0},"rotation":{"x":-90.0,"y":180.0,"z":0.0},"scale":{"x":1.0,"y":1.0,"z":1.0},"ModelMaterial":{"partId":"","material":{"materialName":"","shader":{"shaderName":"","color_main":{"r":1.0,"g":1.0,"b":1.0,"a":1.0},"color_specular":{"r":0.0,"g":0.0,"b":0.0,"a":1.0},"texture":{"mainTex":"","normalTex":"","specularTex":"","widthReal":1.0,"heightReal":1.0,"widthUV":50.0,"heightUV":50.0},"tiling":{"x":1.0,"y":1.0},"offset":{"x":0.0,"y":0.0}}}}}
        ,
        {"partId":"13","fbxPath":"http://101.201.210.175/guiqian/20161011/","fbxName":"zhuti_qianxian.FBX","positionRelative":"","position":{"x":0.0,"y":0.4300000071525574,"z":0.11999999731779099},"rotation":{"x":-90.0,"y":180.0,"z":0.0},"scale":{"x":1.0,"y":1.0,"z":1.0},"ModelMaterial":{"partId":"","material":{"materialName":"","shader":{"shaderName":"","color_main":{"r":1.0,"g":1.0,"b":1.0,"a":1.0},"color_specular":{"r":0.0,"g":0.0,"b":0.0,"a":1.0},"texture":{"mainTex":"","normalTex":"","specularTex":"","widthReal":1.0,"heightReal":1.0,"widthUV":50.0,"heightUV":50.0},"tiling":{"x":1.0,"y":1.0},"offset":{"x":0.0,"y":0.0}}}}}
        ,
        {"partId":"14","fbxPath":"http://101.201.210.175/guiqian/20161011/","fbxName":"zuodian.FBX","positionRelative":"","position":{"x":0.0,"y":0.11999999731779099,"z":-0.2199999988079071},"rotation":{"x":-90.0,"y":180.0,"z":0.0},"scale":{"x":1.0,"y":1.0,"z":1.0},"ModelMaterial":{"partId":"","material":{"materialName":"","shader":{"shaderName":"","color_main":{"r":1.0,"g":1.0,"b":1.0,"a":1.0},"color_specular":{"r":0.0,"g":0.0,"b":0.0,"a":1.0},"texture":{"mainTex":"","normalTex":"","specularTex":"","widthReal":1.0,"heightReal":1.0,"widthUV":50.0,"heightUV":50.0},"tiling":{"x":1.0,"y":1.0},"offset":{"x":0.0,"y":0.0}}}}}
        ,
        {"partId":"15","fbxPath":"http://101.201.210.175/guiqian/20161011/","fbxName":"zuodian_qianxian.FBX","positionRelative":"","position":{"x":0.0,"y":0.4399999976158142,"z":0.11500000208616257},"rotation":{"x":-90.0,"y":180.0,"z":0.0},"scale":{"x":1.0,"y":1.0,"z":1.0},"ModelMaterial":{"partId":"","material":{"materialName":"","shader":{"shaderName":"","color_main":{"r":1.0,"g":1.0,"b":1.0,"a":1.0},"color_specular":{"r":0.0,"g":0.0,"b":0.0,"a":1.0},"texture":{"mainTex":"","normalTex":"","specularTex":"","widthReal":1.0,"heightReal":1.0,"widthUV":50.0,"heightUV":50.0},"tiling":{"x":1.0,"y":1.0},"offset":{"x":0.0,"y":0.0}}}}}
        ,
        {"partId":"16","fbxPath":"http://101.201.210.175/guiqian/20161011/","fbxName":"zuokou.FBX","positionRelative":"","position":{"x":0.0,"y":0.2199999988079071,"z":0.09000000357627869},"rotation":{"x":-90.0,"y":180.0,"z":0.0},"scale":{"x":1.0,"y":1.0,"z":1.0},"ModelMaterial":{"partId":"","material":{"materialName":"","shader":{"shaderName":"","color_main":{"r":1.0,"g":1.0,"b":1.0,"a":1.0},"color_specular":{"r":0.0,"g":0.0,"b":0.0,"a":1.0},"texture":{"mainTex":"","normalTex":"","specularTex":"","widthReal":1.0,"heightReal":1.0,"widthUV":50.0,"heightUV":50.0},"tiling":{"x":1.0,"y":1.0},"offset":{"x":0.0,"y":0.0}}}}}
        ,
        {"partId":"17","fbxPath":"http://101.201.210.175/guiqian/20161011/","fbxName":"fushou.FBX","positionRelative":"","position":{"x":0.0,"y":0.0,"z":0.0},"rotation":{"x":-90.0,"y":180.0,"z":0.0},"scale":{"x":1.0,"y":1.0,"z":1.0},"ModelMaterial":{"partId":"","material":{"materialName":"","shader":{"shaderName":"","color_main":{"r":1.0,"g":1.0,"b":1.0,"a":1.0},"color_specular":{"r":0.0,"g":0.0,"b":0.0,"a":1.0},"texture":{"mainTex":"","normalTex":"","specularTex":"","widthReal":1.0,"heightReal":1.0,"widthUV":50.0,"heightUV":50.0},"tiling":{"x":1.0,"y":1.0},"offset":{"x":0.0,"y":0.0}}}}}
        ,
        {"partId":"18","fbxPath":"http://101.201.210.175/guiqian/20161011/","fbxName":"jinshuhua.FBX","positionRelative":"","position":{"x":0.0,"y":0.17000000178813935,"z":-0.8199999928474426},"rotation":{"x":-90.0,"y":180.0,"z":0.0},"scale":{"x":1.0,"y":1.0,"z":1.0},"ModelMaterial":{"partId":"","material":{"materialName":"","shader":{"shaderName":"","color_main":{"r":1.0,"g":1.0,"b":1.0,"a":1.0},"color_specular":{"r":0.0,"g":0.0,"b":0.0,"a":1.0},"texture":{"mainTex":"","normalTex":"","specularTex":"","widthReal":1.0,"heightReal":1.0,"widthUV":50.0,"heightUV":50.0},"tiling":{"x":1.0,"y":1.0},"offset":{"x":0.0,"y":0.0}}}}}
        ,
        {"partId":"19","fbxPath":"http://101.201.210.175/guiqian/20161011/","fbxName":"waibei_qianxian.FBX","positionRelative":"","position":{"x":0.0,"y":0.4399999976158142,"z":0.10999999940395355},"rotation":{"x":-90.0,"y":180.0,"z":0.0},"scale":{"x":1.0,"y":1.0,"z":1.0},"ModelMaterial":{"partId":"","material":{"materialName":"","shader":{"shaderName":"","color_main":{"r":1.0,"g":1.0,"b":1.0,"a":1.0},"color_specular":{"r":0.0,"g":0.0,"b":0.0,"a":1.0},"texture":{"mainTex":"","normalTex":"","specularTex":"","widthReal":1.0,"heightReal":1.0,"widthUV":50.0,"heightUV":50.0},"tiling":{"x":1.0,"y":1.0},"offset":{"x":0.0,"y":0.0}}}}}


      ],
      material:[
        {"partId":"1","material":{"materialName":"","shader":{"shaderName":"Standard (Specular setup)","color_main":{"r":1.0,"g":1.0,"b":1.0,"a":1.0},"color_specular":{"r":0.0,"g":0.0,"b":0.0,"a":1.0},"texture":{"mainTex":"http://101.201.210.175/guiqian/20161011/baozhen02.jpg","normalTex":"","specularTex":"","widthReal":1.0,"heightReal":1.0,"widthUV":50.0,"heightUV":50.0},"tiling":{"x":1.0,"y":1.0},"offset":{"x":0.0,"y":0.0}}}}
        ,
        {"partId":"2","material":{"materialName":"","shader":{"shaderName":"Standard (Specular setup)","color_main":{"r":1.0,"g":1.0,"b":1.0,"a":1.0},"color_specular":{"r":0.0,"g":0.0,"b":0.0,"a":1.0},"texture":{"mainTex":"http://101.201.210.175/guiqian/20161011/baozhen01.jpg","normalTex":"","specularTex":"","widthReal":1.0,"heightReal":1.0,"widthUV":50.0,"heightUV":50.0},"tiling":{"x":1.0,"y":1.0},"offset":{"x":0.0,"y":0.0}}}}
        ,
        {"partId":"1","material":{"materialName":"","shader":{"shaderName":"Standard (Specular setup)","color_main":{"r":1.0,"g":1.0,"b":1.0,"a":1.0},"color_specular":{"r":0.0,"g":0.0,"b":0.0,"a":1.0},"texture":{"mainTex":"http://101.201.210.175/guiqian/20161011/baozhen02.jpg","normalTex":"","specularTex":"","widthReal":1.0,"heightReal":1.0,"widthUV":50.0,"heightUV":50.0},"tiling":{"x":1.0,"y":1.0},"offset":{"x":0.0,"y":0.0}}}}
        ,
        {"partId":"2","material":{"materialName":"","shader":{"shaderName":"Standard (Specular setup)","color_main":{"r":1.0,"g":1.0,"b":1.0,"a":1.0},"color_specular":{"r":0.0,"g":0.0,"b":0.0,"a":1.0},"texture":{"mainTex":"http://101.201.210.175/guiqian/20161011/baozhen01.jpg","normalTex":"","specularTex":"","widthReal":1.0,"heightReal":1.0,"widthUV":50.0,"heightUV":50.0},"tiling":{"x":1.0,"y":1.0},"offset":{"x":0.0,"y":0.0}}}}
        ,
        {"partId":"3","material":{"materialName":"","shader":{"shaderName":"Standard (Specular setup)","color_main":{"r":1.0,"g":1.0,"b":1.0,"a":1.0},"color_specular":{"r":0.0,"g":0.0,"b":0.0,"a":1.0},"texture":{"mainTex":"http://101.201.210.175/guiqian/20161011/bianxian.png","normalTex":"","specularTex":"","widthReal":1.0,"heightReal":1.0,"widthUV":50.0,"heightUV":50.0},"tiling":{"x":1.0,"y":100.0},"offset":{"x":0.0,"y":0.0}}}}
        ,
        {"partId":"3","material":{"materialName":"","shader":{"shaderName":"Standard (Specular setup)","color_main":{"r":1.0,"g":1.0,"b":1.0,"a":1.0},"color_specular":{"r":0.0,"g":0.0,"b":0.0,"a":1.0},"texture":{"mainTex":"http://101.201.210.175/guiqian/20161011/bianxian.png","normalTex":"","specularTex":"","widthReal":1.0,"heightReal":1.0,"widthUV":50.0,"heightUV":50.0},"tiling":{"x":1.0,"y":100.0},"offset":{"x":0.0,"y":0.0}}}}
        ,
        {"partId":"5","material":{"materialName":"","shader":{"shaderName":"Standard (Specular setup)","color_main":{"r":1.0,"g":1.0,"b":1.0,"a":1.0},"color_specular":{"r":0.0,"g":0.0,"b":0.0,"a":1.0},"texture":{"mainTex":"http://101.201.210.175/guiqian/20161011/mianliao.png","normalTex":"","specularTex":"","widthReal":1.0,"heightReal":1.0,"widthUV":50.0,"heightUV":50.0},"tiling":{"x":1.0,"y":1.0},"offset":{"x":0.0,"y":0.0}}}}
        ,
        {"partId":"6","material":{"materialName":"","shader":{"shaderName":"Standard (Specular setup)","color_main":{"r":1.0,"g":1.0,"b":1.0,"a":1.0},"color_specular":{"r":0.0,"g":0.0,"b":0.0,"a":1.0},"texture":{"mainTex":"http://101.201.210.175/guiqian/20161011/bianxian.png","normalTex":"","specularTex":"","widthReal":1.0,"heightReal":1.0,"widthUV":50.0,"heightUV":50.0},"tiling":{"x":1.0,"y":100.0},"offset":{"x":0.0,"y":0.0}}}}
        ,
        {"partId":"7","material":{"materialName":"","shader":{"shaderName":"Standard (Specular setup)","color_main":{"r":1.0,"g":1.0,"b":1.0,"a":1.0},"color_specular":{"r":0.0,"g":0.0,"b":0.0,"a":1.0},"texture":{"mainTex":"http://101.201.210.175/guiqian/20161011/mianliao.png","normalTex":"","specularTex":"","widthReal":1.0,"heightReal":1.0,"widthUV":50.0,"heightUV":50.0},"tiling":{"x":1.0,"y":1.0},"offset":{"x":0.0,"y":0.0}}}}
        ,
        {"partId":"8","material":{"materialName":"","shader":{"shaderName":"Standard (Specular setup)","color_main":{"r":1.0,"g":1.0,"b":1.0,"a":1.0},"color_specular":{"r":0.0,"g":0.0,"b":0.0,"a":1.0},"texture":{"mainTex":"http://101.201.210.175/guiqian/20161011/mianliao.png","normalTex":"","specularTex":"","widthReal":1.0,"heightReal":1.0,"widthUV":50.0,"heightUV":50.0},"tiling":{"x":1.0,"y":1.0},"offset":{"x":0.0,"y":0.0}}}}
        ,
        {"partId":"9","material":{"materialName":"","shader":{"shaderName":"Standard (Specular setup)","color_main":{"r":1.0,"g":1.0,"b":1.0,"a":1.0},"color_specular":{"r":0.0,"g":0.0,"b":0.0,"a":1.0},"texture":{"mainTex":"http://101.201.210.175/guiqian/20161011/mianliao.png","normalTex":"","specularTex":"","widthReal":1.0,"heightReal":1.0,"widthUV":50.0,"heightUV":50.0},"tiling":{"x":1.0,"y":1.0},"offset":{"x":0.0,"y":0.0}}}}
        ,
        {"partId":"10","material":{"materialName":"","shader":{"shaderName":"Standard (Specular setup)","color_main":{"r":1.0,"g":1.0,"b":1.0,"a":1.0},"color_specular":{"r":0.0,"g":0.0,"b":0.0,"a":1.0},"texture":{"mainTex":"http://101.201.210.175/guiqian/20161011/mianliao.png","normalTex":"","specularTex":"","widthReal":1.0,"heightReal":1.0,"widthUV":50.0,"heightUV":50.0},"tiling":{"x":1.0,"y":1.0},"offset":{"x":0.0,"y":0.0}}}}
        ,
        {"partId":"11","material":{"materialName":"","shader":{"shaderName":"Standard (Specular setup)","color_main":{"r":1.0,"g":1.0,"b":1.0,"a":1.0},"color_specular":{"r":0.0,"g":0.0,"b":0.0,"a":1.0},"texture":{"mainTex":"http://101.201.210.175/guiqian/20161011/mianliao.png","normalTex":"","specularTex":"","widthReal":1.0,"heightReal":1.0,"widthUV":50.0,"heightUV":50.0},"tiling":{"x":1.0,"y":1.0},"offset":{"x":0.0,"y":0.0}}}}
        ,
        {"partId":"12","material":{"materialName":"","shader":{"shaderName":"Standard (Specular setup)","color_main":{"r":1.0,"g":1.0,"b":1.0,"a":1.0},"color_specular":{"r":0.0,"g":0.0,"b":0.0,"a":1.0},"texture":{"mainTex":"","normalTex":"","specularTex":"","widthReal":1.0,"heightReal":1.0,"widthUV":50.0,"heightUV":50.0},"tiling":{"x":1.0,"y":1.0},"offset":{"x":0.0,"y":0.0}}}}
        ,
        {"partId":"13","material":{"materialName":"","shader":{"shaderName":"Standard (Specular setup)","color_main":{"r":1.0,"g":1.0,"b":1.0,"a":1.0},"color_specular":{"r":0.0,"g":0.0,"b":0.0,"a":1.0},"texture":{"mainTex":"http://101.201.210.175/guiqian/20161011/bianxian.png","normalTex":"","specularTex":"","widthReal":1.0,"heightReal":1.0,"widthUV":50.0,"heightUV":50.0},"tiling":{"x":1.0,"y":100.0},"offset":{"x":0.0,"y":0.0}}}}
        ,
        {"partId":"14","material":{"materialName":"","shader":{"shaderName":"Standard (Specular setup)","color_main":{"r":1.0,"g":1.0,"b":1.0,"a":1.0},"color_specular":{"r":0.0,"g":0.0,"b":0.0,"a":1.0},"texture":{"mainTex":"http://101.201.210.175/guiqian/20161011/mianliao.png","normalTex":"","specularTex":"","widthReal":1.0,"heightReal":1.0,"widthUV":50.0,"heightUV":50.0},"tiling":{"x":1.0,"y":1.0},"offset":{"x":0.0,"y":0.0}}}}
        ,
        {"partId":"15","material":{"materialName":"","shader":{"shaderName":"Standard (Specular setup)","color_main":{"r":1.0,"g":1.0,"b":1.0,"a":1.0},"color_specular":{"r":0.0,"g":0.0,"b":0.0,"a":1.0},"texture":{"mainTex":"http://101.201.210.175/guiqian/20161011/bianxian.png","normalTex":"","specularTex":"","widthReal":1.0,"heightReal":1.0,"widthUV":50.0,"heightUV":50.0},"tiling":{"x":1.0,"y":100.0},"offset":{"x":0.0,"y":0.0}}}}
        ,
        {"partId":"16","material":{"materialName":"","shader":{"shaderName":"Standard (Specular setup)","color_main":{"r":1.0,"g":1.0,"b":1.0,"a":1.0},"color_specular":{"r":0.0,"g":0.0,"b":0.0,"a":1.0},"texture":{"mainTex":"http://101.201.210.175/guiqian/20161011/mianliao.png","normalTex":"","specularTex":"","widthReal":1.0,"heightReal":1.0,"widthUV":50.0,"heightUV":50.0},"tiling":{"x":1.0,"y":1.0},"offset":{"x":0.0,"y":0.0}}}}
        ,
        {"partId":"17","material":{"materialName":"","shader":{"shaderName":"Standard (Specular setup)","color_main":{"r":1.0,"g":1.0,"b":1.0,"a":1.0},"color_specular":{"r":0.0,"g":0.0,"b":0.0,"a":1.0},"texture":{"mainTex":"","normalTex":"","specularTex":"","widthReal":1.0,"heightReal":1.0,"widthUV":50.0,"heightUV":50.0},"tiling":{"x":1.0,"y":1.0},"offset":{"x":0.0,"y":0.0}}}}
        ,
        {"partId":"18","material":{"materialName":"","shader":{"shaderName":"Standard (Specular setup)","color_main":{"r":248.0,"g":111.0,"b":0.0,"a":255.0},"color_specular":{"r":0.0,"g":0.0,"b":0.0,"a":1.0},"texture":{"mainTex":"","normalTex":"","specularTex":"","widthReal":1.0,"heightReal":1.0,"widthUV":50.0,"heightUV":50.0},"tiling":{"x":1.0,"y":1.0},"offset":{"x":0.0,"y":0.0}}}}
        ,
        {"partId":"19","material":{"materialName":"","shader":{"shaderName":"Standard (Specular setup)","color_main":{"r":1.0,"g":1.0,"b":1.0,"a":1.0},"color_specular":{"r":0.0,"g":0.0,"b":0.0,"a":1.0},"texture":{"mainTex":"http://101.201.210.175/guiqian/20161011/bianxian.png","normalTex":"","specularTex":"","widthReal":1.0,"heightReal":1.0,"widthUV":50.0,"heightUV":50.0},"tiling":{"x":1.0,"y":100.0},"offset":{"x":0.0,"y":0.0}}}}
      ],
      scene:[
        {"sceneId":"EasyScene"}
      ]
    };
    var customerObj2 = $.extend(true,{},customerObj1);
    customerObj2.material = [
      {"partId":"1","material":{"materialName":"","shader":{"shaderName":"Standard (Specular setup)","color_main":{"r":1.0,"g":1.0,"b":1.0,"a":1.0},"color_specular":{"r":0.0,"g":0.0,"b":0.0,"a":1.0},"texture":{"mainTex":"http://101.201.210.175/guiqian/20161011/baozhen02.jpg","normalTex":"","specularTex":"","widthReal":1.0,"heightReal":1.0,"widthUV":50.0,"heightUV":50.0},"tiling":{"x":1.0,"y":1.0},"offset":{"x":0.0,"y":0.0}}}}
      ,
      {"partId":"2","material":{"materialName":"","shader":{"shaderName":"Standard (Specular setup)","color_main":{"r":1.0,"g":1.0,"b":1.0,"a":1.0},"color_specular":{"r":0.0,"g":0.0,"b":0.0,"a":1.0},"texture":{"mainTex":"http://101.201.210.175/guiqian/20161011/baozhen01.jpg","normalTex":"","specularTex":"","widthReal":1.0,"heightReal":1.0,"widthUV":50.0,"heightUV":50.0},"tiling":{"x":1.0,"y":1.0},"offset":{"x":0.0,"y":0.0}}}}
      ,
      {"partId":"1","material":{"materialName":"","shader":{"shaderName":"Standard (Specular setup)","color_main":{"r":1.0,"g":1.0,"b":1.0,"a":1.0},"color_specular":{"r":0.0,"g":0.0,"b":0.0,"a":1.0},"texture":{"mainTex":"http://101.201.210.175/guiqian/20161011/baozhen02.jpg","normalTex":"","specularTex":"","widthReal":1.0,"heightReal":1.0,"widthUV":50.0,"heightUV":50.0},"tiling":{"x":1.0,"y":1.0},"offset":{"x":0.0,"y":0.0}}}}
      ,
      {"partId":"2","material":{"materialName":"","shader":{"shaderName":"Standard (Specular setup)","color_main":{"r":1.0,"g":1.0,"b":1.0,"a":1.0},"color_specular":{"r":0.0,"g":0.0,"b":0.0,"a":1.0},"texture":{"mainTex":"http://101.201.210.175/guiqian/20161011/baozhen01.jpg","normalTex":"","specularTex":"","widthReal":1.0,"heightReal":1.0,"widthUV":50.0,"heightUV":50.0},"tiling":{"x":1.0,"y":1.0},"offset":{"x":0.0,"y":0.0}}}}
      ,
      {"partId":"3","material":{"materialName":"","shader":{"shaderName":"Standard (Specular setup)","color_main":{"r":1.0,"g":1.0,"b":1.0,"a":1.0},"color_specular":{"r":0.0,"g":0.0,"b":0.0,"a":1.0},"texture":{"mainTex":"http://101.201.210.175/guiqian/20161011/bianxian.png","normalTex":"","specularTex":"","widthReal":1.0,"heightReal":1.0,"widthUV":50.0,"heightUV":50.0},"tiling":{"x":1.0,"y":100.0},"offset":{"x":0.0,"y":0.0}}}}
      ,
      {"partId":"3","material":{"materialName":"","shader":{"shaderName":"Standard (Specular setup)","color_main":{"r":1.0,"g":1.0,"b":1.0,"a":1.0},"color_specular":{"r":0.0,"g":0.0,"b":0.0,"a":1.0},"texture":{"mainTex":"http://101.201.210.175/guiqian/20161011/bianxian.png","normalTex":"","specularTex":"","widthReal":1.0,"heightReal":1.0,"widthUV":50.0,"heightUV":50.0},"tiling":{"x":1.0,"y":100.0},"offset":{"x":0.0,"y":0.0}}}}
      ,
      {"partId":"5","material":{"materialName":"","shader":{"shaderName":"Standard (Specular setup)","color_main":{"r":1.0,"g":1.0,"b":1.0,"a":1.0},"color_specular":{"r":0.0,"g":0.0,"b":0.0,"a":1.0},"texture":{"mainTex":"http://101.201.210.175/guiqian/20161011/mianliao1.png","normalTex":"","specularTex":"","widthReal":1.0,"heightReal":1.0,"widthUV":50.0,"heightUV":50.0},"tiling":{"x":10.0,"y":10.0},"offset":{"x":0.0,"y":0.0}}}}

      ,
      {"partId":"6","material":{"materialName":"","shader":{"shaderName":"Standard (Specular setup)","color_main":{"r":1.0,"g":1.0,"b":1.0,"a":1.0},"color_specular":{"r":0.0,"g":0.0,"b":0.0,"a":1.0},"texture":{"mainTex":"http://101.201.210.175/guiqian/20161011/bianxian.png","normalTex":"","specularTex":"","widthReal":1.0,"heightReal":1.0,"widthUV":50.0,"heightUV":50.0},"tiling":{"x":1.0,"y":100.0},"offset":{"x":0.0,"y":0.0}}}}
      ,
      {"partId":"7","material":{"materialName":"","shader":{"shaderName":"Standard (Specular setup)","color_main":{"r":1.0,"g":1.0,"b":1.0,"a":1.0},"color_specular":{"r":0.0,"g":0.0,"b":0.0,"a":1.0},"texture":{"mainTex":"http://101.201.210.175/guiqian/20161011/mianliao1.png","normalTex":"","specularTex":"","widthReal":1.0,"heightReal":1.0,"widthUV":50.0,"heightUV":50.0},"tiling":{"x":10.0,"y":10.0},"offset":{"x":0.0,"y":0.0}}}}
      ,
      {"partId":"8","material":{"materialName":"","shader":{"shaderName":"Standard (Specular setup)","color_main":{"r":1.0,"g":1.0,"b":1.0,"a":1.0},"color_specular":{"r":0.0,"g":0.0,"b":0.0,"a":1.0},"texture":{"mainTex":"http://101.201.210.175/guiqian/20161011/mianliao1.png","normalTex":"","specularTex":"","widthReal":1.0,"heightReal":1.0,"widthUV":50.0,"heightUV":50.0},"tiling":{"x":10.0,"y":10.0},"offset":{"x":0.0,"y":0.0}}}}
      ,
      {"partId":"9","material":{"materialName":"","shader":{"shaderName":"Standard (Specular setup)","color_main":{"r":1.0,"g":1.0,"b":1.0,"a":1.0},"color_specular":{"r":0.0,"g":0.0,"b":0.0,"a":1.0},"texture":{"mainTex":"http://101.201.210.175/guiqian/20161011/mianliao1.png","normalTex":"","specularTex":"","widthReal":1.0,"heightReal":1.0,"widthUV":50.0,"heightUV":50.0},"tiling":{"x":10.0,"y":10.0},"offset":{"x":0.0,"y":0.0}}}}
      ,
      {"partId":"10","material":{"materialName":"","shader":{"shaderName":"Standard (Specular setup)","color_main":{"r":1.0,"g":1.0,"b":1.0,"a":1.0},"color_specular":{"r":0.0,"g":0.0,"b":0.0,"a":1.0},"texture":{"mainTex":"http://101.201.210.175/guiqian/20161011/mianliao1.png","normalTex":"","specularTex":"","widthReal":1.0,"heightReal":1.0,"widthUV":50.0,"heightUV":50.0},"tiling":{"x":10.0,"y":10.0},"offset":{"x":0.0,"y":0.0}}}}
      ,
      {"partId":"11","material":{"materialName":"","shader":{"shaderName":"Standard (Specular setup)","color_main":{"r":1.0,"g":1.0,"b":1.0,"a":1.0},"color_specular":{"r":0.0,"g":0.0,"b":0.0,"a":1.0},"texture":{"mainTex":"http://101.201.210.175/guiqian/20161011/mianliao1.png","normalTex":"","specularTex":"","widthReal":1.0,"heightReal":1.0,"widthUV":50.0,"heightUV":50.0},"tiling":{"x":10.0,"y":10.0},"offset":{"x":0.0,"y":0.0}}}}
      ,
      {"partId":"12","material":{"materialName":"","shader":{"shaderName":"Standard (Specular setup)","color_main":{"r":1.0,"g":1.0,"b":1.0,"a":1.0},"color_specular":{"r":0.0,"g":0.0,"b":0.0,"a":1.0},"texture":{"mainTex":"","normalTex":"","specularTex":"","widthReal":1.0,"heightReal":1.0,"widthUV":50.0,"heightUV":50.0},"tiling":{"x":1.0,"y":1.0},"offset":{"x":0.0,"y":0.0}}}}
      ,
      {"partId":"13","material":{"materialName":"","shader":{"shaderName":"Standard (Specular setup)","color_main":{"r":1.0,"g":1.0,"b":1.0,"a":1.0},"color_specular":{"r":0.0,"g":0.0,"b":0.0,"a":1.0},"texture":{"mainTex":"http://101.201.210.175/guiqian/20161011/bianxian.png","normalTex":"","specularTex":"","widthReal":1.0,"heightReal":1.0,"widthUV":50.0,"heightUV":50.0},"tiling":{"x":1.0,"y":100.0},"offset":{"x":0.0,"y":0.0}}}}
      ,
      {"partId":"14","material":{"materialName":"","shader":{"shaderName":"Standard (Specular setup)","color_main":{"r":1.0,"g":1.0,"b":1.0,"a":1.0},"color_specular":{"r":0.0,"g":0.0,"b":0.0,"a":1.0},"texture":{"mainTex":"http://101.201.210.175/guiqian/20161011/mianliao1.png","normalTex":"","specularTex":"","widthReal":1.0,"heightReal":1.0,"widthUV":50.0,"heightUV":50.0},"tiling":{"x":10.0,"y":10.0},"offset":{"x":0.0,"y":0.0}}}}
      ,
      {"partId":"15","material":{"materialName":"","shader":{"shaderName":"Standard (Specular setup)","color_main":{"r":1.0,"g":1.0,"b":1.0,"a":1.0},"color_specular":{"r":0.0,"g":0.0,"b":0.0,"a":1.0},"texture":{"mainTex":"http://101.201.210.175/guiqian/20161011/bianxian.png","normalTex":"","specularTex":"","widthReal":1.0,"heightReal":1.0,"widthUV":50.0,"heightUV":50.0},"tiling":{"x":1.0,"y":100.0},"offset":{"x":0.0,"y":0.0}}}}
      ,
      {"partId":"16","material":{"materialName":"","shader":{"shaderName":"Standard (Specular setup)","color_main":{"r":1.0,"g":1.0,"b":1.0,"a":1.0},"color_specular":{"r":0.0,"g":0.0,"b":0.0,"a":1.0},"texture":{"mainTex":"http://101.201.210.175/guiqian/20161011/mianliao1.png","normalTex":"","specularTex":"","widthReal":1.0,"heightReal":1.0,"widthUV":50.0,"heightUV":50.0},"tiling":{"x":10.0,"y":10.0},"offset":{"x":0.0,"y":0.0}}}}
      ,
      {"partId":"17","material":{"materialName":"","shader":{"shaderName":"Standard (Specular setup)","color_main":{"r":1.0,"g":1.0,"b":1.0,"a":1.0},"color_specular":{"r":0.0,"g":0.0,"b":0.0,"a":1.0},"texture":{"mainTex":"","normalTex":"","specularTex":"","widthReal":1.0,"heightReal":1.0,"widthUV":50.0,"heightUV":50.0},"tiling":{"x":1.0,"y":1.0},"offset":{"x":0.0,"y":0.0}}}}
      ,
      {"partId":"18","material":{"materialName":"","shader":{"shaderName":"Standard (Specular setup)","color_main":{"r":248.0,"g":111.0,"b":0.0,"a":255.0},"color_specular":{"r":0.0,"g":0.0,"b":0.0,"a":1.0},"texture":{"mainTex":"","normalTex":"","specularTex":"","widthReal":1.0,"heightReal":1.0,"widthUV":50.0,"heightUV":50.0},"tiling":{"x":1.0,"y":1.0},"offset":{"x":0.0,"y":0.0}}}}
      ,
      {"partId":"19","material":{"materialName":"","shader":{"shaderName":"Standard (Specular setup)","color_main":{"r":1.0,"g":1.0,"b":1.0,"a":1.0},"color_specular":{"r":0.0,"g":0.0,"b":0.0,"a":1.0},"texture":{"mainTex":"http://101.201.210.175/guiqian/20161011/bianxian.png","normalTex":"","specularTex":"","widthReal":1.0,"heightReal":1.0,"widthUV":50.0,"heightUV":50.0},"tiling":{"x":1.0,"y":100.0},"offset":{"x":0.0,"y":0.0}}}}
    ];
    //sendU3DRequest(customerObj1);
    /*爆款点击显示效果*/

    $('.picSelect').on('click','li',function(){
      var pid = parseFloat($(this).attr('data-pid'));
      /***********************************************************/
      //以下为测试代码：生成一个比较小的tree，传给showTree，测试解析是否合理
      // var node = getNode(SBOM,'2');
      // console.log(node);
      // coverTree(node,PHOT);
      /***********************************************************/

      //遍历SBOM

      for(var key in SBOM.tree){
        coverTree(SBOM.tree[key],PHOT);
      }
      console.log(customSofaObj);
    });
  }
  //遍历某一个节点
  function coverTree(node,PHOT){
      console.log("当前正在处理的节点id为："+node.id+'类型：'+node.type);
      switch (node.type){
        case 'group' :
          if(node.id !== '1'){
            for(var key in node.items){
              coverTree(node.items[key],PHOT);
            }
          }
          break;
        case 'select' :
          if(!!PHOT[node.id]){
            //如果当前id在当前爆款的nodeList中，取出id获得bom对象，继续递归
            var subNode = getNode(SBOM,PHOT[node.id]);
            coverTree(subNode,PHOT);
          }else{
            //如果不在，取出当前缺省值，继续递归
            for(var k in node.sections){
              var section = node.sections[k];
              var sec = getSectionObj(SECTION,section.sectionid.$id);
              if(sec.type === '9' && !!section.val.default){   //如果section type显示是9说明是select节点，取default值继续递归
                var subNode = getNode(SBOM,section.val.default);
                coverTree(subNode,PHOT);
              }
            }
          }
          break;
        case 'bool' :
          if(!!PHOT[node.id]){
            //如果当前id在当前爆款的nodeList中，取出id获得bom对象，继续递归
            var subNode = getNode(SBOM,PHOT[node.id]);
            coverTree(subNode,PHOT);
          }else{
            //如果不在，取出当前缺省值，继续递归
            for(var k in node.sections){
              var section = node.sections[k];
              var sec = getSectionObj(SECTION,section.sectionid.$id);
              if(sec.type === '9' && !!section.val.default){   //如果section type显示是9说明是select节点，取default值继续递归
                var subNode = getNode(SBOM,section.val.default);
                coverTree(subNode,PHOT);
              }
            }
          }
          break;
        case 'node' :     //节点中的section类型只可能是4,5,7,11,13
          console.log(node.id+':node节点，开始展示---------');
          for(var k in PHOT){    //判断nodeId是否在spu中，如果存在就继续展示，如果不存在就不再展示
            if(PHOT[k] == node.id){
              ShowNode.init(node.id);
            }
          }
          break;
      }
  }
  //构建一个对象，作用是将对应nodeId显示出来
  var ShowNode = {
    init : function(nodeId){

      var node = getNode(SBOM,nodeId);      //获取到对应的节点对象
      for(var k in node.sections){          //遍历节点对象的sections
        if(node.sections.hasOwnProperty(k)){
          var sec = node.sections[k];   //取当前section
          var sectionObj = getSectionObj(SECTION,sec.sectionid.$id);     //查询该sectionid对应的对象
          if(!!sectionObj){           //防止sectionObj查询不到
            console.log('当前处理的section类型编号为：'+sectionObj.type);
            switch (sectionObj.type){
              case '7' : this.forPicObj(node,sec); break;       //贴图对象
              case '5' : this.forTransform(node,sec); break;    //transform
              case '3' : this.forFBX(); break;                  //fbx文件
              //case '11' : this.forPrice(); break;             //价格贡献
              //case '12' : this.forColor(); break;             //颜色
              //case '13' : this.forColorObj(); break;          //颜色对象
              //case '10' : this.forBoolSection(); break;       //BoolSection
              //case '9' : this.forSelectSection(); break;      //SelectSection
              //case '8' : this.forGroupSection(); break;       //GroupSection
              case '6' : this.forPicFile(); break;              //贴图文件
              //case '4' : this.forPreview(); break;            //预览图
              //case '2' : this.for3dmax(); break;              //3dmax文件
              //case '1' : this.forBasicInfo(); break;          //基本信息
            }
          }else{
            console.error('section ID 未查询到！'+sec.sectionid.$id);  //调试使用，待删除
          }
        }
        //break;  //先处理一个section信息
      }
    },
    //处理位置对象
    forTransform : function(node,sec){
      console.log('准备处理位置信息---------------------------');
      var c = new Create();
      var file = getMaterialFile(MATERIAL,node.material_node_id.$id,'3');
      c.partId = node.template_id.$id;
      c.fbxPath = fbxPathConfig;
      c.fbxName = file;

      c.position = deepClone(sec.val.position);
      // c.position.x = 0;
      // c.position.y = 0;
      // c.position.z = 50;

      c.rotation = deepClone(sec.val.rotation);
      console.log(JSON.stringify(c));
      sendU3DRequest('create',c);   //发送渲染指令

      customSofaObj.create.push(JSON.stringify(c));   //将字符串压入用户定制对象中
      /*没有贴图对象，发送一个空指令，使其获得默认的贴图*/
      var m = new Material();
      m.partId = node.template_id.$id;
      customSofaObj.material.push(JSON.stringify(m));   //将字符串压入用户定制对象中
      console.log(JSON.stringify(m));
      sendU3DRequest('material',m);   //发送渲染指令
    },
    //处理贴图对象
    forPicObj : function(node,sec){
      console.log('准备处理贴图对象-------------------------------');
      var s = sec.val.object;     //获取sections里面存的BOMID
      if(s.match(/([0-9|.])+/) && !!s){  //校验bomid格式，只允许数字和圆点
        var arr = s.split(',');     //拆分BOMID字符串
        this.sendCreateObj(node,arr); //处理模型节点的指令
        this.sendMaterialObj(node.template_id.$id,node.material_node_id.$id);  //传入templateid作为partid，传入material id获取对应的贴图文件
      }
    },
    sendCreateObj : function(node,arr){
      for(var i in arr){
        var subNode = getNode(SBOM,arr[i]);     //获取BOMID对应的节点
        var c = new Create();                 //创建Create对象
        c.partId = node.template_id.$id;      //暂时将templateid作为partid赋值给
        var file = getMaterialFile(MATERIAL,subNode.material_node_id.$id,'3');
        c.fbxPath = fbxPathConfig;
        c.fbxName = file;
        for(var k in subNode.sections){         //遍历该节点下的sections
          var subSec = subNode.sections[k];        //取当前section
          var subSecObj = getSectionObj(SECTION,subSec.sectionid.$id); //查询对应的section对象
          if(!!subSecObj){
            if (subSecObj.type === '5'){

              c.position = deepClone(subSec.val.position);
              // c.position.x = 0;
              // c.position.y = 0;
              // c.position.z = 50;
              c.rotation = deepClone(subSec.val.rotation);
            }
          }else{
            console.error('section ID 未查询到！');
          }
        }
        console.log('发送fbx文件：',JSON.stringify(c));
        sendU3DRequest('create',c);
        customSofaObj.create.push(JSON.stringify(c));   //将当前发送的指令压入定制对象中
        //break;/*先处理贴图对象里的第一个对象*/
      }
    },
    sendMaterialObj : function(tid,mid){
      //此方法用于获取贴图文件，并发送给U3D渲染
      var file = getMaterialFile(MATERIAL,mid,'6');   //传入6获取的是贴图文件
      //创建material对象
      var m = new Material();
      m.partId = tid;
      m.material.shader.texture.mainTex = imgPathConfig + file;
      sendU3DRequest('material',m);
      console.log(JSON.stringify(m));
      customSofaObj.material.push(JSON.stringify(m));   //将当前发送的指令压入定制对象中
    },

    forFBX : function(){
      console.log('准备处理FBX -------------------------------');
    },
    forPicFile : function(){
      console.log('准备处理贴图文件------------------------------');
    },
    forPrice : function(){
      console.log('准备处理价格 -------------------------------');
    },
    forColor : function(){
      console.log('准备处理颜色 -------------------------------');
    },
    forColorObj : function(){
      console.log('准备处理颜色对象------------------------------');
    },
    forBoolSection : function(){
      console.log('准备处理forBoolSection------------------------------');
    },
    forSelectSection : function(){
      console.log('准备处理forSelectSection------------------------------');
    },
    forGroupSection : function(){
      console.log('准备处理forGroupSection------------------------------');
    },
    forPreview : function(){
      console.log('准备处理预览图------------------------------');
    },
    for3dmax : function(){
      console.log('准备处理3dmax文件------------------------------');
    },
    forBasicInfo : function(){
      console.log('准备处理基本信息------------------------------');
    }
  };

  //构建一个对象，作用是展示除u3d窗口外的其他区域
  var showChooseWindow = {

    init: function(){
      hotsMove.init();
      this.showLevel1();
      this.showLevel2();
      this.showTitle();
    },
    showLevel1: function(){ //显示第一级菜单，就是左侧的icon
      //展示第一级菜单及其对应的容器元素，str1为level1菜单，str2为对应的容器元素
      var str1 = '', str2 = '', i = 0;
      for(var key in SPU.web_view){
        var p = SPU.web_view[key];
        i++;
        if(i == 1){
          // 如果是第一个对象，则设置为默认激活状态
          str1 += '<li class="active" ><a href="#level1_'+i+'" title="'+p.name+'"></a></li>';
          str2 += '<div class="active" id="level1_'+i+'"><ul class="panel-group" id="main'+i+'" role="tablist">'+showAccordion(p,i)+'</ul></div>';
        }else{
          str1 += '<li><a href="#level1_'+i+'" title="'+p.name+'"></a></li>';
          str2 += '<div id="level1_'+i+'"><ul class="panel-group" id="main'+i+'" role="tablist">'+showAccordion(p,i)+'</ul></div>';
        }
      }
      // dom渲染及用户交互逻辑
      $('.iconList').html(str1).on('click','li',function(){
        /*1. 对应icon样式变换，同时改变当前显示区的标题*/
        $(this).addClass('active').siblings('.active').removeClass('active');
        var title = $(this).children('a').attr('title');
        $('.contentArea>h2').html(title);
        // 2. 对应锚点div显示
        var currentId = $(this).children('a').attr('href');
        $(currentId).addClass('active').siblings('.active').removeClass('active');
      }).on('click','a',function(e){
        // 如果点到a上，阻止a的默认事件
        e.preventDefault();
      });
      $('.contentList').html(str2);
      //声明一个内部函数，专门处理手风琴内容
      function showAccordion(p,i){
        var str3 = '';
        var j = 0;
        for(var k in p.items){
          j++;
          var subp = p.items[k];
          if(j == 1){
            // 设置第一个为默认激活状态
            str3 += '<li class="panel panel-default">' +
              '<h3 class="panel-title" data-toggle="collapse" data-parent="#main'+i+'" data-target="#main'+i+'_'+j+'" aria-expanded="true">'+subp.name+'</h3>' +
              '<div id="main'+i+'_'+j+'" class="panel-collapse collapse in" role="tabpanel" data-mapid="'+subp.mapid+'"><div class="panel-body"></div></div>' +
              '</li>';
          }else{
            str3 += '<li class="panel panel-default">' +
              '<h3 class="panel-title" data-toggle="collapse" data-parent="#main'+i+'" data-target="#main'+i+'_'+j+'">'+subp.name+'</h3>' +
              '<div id="main'+i+'_'+j+'" class="panel-collapse collapse" role="tabpanel" data-mapid="'+subp.mapid+'"><div class="panel-body"></div></div>' +
              '</li>';
          }
        }
        return str3;
      }
    },
    showLevel2: function(){
      var that = this;
      // 遍历当前所有有data-mapid属性的元素，就是手风琴组件元素
      $('[data-mapid]').each(function(idx,elem){
        // 获取当前dom对象的BOM节点ID
        var nodeId = elem.getAttribute('data-mapid');
        var bomNode = getNode(SBOM,nodeId);
        //if(nodeId !== '7.1'){ return ;}   //暂时只处理2.1节点
        console.log(bomNode.type);
        // 根据节点ID分别获取SPU.option和SBOM中对应的对象
        if(bomNode.type === 'select'){
          // 如果当前节点是select节点
          // 1. 获取到spu中的节点对象
          // 2. 获取到子节点对象的集合
          // 3. 遍历，字符串拼接
          var spuNode = SPU.options[nodeId];
          var spuNodeArr = that.getNodeArr(spuNode.values);  // 获取当前节点子节点组合
          console.log(spuNode);
          var str1 = '<div class="mainSelect"><ul>';
          for(var key in spuNodeArr){
            if(!!PHOT[key]){  //如果爆款中存在，说明这是当前激活项
              str1 += '<li class="active" data-mapid="'+key+'">'+spuNodeArr[key].name+'</li>';
            }else{
              str1 += '<li data-mapid="'+key+'">'+spuNodeArr[key].name+'</li>';
            }
          }
          str1 += '</ul></div>';
        }else if(bomNode.type === 'group'){
          // 如果是group节点
          // 1. 获取其对应的bom节点对象
          // 2. 遍历bom节点对象的items属性
          var s = '', arr = [];
          for(var key in bomNode.items){
            if(!!SPU.options[bomNode.items[key].id]){
              s += ',' + bomNode.items[key].id;
            }
          }
          var spuNodeArr = that.getNodeArr(s.slice(1));
          // 3. 获取到id值，到spu列表对比，如果存在，压入数组
          // 4. 遍历数组，拼接字符串
          var str1 = '<div class="mainSelect"><ul>';
          for(var key in spuNodeArr){
            if(!!PHOT[key]){  //如果爆款中存在，说明这是当前激活项
              str1 += '<li class="active" data-mapid="'+key+'">'+spuNodeArr[key].name+'</li>';
            }else{
              str1 += '<li data-mapid="'+key+'">'+spuNodeArr[key].name+'</li>';
            }
          }
          str1 += '</ul></div>';

        }else if(bomNode.type === 'bool'){
          console.log('当前处理的是bool节点------------------------');
          var spuNode = SPU.options[nodeId];
          var spuNodeArr = that.getNodeArr(spuNode.values);  // 获取当前节点子节点组合
          for(var key in spuNodeArr){
            if(!!PHOT[key]){  //如果爆款中存在，说明这是当前激活项
              var str1 = '<div class="boolSelect" data-mapid="'+key+'"> <span>是否确定选择</span> <div class="btn-group"> ' +
                '<button type="button" class="btn btn-bool active" data-bool="true">是</button> ' +
                '<button type="button" class="btn btn-bool" data-mapid="false">否</button> ' +
                '</div> </div><div class="mainSelect"><ul>';
              str1 += '<li class="active">'+spuNodeArr[key].name+'</li>';
              str1 += '</ul></div>';
            }else{
              var str1 = '<div class="boolSelect" data-mapid="'+key+'"> <span>是否确定选择</span> <div class="btn-group"> ' +
                '<button type="button" class="btn btn-bool" data-bool="true">是</button> ' +
                '<button type="button" class="btn btn-bool active" data-mapid="false">否</button> ' +
                '</div> </div><div class="mainSelect"><ul>';
              //str1 += '<li class="active">'+spuNodeArr[key].name+'</li>';
              str1 += '</ul></div>';
            }
          }
        }
        //  第二级选择菜单
        $('[data-mapid="'+nodeId+'"]>.panel-body').html(str1);



      });
      //用户交互
      $('.mainSelect').on('click','ul>li',function(){
        if($(this).hasClass('active')){return ;}    //如果用户点击的按钮已经是active的，不再响应事件
        $(this).addClass('active').siblings('.active').removeClass('active');
      });
      $('.btn-group').on('click','button',function(){
        $(this).addClass('active').siblings('.active').removeClass('active');
        console.log($(this).parent().parent().attr('data-mapid'));
        
      });
    },
    showActive: function(){},
    getNodeArr: function(s){    //传入spu.options中对应节点的value值，返回包含这些bom节点对应的名称的对象
      var idArr = s.split(',');
      var arr = [];
      for(var key in idArr){
        if(!!SPU.options[idArr[key]]){
          arr[idArr[key]] = SPU.options[idArr[key]]
        }else{}
          // 如果查找不到，说明是group节点
          var node = getNode(SBOM,idArr[key]);
          for(var k in node.sections){
            var section = getSectionObj(SECTION,node.sections[k].sectionid.$id);
            if(section.type === '8'){   //如果type为8说明是group
              arr[idArr[key]] = {
                icon: '',
                values: '',
                name: node.sections[k].val.name
              }
            }
          }
      }
      return arr;
    },
    showTitle: function(){
      var title = $('.iconList>li.active>a').attr('title');
      $('.contentArea>h2').html(title);
    }
  };
  /*爆款列表左右移动*/
  var hotsMove = {
    qty: 0,       //获取服务器传来的爆款的个数
    moved: 0,     //左移的爆款个数
    size: 5,      //默认展示个数
    OFFSET: 100,
    LENGTH: 320,      //每次移动的距离
    canMoveLeft: false,
    canMoveRight: false,
    init: function(){
      this.qty = getObjAttrQty(SPU['hots']);
      var that = this;
      $('.forward').on('click',function(){
        that.canMoveLeft && that.move(-1);
      });
      $('.backward').on('click',function(){
        that.canMoveRight && that.move(1);
      });
      this.checkStatus();
      this.load();
    },
    load: function(){
      /*爆款列表显示*/
      var s = '';
      for(var k in SPU['hots']){
        var p = SPU['hots'][k];
        var imgSrc = '';
        for(var i in p['preview']){
          var imgs = p['preview'][i];
          if(imgs.tag == 'PC'){
            imgSrc = imgs['image'];
          }
        }
        s += '<li data-pid="'+p.id+'" title="'+p.name+'">' +
          '<span><img src="http://192.168.1.251/orange/modules/watermelon/uploads/hots/'+imgSrc+'" ></span>' +
          '</li>'
      }
      $('.picSelect').html(s);
    },
    move: function(d){
      var s = $('.picSelect');
      var l = parseFloat(s.css('left'));
      l += this.LENGTH * d;
      s.css('left',l+'px');
      this.moved += -d;
      this.checkStatus();
    },
    checkStatus: function(){
      if(this.qty <= this.size){
        this.canMoveLeft = this.canMoveRight = false;
      }else{
        if(this.moved <= 0){
          this.canMoveLeft = true;
          this.canMoveRight = false;
        }else if(this.moved > 0 && this.moved < this.qty-this.size){
          this.canMoveLeft = this.canMoveRight = true;
        }else if(this.moved >= this.qty-this.size){
          this.canMoveLeft = false;
          this.canMoveRight = true;
        }
      }
    }
  };

  /******************************************************
 **********以下为用户交互逻辑设计，放在js最后******************
 *******************************************************/

  /*主体面料的用户交互逻辑*/
  $('.mainSelect').on('click','ul>li',function(){
    $(this).addClass('active').siblings('.active').removeClass('active');
    //ajax



  });
  $('.btn-search').on('click',function(){
    $(this).addClass('active').siblings('.active').removeClass('active');
    // 根据自定义属性request的值发送ajax请求 .......


  });
  /*右侧输入框的搜索建议功能*/
  $('.searchBar>input').on('keyup',function(){
    var str = $(this).val();
    // ajax....


  });
  $('.searchBar>ul').on('click','li',function(){
    var str = $(this).html();
    $('.searchBar>input').val(str);
    // ajax....


  });
  $('.searchBar>.searchBtn').click(function(){
    var str = $(this).siblings('input').val();
    // ajax.....

  });

  //面料级别筛选的选择逻辑，暂时不做

  // 选择面料时的用户交互逻辑
  $('.selectLevel3>ul').on('click','li',function(){
    $(this).addClass('active').siblings('.active').removeClass('active');
    // ajax ......

  });

  /*添加定制列表和打开定制列表*/
  $('#openCustomListBtn').click(function(){
    location.href = 'customList.html';



  });
  /*鼠标滚动设置*/
  // 首先判断页面是否有滚动条
  var body = $('body');
  body.scrollTop(1);
  var isRollbarExist = (body.scrollTop()>0);
  body.scrollTop(0);
  $('.contentList').on('mousewheel',function(){
    var me = this;
    if(isRollbarExist && !isTop(me)){
      $('body').addClass('hideRollbar');
    }else{
      $('body').removeClass('hideRollbar');
    }
  }).on('mouseover',function(){
    if(isRollbarExist){
      $('body').addClass('hideRollbar');
    }
  }).on('mouseleave',function(){
    if(isRollbarExist){
      $('body').removeClass('hideRollbar');
    }
  });



/******************************************
 * **********常用函数封装********************
 *******************************************/

  /*构建U3D所需的对象*/
  function Create(){
    this.partId = '';
    this.fbxPath = '';
    this.fbxName = '';
    this.position = {'x':'', 'y':'', 'z':''};
    this.rotation = {'x':'', 'y':'', 'z':''};
    this.scale = {'x':'1', 'y':'1', 'z':'1'};
    this.positionRelative = '-1';
  }
  function Material(){
    this.partId = '';
    this.material = {
      'materialName':'',
      'shader':{
        'shaderName':'Standard (Specular setup)',
        'color_main':{'r':'1', 'g':'1', 'b':'1', 'a':'1'},
        'color_specular':{'r':'0', 'g':'0', 'b':'0', 'a':'1'},
        'texture':{'mainTex':'', 'normalTex':'', 'widthReal':'1', 'heightReal':'1', 'widthUV':'50', 'heightUV':'50'},
        'tiling':{'x':'1', 'y':'1'},
        'offset':{'x':'0', 'y':'0'}
      }
    }
  }
  function Sence(){
    this.sceneId = ''
  }

  /*封装发送U3D渲染指令的方法*/
  //第一个参数是方法名，可以缺省，缺省之后是发送整个沙发模型json对象
  function sendU3DRequest(string,obj){
    if(arguments.length == 2){
        SendMessage("3DPreview_Communication",string,JSON.stringify(obj));
    }else if(arguments.length == 1){
      var o = arguments[0];
      for(var k in o){
        for(var i in o[k]){
          var s = JSON.stringify(o[k][i]);
          SendMessage("3DPreview_Communication",k,s);
        }
      }
    }
  }
  /*判断当前窗口是否滚动到底部或者顶部*/
  function isTop(me){
    var h = $(me).height();   // 当前div的高度
    var s = -parseFloat($(me).parent().css('top'));   //当前div滚动过的高度
    var H = 414+1;   //外框的高度
    return s>=h-H || s<=1;
  }
  /*获取url携带的参数*/
  function getRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = {};
    if (url.indexOf("?") != -1) {
      var str = url.substr(1).split("&");
      for(var i = 0; i < str.length; i ++) {
        theRequest[str[i].split("=")[0]]=(str[i].split("=")[1]);
      }
    }
    return theRequest;
  }
  /*通过节点ID获取BOM节点对象*/
  function getNode(SBOM,nodeId){
    if(nodeId === ''){return console.error('nodeId不能为空！');}
    var tree = SBOM['tree'];
    var path = nodeId.split('.');
    var p = [];
    for(var k in path){
      p.push(path[k]);
      p.push('items');
    }
    newPath = p.slice(0,-1);
    var arr = [deepClone(tree)];
    var i = 0;
    while(1){
      var k = newPath[i];
      i++;
      arr[i] = arr[i-1][k];
      if(!newPath[i]) break;    //如果路径走完，break
    }
    return arr[arr.length-1];
  }
  /*对象的深度克隆*/
  function deepClone(obj){
    var result=null;
    switch (Object.prototype.toString.call(obj).slice(8,-1))
    {
      case 'Object':
        result = {};
        copy(obj);
        break;
      case 'Array':
        result = [];
        copy(obj);
        break;
      default:
        return obj;
    }
    function copy(obj){
      for(var key in obj){
        if(obj.hasOwnProperty(key)){
          result[key] = deepClone(obj[key]);
        }
      }
    }
    return result;
  }
  /*获取对象属性的个数（不包括继承来的）*/
  function getObjAttrQty(obj){
    var i = 0;
    for(var key in obj){
      if(obj.hasOwnProperty(key)){
        i++;
      }
    }
    return i;
  }
  /*遍历material表，获取贴图文件和fbx文件*/
  function getKeyField(m,typeId){
    var hash = [];
      for(var key in m){
        var section = m[key].sections;
        for(var k in section){
          var subSection = section[k];
          var sField = getSectionObj(SECTION,subSection.sectionid.$id);
          if(sField.type === typeId){
            if(!hash[subSection.val.file]){
              hash[subSection.val.file] = 1;
            }
          }
        }
      }
    var i = 0;
    var arr = [];
    for(arr[i++] in hash);
    return arr;
  }
  /*通过Section ID获取section对象*/
  function getSectionObj(s,k){
    for(var i in s){
      if(s.hasOwnProperty(i)){
        var o = s[i];
        if(o._id.$id === k){
          return o;
        }
      }
    }
    return {};
  }
  /*通过material id和type类型获取对应的material文件*/
  function getMaterialFile(MATERIAL,mid,typeid){
    for(var k in MATERIAL){   //遍历Material表
      var node = MATERIAL[k];   //取当前节点node
      if(node._id.$id === mid){   //如果该node对应的id为mid
        for(var i in node.sections){  //遍历该node节点下的sections
          var sec = node.sections[i];   //取出当前section
          var subSec = getSectionObj(SECTION,sec.sectionid.$id); //获取到section对象
          if(subSec.type == typeid){
            switch (typeid){
              case '3' :
                return FBX[sec.val.file];
              case '6' :
                return MAPS[sec.val.file];
            }
          }
        }
      }
    }
  }
  function getHotsInfo(pid){
    var presentHot = {};
    for(var key in SPU.hots){
      SPU.hots[key].id == pid && ( presentHot = SPU.hots[key].select );
    }
    return presentHot;
  }

  /*数组去重*/
  function removeDuplicated(arr){
    var hash = [],newArr = [];
    for(var i in arr){
      if(!hash[arr[i]]){
        hash[arr[i]] = 1;
        newArr.push(arr[i]);
      }
    }
    return newArr;
  }
}


