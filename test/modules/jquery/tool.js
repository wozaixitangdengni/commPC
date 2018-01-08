define('modules/jquery/tool', function(require, exports, module) {

  ;(function($){
  
  	var Tool = function(){
  	}
  
  	Tool.prototype = {
  
  		//去掉字符串头尾空格
  		trim:function(str){
  			return str.replace(/^\s+|\s+$/g, "");
  		},
  		//验证手机号码
  		checkMobilePhone:function(str){
  			if (str.match(/(^13\d{9}$)|(^14)[5,7]\d{8}$|(^15[0,1,2,3,5,6,7,8,9]\d{8}$)|(^17)[6,7,8]\d{8}$|(^18\d{9}$)/g) == null) {
  		        return false;
  		    }
  		    else {
  		        return true;
  		    }
  		},
  		//验证是否为空
  		checkNull:function(str){
  			if(Tool.prototype.trim(str).length != 0){
  				return false;
  			}else{
  				return true;
  			}
  		},
  
  		//loading加载
  		loading:function(content,time,href){
  			var $weui_loading_toast=$('.weui_loading_toast');
  				$weui_loading_toast.show();
  				$weui_loading_toast.find('.weui_toast_content').text(content);
  				setTimeout(function(){
  					$weui_loading_toast.hide();
  					if(href){
  						location.href=href;
  					}
  				},time);
  		},
      //关闭loading
      hide_loading:function(){
        var $weui_loading_toast=$('.weui_loading_toast');
        $weui_loading_toast.hide();
      },
  		//提示信息
  		vaePormpt:function(content,url,time){
  			var $p = '';
  			if(!$('.info').length){
  				$p = $('<div class="info"></div>');
  				$('body').append($p);
  				
  			}else{
  				$p = $('.info');
  			}
        $p.text(content);
  			$p.show();
        if(!time){
          time = 2000;
        }
  			setTimeout(function(){
  				$p.hide();
          if(url){
              location.href=url;
            }
  			},time);
  		},
      //ajaxform
      showResponse:function(responseText, statusText){
        if(responseText.status == 1){
            var url = location.href;
            if(responseText.url){
              url = responseText.url;
            }
          Tool.prototype.loading(responseText.info,1000,url);
       }else{
          Tool.prototype.hide_loading();
          Tool.prototype.vaePormpt(responseText.info,responseText.url);
          return false;
       }
      }
  
  	};
  
  	window['Tool'] = Tool;
  
  })(jQuery)

});
