//⑦
!function (t) {
    var i;

    function e(e) {
        //console.log(e.areaData);
        //console.log(e.seatsDatas[0]);
        //console.log(e.seatsSaleData[0]);
        i = this;
        this.areaData = e.areaData;
        this.seatsDatas = e.seatsDatas;
        this.seatsSaleData = e.seatsSaleData;
        this.pid = e.pid;
        this.vid = e.vid;
        this.seatImg = ["seatX80.png", "selected.png", "sold.png", "tp.png", "wt.png"];
        this.loadImgs = [];
        this.seatSet = {
            w: 10,
            h: 10
        };
        this.scale = 1;
        this.minScale = 1;
        this.maxScale = 5;
        this.canvasX = 0;
        this.canvasY = 0;
        t.positionX = e.positionX || 0;
        t.positionY = e.positionY || 0;
        this.lastDist = 0;
        this.moveBoolen = !1;
        this.canvasCenterXY = {
            cx: s / 2,
            cy: a / 2
        };
        this["static"] = "NONE";
        this.pricesSeatMap = {};
        this.rects = [];
        this.beginStatic = e.beginStatic || !1;
        this.oldCanvasWid = 0;
        this.sacleMiddle = !1;
        this.seatImgStatic = !0;
        this.x_min = 0;
        this.x_max = 0;
        this.y_min = 0;
        this.y_max = 0;
        if (this.areaData.seatmaxnum) {
            ylst.configs.maxseatNum = Number(this.areaData.seatmaxnum);
            ylst.configs.maxseatTpNum = Number(this.areaData.seatmaxnum);
        } else {
            ylst.configs.maxseatNum = 6;
            ylst.configs.maxseatTpNum = 12;
        }
        ;

        if (this.areaData.qz) {
            ylst.configs.maxseatNum = Number(this.areaData.qz.qz_num);
            ylst.configs.maxseatTpNum = Number(this.areaData.qz.qz_num);
        }
        ;
        this.init();
    }

    var s = document.documentElement.clientWidth, a = document.documentElement.clientHeight;
    ylst.isMobile || (s -= 240, a -= 60);

    e["default"] = {};
    e.prototype = {
        imgLoad: function () {
            var t = this, e = new Image;
            if (this.seatImg[0]){
                e.src = ylst.configs.imgPath + this.seatImg[0];
                e.complete = function () {
                    t.loadImgs.push(e);
                    t.seatImg.shift();
                    t.imgLoad();
                };
                e.onload = function () {
                    t.loadImgs.push(e);
                    t.seatImg.shift();
                    t.imgLoad();
                };
            } else {
                t.drawNewCanvas()
            }
        },
        drawNewCanvas: function () {
            this.clearCanvas();
            this.clearBufferCanvas();
            this.seatMinMax();
            this.drawReact();
            this.addEvents.init();
        },
        init: function () {
            console.log("区域类初始化成功--start--");
            this._canvas = document.getElementById("canvas");
            if (this._canvas && this._canvas.getContext) {
                this._canvasContext = this._canvas.getContext("2d");
                this._canvasBuffer = document.createElement("canvas");
                this._canvasBuffer.width = this._canvas.width;
                this._canvasBuffer.height = this._canvas.height;
                this._canvasBufferContext = this._canvasBuffer.getContext("2d");
                void this.imgLoad();
            } else {
                void alert("你的浏览器不支持canvas画布，请升级您的浏览器^^")
            }
        },
        /*
        * 设置座位大小，也就是设置座位的缩放
        * */
        seatMinMax: function () {
            s = $("#canvasDiv").outerWidth(true)-5;
            for (var e = [], a = [], i = this.seatsDatas.length; i--;) {
                var n = this.seatsDatas[i];
                //console.log(n);
                e.push(n.x);
                a.push(n.y);
            }

            this.x_min = Math.min.apply(null, e);
            this.x_max = Math.max.apply(null, e);
            this.y_min = Math.min.apply(null, a);
            this.y_max = Math.max.apply(null, a);
            //var time000 = 0;
            //var time001 = 0;
            //console.log("this.x_min",this.x_min);
            //console.log("this.y_min",this.y_min);
            //for (var aaa = this.seatsDatas.length; aaa--;) {
            //    var nnnn = this.seatsDatas[aaa];
            //    if(nnnn.x == this.x_min){
            //        console.log(nnnn.x,'最左边');
            //    }
            //    if(nnnn.x == this.x_max){
            //        console.log(nnnn.x,'最右边');
            //    }
            //    if(nnnn.y == this.y_max && time000 == 0){
            //        console.log(nnnn.y);
            //        time000++;
            //    }
            //    if(nnnn.y == this.y_min && time001==0){
            //        console.log(nnnn.y);
            //        time001++;
            //    }
            //}
            //console.log(s,this.x_max,this.x_min,this.seatSet.w);
            this.perfScale = (s / (this.x_max - this.x_min + 1) / (this.seatSet.w + 5)).floors(2);
            this.scale = this.perfScale;
            !ylst.isMobile && this.x_max - this.x_min <= 30 && (this.scale = 1.5);

            if (!ylst.isMobile) {
                this.scale += t.addBigerNum;
                var h = (this.x_max - this.x_min + 1) * (this.seatSet.w + 5) * .5;
                var c = (this.y_max - this.y_min + 1) * (this.seatSet.w + 5) * .5;
                //?pid=352431984&sc=228&channel=&union=&uid=&ukey=&ordersid=&userid=&magic=&session=43668
                console.log("缩放宽高:",h,'772.5');
                console.log("缩放宽高:",c,'360');
                //设置放大
                if(setMaxOr && setBigBolean && !scaleOr){
                    t.positionX -= h / 2;
                    t.positionY -= c / 2;
                    console.log('放大');
                }

                //设置缩小
                if(!setMaxOr || setBigBolean || scaleOr ){

                }else{
                    t.positionX += h / 2;
                    t.positionY += c / 2;
                    console.log('缩小')
                }
            }
        },
        qzPriceSeat: function () {
        },
        drawReact: function () {
            console.log("--画每个坐位--");
            this.priceMap = {};
            this.priceSaleMap = {};
            this.rects.length = 0;

            //获取区域价格信息
            if (void 0 == this.priceMap.length){
                for (var e = this.areaData.prices.length; e--;) {
                    var i = this.areaData.prices[e];
                    this.priceMap[i.id + ""] = i
                }
            }

            for (var n = this.seatsSaleData.length; n--;) {
                var h = this.seatsSaleData[n];
                this.priceSaleMap[h.id + ""] = h;
            }

            if (void 0 !== this.areaData.qz) {
                ylst.qzPricesAttr = [];
                var c = this.areaData.qz.qz_prices;
                c.indexOf(",") > -1 ? ylst.qzPricesAttr = c.split(",") : ylst.qzPricesAttr.push(c);
            }

            /*
            * 根据座位的最大行数和列数求出相对应的宽高
            * */
            this._canvasBuffer.width = (this.x_max - this.x_min + 2) * (this.seatSet.w + 5);
            this._canvasBuffer.height = (this.y_max - this.y_min + 2) * (this.seatSet.h + 5);
            //console.log("根据座位的最大行数和列数求出相对应的宽高",this._canvasBuffer.width,1560);
            //console.log("根据座位的最大行数和列数求出相对应的宽高",this._canvasBuffer.height,735);

            if(!this.beginStatic){

                t.positionX = (s - (this._canvasBuffer.width * this.scale) - ((this.seatSet.w + 5) * this.scale)) / 2;
                t.positionY = (a - this._canvasBuffer.height * this.scale - 130 - (this.seatSet.w + 5) * this.scale) / 2;
                this._canvasBuffer.height * this.scale > a - 130 && (t.positionY = 0);
                console.log(t.positionY);
                console.log(t.positionX);
                /*
                * 计算绘画是的定位
                * */

                this.beginStatic = !0;
            }

            console.log(this.seatsDatas[0]);
            for (var o = this.seatsDatas.length; o--;) {
                var r = this.seatsDatas[o];//取出座位的相关数据
                var l = this.loadImgs[0];//取出可选座位的图片

                var v = (r.x - this.x_min + 1) * (this.seatSet.w + 5);
                var d = (r.y - this.y_min + 1) * (this.seatSet.h + 5);

                v = .5 + v << 0;
                d = .5 + d << 0;
                //获取绘画座位的状态
                var u = this.priceSaleMap[r.id].on_sale;

                if(this.areaData.qz && ylst.qzPricesAttr.length > 0 && ylst.qzPricesAttr.join(",").indexOf(String(r.price_id)) == -1 || this.areaData.qz && 1 == r.tp){
                    u = 0;
                    this.priceSaleMap[r.id].on_sale = 0;
                }
                //判断是否可选，同时是否存在票价表中
                if(1 == u && this.priceMap[r.price_id]){
                    this._canvasBufferContext.fillStyle = "#" + this.priceMap[r.price_id].color
                }else{
                    this._canvasBufferContext.fillStyle = "#CCCCCC"
                }
                r.price = this.priceMap[r.price_id];
                r.sale = this.priceSaleMap[r.id];

                var f = v + t.positionX, g = d + t.positionY;
                f = .5 + f << 0;
                g = .5 + g << 0;
                var m = "{0}_{1}".format(f, g);

                this.pricesSeatMap[m] = r;
                this.rects.push([f, g, f + (this.seatSet.w + 5), g + (this.seatSet.w + 5)]);
                1 == r.tp && 1 == u && (l = this.loadImgs[3]);

                if (ylst.selectSeats){
                    for (var p = ylst.selectSeats.length; p--;){
                        //判断当前渲染的座位是否被选中,同时当前座位是可选状态的
                        if(ylst.selectSeats[p].id == r.id && 1 == u){
                            //获取选中图标
                            l = this.loadImgs[1];
                            //设置渲染背景色
                            this._canvasBufferContext.fillStyle = "#333";
                            if(this.seatImgStatic){
                                this._canvasBufferContext.drawImage(l, v, d, this.seatSet.w + 5, this.seatSet.w + 5);
                            }else{
                                this._canvasBufferContext.drawImage(l, v + 5, d + 5, this.seatSet.w, this.seatSet.w);
                            }
                        }
                    }
                }
                if(2 != u){
                    if(this.seatImgStatic){
                        this._canvasBufferContext.fillRect(v, d, this.seatSet.w + 5, this.seatSet.w + 5);
                        this._canvasBufferContext.drawImage(l, v, d, this.seatSet.w + 5, this.seatSet.w + 5);
                    }else{
                        this._canvasBufferContext.fillRect(v + 5, d + 5, this.seatSet.w, this.seatSet.w)
                    }
                }
            };
            t.seatsDatas = this.seatsDatas;
            this.render();
        },
        newReact: function () {
            this.rects.length = 0;
            for (var e = this.seatsDatas.length; e--;) {
                var seatItem = this.seatsDatas[e]
                    , a = (seatItem.x - this.x_min + 1) * (this.seatSet.w + 5) * (this.scale / this.minScale)
                    , i = (seatItem.y - this.y_min + 1) * (this.seatSet.h + 5) * (this.scale / this.minScale);
                a = .5 + a << 0,
                    i = .5 + i << 0;
                var n = a + t.positionX
                    , h = i + t.positionY;
                n = .5 + n << 0,
                    h = .5 + h << 0;
                var c = "{0}_{1}".format(n, h);
                this.pricesSeatMap[c] = seatItem,
                    this.rects.push([n, h, n + (this.seatSet.w + 5) * (this.scale / this.minScale), h + (this.seatSet.w + 5) * (this.scale / this.minScale)])
            }
        },
        pointInPath: function (e) {
            for (var s = 0; s < this.rects.length; s++) {
                var a = this.rects[s];
                if (e.x >= a[0] && e.x <= a[2] && e.y >= a[1] && e.y <= a[3]) {
                    console.log("亲，你选中座位了^^");
                    var i = this.pricesSeatMap[a[0] + "_" + a[1]]
                }
            }
            t.rule = new t.Ruler({
                _selSeat: i
            })
        },
        mouseHoverInPath: function (t) {
            this.newReact(),
                mouse1 = this.windowToCanvas(this._canvas, t);
            for (var e = 0; e < this.rects.length; e++) {
                var s = this.rects[e];
                if (mouse1.x >= s[0] && mouse1.x <= s[2] && mouse1.y >= s[1] && mouse1.y <= s[3]) {
                    var a = this.pricesSeatMap[s[0] + "_" + s[1]];
                    if (a && a.sale && 2 != a.sale.on_sale) {
                        var i = mouse1.x + 230
                            , n = mouse1.y + 120
                            , h = $(window).width()
                            , c = $(window).height();
                        h - i < $("#singleSeatMessage").width() && (i -= 190),
                        c - n < $("#singleSeatMessage").height() && (n -= 100),
                        a.price && ($("#singleSeatPrice").text(a.price.price),
                            $("#singleSeatNum").text(a.pinfo),
                            $("#singleSeatStatic").text(a.sale.on_sale ? "可售" : "售完"),
                            $("#singleSeatMessage").css({
                                left: i + "px",
                                top: n + "px"
                            }).show())
                    }
                    return
                }
                $("#singleSeatMessage").hide()
            }
        },
        addEvents: {
            init: function () {
                Lib.addEvent(i._canvas, "touchstart", i.addEvents.start, !1);
                Lib.addEvent(i._canvas, "mousedown", i.addEvents.start, !1);
            },
            start: function (t) {
                Lib.preventDefault(t),i.moveBoolen = !1;
                var e = new Date;
                i.touchStartTime = e.getTime(), mouse1 = i.windowToCanvas(i._canvas, t);
                if(t.touches){
                    if(1 == t.touches.length){
                        Lib.addEvent(i._canvas, "touchmove", i.addEvents.singleDrag, !1)
                    }else{
                        2 == t.touches.length && (Lib.addEvent(i._canvas, "touchmove", i.addEvents.doubleDrag, !1), i.lastDist = i.addEvents.distanceTwoFingers(t));
                    }
                }else{
                    Lib.addEvent(i._canvas, "mousemove", i.addEvents.singleDrag, !1);
                }

                Lib.addEvent(i._canvas, "touchend", i.addEvents.end, !1);
                Lib.addEvent(i._canvas, "mouseup", i.addEvents.end, !1);
            },
            distanceTwoFingers: function (t) {
                try {
                    var e = t.touches[0];
                    startX = e.pageX;
                    startY = e.pageY;
                    if (2 == t.touches.length) {
                        var s = t.touches[1];
                        return start1X = s.pageX,
                            start1Y = s.pageY,
                            startLen = Math.sqrt((start1X - startX) * (start1X - startX) + (start1Y - startY) * (start1Y - startY)),
                            startLen
                    }
                } catch (a) {
                }
            },
            centerTwoFingers: function (t) {
                try {
                    var e = t.touches[0];
                    if (startX = e.pageX,
                            startY = e.pageY,
                        2 == t.touches.length) {
                        var s = t.touches[1];
                        return start1X = s.pageX,
                            start1Y = s.pageY,
                            centerX = (startX + start1X) / 2,
                            centerY = (startY + start1Y) / 2,
                            centerXY = {
                                centerX: centerX,
                                centerY: centerY
                            },
                            centerXY
                    }
                } catch (a) {
                }
            },
            singleClick: function (t) {
                Lib.preventDefault(t),
                    i["static"] = "ONCLICK",
                    console.log("---进入点击事件---"),
                    i.newReact(),
                    i.sacleMiddle = !1,
                    i.pointInPath(mouse1)
            },
            singleDrag: function (e) {
                Lib.preventDefault(e);
                console.log("---进入单手指拖动---");
                if (!e.touches || 1 == e.touches.length && !i.moveBoolen) {
                    i.sacleMiddle = !1;
                    mouse2 = i.windowToCanvas(i._canvas, e);
                    var n = mouse2.x - mouse1.x, h = mouse2.y - mouse1.y;
                    mouse1 = mouse2;
                    var c = i._canvasBuffer.width * i.scale / i.minScale
                        , o = i._canvasBuffer.height * i.scale / i.minScale
                        , r = s / 2
                        , l = (a - 160) / 2;
                    t.positionX + n > r && (n = r - t.positionX),
                    c + t.positionX + n < r && (n = r - (t.positionX + c)),
                    t.positionY + h > l && (h = l - t.positionY),
                    t.positionY + o + h < l && (h = l - (t.positionY + o)),
                        t.positionX += n,
                        t.positionY += h,
                        i.render()
                }
            },
            doubleDrag: function (e) {
                if (Lib.preventDefault(e),
                    !e.touches || 2 == e.touches.length) {
                    var n = i.addEvents.distanceTwoFingers(e)
                        , h = i.addEvents.centerTwoFingers(e)
                        , c = 3 * ((n - i.lastDist) / n).floors(2);
                    if (i.addScale = c,
                            i.scale += c,
                        i.scale <= i.perfScale)
                        return i.scale = i.perfScale,
                            void (i.sacleMiddle = !0);
                    if (i.scale >= i.maxScale)
                        return i.scale = i.maxScale,
                            void (i.sacleMiddle = !0);
                    i.lastDist = n;
                    var o = i._canvasBuffer.width / i.minScale * c / 2
                        , r = i._canvasBuffer.height / i.minScale * c / 2;
                    i.canvasCenterXY = {
                        cx: s / 2,
                        cy: a / 2
                    };
                    var l = (i._canvasBuffer.height / i._canvasBuffer.width,
                        (h.centerX - i.canvasCenterXY.cx) / i._canvasBuffer.width * o)
                        , v = (h.centerY - i.canvasCenterXY.cy) / i._canvasBuffer.height * r;
                    o += l,
                        r += v,
                        t.positionX -= o,
                        t.positionY -= r,
                        i.render()
                }
            },
            end: function (t) {
                Lib.preventDefault(t);
                var e = new Date;
                i.touchEndTime = e.getTime();
                var s = i.touchEndTime - i.touchStartTime;
                s <= 200 && i.addEvents.singleClick(t),
                    Lib.delEvent(i._canvas, "touchmove", null),
                    Lib.delEvent(i._canvas, "mousemove", null),
                    i.moveBoolen = !0,
                    t.touches ? 0 == t.targetTouches.length && (i.rects.length = 0,
                        i.newReact(),
                        i.moveBoolen = !0,
                        Lib.delEvent(i._canvas, "touchmove", i.addEvents.singleDrag, !1),
                        Lib.delEvent(i._canvas, "touchmove", i.addEvents.doubleDrag, !1)) : (Lib.delEvent(i._canvas, "mousemove", i.addEvents.singleDrag, !1),
                        Lib.delEvent(i._canvas, "mousemove", i.addEvents.doubleDrag, !1))
            }
        },
        cancelSeats: function (t) {
            var e = "";
            if (t && t.length > 0)
                for (var s = 0; s < t.length; s++)
                    for (var a = 0; a < ylst.selectSeats.length; a++)
                        t[s] == ylst.selectSeats[a].id && ("" == e ? e = ylst.selectSeats[a].pinfo : e += "," + ylst.selectSeats[a].pinfo,
                            ylst.selectSeats.splice(a, 1));
            return this.drawReact(),
                e
        },
        controllerLink: function (t) {
            var e = seatUrl + "pid=" + i.pid + "&sid=" + i.vid + "&area=" + i.selectArea.selectId;
            window.location.href = t || e
        },
        clearCanvas: function () {
            this._canvasContext.clearRect(0, 0, this._canvas.width, this._canvas.height);
            this._canvas.style.display = "none";
            this._canvas.offsetHeight;
            this._canvas.style.display = "block";
        },
        clearBufferCanvas: function () {
            this._canvasBufferContext.clearRect(0, 0, this._canvas.width, this._canvas.height);
            this._canvasBuffer.style.display = "none";
            this._canvasBuffer.offsetHeight;
            this._canvasBuffer.style.display = "block";
        },
        render: function () {
            this.clearCanvas();
            //console.log(t.positionX);
            //console.log(t.positionY);
            //console.log(this._canvasBuffer.width * (this.scale / this.minScale));
            //console.log(this._canvasBuffer.height * (this.scale / this.minScale));
            //console.log(this.minScale,this.scale);
            //绘画缓存中的canvas画布
            this._canvasContext.drawImage(
                this._canvasBuffer,
                t.positionX,
                t.positionY,
                this._canvasBuffer.width * (this.scale / this.minScale),
                this._canvasBuffer.height * (this.scale / this.minScale)
            );
        },
        windowToCanvas: function (t, e) {
            var s = {
                    pageX: e.touches && 0 != e.touches.length ? e.touches[0].pageX : e.clientX,
                    pageY: e.touches && 0 != e.touches.length ? e.touches[0].pageY : e.clientY
                }
                , a = s.pageX
                , i = s.pageY
                , n = this._canvas.getBoundingClientRect();
            return {
                x: a - n.left - (n.width - t.width) / 2,
                y: i - n.top - (n.height - t.height) / 2
            }
        }
    };
    t.SeatsVenue = e
}(window);
