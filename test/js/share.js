

window.share = {
	title:title,//微信分享title
	desc :desc,//微信分享显示的文字
	url : url,//url链接  
	picture : picurl,//显示的图片
	appid:appId//微信appid
}

wx.config({
	debug: false,
    appId: appId,
    timestamp: timestamp,
    nonceStr: nonceStr,
    signature: signature,
    jsApiList: [
      // 所有要调用的 API 都要加到这个列表中
      'checkJsApi',
      'onMenuShareTimeline',
      'onMenuShareAppMessage',
      'onMenuShareQQ',
      'onMenuShareWeibo',
      'hideMenuItems',
      'showMenuItems',
      'hideAllNonBaseMenuItem',
      'showAllNonBaseMenuItem',
      'translateVoice',
      'startRecord',
      'stopRecord',
      'onRecordEnd',
      'playVoice',
      'pauseVoice',
      'stopVoice',
      'uploadVoice',
      'downloadVoice',
      'chooseImage',
      'previewImage',
      'uploadImage',
      'downloadImage',
      'getNetworkType',
      'openLocation',
      'getLocation',
      'hideOptionMenu',
      'showOptionMenu',
      'closeWindow',
      'scanQRCode',
      'chooseWXPay',
      'openProductSpecificView',
      'addCard',
      'chooseCard',
      'openCard',
      'error'
    ]
  });


		
wx.ready(function () {
	// 在这里调用 API
	//
	wx.showOptionMenu();
	//分享成功回调
	function shareSuccess(){
		if(share_url){
            var ajax = new XMLHttpRequest();
            ajax.open('get',share_url);
            ajax.send();
            ajax.onreadystatechange = function () {
                if (ajax.readyState==4 &&ajax.status==200){}
            }
        }
    }
	
	wx.onMenuShareTimeline({
		  title: window.share.title,
		  desc:window.share.desc,
		  link: window.share.url,
		  imgUrl: window.share.picture,
		  trigger: function (res) {
//		    alert('用户点击分享到朋友圈');
		  
		  },
		  success: function (res) {
//		    alert('已分享用户点击分享到朋友圈');
			  shareSuccess();
		  },
		  cancel: function (res) {
//		    alert('已取消用户点击分享到朋友圈');
		  },
		  fail: function (res) {
//		    alert(JSON.stringify(res));
		  }
		});

		wx.onMenuShareAppMessage({
			  title: window.share.title,
			  desc:window.share.desc,
			  link: window.share.url,
			  imgUrl: window.share.picture,
		    trigger: function (res) {
//		    alert('用户点击发送给朋友');
		    
		  },
		  success: function (res) {
//		    alert('已分享用户点击发送给朋友');
			  shareSuccess();
		  },
		  cancel: function (res) {
//		    alert('已取消用户点击发送给朋友');
		  },
		  fail: function (res) {
//		    alert(JSON.stringify(res));
		  }
		});


		wx.onMenuShareQQ({
			  title: window.share.title,
			  desc:window.share.desc,
			  link: window.share.url,
			  imgUrl: window.share.picture,
		  trigger: function (res) {
//		    alert('用户点击分享到QQ');
		   
		  },
		  complete: function (res) {
//		    alert(JSON.stringify(res));
		  },
		  success: function (res) {
//		    alert('已分享用户点击分享到QQ');
			  shareSuccess();
		  },
		  cancel: function (res) {
//		    alert('已取消已分享用户点击分享到QQ');
		  },
		  fail: function (res) {
//		    alert(JSON.stringify(res));
		  }
		});

		wx.onMenuShareWeibo({
			  title: window.share.title,
			  desc:window.share.desc,
			  link: window.share.url,
			  imgUrl: window.share.picture,
		  trigger: function (res) {
//		    alert('用户点击分享到微博');
		    
		  },
		  complete: function (res) {
//		    alert(JSON.stringify(res));
		  },
		  success: function (res) {
//		    alert('已分享用户点击分享到微博');
			  shareSuccess();
		  },
		  cancel: function (res) {
//		    alert('已取消用户点击分享到微博');
		  },
		  fail: function (res) {
//		    alert(JSON.stringify(res));
		  }
		});
		
		if (typeof getLocationByWeixin == 'function') {
			getLocationByWeixin();
		}
});




