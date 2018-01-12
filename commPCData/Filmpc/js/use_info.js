layui.define(function (exports) {
    exports("use_info", function ($, upload, laydate, form, distpicker, ChineseDistricts) {
        var _price = define_price,
            _price_title = define_price_title,
            _price_id = define_price_id,
            _date, _time,
            _max_buy = max_buy,
            _shengyu, _count = 1;
        //初始化城市联动
        if ($('#distpicker').length) {
            distpicker($, ChineseDistricts);
            $('#distpicker').distpicker({
                province: '请选择省',
                city: '请选择市',
                district: '请选择区'
            });
            form.render('select', "distpicker");

            form.on('select(province)', function (data) {
                $(data.elem).change();
                form.render('select', "distpicker");
            });
            form.on('select(city)', function (data) {
                $(data.elem).change();
                form.render('select', "distpicker");
            });
        };

        //查看详情
        $(".use-info .use-info-left .use-info-left-box .use-info-select-price .price-box .price-dis a").on("click", function () {
            var title = $(this).prev().text();
            var title_tpl = "<div style='padding:0 0 10px 0;color:#717171;font-size: 16px'>" + title + "</div>";
            var tpl = $(this).data('tpl');

            layer.open({
                content: title_tpl + tpl,
                shade: false,
                title: false, //不显示标题
                maxWidth: 600
            });
        });


        //验证表单内容
        var dom = {
            $date: $('[name="date1"]'),//选择日期
            $times: $('[name="times"]'),//选择时间段
            $ticket_type: $('[name="ticket_type"]'),//取票方式
            $distpicker: $("#distpicker"),
            $address: $('[name="address"]'),//详细地址
            $name: $('[name="name"]'), //姓名
            $phone: $('[name="phone"]'), //手机号
            $phone_code: $('[name="phone_code"]'), //短信验证码

            $age: $('[name="age"]'), //年龄
            $yan_zheng_ma: $('[name="img_code"]'), //图形验证码
            $sehn_fen_zheng_hao: $('[name="id_card"]'),//身份证号
            $xueli: $('[name="xueli"]'), //学历
            $gongsi: $('[name="company"]'), //公司
            $bu_men: $('[name="bu_men"]'), //部门
            $zhi_wei: $('[name="zhi_wei"]'), //职位
            $tiao_kuan: $('[name="tiao_kuan"]'),
            $shen_fen_zheng_img: $('#shen-fen-zheng-upload'),
            $ben_ren_img: $('[name="self_img"]'),

            $selected_price: $('[data-selected-price]'),
            $order_money: $('[order-money]'),
            $yun_fei: $('[data-order-yun-fei]'),
            $confirm_money: $('.use-info .use-info-right > .use-info-right-buy-msg .span .buy-money'),
            $data_order_money: $('[data-order-money]'),
            $ticket_count_div: $(".use-info .use-info-left .use-info-left-box .ticket-count-box .ticket-count-btn div"),
            $ticket_count_input: $(".use-info .use-info-left .use-info-left-box .ticket-count-box .ticket-count-btn input"),
            $selected_price_title: $("[data-selected-price-title]"),
            $selected_data_time: $("[data-selected-data-time]"),
            $selected_time: $("[data-selected-time]"),
            $shi_fu: $("[data-shi-fu]")


        };


        //选择数量
        $(".use-info .use-info-left .use-info-left-box .ticket-count-box .ticket-count-btn").on("click", "span", function () {

            if (($('[name="price_id"]'))) {
                if (!$('[name="price_id"]:checked').val()) {
                    layer.msg('请选择商品', {icon: 6});
                    return false;
                }
            }
            if (!dom.$date.val()) {
                showWarn(dom.$date, false);
                return false;
            } else {
                showWarn(dom.$date, true);
            }


            if (dom.$times.length) {
                if (dom.$times.val() == 0) {
                    showWarn(dom.$times, false);
                    return false;
                } else {
                    showWarn(dom.$times, true);
                }
            }

            var that = $(this);
            var count_el = $(".use-info .use-info-left .use-info-left-box .ticket-count-box .ticket-count-btn div");

            if (that.hasClass("jia")) {
                if (_count >= _max_buy) {
                    _count = _max_buy;
                } else if (_count >= _shengyu) {
                    _count = _shengyu;
                } else {
                    _count++;
                }
            } else {
                if (_count > 1) {
                    _count--;
                } else {
                    _count = 1;
                }
            }
            console.log($('[name="ticket_type"]').val());

            if($('[name="ticket_type"]').val() == 2){
                count_el.text(_count).siblings("input").val(_count);
                dom.$selected_price_title.find("span").text(_price + " " + "x " + _count);
                dom.$data_order_money.find("span").text(_price * _count + mail_fee);
                dom.$shi_fu.text(_price * _count + mail_fee);
            }else{
                count_el.text(_count).siblings("input").val(_count);
                dom.$selected_price_title.find("span").text(_price + " " + "x " + _count);
                dom.$data_order_money.find("span").text(_price * _count);
                dom.$shi_fu.text(_price * _count);
            }

        });


        /*
        * 选中价格改变后：重置选中日期，选中时间，剩余数量
        * */
        form.on('radio(price)', function (data) {
            var $input = $(data.elem);
            _price = parseFloat($input.data("price-money"));
            _price_title = $input.data("price-title");
            _price_id = data.value;

            _count = 1;
            $(".use-info .use-info-left .use-info-left-box .ticket-count-box .ticket-count-btn div").text(_count).siblings("input").val(_count);
            dom.$data_order_money.find("span").text(_price * _count);
            dom.$shi_fu.text(_price * _count);
            getShengYuCount(false);
            _date = _time = _shengyu = void 2333;
            dom.$date.val("请选择日期");


            dom.$selected_price.text(_price_title);


            dom.$selected_price_title.show();
            dom.$selected_price_title.find("em").text(_price_title);
            dom.$selected_price_title.find("span").text(_price + " x 1");


        });

        laydate.render({
            elem: '#laydateTest', //指定元素
            trigger: 'click',
            format: 'yyyy年MM月dd日',
            showBottom: false,
            done: function (value, date, endDate) {
                dom.$selected_data_time.show().find("span").text(value).next().hide();
                _date = date.year + "-" + (date.month < 10 ? '0' + date.month : date.month) + "-" + date.date;
                _time = void 2333;

                _count = 1;
                $(".use-info .use-info-left .use-info-left-box .ticket-count-box .ticket-count-btn div").text(_count).siblings("input").val(_count);
                dom.$data_order_money.find("span").text(_price * _count);
                dom.$shi_fu.text(_price * _count);
                dom.$selected_price_title.find("span").text(_price + " x 1");
                getShengYuCount(false);

                $.ajax({
                    type: "post",
                    url: ajax_time_url,
                    data: {film_id: film_id, date: _date},
                    success: function (res) {
                        console.log(res);
                        if (res.status == 1) {
                            var el = $('[name="times"]');
                            el.html("").append(`<option value="0">请选择时间段</option>`);
                            $.each(res.list, function (i, item) {
                                el.append(`<option value="${(item.b_time) + '-' + (item.e_time)}">${(item.b_time) + '-' + (item.e_time)}</option>`);
                            });
                            form.render('select', "distpicker");
                            dom.$selected_time.show();
                        }
                    }
                });
            }
        });

        //选择时间段
        form.on('select(select_time)', function (data) {
            _time = data.value;
            _count = 1;
            $(".use-info .use-info-left .use-info-left-box .ticket-count-box .ticket-count-btn div").text(_count).siblings("input").val(_count);
            dom.$data_order_money.find("span").text(_price * _count);
            dom.$shi_fu.text(_price * _count);
            dom.$selected_data_time.find("em").text(_time).show();
            dom.$selected_price_title.find("span").text(_price + " x 1");
            getShengYuCount(true);
        });

        //选择取票方式
        form.on('select(ticket_type)', function (data) {
            console.log(order_price);
            if(order_price){
                if(data.value == 2){
                    dom.$yun_fei.find("sapn").text("+￥ "+mail_fee);
                    dom.$shi_fu.text(order_price + mail_fee);
                }else{
                    dom.$shi_fu.text(order_price);
                    dom.$yun_fei.find("sapn").text("+￥ "+0);
                }
            }else{
                if(data.value == 2){
                    dom.$yun_fei.find("sapn").text("+￥ "+mail_fee);
                    dom.$shi_fu.text(_price * _count + mail_fee);
                }else{
                    dom.$yun_fei.find("sapn").text("+￥ "+0);
                    dom.$shi_fu.text(_price * _count);
                }
            }
        });

        function getShengYuCount(flag) {
            console.log(film_id, _date, _time, _price_id);
            if(flag){
                $.ajax({
                    type: "post",
                    url: ajax_rest_url,
                    data: {film_id: film_id, date: _date, times: _time, price_id: _price_id},
                    success: function (res) {
                        console.log(res);
                        if (res.status == 1) {
                            _shengyu = res.num;
                            $(".use-info .use-info-left .use-info-left-box .ticket-count-box .ticket-info").find('[buy-max]').text(_max_buy).siblings('[ticket-max]').text(res.num).parent().show();
                        }

                    }
                });
            }else{
                $(".use-info .use-info-left .use-info-left-box .ticket-count-box .ticket-info").hide();
            }

        }

        //提交订单
        $(".use-info-submit .use-info-submit-main .use-info-submit-submit").on("click", function () {
            var confirm_status = true;

            if ($('[name="price_id"]').length) {
                console.log($('[name="price_id"]:checked').val());
                if (!$('[name="price_id"]:checked').val()) {
                    layer.msg('请选择商品', {icon: 6});
                    confirm_status = false;
                }
            }

            if (dom.$date.length) {
                if (!dom.$date.val()) {
                    showWarn(dom.$date, false);
                    confirm_status = false;
                } else {
                    showWarn(dom.$date, true);
                }
            }
            if (dom.$times.length) {
                if (dom.$times.val() == 0) {
                    showWarn(dom.$times, false);
                    confirm_status = false;
                } else {
                    showWarn(dom.$times, true);
                }
            }
            if (dom.$ticket_type.length) {
                if (dom.$ticket_type.val() == 0) {
                    showWarn(dom.$ticket_type, false);
                    confirm_status = false;
                } else {
                    showWarn(dom.$ticket_type, true);
                }
            }
            //城市联动
            //if(dom.$distpicker.length){
            //    console.log(dom.$distpicker.val());
            //    if(dom.$distpicker.val() == 0){
            //        showWarn(dom.$distpicker,false);
            //        //return false;
            //    }else{
            //        showWarn(dom.$distpicker,true);
            //    }
            //}
            if (dom.$address.length) {
                if (!dom.$address.val()) {
                    showWarn(dom.$address, false);
                    confirm_status = false;
                } else {
                    showWarn(dom.$address, true);
                }
            }
            if (dom.$name.length) {
                if (!dom.$name.val()) {
                    showWarn(dom.$name, false);
                    confirm_status = false;
                } else {
                    showWarn(dom.$name, true);
                }
            }
            if (dom.$phone.length) {
                if (dom.$phone.val()) {
                    if (tool.checkMobilePhone(dom.$phone.val())) {
                        showWarn(dom.$phone, true);
                    } else {
                        showWarn(dom.$phone, false);
                        confirm_status = false;
                    }
                } else {
                    showWarn(dom.$phone, false);
                    confirm_status = false;
                }
            }
            if (dom.$phone_code.length) {
                if (!dom.$phone_code.val()) {
                    showWarn(dom.$phone_code, false);
                    confirm_status = false;
                } else {
                    showWarn(dom.$phone_code, true);
                }
            }
            if (dom.$age.length) {
                if (!dom.$phone.val()) {
                    showWarn(dom.$age, false);
                    confirm_status = false;
                } else {
                    showWarn(dom.$age, true);
                }
            }
            //图像验证码
            if (dom.$yan_zheng_ma.length) {
                if (!dom.$phone.val()) {
                    showWarn(dom.$yan_zheng_ma, false);
                    confirm_status = false;
                } else {
                    showWarn(dom.$yan_zheng_ma, true);
                }
            }
            if (dom.$sehn_fen_zheng_hao.length) {
                if (!dom.$sehn_fen_zheng_hao.val()) {
                    showWarn(dom.$sehn_fen_zheng_hao, false);
                    confirm_status = false;
                } else {
                    if (tool.validateIdcard(dom.$sehn_fen_zheng_hao.val())) {
                        showWarn(dom.$sehn_fen_zheng_hao, true);
                    } else {
                        showWarn(dom.$sehn_fen_zheng_hao, false);
                        confirm_status = false;
                    }
                }
            }

            if (dom.$xueli.length) {
                if (dom.$xueli.val() == 0) {
                    showWarn(dom.$xueli, false);
                    confirm_status = false;
                } else {
                    showWarn(dom.$xueli, true);
                }
            }

            if (dom.$gongsi.length) {
                if (!dom.$gongsi.val()) {
                    showWarn(dom.$gongsi, false);
                    confirm_status = false;
                } else {
                    showWarn(dom.$gongsi, true);
                }
            }
            if (dom.$bu_men.length) {
                if (!dom.$bu_men.val()) {
                    showWarn(dom.$bu_men, false);
                    confirm_status = false;
                } else {
                    showWarn(dom.$bu_men, true);
                }
            }
            if (dom.$zhi_wei.length) {
                if (!dom.$zhi_wei.val()) {
                    showWarn(dom.$zhi_wei, false);
                    confirm_status = false;
                } else {
                    showWarn(dom.$zhi_wei, true);
                }
            }

            if (dom.$shen_fen_zheng_img.length) {
                var inputs = dom.$shen_fen_zheng_img.find("input");
                var shen_fen_status = true;
                $.each(inputs,function(i,item){
                    if(!$(item).val()){
                        $("[data-shen-fen-span]").show();
                        shen_fen_status = false;
                        return false;
                    }
                });
                if(shen_fen_status){
                    $("[data-shen-fen-span]").hide();
                }
                if(confirm_status){
                    confirm_status = shen_fen_status;
                }
                //if (dom.$shen_fen_zheng_img.val()) {
                //    $("[data-shen-fen-span]").hide();
                //} else {
                //    $("[data-shen-fen-span]").show();
                //    confirm_status = false;
                //}
            }

            if (dom.$ben_ren_img.length) {
                if (dom.$ben_ren_img.val()) {
                    $("[data-ben-ren-span]").hide();
                } else {
                    $("[data-ben-ren-span]").show();
                    confirm_status = false;
                }

            }

            //条宽框
            if (!$('[name="tiao_kuan"]:checked').length) {
                layer.msg('请勾选条款同意框！', {icon: 6});
                confirm_status = false;
            }

            //提交订单
            if(confirm_status){

                var form=$('[lay-filter="distpicker"]');
                var obj = {};
                var string = '';
                console.log(form.serialize());
                $.each(form.serialize().split("&"),function(i,item){
                    obj[item.split("=")[0]] = item.split("=")[1];
                });
                obj.date1 = _date;
                obj.place = obj.province + obj.city + obj.district;

                if(is_seat == 1){
                    delete obj.date1;
                    delete obj.times;
                }
                console.log(obj);

                $.each(obj,function(i,item){
                    string += i+'='+item+'&'
                });
                string+='film_id='+film_id;
                $(".top-msg").show();
                //选座提交信息
                if(is_seat == 1){
                    console.log(string);
                    $.post(tmp_url,string,function(data){
                        console.log(data);
                        if(data.status==1){
                            setTimeout(function(){
                                $.post(do_order_url,function(res){
                                    if(res.status ==1){
                                        location.href=res.url;
                                    }else{
                                        layer.msg(res.info, {icon: 2});
                                        $(".top-msg").hide();
                                    }
                                });
                            },1000);
                        }else{
                            layer.msg(data.info, {icon: 2});
                            $(".top-msg").hide();
                        }
                    },'json');
                }else if(is_seat == 0){
                    //无座提交信息
                    $.post(do_order_url,string,function(data){
                        if(data.status==1){
                            setTimeout(function(){
                                location.href=data.url;
                            },1000);
                        }else{
                            layer.msg(data.info, {icon: 2});
                            $(".top-msg").hide();
                        }
                    },'json');
                }

            }

        });

        //获取手机验证码
        $('[data-get-phone-code]').on("click",function(){
            var $that = $(this);
            var time =60;
            if($that.hasClass("on")){
                return false;
            }

            if (dom.$phone.length) {
                if (dom.$phone.val()) {
                    if (tool.checkMobilePhone(dom.$phone.val())) {
                        showWarn(dom.$phone, true);
                    } else {
                        showWarn(dom.$phone, false);
                        return false;
                    }
                } else {
                    showWarn(dom.$phone, false);
                    return false;
                }
            }

            $.post(send_msg,{mobile:dom.$phone.val()},function(res){
                console.log(res);
                if(res.status == 1){
                    $that.addClass("on").text(time+"s");
                    time--;
                    var intervalId = setInterval(function(){
                        $that.text(time+"s");
                        time--;
                        if(time<0){
                            clearInterval(intervalId);
                            $that.removeClass("on").text("获取验证码");
                        }
                    },1000);
                }
                layer.msg(res.info, {icon: 6});
            },'json');


        });

        function showWarn(el, type) {
            var next_el = el.parent().next();
            if (type) {
                next_el.hide();
            } else {
                next_el.show();
            }
        }

        var img_tpl = `<div class="use-info-update-img-item">
                               <img src="${root}images/selected_img.png" alt=""/>
                               <span class="upload-cancel upload" data-url></span>
                           </div>`;

        var upload_shen_fen_zheng_el = $("#shen-fen-zheng-upload");

        upload.render({
            elem: "#shen-fen-zheng-upload",
            choose: function (obj) {
                obj.preview(function (index, file, result) {
                    var $img_tpl = $(img_tpl);
                    $img_tpl.find("img").attr("src",result);

                    //$("#shen-fen-zheng-upload").find("img").attr("src", result);

                    $.ajax({
                        type: "post",
                        url: upload_url,
                        data: {img: result},
                        success: function (data) {
                            if (data.status) {
                                //$("#shen-fen-zheng-upload").find("input").val(data.url);
                                $.each(upload_shen_fen_zheng_el.find("input"),function(i,item){
                                    if(!$(item).val()){
                                        $img_tpl.find("span").attr('data-url',data.url);
                                        $(item).val(data.url);
                                        return false;
                                    }
                                });
                                upload_shen_fen_zheng_el.parent().prepend($img_tpl);

                                if($("[data-shen-fen]").children().length >= 4 ){
                                    upload_shen_fen_zheng_el.hide();
                                }
                            }
                        },
                        error: function () {
                        }
                    });
                });
            },
            auto: false
        });

        //删除选中的身份证图片
        $(".use-info .use-info-left .use-info-left-box .use-info-update [data-shen-fen]").on("click",".upload-cancel",function(){
            var $this = $(this);
            $('[value="'+$this.attr('data-url')+'"]').val("");
            $this.parent().remove();
            upload_shen_fen_zheng_el.show();
        });

        var ben_rem_upload = $("#ben-ren-upload");

        upload.render({
            elem: "#ben-ren-upload",
            choose: function (obj) {
                obj.preview(function (index, file, result) {
                    //$("#ben-ren-upload").find("img").attr("src", result);
                    var $img_tpl = $(img_tpl);
                    $img_tpl.find("img").attr("src",result);

                    $.ajax({
                        type: "post",
                        url: upload_url,
                        data: {img: result},
                        success: function (data) {
                            console.log(data);
                            if (data.status) {
                                ben_rem_upload.find("input").val(data.url);
                                $img_tpl.find("span").attr('data-url',data.url);

                                ben_rem_upload.parent().prepend($img_tpl);
                                if($('[data-fen-ren]').children().length >= 3){
                                    ben_rem_upload.hide();
                                }
                                //$("#ben-ren-upload").find("input").val(data.url);

                            }
                        },
                        error: function () {
                        }
                    });
                });
            },
            auto: false
        });

        //删除选中的本人照片
        $(".use-info .use-info-left .use-info-left-box .use-info-update [data-fen-ren]").on("click",".upload-cancel",function(){
            var $this = $(this);
            $('[value="'+$this.attr('data-url')+'"]').val("");
            $this.parent().remove();
            ben_rem_upload.show();
        });


    });
});


