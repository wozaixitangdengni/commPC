/**
 * 总配置文件控制全局参数 v=4.2.71
 * (c) 2016-2017 Jensen Wang
 * @license: //www.228.com.cn
 */

(function(root) {
    var ylst = {};

    //检测环境 pc,wap
    var isMobile = Lib.browser.mobile;

    //获取最大购买数量和接口数据的路径
    var onlineSeatUrl = Lib.getParam("onlineSeatUrl");
    // var maxseatNum = Lib.getParam("seatNumId");
    if (onlineSeatUrl == null || onlineSeatUrl == undefined || onlineSeatUrl == "" || onlineSeatUrl == "null" || onlineSeatUrl == "(null)") {
        onlineSeatUrl = "/seat/load.jsonp";
    }

    // //配置接口基础路径
    var baseUrl = '//commapi.228.cn';

    var ordersid = Lib.getParam("ordersid");
    var toOrderUrl;
    if (ordersid == null || ordersid == undefined || ordersid == "" || ordersid == "null" || ordersid == "(null)") {
        toOrderUrl = '//www.228.com.cn/chooseSeat.html?type=web';
    }else{
        toOrderUrl = '//www.228.com.cn/qzchooseSeat.html?type=web';
    }
    //全局参数配置
    ylst.configs = {
        // 'rule': '../build/js/model/rule.js', //为空则不加载，可以开发配置不一样的规则
        // 'viewLoad': isMobile ? '../build/js/wap/wapView.js' : '../build/js/pc/pcView.js', //页面展示形式
        'basePath': baseUrl + onlineSeatUrl, //选座接口配置
        //'imgPath': '../build/img/',  //座位渲染图片路径
        'imgPath': '../yongle/img/',  //座位渲染图片路径
        'mobilejs': '../build/js/lib/Mobile.js', //ios android 下加载适配js
        'toOrderUrl': toOrderUrl, //pc或者wap结算跳转 点击结算跳转到下一个页面
        'waptoseat': '../wap/seat.html?onlineSeatUrl=', //wap区域调整到座位图链接

        'spath': isMobile ? 'wap' : 'pc', //页面展示形式
        'areaIsSmall': false, //pc下区域图显示的大小状态
        'changeSession': false, //判断是否切换场次
        'onlineSeatUrl': onlineSeatUrl, //选座接口路径
        'maxseatNum': 6, //正常票的最大购买数量
        'singleSession': false,  //是否单场次
        // 'maxtpseatnum': maxtpseatnum, //套票的最大购买数量
        // 'iosUsed': false, //是否用在ios和android上面  false =>wap || true=>ios/android
        'pageStatic': 'area', //页面当时所停留的状态area , seat
        'checkSeatsLocked': true, //判断座位是否锁座，没有锁座可以配置为false
        'buyNoMoney': false,  //结算时候是否显示票价和总金额
        'totalMoney':0,
        'seatSingleShow': false,  //座位套票情况下也单个不合并显示
        'zytpIsUsed': true,  //默认自由套票使用
        'pid': Lib.getParam("pid") ? Lib.getParam("pid") : '',  //来源
        'sc': Lib.getParam("sc") ? Lib.getParam("sc") : '',  //来源
        'channel': Lib.getParam("channel") ? Lib.getParam("channel") : '',  //渠道
        'union': Lib.getParam("union") ? Lib.getParam("union") : '',  //是否联盟
        'uid': Lib.getParam("uid") ? Lib.getParam("uid") : '',  //联盟uid
        'ukey': Lib.getParam("ukey") ? Lib.getParam("ukey") : '',  //联盟ukey
        'magic': Lib.getParam("magic") ? Lib.getParam("magic") : '',  //magic传什么返回什么
        'ordersid': Lib.getParam("ordersid") ? Lib.getParam("ordersid") : '',
        'userid': Lib.getParam("userid") ? Lib.getParam("userid") : '',
        'session': Lib.getParam("session") ? Lib.getParam("session") : ''
    };

    ylst.selectSeats = []; //当前选中的座位

    //根据配置放入需要加载的js
    ylst.loadJS = [];

    //rule规则是否使用
    // if (ylst.configs.rule) {
    //     ylst.loadJS.push(ylst.configs.rule);
    // }
    //
    // if (ylst.configs.viewLoad) {
    //     ylst.loadJS.push(ylst.configs.viewLoad);
    // }

    //ios下调用mobile
    if (ylst.configs.iosUsed) {
        ylst.loadJS.push(ylst.configs.mobilejs);
    }

    //检查是否为手机端
    ylst.isMobile = isMobile;
    root.ylst = ylst;

})(window);

