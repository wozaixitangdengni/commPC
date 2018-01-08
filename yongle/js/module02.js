//②
!function (a) {
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
        pi: function (a, n) {
            var c = ylst.configs.basePath + "?type=pi&id=" + a + "&nc=30";
            s && (c += s);
            //console.log(c);
            $.ajax({
                url: c,
                dataType: "jsonp",
                jsonp: "callback",
                async: !1,
                cache: !0,
                jsonpCallback: "windowPI",
                success: function (a) {
                    n(a.data.seats)
                }
            })
        },
        vi: function (a, n, c) {
            var t = ylst.configs.basePath + "?type=vi&id=" + n + "&pid=" + a + "&nc=30";
            s && (t += s),
                $.ajax({
                    async: !1,
                    url: t,
                    dataType: "jsonp",
                    jsonp: "callback",
                    cache: !0,
                    jsonpCallback: "windowVI",
                    success: function (a) {
                        c(a.data.seats)
                    },
                    error: function () {
                        location.reload()
                    }
                })
        },
        vs: function (a, n) {
            var c = ylst.configs.basePath + "?type=vs&id=" + a + "&nc=30";
            s && (c += s),
                $.ajax({
                    url: c,
                    dataType: "jsonp",
                    jsonp: "callback",
                    async: !1,
                    cache: !0,
                    jsonpCallback: "windowVS",
                    success: function (a) {
                        n(a.data.seats)
                    }
                })
        },
        ri: function (a, n, c) {
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
                    success: function (a) {
                        c(a.data.seats)
                    }
                })
        },
        rs: function (a, n, c) {
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
                    success: function (a) {
                        c(a.data.seats)
                    }
                })
        },
        ck: function (a, n, c, t, i) {
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
                    success: function (a) {
                        i(a.data.seats.result)
                    },
                    error: function () {
                        t()
                    }
                })
        }
    };
    a.seatsData = d;
}(window);
