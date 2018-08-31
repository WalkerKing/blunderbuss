/**
 * Created by Administrator on 2016/12/27.
 */
/*
 *传入需要验证的表单元素的容器id，所有需要验证的表单元素加上data-type属性，
 * 本方法将根据data-type属性的值对输入值进行校验，校验通过返回true
 * */

var sectionValidator = function( id ){
  var errArr = [];
  var forms = $('#'+id).find('input,select,textarea');
  var rules = {
    isNonEmpty: function( d ){
      return !( d === '' || d === null || d === undefined );
    },
    isINT: function( d ){
      if( (d + '').length > 10 ){ return false; }
      return /^-?\d+$/.test( d );
    },
    isBOMID: function( d ){},
    isMoney: function( d ){
      return /^\d+(\.\d{1,2})?$/.test(d);
    },
    isSTRING: function( d ){
      return ( ( d + '' ).length < 512 && ( d + '' ) > 0 );
    },
    isTXT: function( d ){
      return true;
    },
    isFLOAT: function( d ){
      return /^(-?\d+)(\.\d+)?$/.test( d );
    },
    isINT64: function( d ){},
    isDOUBLE: function( d ){},
    isCOLOR: function( d ){},
    isDATE: function( d ){
      return  /^(\d{4})-(\d{2})-(\d{2})$/.test( d );
    },
    isDATETIME: function( d ){},
    isTIME: function( d ){},
    isINTRANGE: function( d ){},
    isBOMNODE: function( d ){
      return /^((\d+)(\.)?)+(\d)$/.test( d );
    },
    isBOMNODES: function( d ){
      return /^((\d+)(\.|\,)?)+(\d)$/.test( d );
    }
  };
  var validatSingleInput = function( $this ){
    var dataType = $this.attr('data-type'); //  获取待验证表单元素规定的数据类型
    var val = $this.val();  //  待验证表单的值
    if(!dataType || !rules['is'+dataType]){
      return true;
    }else if( !rules['is'+dataType](val) ){
      $this.addClass('hasError');
      errArr.push( $this );
    }
  };
  $('#'+id).off('blur focus', 'input,select,textarea').on( 'blur', 'input,select,textarea', function(){
    validatSingleInput( $(this) )
  }).on('focus','input,select,textarea', function(){
    $(this).removeClass('hasError');
  });

  forms.each(function( i,v ){
    validatSingleInput( $(this) );
  });
  return ( errArr === 0 );
};

