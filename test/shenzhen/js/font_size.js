/**********
 *
 *  计算html font-size的数值
 * ***********/
(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',   //横屏事件
        recalc = function () {
            console.log("执行了recalc函数");
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            if(clientWidth <= 750){
                //限制最大宽度为750
                docEl.style.fontSize = 20 * (clientWidth / 320) + 'px';
                console.log("font-size文件执行了赋值操作");
            }else{
                docEl.style.fontSize = '40px';
            }
        };
    if (!doc.addEventListener) return;
    recalc();
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);