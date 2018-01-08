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
        //添加缩放值
        win.addBigerNum = 0;
        $(".seats-sel").css("width", "80px");
        $("#seatLoad").show();
        var l = t, r = s, c = a;
        win.pids = t, win.vid = r;
        if (!Lib.isLessIe9()){
            var d = document.getElementById("canvas"), u = d.getContext("2d");
            u.clearRect(0, 0, d.width, d.height),
                d.style.display = "none",
                d.offsetHeight,
                d.style.display = "block"
        }

        //跨域请求获取相对应的数据
        !function(){
            if(localStorage.areaData){
                i = localStorage.areaData,
                    i = Lib.toTurnObj(i),
                    e.vi = i
            }else{
                seatsData.vi(l, r, function(t) {
                    i = Lib.toTurnObj(t),
                        localStorage.areaData = i,
                        e.vi = i
                });
            }
            seatsData.ri(r, c, function(e) {
                n = Lib.toTurnObj(e);
            });
            seatsData.rs(r, c, function(e) {
                o = Lib.toTurnObj(e);
            });
        }();

        var g = new Date, v = g.getTime();
        var f = window.setInterval(function() {
            var e = new Date, t = e.getTime(), s = t - v;
            if(s > 1e4){
                window.clearInterval(f);
                alert("数据请求时间过长，请刷新后再试!")
            }

            if(i && n && o ){
                console.log(n);
                if(301 != i.result && 301 != n.result && 301 != o.result){
                    console.log("成功进入坐位渲染页");
                    window.clearInterval(f);
                    $("#seatLoad").hide();
                    seatvenue = new SeatsVenue({
                        areaData: i.result,
                        seatsDatas: n.result,
                        seatsSaleData: o.result,
                        pid: l,
                        vid: r,
                        maxseatNum: ylst.configs.maxseatNum
                    });
                    ylst.configs.pageStatic = "seat";
                    if(!Lib.isLessIe9()){
                        $("#canvasDiv").mousemove(function(e) {seatvenue.mouseHoverInPath(e);});
                        $("#canvasDiv").mouseout(function() {
                            $("#singleSeatMessage").hide()
                        })
                    }
                    $("#selectedAreaName").parent().css("visibility", "visible");
                }else{
                    window.clearInterval(f);
                    alert(i.error);
                }
            }

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