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
                var t = new Date, o = t.getTime(), l = o - n;
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
        s.ids = []
    }
}(window);