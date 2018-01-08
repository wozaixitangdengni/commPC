//③
!function(e) {
    var win = e;
    var a,
        s = document.documentElement.clientWidth,
        i = document.documentElement.clientHeight,
        n = ylst.configs.waptoseat + ylst.configs.onlineSeatUrl + "&sc=" + ylst.configs.sc + "&";
    function t(e) {
        a = this,
            this.areaData = e.areaData,
            this.areaSaleData = e.areaSaleData,
            this.pid = e.pid,
            this.vid = e.vid,
            this.sessionNum = e.sessionNum,
            this.qzPrices = e.qzPrices,
            this.areaBgImg = this.areaData.img || t["default"].areaBgImg,
            this.areaBgWidth = this.areaData.img_width || t["default"].areaBgWidth,
            this.areaBgHeight = this.areaData.img_heigth || t["default"].areaBgHeight,
            this.areaBgLoaded = null,
            this.areaReact = this.areaData.areas,
            this.scale = 1.5,
            this.minScale = 1.5,
            this.maxScale = 4,
            this.canvasX = 0,
            this.canvasY = 0,
            this.positionX = 0,
            this.positionY = 0,
            this.lastDist = 0,
            this.beginStatic = !1,
            this.moveBoolen = !1,
            this.canvasCenterXY = {
                cx: s / 2,
                cy: i / 2
            },
            this["static"] = "NONE",
            this.selectArea = {},
            this.pointInOr = !1,
            this.selectArea.selectId = e.selectId || null,
            this.selectAreaNmae = null,
            this.init()
    }

    e.firstSmallArea = !1;
    ylst.configs.pageStatic = "area";
    t["default"] = {
        areaBgImg: ylst.configs.imgPath + "comn.png",
        areaBgWidth: 200,
        areaBgHeight: 200
    };
    t.prototype = {
        imgLoad: function(e) {
            console.log("加载图片中");
            //var t = this ,a = new Image;
            //a.src = e,
            //    a.complete ?
            //        (t.areaBgLoaded = a,
            //            console.log("图片预加载成功!"),
            //        t.drawNewCanvas()) :
            //        a.onload = function() {
            //            t.areaBgLoaded = a,console.log("图片加载成功，画区域线条"),t.drawNewCanvas()
            //        };

            var t = this,a = new Image;
            a.src = e;
            if(a.complete){
                t.areaBgLoaded = a;
                console.log("图片预加载成功!");
                t.drawNewCanvas();
            }else{
                a.onload = function() {
                    t.areaBgLoaded = a;
                    console.log("图片加载成功，画区域线条");
                    t.drawNewCanvas();
                };
            }
        },
        drawNewCanvas: function() {
            this.clearCanvas();
            this.clearBufferCanvas();
            this.controllNextPage();
            $(".loading").hide();
        },
        init: function() {
            console.log("区域类初始化成功--start--");
            //判断是否支持canvas和拥有画布
            !function(){
                this._canvas = document.getElementById("canvas1");
                if(this._canvas && this._canvas.getContext){
                    this._canvasContext = this._canvas.getContext("2d");
                    this._canvasBuffer = document.createElement("canvas");
                    this._canvasBuffer.width = this._canvas.width;
                    this._canvasBuffer.height = this._canvas.height;
                    this._canvasBufferContext = this._canvasBuffer.getContext("2d");
                    //判断是否为手机端
                    if(!ylst.isMobile){
                         //pc下区域图显示的大小状态,在config.js中有说明
                         if(ylst.configs.areaIsSmall){
                            this.beginStatic = !1;
                            this.scale = 1;
                            this.minScale = 1;
                            s = 210;
                            i = 300;
                            $("#canvasContent").css({
                                "margin-left": "10px",
                                "margin-top": "10px"
                            });
                            $(".pcprice-info").css({
                                top: "270px"
                            });
                            e.firstSmallArea || ($("#canvas1").attr({
                                width: "200",
                                height: "200"
                            }),
                                e.firstSmallArea = !0);
                            $("#canvas1").css({
                                border: "1px solid #ccc"
                            });
                            $("#areaUp").show();
                            $("#canvasContent").css({
                                width: "210px",
                                height: "210px"
                            });
                            200 == $("#canvas1").attr("width") && (this.positionX = 0, this.positionY = 0);
                        }else{
                             //赋值给全局变量 s   i
                             s = document.documentElement.clientWidth + 200;
                             i = document.documentElement.clientHeight;
                             this.scale = 3;
                             this.minScale = 3;
                             $("#canvas1").css({
                                 border: "0 none"
                             });
                         }
                    }
                    void 0 !== this.areaData.qz && this.qzAreaBool();
                    void this.imgLoad(this.areaBgImg);
                }else{
                    void alert("你的浏览器不支持canvas画布，请升级您的浏览器^^");
                }
            }.bind(this)();


            !function(){
                return false;
                this._canvas = document.getElementById("canvas1");
                return  this._canvas && this._canvas.getContext ? (this._canvasContext = this._canvas.getContext("2d"),
                    this._canvasBuffer = document.createElement("canvas"),
                    this._canvasBuffer.width = this._canvas.width,
                    this._canvasBuffer.height = this._canvas.height,
                    this._canvasBufferContext = this._canvasBuffer.getContext("2d"),
                ylst.isMobile || (ylst.configs.areaIsSmall ? (this.beginStatic = !1,console.log(111111111111),
                    this.scale = 1,
                    this.minScale = 1,
                    s = 210,
                    i = 300,
                    $("#canvasContent").css({
                        "margin-left": "10px",
                        "margin-top": "10px"
                    }),
                    $(".pcprice-info").css({
                        top: "270px"
                    }),
                e.firstSmallArea || ($("#canvas1").attr({
                    width: "200",
                    height: "200"
                }),
                    e.firstSmallArea = !0),
                    $("#canvas1").css({
                        border: "1px solid #ccc"
                    }),
                    $("#areaUp").show(),
                    $("#canvasContent").css({
                        width: "210px",
                        height: "210px"
                    }),
                200 == $("#canvas1").attr("width") && (this.positionX = 0,
                    this.positionY = 0)) : (s = document.documentElement.clientWidth + 200,
                    i = document.documentElement.clientHeight,
                    this.scale = 3,
                    this.minScale = 3,
                    $("#canvas1").css({
                        border: "0 none"
                    }),console.log(2222222222))),
                void 0 !== this.areaData.qz && this.qzAreaBool(),
                    void this.imgLoad(this.areaBgImg),console.log(333333333333333)) : void alert("你的浏览器不支持canvas画布，请升级您的浏览器^^");
            }.bind(this)();

        },
        controllNextPage: function() {
            console.log("控制跳转")
            if(ylst.isMobile){
                if (ylst.configs.singleSession && (1 == this.areaData.areas.length && null == this.areaData.areas.rect || !this.areaBgLoaded)) {
                    this.selectArea.selectId = this.areaData.areas[0].id;
                    var e = this.getAreaInfoById(this.areaData.areas[0].id);
                    this.selectArea.remainSeatNum = e.remain;
                    this.drawBgImage();
                    this.drawReact()
                } else if (1 == this.areaData.areas.length && null == this.areaData.areas.rect || !this.areaBgLoaded) {
                    var t = n + "pid=" + a.pid + "&sid=" + a.vid + "&area=" + this.areaData.areas[0].id + "&singleToSeat=1";
                    this.controllerLink(t);
                } else{
                    $(".pcprice-info").show();
                    this.drawBgImage();
                    this.drawReact();
                }
            }else{
                if((1 == this.areaData.areas.length && null == this.areaData.areas.rect) || !this.areaBgLoaded){
                    ylst.configs.areaIsSmall = !0;
                    $("#canvasShowBlock").show();
                    a.pid = a.pid;
                    a.vid = a.vid;
                    a.selectArea.selectId = this.areaData.areas[0].id;
                    a.getSeatsInfo();
                    $("#canvasContent").hide();
                    $(".pcprice-info").css({
                        "margin-top": "10px",
                        position: "static"
                    }).show();
                }else{
                    $(".pcprice-info").show();
                    this.drawBgImage();
                    this.drawReact();
                }
            }

            //if (console.log("控制跳转"),
            //        ylst.isMobile)
            //    if (ylst.configs.singleSession && (1 == this.areaData.areas.length && null == this.areaData.areas.rect || !this.areaBgLoaded)) {
            //        this.selectArea.selectId = this.areaData.areas[0].id;
            //        var e = this.getAreaInfoById(this.areaData.areas[0].id);
            //        this.selectArea.remainSeatNum = e.remain,
            //            this.drawBgImage(),
            //            this.drawReact()
            //    } else if (1 == this.areaData.areas.length && null == this.areaData.areas.rect || !this.areaBgLoaded) {
            //        var t = n + "pid=" + a.pid + "&sid=" + a.vid + "&area=" + this.areaData.areas[0].id + "&singleToSeat=1";
            //        this.controllerLink(t)
            //    } else
            //        $(".pcprice-info").show(),
            //            this.drawBgImage(),
            //            this.drawReact();
            //else
            //    1 == this.areaData.areas.length && null == this.areaData.areas.rect || !this.areaBgLoaded ? (ylst.configs.areaIsSmall = !0,
            //        $("#canvasShowBlock").show(),
            //        a.pid = a.pid,
            //        a.vid = a.vid,
            //        a.selectArea.selectId = this.areaData.areas[0].id,
            //        a.getSeatsInfo(),
            //        $("#canvasContent").hide(),
            //        $(".pcprice-info").css({
            //            "margin-top": "10px",
            //            position: "static"
            //        }).show()) : ($(".pcprice-info").show(),
            //        this.drawBgImage(),
            //        this.drawReact())
        },
        getAreaInfoById: function(e) {
            var t, a = this.areaSaleData;
            for (var s in a)
                a[s].id == e && (t = a[s]);
            return t
        },
        drawBgImage: function() {
            this.beginStatic ? (this._canvasBufferContext.drawImage(this.areaBgLoaded, this.canvasX, this.canvasY, this.areaBgWidth * this.scale, this.areaBgHeight * this.scale),
                this.render()) : (this.canvasX = (s - this.areaBgWidth * this.scale) / 2,
                ylst.configs.areaIsSmall ? this.canvasY = (i - this.areaBgHeight * this.scale - 100) / 2 : this.canvasY = (i - this.areaBgHeight * this.scale - 100) / 2,
                this._canvasBufferContext.drawImage(this.areaBgLoaded, this.canvasX, this.canvasY, this.areaBgWidth * this.scale, this.areaBgHeight * this.scale),
                this.render(),
                this.beginStatic = !0)
        },
        findAreaName: function(e) {
            for (var t = this.areaData.areas, a = t.length; a--; )
                if (t[a].id == e){
                    return t[a].name;
                }
        },
        findSelPeiceAreas: function(e) {
            var t = [];
            if (e){
                var a = e.length;
            } else {
                var a = 0;
            }
            for (var s = this.areaData.areas, i = s.length; i--; ){
                for (var n = a; n--; ){
                    if (s[i].price_ids.indexOf(",")){
                        for (var r = s[i].price_ids.split(","), c = r.length; c--; )
                            r[c] == e[n] && t.push(s[i].id);
                    } else {
                        s[i].price_ids == e[n] && t.push(s[i].id);
                    }
                }
            }
            return t = t.unique()
        },
        qzAreaBool: function() {
            var e = this.areaData.areas;
            ylst.qzPricesAttr = [];
            var t = String(this.areaData.qz.qz_prices);
            t.indexOf(",") > -1 ? ylst.qzPricesAttr = t.split(",") : ylst.qzPricesAttr.push(t);
            for (var a = e.length; a--; ) {
                for (var s = !1, i = ylst.qzPricesAttr.length; i--; )
                    ylst.qzPricesAttr.length > 0 && String(e[a].price_ids).indexOf(String(ylst.qzPricesAttr[i])) > -1 && (s = !0);
                if (!s) {
                    var n = this.areaSaleData;
                    for (var r in n)
                        n[r].id == e[a].id && (n[r].remain = 0,
                            n[r].status = 0)
                }
            }
        },
        drawSelArea: function(t) {
            this.clearCanvas(),
                this.clearBufferCanvas(),
                this._canvasBufferContext.drawImage(this.areaBgLoaded, this.canvasX, this.canvasY, this.areaBgWidth * this.scale, this.areaBgHeight * this.scale);
            for (var s = this.findSelPeiceAreas(e.ids), i = this.areaReact, n = i.length; n--; ) {
                var r = i[n].rect;
                if (r) {
                    var c = r.split("|")
                        , o = i[n].id
                        , l = this.getAreaInfoById(o);
                    a.selectArea.selectId == o || s.contains(o) && 0 != l.remain || e.selectId == o ? (this._canvasBufferContext.lineWidth = 2,
                        this._canvasBufferContext.strokeStyle = "#cc0001") : (this._canvasBufferContext.lineWidth = 1,
                        this._canvasBufferContext.strokeStyle = "#000"),
                        this._canvasBufferContext.beginPath();
                    for (var h = c.length; h--; ) {
                        var d = c[h].split(",");
                        this._canvasBufferContext.lineTo(d[0] * this.scale + this.canvasX, d[1] * this.scale + this.canvasY)
                    }
                    (a.selectArea.selectId == o || s.contains(o) && 0 != l.remain || e.selectId == o) && (this._canvasBufferContext.fillStyle = "rgba(000,000,000,0.3)",
                        this._canvasBufferContext.fill()),
                        this._canvasBufferContext.stroke(),
                    0 == l.remain && (this._canvasBufferContext.fillStyle = "rgba(000,000,000,0.6)",
                        this._canvasBufferContext.fill())
                }
            }
            this.render()
        },
        drawReact: function(t) {
            console.log("--画区域线条--");
            for (var s = this.findSelPeiceAreas(e.ids), i = this.areaReact, n = i.length; n--; ) {
                var r = i[n].rect;
                if (r) {
                    var c = r.split("|")
                        , o = i[n].id
                        , l = this.getAreaInfoById(o);
                    a.selectArea.selectId == o || s.contains(o) && 0 != l.remain || e.selectId == o ? (this._canvasBufferContext.lineWidth = 2,
                        this._canvasBufferContext.strokeStyle = "#cc0001") : (this._canvasBufferContext.lineWidth = 1,
                        this._canvasBufferContext.strokeStyle = "#000"),
                        this._canvasBufferContext.beginPath();
                    for (var h = c.length; h--; ) {
                        var d = c[h].split(",");
                        this._canvasBufferContext.lineTo(d[0] * this.scale + this.positionX + this.canvasX * (this.scale / this.minScale), d[1] * this.scale + this.positionY + this.canvasY * (this.scale / this.minScale))
                    }
                    if (!ylst.isMobile && (a.selectArea.selectId == o || s.contains(o) && 0 != l.remain || e.selectId == o) && (this._canvasBufferContext.fillStyle = "rgba(000,000,000,0.3)",
                            this._canvasBufferContext.fill()),
                            ylst.configs.areaIsSmall ? t ? this.pointInOr && this._canvasBufferContext.stroke() : this._canvasBufferContext.stroke() : t || this.moveBoolen || this._canvasBufferContext.stroke(),
                        t && (this.pointInOr = this._canvasBufferContext.isPointInPath(t.x, t.y),
                            this.pointInOr))
                        return console.log("---在区域范围内---"),
                            this.selectArea.selectId = o,
                            e.selectId = o,
                            this.selectArea.remainSeatNum = l.remain,
                            void (this.pointInOr = !0);
                    t || 0 != l.remain || this.moveBoolen || (this._canvasBufferContext.fillStyle = "rgba(000,000,000,0.6)",
                        this._canvasBufferContext.fill())
                }
            }
            1 == ylst.configs.areaIsSmall ? this.pointInOr && this.render() : this.render(),
                this.addEvents.init()
        },
        pointInPath: function(t) {
            if (console.log("--画区域线条--"),
                    this.areaBgLoaded) {
                this.clearCanvas(),
                    this.clearBufferCanvas(),
                    this._canvasBufferContext.drawImage(this.areaBgLoaded, this.canvasX, this.canvasY, this.areaBgWidth * this.scale, this.areaBgHeight * this.scale),
                    $("#areaMessage").hide(),
                    mouse1 = this.windowToCanvas(this._canvas, t);
                for (var s = this.findSelPeiceAreas(e.ids), i = this.areaReact, n = i.length; n--; ) {
                    var r = i[n].rect;
                    if (r) {
                        var c = r.split("|")
                            , o = i[n].id
                            , l = this.getAreaInfoById(o);
                        this._canvasBufferContext.beginPath(),
                            a.selectArea.selectId == o || s.contains(o) && 0 != l.remain || e.selectId == o ? (this._canvasBufferContext.lineWidth = 2,
                                this._canvasBufferContext.strokeStyle = "#cc0001") : (this._canvasBufferContext.lineWidth = 1,
                                this._canvasBufferContext.strokeStyle = "#000");
                        for (var h = c.length; h--; ) {
                            var d = c[h].split(",");
                            this._canvasBufferContext.lineTo(d[0] * this.scale + this.canvasX, d[1] * this.scale + this.canvasY)
                        }
                        if (!ylst.isMobile && (a.selectArea.selectId == o || s.contains(o) && 0 != l.remain || e.selectId == o) && (this._canvasBufferContext.fillStyle = "rgba(000,000,000,0.3)",
                                this._canvasBufferContext.fill()),
                                this._canvasBufferContext.stroke(),
                                this.pointInOr = this._canvasBufferContext.isPointInPath(mouse1.x - this.positionX, mouse1.y - this.positionY),
                                this.pointInOr) {
                            console.log("---在区域范围内---"),
                            ylst.isMobile || (this._canvasBufferContext.fillStyle = "rgba(000,000,000,0.6)",
                                this._canvasBufferContext.fill());
                            var f = this.findAreaName(o);
                            $("#areaSelectId").text(f),
                                $("#areaSelectTotalNums").text(l.total),
                                $("#areaSelectNums").text(l.remain);
                            var v = mouse1.y;
                            v > 450 ? v -= 80 : v += 80,
                                $("#areaMessage").css({
                                    left: mouse1.x,
                                    top: v
                                }).show()
                        }
                        0 == l.remain && (this._canvasBufferContext.fillStyle = "rgba(000,000,000,0.6)",
                            this._canvasBufferContext.fill())
                    }
                }
                this.render()
            }
        },
        getSeatsInfo: function() {
            e.seaParameter(a.pid, a.vid, a.selectArea.selectId)
        },
        getAreaName: function(e) {
            for (var t = this.areaData.areas, a = t.length; a--; )
                if (t[a].id == e)
                    return t[a].name
        },
        addEvents: {
            init: function() {
                Lib.addEvent(a._canvas, "touchstart", a.addEvents.start, !1),
                    Lib.addEvent(a._canvas, "mousedown", a.addEvents.start, !1)
            },
            start: function(e) {
                Lib.preventDefault(e),
                    a.moveBoolen = !1;
                var t = new Date;
                a.touchStartTime = t.getTime(),
                    mouse1 = a.windowToCanvas(a._canvas, e),
                    e.touches ? 1 == e.touches.length && Lib.addEvent(a._canvas, "touchmove", a.addEvents.singleDrag, !1) : Lib.addEvent(a._canvas, "mousemove", a.addEvents.singleDrag, !1),
                e.touches && 2 == e.touches.length && (Lib.addEvent(a._canvas, "touchmove", a.addEvents.doubleDrag, !1),
                    a.lastDist = a.addEvents.distanceTwoFingers(e)),
                    Lib.addEvent(a._canvas, "touchend", a.addEvents.end, !1),
                    Lib.addEvent(a._canvas, "mouseup", a.addEvents.end, !1)
            },
            distanceTwoFingers: function(e) {
                try {
                    var t = e.touches[0];
                    if (startX = t.pageX,
                            startY = t.pageY,
                        2 == e.touches.length) {
                        var a = e.touches[1];
                        return start1X = a.pageX,
                            start1Y = a.pageY,
                            startLen = Math.sqrt((start1X - startX) * (start1X - startX) + (start1Y - startY) * (start1Y - startY)),
                            startLen
                    }
                } catch (s) {}
            },
            centerTwoFingers: function(e) {
                try {
                    var t = e.touches[0];
                    if (startX = t.pageX,
                            startY = t.pageY,
                        2 == e.touches.length) {
                        var a = e.touches[1];
                        return start1X = a.pageX,
                            start1Y = a.pageY,
                            centerX = (startX + start1X) / 2,
                            centerY = (startY + start1Y) / 2,
                            centerXY = {
                                centerX: centerX,
                                centerY: centerY
                            },
                            centerXY
                    }
                } catch (s) {}
            },
            singleClick: function(e) {
                Lib.preventDefault(e),
                    console.log("---进入点击事件---"),
                    a.drawReact(mouse1),
                    $("#areaMessage").hide(),
                ylst.isMobile || $("#selectedAreaName").text(a.getAreaName(a.selectArea.selectId)),
                    a.selectArea.selectId && 0 !== a.selectArea.remainSeatNum && a.pointInOr ? ylst.isMobile ? a.controllerLink() : 1 == ylst.configs.areaIsSmall ? (a.getSeatsInfo(),
                        $("#canvasShowBlock").show(),
                        a.init()) : (a.getSeatsInfo(),
                        $("#canvasShowBlock").show(),
                        ylst.configs.areaIsSmall = !0,
                        a.init()) : a.selectArea.selectId && 0 !== a.selectArea.remainSeatNum && (1 == a.areaData.areas.length && null == a.areaData.areas.rect || !a.areaBgLoaded) ? ylst.isMobile && a.controllerLink() : 0 == a.selectArea.remainSeatNum && alert("该场次已经售完了!")
            },
            singleDrag: function(e) {
                if (Lib.preventDefault(e),
                        console.log("---进入单手指拖动---"),
                    (ylst.isMobile || !ylst.configs.areaIsSmall) && (!e.touches || 1 == e.touches.length && !a.moveBoolen)) {
                    a.sacleMiddle = !1,
                        mouse2 = a.windowToCanvas(a._canvas, e);
                    var t = mouse2.x - mouse1.x
                        , n = mouse2.y - mouse1.y;
                    mouse1 = mouse2;
                    var r = a._canvasBuffer.width * a.scale / a.minScale
                        , c = a._canvasBuffer.height * a.scale / a.minScale
                        , o = s / 2
                        , l = (i - 160) / 2;
                    a.positionX + t > o && (t = o - a.positionX),
                    r + a.positionX + t < o && (t = o - (a.positionX + r)),
                    a.positionY + n > l && (n = l - a.positionY),
                    a.positionY + c + n < l && (n = l - (a.positionY + c)),
                        a.positionX += t,
                        a.positionY += n,
                        a.render()
                }
            },
            doubleDrag: function(e) {
                if (Lib.preventDefault(e),
                    !e.touches || 2 == e.touches.length) {
                    var t = a.addEvents.distanceTwoFingers(e)
                        , n = a.addEvents.centerTwoFingers(e)
                        , r = 3 * ((t - a.lastDist) / t).floors(2);
                    if (a.addScale = r,
                            a.scale += r,
                            console.log(a.scale),
                        a.scale <= a.perfScale)
                        return a.scale = a.perfScale,
                            void (a.sacleMiddle = !0);
                    if (a.scale >= a.maxScale)
                        return a.scale = a.maxScale,
                            void (a.sacleMiddle = !0);
                    a.lastDist = t;
                    var c = a._canvasBuffer.width / a.minScale * r / 2
                        , o = a._canvasBuffer.height / a.minScale * r / 2;
                    a.canvasCenterXY = {
                        cx: s / 2,
                        cy: i / 2
                    };
                    var l = a._canvasBuffer.height / a._canvasBuffer.width
                        , h = (n.centerX - a.canvasCenterXY.cx) / l * r / 2
                        , d = (n.centerY - a.canvasCenterXY.cy) * r / 2;
                    console.log(h + "," + d),
                        c -= h,
                        o -= d,
                        a.positionX -= c,
                        a.positionY -= o,
                        a.render()
                }
            },
            end: function(e) {
                Lib.preventDefault(e);
                var t = new Date;
                a.touchEndTime = t.getTime();
                var s = a.touchEndTime - a.touchStartTime;
                s <= 200 && a.addEvents.singleClick(e),
                    Lib.delEvent(a._canvas, "touchmove", null),
                    Lib.delEvent(a._canvas, "mousemove", null),
                    a.moveBoolen = !0,
                    e.touches ? 0 == e.targetTouches.length && (a.moveBoolen = !0,
                        Lib.delEvent(a._canvas, "touchmove", a.addEvents.singleDrag, !1),
                        Lib.delEvent(a._canvas, "touchmove", a.addEvents.doubleDrag, !1)) : (Lib.delEvent(a._canvas, "mousemove", a.addEvents.singleDrag, !1),
                        Lib.delEvent(a._canvas, "mousemove", a.addEvents.doubleDrag, !1))
            }
        },
        controllerLink: function(e) {
            var t = n + "pid=" + a.pid + "&sid=" + a.vid + "&area=" + a.selectArea.selectId;
            1 == ylst.configs.isRobseat && (t += ylst.qzLink),
                window.location.href = e || t
        },
        clearCanvas: function() {
            this._canvasContext.clearRect(0, 0, this._canvas.width, this._canvas.height),
                this._canvas.style.display = "none",
                this._canvas.offsetHeight,
                this._canvas.style.display = "block"
        },
        clearBufferCanvas: function() {
            this._canvasBufferContext.clearRect(0, 0, this._canvas.width, this._canvas.height),
                this._canvasBuffer.style.display = "none",
                this._canvasBuffer.offsetHeight,
                this._canvasBuffer.style.display = "block"
        },
        render: function() {
            this.clearCanvas(),
                this._canvasContext.drawImage(this._canvasBuffer, this.positionX, this.positionY, this._canvasBuffer.width * (this.scale / this.minScale), this._canvasBuffer.height * (this.scale / this.minScale))
        },
        windowToCanvas: function(e, t) {
            var a = {
                    pageX: t.touches && 0 != t.touches.length ? t.touches[0].pageX : t.clientX,
                    pageY: t.touches && 0 != t.touches.length ? t.touches[0].pageY : t.clientY
                }
                , s = a.pageX
                , i = a.pageY
                , n = this._canvas.getBoundingClientRect();
            return {
                x: s - n.left - (n.width - e.width) / 2,
                y: i - n.top - (n.height - e.height) / 2
            }
        }
    };
    e.AreasVenue = t;
}(window);
