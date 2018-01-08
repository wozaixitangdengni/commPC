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
