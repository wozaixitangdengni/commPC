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
