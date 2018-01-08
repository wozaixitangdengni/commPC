define('modules/jquery/jquery-countdown', function(require, exports, module) {

  (function($){
  
  	//倒计时插件
  	var Countdown = function(options){
  		var self = this;
  		this.options = {
  			time:$('.J-time'),	//元素
  			sleep:100			//速度
  		};
  		$.extend(this.options,options);
  		this.his = this.options.time.text().split(':');		//拆分
  		this.timer = setInterval(function(){
  			self.onTime();
  		},this.options.sleep);
  
  
  	};
  
  	Countdown.prototype = {
  		//倒计时开始
  		 onTime:function(){
  		 	var self = this;
  		 	switch(self.his.length){
  				case 1:
  					console.log('秒');
  					if(self.his[0] != 0){
  						self.options.time.text(--self.his[0]);
  					}else{
  						clearInterval(self.timer);
              //$('.J-pay').removeClass('btn-error').addClass('btn-disabled');
  					}
  					break;
  				case 2:
  					console.log('分秒');
  					self.his[1] -= 1;
  					if(self.his[1] < 0){
  						self.his[1] = 59;
  						self.his[0] -= 1;
  					}
  					if(self.his[0] < 0){
  						clearInterval(self.timer);
              $('.J-pay').removeClass('btn-error').addClass('btn-disabled');
  						return false;
  					}
  					var i = self.his[0] < 10 ? ('0'+self.his[0]) : self.his[0];
  					var s = self.his[1] < 10 ? ('0'+self.his[1]) : self.his[1];
  					self.options.time.text(i + ':' + s);
  					break;
  				case 3:
  					console.log('时分秒');
  					self.his[2] -= 1;
  					if(self.his[2] < 0){
  						self.his[2] = 59;
  						self.his[1] -= 1;
  						if(self.his[1] < 0){
  							self.his[1] = 59;
  							self.his[0] -= 1;
  							console.log(self.his[0]);
  						}
  					}
  					if(self.his[0] < 0){
  						clearInterval(self.timer);
  						return false;
  					}
  					var h = self.his[0] < 10 ? ('0'+self.his[0]) : self.his[0];
  					var i = self.his[1] < 10 ? ('0'+self.his[1]) : self.his[1];
  					var s = self.his[2] < 10 ? ('0'+self.his[2]) : self.his[2];
  					self.options.time.text(h + ':' +i + ':' + s);
  					break;
  				case 4:
  					console.log('时分秒毫秒');
  					self.his[3] -= 10;
  					if(self.his[3] < 0){
  						self.his[3] = 90;
  						self.his[2] -= 1;
  						if(self.his[2] < 0){
  							self.his[2] = 59;
  							self.his[1] -= 1;
  						}
  						if(self.his[1] < 0){
  							self.his[1] = 59;
  							self.his[0] -= 1;
  						}
  					}
  					if(self.his[0] < 0){
  						clearInterval(self.timer);
  						return false;
  					}
  					var h = self.his[0] < 10 ? ('0'+self.his[0]) : self.his[0];
  					var i = self.his[1] < 10 ? ('0'+self.his[1]) : self.his[1];
  					var s = self.his[2] < 10 ? ('0'+self.his[2]) : self.his[2];
  					var ms = self.his[3] < 10 ? ('0'+self.his[3]) : self.his[3];
  					self.options.time.text(h + ':' +i + ':' + s + ':' + ms);
  					break;
  			}
  		 }
  	};
  
  	window['Countdown'] = Countdown;
  
  })(jQuery);

});
