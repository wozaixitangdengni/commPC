//①
!function(t) {
    var e, r = t.Base64, n = "2.1.5";
    "undefined" != typeof module && module.exports && (e = require("buffer").Buffer);
    var o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
        , a = function(t) {
            for (var e = {}, r = 0, n = t.length; r < n; r++)
                e[t.charAt(r)] = r;
            return e
        }(o)
        , c = String.fromCharCode
        , u = function(t) {
            if (t.length < 2) {
                var e = t.charCodeAt(0);
                return e < 128 ? t : e < 2048 ? c(192 | e >>> 6) + c(128 | 63 & e) : c(224 | e >>> 12 & 15) + c(128 | e >>> 6 & 63) + c(128 | 63 & e)
            }
            var e = 65536 + 1024 * (t.charCodeAt(0) - 55296) + (t.charCodeAt(1) - 56320);
            return c(240 | e >>> 18 & 7) + c(128 | e >>> 12 & 63) + c(128 | e >>> 6 & 63) + c(128 | 63 & e)
        }
        , i = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g
        , f = function(t) {
            return t.replace(i, u)
        }
        , h = function(t) {
            var e = [0, 2, 1][t.length % 3]
                , r = t.charCodeAt(0) << 16 | (t.length > 1 ? t.charCodeAt(1) : 0) << 8 | (t.length > 2 ? t.charCodeAt(2) : 0)
                , n = [o.charAt(r >>> 18), o.charAt(r >>> 12 & 63), e >= 2 ? "=" : o.charAt(r >>> 6 & 63), e >= 1 ? "=" : o.charAt(63 & r)];
            return n.join("")
        }
        , d = t.btoa ? function(e) {
            return t.btoa(e)
        }
            : function(t) {
            return t.replace(/[\s\S]{1,3}/g, h)
        }
        , g = e ? function(t) {
            return new e(t).toString("base64")
        }
            : function(t) {
            return d(f(t))
        }
        , l = function(t, e) {
            return e ? g(t).replace(/[+\/]/g, function(t) {
                return "+" == t ? "-" : "_"
            }).replace(/=/g, "") : g(t)
        }
        , s = function(t) {
            return l(t, !0)
        }
        , A = new RegExp(["[À-ß][-¿]", "[à-ï][-¿]{2}", "[ð-÷][-¿]{3}"].join("|"),"g")
        , p = function(t) {
            switch (t.length) {
                case 4:
                    var e = (7 & t.charCodeAt(0)) << 18 | (63 & t.charCodeAt(1)) << 12 | (63 & t.charCodeAt(2)) << 6 | 63 & t.charCodeAt(3)
                        , r = e - 65536;
                    return c((r >>> 10) + 55296) + c((1023 & r) + 56320);
                case 3:
                    return c((15 & t.charCodeAt(0)) << 12 | (63 & t.charCodeAt(1)) << 6 | 63 & t.charCodeAt(2));
                default:
                    return c((31 & t.charCodeAt(0)) << 6 | 63 & t.charCodeAt(1))
            }
        }
        , b = function(t) {
            return t.replace(A, p)
        }
        , C = function(t) {
            var e = t.length
                , r = e % 4
                , n = (e > 0 ? a[t.charAt(0)] << 18 : 0) | (e > 1 ? a[t.charAt(1)] << 12 : 0) | (e > 2 ? a[t.charAt(2)] << 6 : 0) | (e > 3 ? a[t.charAt(3)] : 0)
                , o = [c(n >>> 16), c(n >>> 8 & 255), c(255 & n)];
            return o.length -= [0, 0, 2, 1][r],
                o.join("")
        }
        , B = t.atob ? function(e) {
            return t.atob(e)
        }
            : function(t) {
            return t.replace(/[\s\S]{1,4}/g, C)
        }
        , v = e ? function(t) {
            return new e(t,"base64").toString()
        }
            : function(t) {
            return b(B(t))
        }
        , S = function(t) {
            return v(t.replace(/[-_]/g, function(t) {
                return "-" == t ? "+" : "/"
            }).replace(/[^A-Za-z0-9\+\/]/g, ""))
        }
        , y = function() {
            var e = t.Base64;
            return t.Base64 = r,
                e
        };
    if (t.Base64 = {
            VERSION: n,
            atob: B,
            btoa: d,
            fromBase64: S,
            toBase64: l,
            utob: f,
            encode: l,
            encodeURI: s,
            btou: b,
            decode: S,
            noConflict: y
        },
        "function" == typeof Object.defineProperty) {
        var j = function(t) {
            return {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        };
        t.Base64.extendString = function() {
            Object.defineProperty(String.prototype, "fromBase64", j(function() {
                return S(this)
            })),
                Object.defineProperty(String.prototype, "toBase64", j(function(t) {
                    return l(this, t)
                })),
                Object.defineProperty(String.prototype, "toBase64URI", j(function() {
                    return l(this, !0)
                }))
        }
    };
}(this), this.Meteor && (Base64 = global.Base64);
//②
!function(a) {
    var s = ""
        , n = ylst.configs.sc
        , c = ylst.configs.channel
        , t = ylst.configs.union
        , i = ylst.configs.uid
        , o = ylst.configs.ukey
        , e = ylst.configs.ordersid
        , l = ylst.configs.userid;
    s += n ? "&sc=" + n : "",
        s += c ? "&channel=" + c : "",
        s += t ? "&union=" + t : "",
        s += i ? "&uid=" + i : "",
        s += o ? "&ukey=" + o : "",
        s += e ? "&ordersid=" + e : "",
        s += l ? "&userid=" + l : "";
    var d = {
        seatURL: "../" + ylst.configs.onlineSeatUrl,
        pi: function(a, n) {
            var c = ylst.configs.basePath + "?type=pi&id=" + a + "&nc=30";
            s && (c += s),
                $.ajax({
                    url: c,
                    dataType: "jsonp",
                    jsonp: "callback",
                    async: !1,
                    cache: !0,
                    jsonpCallback: "windowPI",
                    success: function(a) {
                        n(a.data.seats)
                    }
                })
        },
        vi: function(a, n, c) {
            var t = ylst.configs.basePath + "?type=vi&id=" + n + "&pid=" + a + "&nc=30";
            s && (t += s),
                $.ajax({
                    async: !1,
                    url: t,
                    dataType: "jsonp",
                    jsonp: "callback",
                    cache: !0,
                    jsonpCallback: "windowVI",
                    success: function(a) {
                        c(a.data.seats)
                    },
                    error: function() {
                        location.reload()
                    }
                })
        },
        vs: function(a, n) {
            var c = ylst.configs.basePath + "?type=vs&id=" + a + "&nc=30";
            s && (c += s),
                $.ajax({
                    url: c,
                    dataType: "jsonp",
                    jsonp: "callback",
                    async: !1,
                    cache: !0,
                    jsonpCallback: "windowVS",
                    success: function(a) {
                        n(a.data.seats)
                    }
                })
        },
        ri: function(a, n, c) {
            var t = ylst.configs.basePath + "?nc=30";
            s && (t += s),
                $.ajax({
                    url: t,
                    data: {
                        type: "ri",
                        id: "",
                        sid: a,
                        rid: n
                    },
                    dataType: "jsonp",
                    jsonp: "callback",
                    async: !1,
                    cache: !0,
                    jsonpCallback: "windowRI",
                    success: function(a) {
                        c(a.data.seats)
                    }
                })
        },
        rs: function(a, n, c) {
            var t = ylst.configs.basePath + "?nc=30";
            s && (t += s),
                $.ajax({
                    url: t,
                    data: {
                        type: "rs",
                        id: "",
                        sid: a,
                        rid: n
                    },
                    dataType: "jsonp",
                    jsonp: "callback",
                    cache: !0,
                    jsonpCallback: "windowRS",
                    async: !1,
                    success: function(a) {
                        c(a.data.seats)
                    }
                })
        },
        ck: function(a, n, c, t, i) {
            var o = ylst.configs.basePath + "?ck=1";
            s && (o += s),
                $.ajax({
                    url: o,
                    data: {
                        type: "ck",
                        pid: a,
                        vid: n,
                        seatids: c
                    },
                    dataType: "jsonp",
                    jsonp: "callback",
                    cache: !1,
                    jsonpCallback: "windowCK",
                    async: !1,
                    success: function(a) {
                        i(a.data.seats.result)
                    },
                    error: function() {
                        t()
                    }
                })
        }
    };
    a.seatsData = d
}(window);
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
                var t = this
                    , a = new Image;
                a.src = e,
                    a.complete ? (t.areaBgLoaded = a,
                        console.log("图片预加载成功!"),
                        t.drawNewCanvas()) : a.onload = function() {
                        t.areaBgLoaded = a,
                            console.log("图片加载成功，画区域线条"),
                            t.drawNewCanvas()
                    }
            },
         drawNewCanvas: function() {
                this.clearCanvas(),
                    this.clearBufferCanvas(),
                    this.controllNextPage(),
                    $(".loading").hide()
            },
         init: function() {
                return console.log("区域类初始化成功--start--"),
                    this._canvas = document.getElementById("canvas1"),
                    this._canvas && this._canvas.getContext ? (this._canvasContext = this._canvas.getContext("2d"),
                        this._canvasBuffer = document.createElement("canvas"),
                        this._canvasBuffer.width = this._canvas.width,
                        this._canvasBuffer.height = this._canvas.height,
                        this._canvasBufferContext = this._canvasBuffer.getContext("2d"),
                    ylst.isMobile || (ylst.configs.areaIsSmall ? (this.beginStatic = !1,
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
                        }))),
                    void 0 !== this.areaData.qz && this.qzAreaBool(),
                        void this.imgLoad(this.areaBgImg)) : void alert("你的浏览器不支持canvas画布，请升级您的浏览器^^")
            },
         controllNextPage: function() {
                if (console.log("控制跳转"),
                        ylst.isMobile)
                    if (ylst.configs.singleSession && (1 == this.areaData.areas.length && null == this.areaData.areas.rect || !this.areaBgLoaded)) {
                        this.selectArea.selectId = this.areaData.areas[0].id;
                        var e = this.getAreaInfoById(this.areaData.areas[0].id);
                        this.selectArea.remainSeatNum = e.remain,
                            this.drawBgImage(),
                            this.drawReact()
                    } else if (1 == this.areaData.areas.length && null == this.areaData.areas.rect || !this.areaBgLoaded) {
                        var t = n + "pid=" + a.pid + "&sid=" + a.vid + "&area=" + this.areaData.areas[0].id + "&singleToSeat=1";
                        this.controllerLink(t)
                    } else
                        $(".pcprice-info").show(),
                            this.drawBgImage(),
                            this.drawReact();
                else
                    1 == this.areaData.areas.length && null == this.areaData.areas.rect || !this.areaBgLoaded ? (ylst.configs.areaIsSmall = !0,
                        $("#canvasShowBlock").show(),
                        a.pid = a.pid,
                        a.vid = a.vid,
                        a.selectArea.selectId = this.areaData.areas[0].id,
                        a.getSeatsInfo(),
                        $("#canvasContent").hide(),
                        $(".pcprice-info").css({
                            "margin-top": "10px",
                            position: "static"
                        }).show()) : ($(".pcprice-info").show(),
                        this.drawBgImage(),
                        this.drawReact())
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
//④
!function(s) {
    function e() {
        var s = $(window).width(), e = $(window).height();
        $("#canvas,#canvas1").attr({
            width: s,
            height: e
        }),
        $("#canvasContent").css({
                width: s + "px",
                height: e + "px"
            });
        $(".online-heaser-center").css("width", s - 800);
        $(".cqlists").css({
                left: (s - 400) / 2 + "px",
                top: ($(window).height() - 360) / 2 + "px"
            })
    }
    function a(s) {
        window.location.href = s
    }
    function i(s, e) {
        var a = [], i = new Date;
        return i = i.format("yyyy-MM-dd hh:mm"),
            Lib.each(s, function(s, t) {
                t.time > i && (e && t.id != e || a.push(t))
            }), a
    }
    function t() {
        seatsData.pi(h, function(s) {
            var e, t;
            if (Lib.isString(s) ? (t = JSON.parse(s.replace(/=/g, ":")),
                    e = t.result) : (t = s,
                    e = t.result),
                    e = i(e, t.qz_session),
                !e || !e[0].id)
                return void a("error.html");
            if (e.length <= 1) {
                $(".head-selcq").hide(),
                    d = e[0].id,
                    l(d);
                var n = c(e);
                $("#areasShow").html(n),
                    f = !0
            } else
                $(".cqlists,.head-selcq").show(),
                    o(e, ylst.configs.session),
                ylst.configs.session && l(ylst.configs.session),
                    $(".loading").hide()
        })
    }
    function n() {
        ylst.selectSeats = [],
            s.selSeatsAttrs = [],
            ylst.configs.changeSession = !0,
            $("#seatSels").hide(),
            $("#seatsUl,.seats-sel-hed span").empty(),
            $("#seatsBtnBuy i,#seatsBtnBuy span").hide()
    }
    function c(s) {
        var e = "";
        return p = s.length,
            Lib.each(s, function(s, a) {
                var i = a.time.split(" ")
                    , t = i[0].split("-")
                    , n = Lib.getWeek(t[0], t[1], t[2]);
                e = i[0] + " " + n + " " + i[1]
            }),
            e
    }
    function o(s, e) {
        var a = s
            , i = '<li seatid="{0}" onclick="SeatidFunc({0},this)"><a>{1}</a><span class="{2}"></span></li>'
            , t = "";
        p = a.length,
            Lib.each(a, function(s, a) {
                var n = a.time.split(" ")
                    , c = n[0].split("-")
                    , o = Lib.getWeek(c[0], c[1], c[2])
                    , r = n[0] + " " + o + " " + n[1];
                a.id == e ? (t += i.format(a.id, r, "on"),
                    $("#areasShow").html(r)) : t += i.format(a.id, r, "")
            }),
            Lib.getId("areas1").innerHTML = t
    }
    function r() {
        s.ids.length = 0,
            $(".price-sel input").each(function() {
                $(this).is(":checked") && s.ids.push($(this).attr("rel"))
            }),
        200 == $("#canvas1").attr("width") && (ylst.configs.areaIsSmall = !0),
            beginStatic = !0,
            areavenue.drawSelArea()
    }
    function l(e) {
        var a, i;
        seatsData.vi(h, e, function(e) {
            localStorage.areaData = Lib.isString(e) ? e : JSON.stringify(e),
                s.areaData = e,
                a = Lib.toTurnObj(e)
        }),
            seatsData.vs(e, function(s) {
                i = Lib.toTurnObj(s)
            });
        var t = new Date
            , n = t.getTime()
            , c = window.setInterval(function() {
                var t = new Date
                    , o = t.getTime()
                    , l = o - n;
                if (l > 1e4 && (window.clearInterval(c), alert("数据请求时间过长，请刷新后再试!")), console.log("加载完vi vs数据"), a && i){
                    if (301 != a.result && 301 != i.result) {
                        var d = a.result.prices;
                        if (window.clearInterval(c),
                            !ylst.configs.session && u && ($(".cqlists").hide(),
                                $("#pageOverlay").hide()),
                            ylst.configs.session && u && ($(".cqlists").hide(),
                                $("#pageOverlay").hide()),
                            f && $("#pageOverlay").hide(),
                                $(".pcprice-info").show(),
                                ylst.configs.changeSession) {
                            $("#canvas1ShowBlock").show(),
                                $("#canvasShowBlock").hide(),
                                ylst.configs.areaIsSmall = !1,
                                s.beginStatic = !1;
                            var w = $(window).width()
                                , v = $(window).height();
                            s.firstSmallArea = !1,
                                $("#canvas1").attr({
                                    width: w,
                                    height: v
                                }),
                                $(".pcprice-info").css({
                                    top: "50px"
                                }),
                                ylst.configs.changeSession = !1,
                                $("#areaUp").hide()
                        }
                        areavenue = new AreasVenue({
                            areaData: a.result,
                            areaSaleData: i.result,
                            pid: h,
                            vid: e,
                            sessionNum: p,
                            qzPrices: ylst.configs.qzPrices
                        });
                        for (var g = "", y = a.result.areas.length, S = 0, m = d.length; S < m; S++) {
                            var b = '<span class="price-sel"><input type="checkbox" rel=' + d[S].id + "></span>";
                            (y <= 1 || Lib.isLessIe9()) && (b = " ");
                            var k = ["<li>", '<span class="price-block" style="background-color:#' + d[S].color + '">' + d[S].price + "元</span>", '<span class="price-sort">' + d[S].name + "</span>", "" + b, "</li>"].join(" ");
                            g += k
                        }
                        $("#pcpriceInfoUi").empty().append(g),
                        Lib.isLessIe9() || $(".price-block,.price-sort").click(function(s) {
                            $(this).parent().find("input").is(":checked") ? ($(this).parent().find("input").removeAttr("checked"),
                                r()) : ($(this).parent().find("input").attr("checked", "checked"),
                                r())
                        }),
                        y > 1 && (Lib.isLessIe9() || $(".price-sel input").click(function(s) {
                            r()
                        }),
                            $("#areaUp").click(function() {
                                $("#canvas1ShowBlock").show(),
                                    $("#canvasShowBlock").hide(),
                                    ylst.configs.areaIsSmall = !1,
                                    s.beginStatic = !1;
                                var t = $(window).width()
                                    , n = $(window).height();
                                s.firstSmallArea = !1,
                                    $("#canvas1").attr({
                                        width: t,
                                        height: n
                                    }),
                                    $(".pcprice-info").css({
                                        top: "50px"
                                    }),
                                    areavenue = new AreasVenue({
                                        areaData: a.result,
                                        areaSaleData: i.result,
                                        pid: h,
                                        vid: e,
                                        selectId: s.selectId,
                                        sessionNum: p
                                    }),
                                    $("#areaUp").hide()
                            }))
                    } else{
                        window.clearInterval(c),
                            alert(a.error)
                    }
                }
            }, 200)
    }
    var h = ylst.configs.pid;
    if (h) {
        var d = 0, p = 0, u = !1, f = !1;
        if (localStorage.areaData && (localStorage.areaData = ""),
            localStorage.seatsDatas && (localStorage.seatsDatas = ""),
            e(),
            t(),
            window.SeatidFunc = function(s, e) {
                u = !0,
                    $("#areas1 span").removeClass("on"),
                    $(e).find("span").addClass("on"),
                    $("#areasShow").html($(e).text()),
                    n(),
                    l(s)
                },
            $(".head-selcq a").click(function() {
                $("#pageOverlay").show(),
                    $(".cqlists").show()
            }),
            $(".seat-cq-dotall s").click(function() {
                    $("#pageOverlay").hide(),
                        $(".cqlists").hide()
                }),
            $(".seats-sel").mouseover(function() {
                    $(".seats-sel").css("width", "200px"),
                        $(".seats-lists-r").show(),
                        $(".seats-lists-d").css("visibility", "visible"),
                        $("#seatsBtnBuy").css({
                            width: "120px"
                        }),
                        $("#seatsBtnBuy span,#seatsBtnBuy i").show(),
                        $(".online-sacles").css({
                            right: "220px"
                        })
                }),
            $(".seats-sel").mouseout(function() {
                    $(".seats-sel").css("width", "80px"),
                        $(".seats-lists-r").hide(),
                        $(".seats-lists-d").css("visibility", "hidden"),
                        $("#seatsBtnBuy").css({
                            width: "65px"
                        }),
                        $("#seatsBtnBuy span,#seatsBtnBuy i").hide(),
                        $(".online-sacles").css({
                            right: "100px"
                        })
                }),
            !Lib.isLessIe9()
        ) {
             var w = 0;
             $("#canvasContent").mousemove(function(s) {
                    ++w % 2 == 0 && areavenue.pointInPath(s)
                }),
             $("#canvasContent").mouseout(function(s) {
                    $("#areaMessage").hide()
                }),
             $("#areaMessage").hover(function() {
                    $(this).hide()
                })
        };
        console.log(window.SeatidFunc);
        s.ids = []
    }
}(window);
//⑤
!function(e) {
    function t(e) {
        console.log("-------rule规则------"),
            this.unionSeat = [],
            this.normalTpRule = {},
            this.freeTpRule = {},
            this._selSeat = e._selSeat,
            this.contnub = e.contnub,
            this.selFactSeats = [],
            this.rfal = 0,
            this.init()
    }
    var s = 1e5;
    e.selSeatsAttrs = [],
        t.prototype = {
            init: function() {
                if (this.getTpRule(),
                        ylst.isMobile) {
                    new wapView
                } else {
                    new pcView
                }
            },
            delSingleSeat: function(e, t) {
                for (var s = 0, a = e.length; s < a; s++)
                    if (e[s].id == t.id) {
                        var r = s - 1 < 0 ? 0 : s - 1;
                        e = e.splice(r, 1)
                    }
                return e
            },
            hasSeatBoolean: function(e, t) {
                if (e)
                    for (var s = 0, a = e.length; s < a; s++)
                        if (e[s].id == t)
                            return s + 1;
                return !1
            },
            delNormalTpSeats: function(e, t) {
                for (var s = [], a = 0, r = e.length; a < r; a++) {
                    var l = this.hasSeatBoolean(t, e[a].id);
                    l || s.push(e[a])
                }
                return s
            },
            delNormalTps: function(e, t) {
                for (var s = [], a = 0, r = e.length; a < r; a++)
                    if (e[a].constructor == Array) {
                        var l = this.hasSeatBoolean(t, e[a][0].id);
                        l || s.push(e[a])
                    } else
                        s.push(e[a]);
                return s
            },
            selectSeatsHasTp: function(e) {
                for (var t = 0, s = e.length; t < s; t++)
                    if (1 == e[t].tp)
                        return !0;
                return !1
            },
            groupSeats: function() {
                var t = e.seatsDatas
                    , s = this._selSeat;
                if (s && 1 == s.sale.on_sale) {
                    var a = this.hasSeatBoolean(ylst.selectSeats, s.id);
                    this.containSeatBoolean = a;
                    var r;
                    if (r = 1 == s.tp || this.selectSeatsHasTp(ylst.selectSeats),
                        !a && !r && ylst.selectSeats.length + 1 > ylst.configs.maxseatNum)
                        return void alert("最多只能选择{0}张票...".format(ylst.configs.maxseatNum));
                    if (s && 1 == s.tp) {
                        var l = t.select('@tp_type_id="{0}"'.format(s.tp_type_id))
                            , i = l.select('@tp_id="{0}"'.format(s.tp_id));
                        if (a)
                            ylst.selectSeats = this.delNormalTpSeats(ylst.selectSeats, i),
                                e.selSeatsAttrs = this.delNormalTps(e.selSeatsAttrs, i);
                        else {
                            if (r && ylst.selectSeats.length + i.length > ylst.configs.maxseatTpNum)
                                return void alert("最多只能选择{0}张票...".format(ylst.configs.maxseatTpNum));
                            Array.prototype.push.apply(ylst.selectSeats, i),
                                e.selSeatsAttrs.push(i)
                        }
                    } else {
                        if (a && (this.descSelDrawSeat(),
                                this.descSelSeat()),
                            r && ylst.selectSeats.length + 1 > ylst.configs.maxseatTpNum)
                            return void alert("最多只能选择{0}张票...".format(ylst.configs.maxseatTpNum));
                        a ? (this.descSelDrawSeat(),
                            this.descSelSeat()) : ylst.selectSeats.push(s),
                            this.seatsMatchTp()
                    }
                    if (Lib.isLessIe9()) {
                        var n = s.id
                            , p = $("#" + n);
                        p.find("img").attr("src").indexOf("selected") > 0 ? (p.removeClass("sseat"),
                            p.find("img").attr("src", ylst.configs.imgPath + seatvenue.seatImg[0]),
                            p.find("img").css({
                                "background-color": ""
                            })) : (p.addClass("sseat"),
                            p.find("img").attr("src", ylst.configs.imgPath + seatvenue.seatImg[1]),
                            p.find("img").css({
                                "background-color": "#000"
                            }))
                    } else
                        seatvenue.drawReact()
                }
            },
            getTpRule: function() {
                Lib.isLessIe9() ? this.tpRule = JSON.parse(e.areaData).result.tplist : this.tpRule = JSON.parse(localStorage.areaData).result.tplist,
                this.tpRule.length && this.seatsUnionTp(),
                    this.groupSeats()
            },
            getPriceById: function(t) {
                Lib.isLessIe9() ? this.prices = JSON.parse(e.areaData).result.prices : this.prices = JSON.parse(localStorage.areaData).result.prices;
                for (var s = 0, a = this.prices.length; s < a; s++)
                    if (this.prices[s].id == t)
                        return this.prices[s].price
            },
            seatsUnionTp: function() {
                for (var t = this.tpRule, s = t.length; s--; ) {
                    var a = t[s];
                    ylst.configs.zytpIsUsed ? (this.freeTpRule[a.price_id + "_" + a.num] = a,
                        this.normalTpRule[a.price_id + "_" + a.type_id] = a) : 1 == a.is_free ? this.freeTpRule[a.price_id + "_" + a.num] = a : this.normalTpRule[a.price_id + "_" + a.type_id] = a
                }
                e.freeTpRule = this.freeTpRule,
                    e.normalTpRule = this.normalTpRule
            },
            descSelSeat: function(t) {
                for (var s = [], a = t || this._selSeat.id, r = 0; r < e.selSeatsAttrs.length; r++)
                    e.selSeatsAttrs[r].id == a && 1 != e.selSeatsAttrs[r].tp || s.push(e.selSeatsAttrs[r]);
                e.selSeatsAttrs.length = 0,
                    e.selSeatsAttrs = s
            },
            descSelDrawSeat: function(e) {
                for (var t = [], s = e || this._selSeat.id, a = 0; a < ylst.selectSeats.length; a++)
                    ylst.selectSeats[a].id == s && 1 != ylst.selectSeats[a].tp || t.push(ylst.selectSeats[a]);
                ylst.selectSeats.length = 0,
                    ylst.selectSeats = t
            },
            descSelPriceSeat: function() {
                for (var t = [], s = 0; s < e.selSeatsAttrs.length; s++)
                    e.selSeatsAttrs[s].price_id == this._selSeat.price_id && 1 != e.selSeatsAttrs[s].tp || t.push(e.selSeatsAttrs[s]);
                e.selSeatsAttrs.length = 0,
                    e.selSeatsAttrs = t
            },
            descSelPriceTps: function() {
                for (var t = [], s = 0; s < e.selSeatsAttrs.length; s++)
                    e.selSeatsAttrs[s].length && e.selSeatsAttrs[s][0].price_id == this._selSeat.price_id && 1 != e.selSeatsAttrs[s][0].tp || t.push(e.selSeatsAttrs[s]);
                e.selSeatsAttrs.length = 0,
                    e.selSeatsAttrs = t
            },
            descPriceTpAlls: function() {
                for (var t = [], s = 0; s < e.selSeatsAttrs.length; s++)
                    e.selSeatsAttrs[s].length && e.selSeatsAttrs[s][0].price_id == this._selSeat.price_id && 1 != e.selSeatsAttrs[s][0].tp || e.selSeatsAttrs[s].price_id == this._selSeat.price_id && 1 != e.selSeatsAttrs[s].tp || t.push(e.selSeatsAttrs[s]);
                e.selSeatsAttrs.length = 0,
                    e.selSeatsAttrs = t
            },
            seatsMatchTp: function() {
                function t(e, t, a) {
                    for (var r = e; r < t; r++)
                        a[r].tp_id = s,
                            a[r].tp_type_id = p.freeTpRule[g + "_" + t].type_id
                }
                function a(e, a, r) {
                    var l = e % a;
                    0 === l && (t(e - a, e, r),
                        s++)
                }
                function r(e, t, s, a, l) {
                    var i = e - t;
                    this.rfal >= 0 && i < 0 && (this.rfal -= 1,
                        r(e, s[l - 1], s, a, l)),
                        i >= t ? (a.push(t),
                            r(i, s[l], s, a, l)) : i > 0 && (a.push(t),
                            r(i, s[l - 1], s, a, l)),
                    0 == i && a.push(t)
                }
                function l(e, t) {
                    for (var s = t.length; s--; ) {
                        this.rfal = t.length - 1;
                        var a = [];
                        _numr = e,
                            t = t;
                        var l = t[this.rfal];
                        r(_numr, l, t, a, s);
                        for (var i = 0, n = 0; n < a.length; n++)
                            i += a[n];
                        if (i < e)
                            for (var p = 0; p < e - i; p++)
                                a.push(1);
                        a.length > 0 && !v.containsAttr(a) && v.push(a)
                    }
                }
                function i(e, t) {
                    for (var s = 0; s < t.length; s++) {
                        var a = t.slice(0, s + 1);
                        l(e, a)
                    }
                }
                function n(t, s) {
                    for (var r = (s[0].price_id,
                        0); r < t.length; r++) {
                        var l = t[r];
                        0 != _ && (_ += l - 1);
                        var i = s.splice(_, l);
                        i.length > 1 ? a(l, l, i) : i = i[0],
                            p.selFactSeats.push(i)
                    }
                    p.descPriceTpAlls(),
                        Array.prototype.push.apply(e.selSeatsAttrs, p.selFactSeats)
                }
                var p = this
                    , h = ylst.selectSeats;
                this.freeTpRuleNums = {};
                var o = []
                    , c = [];
                for (var u in this.freeTpRule) {
                    var f = u.split("_");
                    this.freeTpRuleNums[f[0]] ? this.freeTpRuleNums[f[0]] = this.freeTpRuleNums[f[0]] + "," + f[1] : this.freeTpRuleNums[f[0]] = f[1]
                }
                for (var S = 0, d = h.length; S < d; S++)
                    1 == h[S].tp ? o.push(h[S]) : c.push(h[S]);
                var g = this._selSeat.price_id
                    , v = []
                    , _ = 0
                    , m = this.freeTpRuleNums[g];
                if (m) {
                    var y = [];
                    if (m && m.indexOf(",") > 0) {
                        var A = m.split(",").sort();
                        y = A,
                            y.unshift(1)
                    } else
                        y.push(m),
                            y.unshift(1);
                    for (var T = y.length; T--; )
                        y[T] = parseInt(y[T]);
                    for (var R = y.length, N = h.select("@price_id={0}".format(g)), w = [], B = N.length; B--; )
                        0 == N[B].tp && w.push(N[B]);
                    N.length = 0,
                        N = w;
                    for (var P = N.length, b = 0; b < P; b++)
                        N[b].tp_id = 0,
                            N[b].tp_type_id = 0;
                    if (1 == P && R)
                        p.descSelPriceTps(),
                        p.hasSeatBoolean(e.selSeatsAttrs, N[0].id) || e.selSeatsAttrs.push(N[0]);
                    else if (P <= 0 && R)
                        p.descSelPriceSeat();
                    else if (P > 1 && R)
                        if (i(P, y),
                            v.length > 1) {
                            for (var I = [], x = 0; x < v.length; x++) {
                                for (var D = 0, L = 0; L < v[x].length; L++)
                                    D += 1 != v[x][L] ? this.freeTpRule[g + "_" + v[x][L]].price : this.getPriceById(g);
                                I.push(D)
                            }
                            for (var O = 0, J = I[0], k = 0; k < I.length; k++)
                                I[k] < J && (J = I[k]);
                            for (var F = 0; F < I.length; F++)
                                if (I[F] == J) {
                                    O = F;
                                    break
                                }
                            n(v[O], N)
                        } else
                            v.length > 0 ? n(v[0], N) : this.containSeatBoolean || e.selSeatsAttrs.push(p._selSeat);
                    else
                        this.containSeatBoolean || e.selSeatsAttrs.push(p._selSeat)
                } else
                    this.containSeatBoolean ? p.descSelSeat() : e.selSeatsAttrs.push(p._selSeat)
            }
        },
        e.Ruler = t
}(window);
//⑥
!function(s) {
    function t(s) {
        console.log("----实例化pcView类了------"),
            this.init()
    }
    var e = 0;
    s.delSeats = function(e) {
        var a = $(e).attr("_id")
            , i = $(e).attr("_tpid")
            , l = $(e).attr("_tp");
        if (0 == i && 1 != l)
            $(e).parent().parent().remove(),
                rule.descSelDrawSeat(a),
                rule.descSelSeat(a);
        else {
            $("#seatsUl li a").each(function() {
                $(this).attr("_tpid") == i && $(this).parent().parent().remove()
            });
            for (var n = [], r = 0, c = ylst.selectSeats.length; r < c; r++)
                ylst.selectSeats[r].tp_id != i && n.push(ylst.selectSeats[r]);
            ylst.selectSeats.length = 0,
                ylst.selectSeats = n;
            for (var o = [], p = 0, d = s.selSeatsAttrs.length; p < d; p++)
                if (s.selSeatsAttrs[p].constructor == Array) {
                    var h = rule.hasSeatBoolean(s.selSeatsAttrs[p], a);
                    h || o.push(s.selSeatsAttrs[p])
                } else
                    s.selSeatsAttrs[p].tp_id != i && o.push(s.selSeatsAttrs[p]);
            s.selSeatsAttrs.length = 0,
                s.selSeatsAttrs = o
        }
        if (console.log(ylst.selectSeats),
                console.log(s.selSeatsAttrs),
                $(e).parent().remove(),
                Lib.isLessIe9()) {
            $(".sseat").each(function() {
                $(this).find("img").attr("src", ylst.configs.imgPath + seatvenue.seatImg[0]),
                    $(this).find("img").css({
                        "background-color": ""
                    })
            });
            for (var r = 0; r < ylst.selectSeats.length; r++)
                $("#" + ylst.selectSeats[r].id).find("img").attr("src", ylst.configs.imgPath + seatvenue.seatImg[1]),
                    $("#" + ylst.selectSeats[r].id).find("img").css({
                        "background-color": "#000"
                    })
        } else
            seatvenue.drawReact();
        t.prototype.totalMoney()
    }
        ,
        t.prototype = {
            init: function() {
                s.vi.qz && (ylst.configs.buyNoMoney = !0,
                    ylst.configs.seatSingleShow = !0),
                    this.tosSeatHtmls()
            },
            tosSeatHtmls: function() {
                var t, a = "";
                t = ylst.configs.seatSingleShow ? ylst.selectSeats : s.selSeatsAttrs;
                for (var i = 0, l = t.length; i < l; i++) {
                    var n = ""
                        , r = t[i];
                    if (r.constructor == Array) {
                        e += r.length;
                        for (var c = 0, o = r.length; c < o; c++) {
                            var p = ['         <p class="seats-number">', "             " + r[c].pinfo, "         </p>"].join("");
                            n += p
                        }
                        var d = t[i][0];
                        if (1 == d.tp)
                            var h = d.price_id
                                , v = d.tp_type_id
                                , g = s.normalTpRule[h + "_" + v].price;
                        else {
                            var y = r.length
                                , h = d.price_id
                                , u = h + "_" + y;
                            console.log(u);
                            var g = s.freeTpRule[u].price
                        }
                        var f = ["<li>", '     <div class="seats-lists-d"><a href="#"   _id = ' + d.id + " _tp=" + d.tp + " _tpid=" + d.tp_id + ' onclick="delSeats(this)">删除</a></div>', '     <div class="seats-lists-l">', '         <div class="seats-img" style="background-color:#' + d.price.color + '"></div>', '         <p><span class="seats-prices">' + g + "</span>元</p>", "     </div>", '     <div class="seats-lists-r">', "         <p>座号：</p>", "         " + n, "         <p>等级：" + d.price.name + "</p>", "     </div>", "</li>"].join("");
                        a = f + a
                    } else {
                        e++;
                        var f = ["<li>", '     <div class="seats-lists-d"><a href="#"  _id = ' + r.id + " _tp=" + r.tp + " _tpid=" + r.tp_id + ' onclick="delSeats(this)">删除</a></div>', '     <div class="seats-lists-l">', '         <div class="seats-img" style="background-color:#' + r.price.color + ';"></div>', '         <p><span class="seats-prices">' + r.price.price + "</span>元</p>", "     </div>", '     <div class="seats-lists-r">', "         <p>座号：</p>", '         <p class="seats-number">', "             " + r.pinfo, "         </p>", "         <p>等级：" + r.price.name + "</p>", "     </div>", "</li>"].join("");
                        a = f + a
                    }
                }
                $("#seatsUl").empty().append(a),
                    this.totalMoney(),
                    $(".seats-lists-r").hide(),
                    $(".seats-lists-d").css("visibility", "hidden"),
                    $("#seatsBtnBuy").css({
                        width: "65px"
                    }),
                    $("#seatsBtnBuy span,#seatsBtnBuy i").hide()
            },
            totalMoney: function() {
                if (s.selSeatsAttrs.length > 0 ? ($(".seats-sel").show(),
                        "80px" != $(".seats-sel").css("width") ? $(".online-sacles").css({
                            right: "220px"
                        }) : $(".online-sacles").css({
                            right: "100px"
                        })) : ($(".seats-sel").css("width", "80px"),
                        $(".seats-sel").hide(),
                        $(".online-sacles").css({
                            right: "0"
                        })),
                        ylst.configs.buyNoMoney)
                    $("#seatsBtnBuy span,#seatsBtnBuy i").remove();
                else {
                    var t = 0;
                    $(".seats-prices")[0] ? ($(".seats-prices").each(function() {
                        t += parseInt($(this).text())
                    }),
                        $("#seatsBtnBuy span").text(t),
                        ylst.configs.totalMoney = t) : $("#seatsBtnBuy span").text(""),
                        $(".seats-sel-hed span").text($(".seats-number").length)
                }
            }
        },
        s.pcView = t
}(window);
//⑦
!function(t) {
    function e(e) {
        i = this,
            this.areaData = e.areaData,
            this.seatsDatas = e.seatsDatas,
            this.seatsSaleData = e.seatsSaleData,
            this.pid = e.pid,
            this.vid = e.vid,
            this.seatImg = ["seatX80.png", "selected.png", "sold.png", "tp.png", "wt.png"],
            this.loadImgs = [],
            this.seatSet = {
                w: 10,
                h: 10
            },
            this.scale = 1,
            this.minScale = 1,
            this.maxScale = 5,
            this.canvasX = 0,
            this.canvasY = 0,
            t.positionX = e.positionX || 0,
            t.positionY = e.positionY || 0,
            this.lastDist = 0,
            this.moveBoolen = !1,
            this.canvasCenterXY = {
                cx: s / 2,
                cy: a / 2
            },
            this["static"] = "NONE",
            this.pricesSeatMap = {},
            this.rects = [],
            this.beginStatic = e.beginStatic || !1,
            this.oldCanvasWid = 0,
            this.sacleMiddle = !1,
            this.seatImgStatic = !0,
            this.x_min = 0,
            this.x_max = 0,
            this.y_min = 0,
            this.y_max = 0,
            this.areaData.seatmaxnum ? (ylst.configs.maxseatNum = Number(this.areaData.seatmaxnum),
                ylst.configs.maxseatTpNum = Number(this.areaData.seatmaxnum)) : (ylst.configs.maxseatNum = 6,
                ylst.configs.maxseatTpNum = 12),
        this.areaData.qz && (ylst.configs.maxseatNum = Number(this.areaData.qz.qz_num),
            ylst.configs.maxseatTpNum = Number(this.areaData.qz.qz_num)),
            this.init()
    }
    var s = document.documentElement.clientWidth
        , a = document.documentElement.clientHeight;
    ylst.isMobile || (s -= 240,
        a -= 60);
    var i;
    e["default"] = {},
        e.prototype = {
            imgLoad: function() {
                var t = this
                    , e = new Image;
                this.seatImg[0] ? (e.src = ylst.configs.imgPath + this.seatImg[0],
                        e.complete = function() {
                            t.loadImgs.push(e),
                                t.seatImg.shift(),
                                t.imgLoad()
                        }
                        ,
                        e.onload = function() {
                            t.loadImgs.push(e),
                                t.seatImg.shift(),
                                t.imgLoad()
                        }
                ) : t.drawNewCanvas()
            },
            drawNewCanvas: function() {
                this.clearCanvas(),
                    this.clearBufferCanvas(),
                    this.seatMinMax(),
                    this.drawReact(),
                    this.addEvents.init()
            },
            init: function() {
                return console.log("区域类初始化成功--start--"),
                    this._canvas = document.getElementById("canvas"),
                    this._canvas && this._canvas.getContext ? (this._canvasContext = this._canvas.getContext("2d"),
                        this._canvasBuffer = document.createElement("canvas"),
                        this._canvasBuffer.width = this._canvas.width,
                        this._canvasBuffer.height = this._canvas.height,
                        this._canvasBufferContext = this._canvasBuffer.getContext("2d"),
                        void this.imgLoad()) : void alert("你的浏览器不支持canvas画布，请升级您的浏览器^^")
            },
            seatMinMax: function() {
                for (var e = [], a = [], i = this.seatsDatas.length; i--; ) {
                    var n = this.seatsDatas[i];
                    e.push(n.x),
                        a.push(n.y)
                }
                if (this.x_min = Math.min.apply(null, e),
                        this.x_max = Math.max.apply(null, e),
                        this.y_min = Math.min.apply(null, a),
                        this.y_max = Math.max.apply(null, a),
                        this.perfScale = (s / (this.x_max - this.x_min + 1) / (this.seatSet.w + 5)).floors(2),
                        this.scale = this.perfScale,
                    !ylst.isMobile && this.x_max - this.x_min <= 30 && (this.scale = 1.5),
                        !ylst.isMobile) {
                    this.scale += t.addBigerNum;
                    var h = (this.x_max - this.x_min + 1) * (this.seatSet.w + 5) * .5
                        , c = (this.y_max - this.y_min + 1) * (this.seatSet.w + 5) * .5;
                    setMaxOr && setBigBolean && !scaleOr && (t.positionX -= h / 2,
                        t.positionY -= c / 2),
                    !setMaxOr || setBigBolean || scaleOr || (t.positionX += h / 2,
                        t.positionY += c / 2)
                }
            },
            qzPriceSeat: function() {},
            drawReact: function() {
                console.log("--画每个坐位--"),
                    this.priceMap = {},
                    this.priceSaleMap = {},
                    this.rects.length = 0;
                this.loadImgs[4];
                if (void 0 == this.priceMap.length)
                    for (var e = this.areaData.prices.length; e--; ) {
                        var i = this.areaData.prices[e];
                        this.priceMap[i.id + ""] = i
                    }
                for (var n = this.seatsSaleData.length; n--; ) {
                    var h = this.seatsSaleData[n];
                    this.priceSaleMap[h.id + ""] = h
                }
                if (void 0 !== this.areaData.qz) {
                    ylst.qzPricesAttr = [];
                    var c = this.areaData.qz.qz_prices;
                    c.indexOf(",") > -1 ? ylst.qzPricesAttr = c.split(",") : ylst.qzPricesAttr.push(c)
                }
                this._canvasBuffer.width = (this.x_max - this.x_min + 2) * (this.seatSet.w + 5),
                    this._canvasBuffer.height = (this.y_max - this.y_min + 2) * (this.seatSet.h + 5),
                this.beginStatic || (t.positionX = (s - this._canvasBuffer.width * this.scale - (this.seatSet.w + 5) * this.scale) / 2,
                    t.positionY = (a - this._canvasBuffer.height * this.scale - 130 - (this.seatSet.w + 5) * this.scale) / 2,
                this._canvasBuffer.height * this.scale > a - 130 && (t.positionY = 0),
                    this.beginStatic = !0);
                for (var o = this.seatsDatas.length; o--; ) {
                    var r = this.seatsDatas[o]
                        , l = this.loadImgs[0]
                        , v = (r.x - this.x_min + 1) * (this.seatSet.w + 5)
                        , d = (r.y - this.y_min + 1) * (this.seatSet.h + 5);
                    v = .5 + v << 0,
                        d = .5 + d << 0;
                    var u = this.priceSaleMap[r.id].on_sale;
                    (this.areaData.qz && ylst.qzPricesAttr.length > 0 && ylst.qzPricesAttr.join(",").indexOf(String(r.price_id)) == -1 || this.areaData.qz && 1 == r.tp) && (u = 0,
                        this.priceSaleMap[r.id].on_sale = 0),
                        1 == u && this.priceMap[r.price_id] ? this._canvasBufferContext.fillStyle = "#" + this.priceMap[r.price_id].color : this._canvasBufferContext.fillStyle = "#CCCCCC",
                        r.price = this.priceMap[r.price_id],
                        r.sale = this.priceSaleMap[r.id];
                    var f = v + t.positionX
                        , g = d + t.positionY;
                    f = .5 + f << 0,
                        g = .5 + g << 0;
                    var m = "{0}_{1}".format(f, g);
                    if (this.pricesSeatMap[m] = r,
                            this.rects.push([f, g, f + (this.seatSet.w + 5), g + (this.seatSet.w + 5)]),
                        1 == r.tp && 1 == u && (l = this.loadImgs[3]),
                            ylst.selectSeats)
                        for (var p = ylst.selectSeats.length; p--; )
                            ylst.selectSeats[p].id == r.id && 1 == u && (l = this.loadImgs[1],
                                this._canvasBufferContext.fillStyle = "#333",
                                this.seatImgStatic ? this._canvasBufferContext.drawImage(l, v, d, this.seatSet.w + 5, this.seatSet.w + 5) : this._canvasBufferContext.drawImage(l, v + 5, d + 5, this.seatSet.w, this.seatSet.w));
                    2 != u && (this.seatImgStatic ? (this._canvasBufferContext.fillRect(v, d, this.seatSet.w + 5, this.seatSet.w + 5),
                        this._canvasBufferContext.drawImage(l, v, d, this.seatSet.w + 5, this.seatSet.w + 5)) : this._canvasBufferContext.fillRect(v + 5, d + 5, this.seatSet.w, this.seatSet.w))
                }
                t.seatsDatas = this.seatsDatas,
                    this.render()
            },
            newReact: function() {
                this.rects.length = 0;
                for (var e = this.seatsDatas.length; e--; ) {
                    var s = this.seatsDatas[e]
                        , a = (s.x - this.x_min + 1) * (this.seatSet.w + 5) * (this.scale / this.minScale)
                        , i = (s.y - this.y_min + 1) * (this.seatSet.h + 5) * (this.scale / this.minScale);
                    a = .5 + a << 0,
                        i = .5 + i << 0;
                    var n = a + t.positionX
                        , h = i + t.positionY;
                    n = .5 + n << 0,
                        h = .5 + h << 0;
                    var c = "{0}_{1}".format(n, h);
                    this.pricesSeatMap[c] = s,
                        this.rects.push([n, h, n + (this.seatSet.w + 5) * (this.scale / this.minScale), h + (this.seatSet.w + 5) * (this.scale / this.minScale)])
                }
            },
            pointInPath: function(e) {
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
            mouseHoverInPath: function(t) {
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
                init: function() {
                    Lib.addEvent(i._canvas, "touchstart", i.addEvents.start, !1),
                        Lib.addEvent(i._canvas, "mousedown", i.addEvents.start, !1)
                },
                start: function(t) {
                    Lib.preventDefault(t),
                        i.moveBoolen = !1;
                    var e = new Date;
                    i.touchStartTime = e.getTime(),
                        mouse1 = i.windowToCanvas(i._canvas, t),
                        t.touches ? 1 == t.touches.length ? Lib.addEvent(i._canvas, "touchmove", i.addEvents.singleDrag, !1) : 2 == t.touches.length && (Lib.addEvent(i._canvas, "touchmove", i.addEvents.doubleDrag, !1),
                            i.lastDist = i.addEvents.distanceTwoFingers(t)) : Lib.addEvent(i._canvas, "mousemove", i.addEvents.singleDrag, !1),
                        Lib.addEvent(i._canvas, "touchend", i.addEvents.end, !1),
                        Lib.addEvent(i._canvas, "mouseup", i.addEvents.end, !1)
                },
                distanceTwoFingers: function(t) {
                    try {
                        var e = t.touches[0];
                        if (startX = e.pageX,
                                startY = e.pageY,
                            2 == t.touches.length) {
                            var s = t.touches[1];
                            return start1X = s.pageX,
                                start1Y = s.pageY,
                                startLen = Math.sqrt((start1X - startX) * (start1X - startX) + (start1Y - startY) * (start1Y - startY)),
                                startLen
                        }
                    } catch (a) {}
                },
                centerTwoFingers: function(t) {
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
                    } catch (a) {}
                },
                singleClick: function(t) {
                    Lib.preventDefault(t),
                        i["static"] = "ONCLICK",
                        console.log("---进入点击事件---"),
                        i.newReact(),
                        i.sacleMiddle = !1,
                        i.pointInPath(mouse1)
                },
                singleDrag: function(e) {
                    if (Lib.preventDefault(e),
                            console.log("---进入单手指拖动---"),
                        !e.touches || 1 == e.touches.length && !i.moveBoolen) {
                        i.sacleMiddle = !1,
                            mouse2 = i.windowToCanvas(i._canvas, e);
                        var n = mouse2.x - mouse1.x
                            , h = mouse2.y - mouse1.y;
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
                doubleDrag: function(e) {
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
                end: function(t) {
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
            cancelSeats: function(t) {
                var e = "";
                if (t && t.length > 0)
                    for (var s = 0; s < t.length; s++)
                        for (var a = 0; a < ylst.selectSeats.length; a++)
                            t[s] == ylst.selectSeats[a].id && ("" == e ? e = ylst.selectSeats[a].pinfo : e += "," + ylst.selectSeats[a].pinfo,
                                ylst.selectSeats.splice(a, 1));
                return this.drawReact(),
                    e
            },
            controllerLink: function(t) {
                var e = seatUrl + "pid=" + i.pid + "&sid=" + i.vid + "&area=" + i.selectArea.selectId;
                window.location.href = t || e
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
                    this._canvasContext.drawImage(this._canvasBuffer, t.positionX, t.positionY, this._canvasBuffer.width * (this.scale / this.minScale), this._canvasBuffer.height * (this.scale / this.minScale))
            },
            windowToCanvas: function(t, e) {
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
        },
        t.SeatsVenue = e
}(window);
//⑧
!function(e) {
    var win = e;
    //设置画布宽高
    function setCanvasWH() {
        var canvas_width = $(window).width(), canvas_height = $(window).height() - 94;
        $("#canvas").attr({
            width: canvas_width - 230,
            height: canvas_height
        });
    };
    function s(t, s, a) {
        var i, n, o;
        e.addBigerNum = 0, $(".seats-sel").css("width", "80px"), $("#seatLoad").show();
        var l = t, r = s, c = a;
        if (e.pids = t, e.vid = r,!Lib.isLessIe9()){
            var d = document.getElementById("canvas")
                , u = d.getContext("2d");
            u.clearRect(0, 0, d.width, d.height),
                d.style.display = "none",
                d.offsetHeight,
                d.style.display = "block"
        }
        localStorage.areaData ? (i = localStorage.areaData,
            i = Lib.toTurnObj(i),
            e.vi = i) : seatsData.vi(l, r, function(t) {
            i = Lib.toTurnObj(t),
                localStorage.areaData = i,
                e.vi = i
        }),
            seatsData.ri(r, c, function(e) {
                n = Lib.toTurnObj(e)
            }),
            seatsData.rs(r, c, function(e) {
                o = Lib.toTurnObj(e)
            });
        var g = new Date
            , v = g.getTime()
            , f = window.setInterval(function() {
                var e = new Date
                    , t = e.getTime()
                    , s = t - v;
                s > 1e4 && (window.clearInterval(f),
                    alert("数据请求时间过长，请刷新后再试!")),
                i && n && o && (console.log(n),
                    301 != i.result && 301 != n.result && 301 != o.result ? (console.log("成功进入坐位渲染页"),
                        window.clearInterval(f),
                        $("#seatLoad").hide(),
                        seatvenue = new SeatsVenue({
                            areaData: i.result,
                            seatsDatas: n.result,
                            seatsSaleData: o.result,
                            pid: l,
                            vid: r,
                            maxseatNum: ylst.configs.maxseatNum
                        }),
                        ylst.configs.pageStatic = "seat",
                    Lib.isLessIe9() || ($("#canvasDiv").mousemove(function(e) {seatvenue.mouseHoverInPath(e);}),
                        $("#canvasDiv").mouseout(function() {
                            $("#singleSeatMessage").hide()
                        })),
                        $("#selectedAreaName").parent().css("visibility", "visible")) : (window.clearInterval(f),
                        alert(i.error)))
            }, 200)
    };
    //放大座位
    function a() {
        setBigBolean = !0, setMaxOr = !0;
        win.addBigerNum <= 0 && (scaleOr = !1),
        win.addBigerNum > 3 && (win.addBigerNum = 3, scaleOr = !0), win.addBigerNum += .5;
        seatvenue.init();
    };
    //缩小座位
    function i() {
        setBigBolean = !1,
            setMaxOr = !0,
        e.addBigerNum >= 3 && (scaleOr = !1),
        e.addBigerNum < 0 && (e.addBigerNum = 0,
            scaleOr = !0),
            e.addBigerNum -= .5,
            seatvenue.init()
    };
    function n(e) {
        var t = 0
            , e = e || window.event;
        e.wheelDelta ? t = e.wheelDelta : e.detail && (t = e.detail),
        "seat" == ylst.configs.pageStatic && (t > 0 ? a() : i())
    };
    function o() {
        var t, s = e.vi.result;
        t = s.qz ? {
            data: {
                seats: {
                    result: {
                        total: ylst.configs.totalMoney,
                        webProductId: e.pids,
                        pid: e.pids,
                        vid: e.vid,
                        sc: ylst.configs.sc,
                        channel: "pc",
                        union: ylst.configs.union,
                        uid: ylst.configs.uid,
                        ukey: ylst.configs.ukey,
                        ordersid: s.qz.ordersid,
                        magic: ylst.configs.magic,
                        seats: seats
                    }
                }
            }
        } : {
            data: {
                seats: {
                    result: {
                        total: ylst.configs.totalMoney,
                        webProductId: e.pids,
                        pid: e.pids,
                        vid: e.vid,
                        sc: ylst.configs.sc,
                        channel: "pc",
                        union: ylst.configs.union,
                        uid: ylst.configs.uid,
                        ukey: ylst.configs.ukey,
                        magic: ylst.configs.magic,
                        seats: seats
                    }
                }
            }
        };
        var a = JSON.stringify(t)
            , i = Base64.encodeURI(a)
            , n = ylst.configs.toOrderUrl + "&data=" + i;
        window.top.location = n
    };
    function l() {
        for (var t = [], s = 0; s < seats.length; s++)
            t.push(seats[s].sid);
        seatsData.ck(e.pids, e.vid, t.join(","), o, function(e) {
            return e ? e.code && 1 == e.code ? (e.data && alert("手慢啦，您选定的" + seatvenue.cancelSeats(e.data) + "座位已被抢先提交，快换个座位试试吧！"),
                !0) : (e.code && 0 == e.code,
                void o()) : void alert("锁座接口异常")
        })
    };
    setCanvasWH(),
    $("#selectedAreaName").text() || $("#selectedAreaName").parent().css("visibility", "hidden"),
        win.addBigerNum = 0,
        win.setBigBolean = !1,
        win.setMaxOr = !1,
        win.scaleOr = !1,
        $("#seatBigger").click(function() {
            a()
        }),
        $("#seatSmaller").click(function() {
            i()
        }),
    document.addEventListener && document.addEventListener("DOMMouseScroll", n, !1),
        window.onmousewheel = document.onmousewheel = n,
        $("#seatsBtnBuy").click(function(t) {
            t.stopPropagation();
            var s = {
                id: "sid",
                price_id: "priceid",
                price: "price",
                tp_type_id: "tptypeid",
                tp_id: "tpid",
                pinfo: "pinfo",
                tp: "tp"
            };
            e.seats = [];
            for (var a = !1, i = ylst.selectSeats.length; i--; ) {
                var n = {};
                1 == ylst.selectSeats[i].tp && (a = !0);
                for (var r in s) {
                    var c = ylst.selectSeats[i][r];
                    "price" == r ? n[s[r]] = c.price : "tp" == r && 1 != ylst.selectSeats[i][r] && ylst.selectSeats[i].tp_id >= 1e5 ? n[s[r]] = 2 : n[s[r]] = c
                }
                seats.push(n)
            }
            if (ylst.selectSeats.length < 1)
                return alert("请先选择您的座位"),
                    !1;
            if (!a && ylst.selectSeats.length > ylst.configs.maxseatNum)
                return alert("普通座位最多能买" + ylst.configs.maxseatNum + "张"),
                    !1;
            if (ylst.configs.checkSeatsLocked)
                if (e.vi.result.qz) {
                    var d = e.vi.result.qz.qz_num
                        , u = e.vi.result.qz.isRobseat;
                    if (1 == u && seats.length < d)
                        return alert("亲，您选择的座位数量与订单不符，请重新选择"),
                            !1;
                    l()
                } else
                    l();
            else
                o()
        });
        e.seaParameter = s;
}(window);


/*
* module02
*
* 模拟数据
*  id:5735,
*  pinfo:'1楼23拍15号',
*  pos_x:0,
*  pos_y:0,
*  price:{
*   color:'95Cd59',
*   id:4,
*   idtp:false,
*   name:"C",
*   price:380,
*   ticketTypeInfo:"380"
*  },
*  price_id:4,
*  sale:{count:-1,id:5735,on_sale:0},
*  top:0,
*  tp_id:0,
*  tp_type_id:0,
*  x:63,
*  y30
*
*
*  if语句使用小技巧
*  在 if 后面跟着的圆括号中，如果使用逗号将多个变量分隔开来，
*  if语句的判断条件由最后的一个变量决定，在多个变量中可以执行赋值操作，但是不能是用var关键字
*  if(true,false,function aaa(){console.log("aaa");},function bbb(){console.log("bbb")}){console.log(1);}else{console.log(0);};
*
*
*
* */
