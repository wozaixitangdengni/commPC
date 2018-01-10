layui.config({
    base: "./" //根目录
}).extend({
    distpicker:"lib/distpicker/distpicker",
    testCanvas:"js/testCanvas",
});

layui.use(['form',"jquery","testCanvas","laydate","distpicker","upload"],function(){
    var form = layui.form;
    var $ = layui.jquery;
    var upload = layui.upload;
    var laydate = layui.laydate;

    var distpicker = layui.distpicker;

    if($('#distpicker').length){
        distpicker($,ChineseDistricts);

        $('#distpicker').distpicker({
            province: '请选择省',
            city: '请选择市',
            district: '请选择区'
        });
        form.render('select',"distpicker");

        form.on('select(province)', function(data){
            $(data.elem).change();
            form.render('select',"distpicker");
        });
        form.on('select(city)', function(data){
            $(data.elem).change();
            form.render('select',"distpicker");
        });
    }


    $("#canvas").length && layui.testCanvas($);

    laydate.render({
        elem: '#laydateTest', //指定元素
        trigger: 'click',
        format: 'yyyy年MM月dd日',
        showBottom: false
    });

    //查看详情
    $(".use-info .use-info-left .use-info-left-box .use-info-select-price .price-box .price-dis a").on("click",function(){
        var title = $(this).prev().text();
        var title_tpl = "<div style='padding:0 0 10px 0;color:#717171;font-size: 16px'>"+ title+"</div>";
        var tpl = $(this).data('tpl');

        layer.open({
            title: '在线调试',
            content: title_tpl+tpl,
            shade: false,
            title: false, //不显示标题
            maxWidth:600
        });
    });

    //选择数量
    $(".use-info .use-info-left .use-info-left-box .ticket-count-box .ticket-count-btn").on("click","span",function(){
        var that = $(this);
        var count_el = $(".use-info .use-info-left .use-info-left-box .ticket-count-box .ticket-count-btn div");
        var count = parseFloat(count_el.text());
        if(that.hasClass("jia")){
            count++;
        }else{
            if(count>1){
                count--;
            }else{
                count = 1;
            }
        }
        count_el.text(count);
    });

    //验证表单内容
    var dom = {
        $date:$('[name="date"]'),
        $times:$('[name="times"]'),
        $ticket_type:$('[name="ticket_type"]'),
        $distpicker:$("#distpicker"),
        $address:$('[name="address"]'),
        $name:$('[name="name"]'),
        $phone:$('[name="phone"]'),
        $phone_code:$('[name="phone_code"]'),
        $age:$('[name="age"]'),
        $yan_zheng_ma:$('[name="yan_zheng_ma"]'),
        $sehn_fen_zheng_hao:$('[name="sehn_fen_zheng_hao"]'),
        $xueli:$('[name="xueli"]'),
        $gongsi:$('[name="gongsi"]'),
        $bu_men:$('[name="bu_men"]'),
        $zhi_wei:$('[name="zhi_wei"]'),
        $tiao_kuan:$('[name="tiao_kuan"]'),
        $shen_fen_zheng_img:$('[name="shen-fen-zheng-img"]'),
        $ben_ren_img:$('[name="ben-ren-img"]')
    };

    form.on('radio(price)', function(data){
        console.log(data.elem); //得到radio原始DOM对象
        console.log(data.value); //被点击的radio的value值
    });

    //提交订单
    $(".use-info-submit .use-info-submit-main .use-info-submit-submit").on("click",function(){
        if(($('[name="price"]'))){
            console.log();
            if(!$('[name="price"]:checked').val()){
                layer.msg('请选择商品', {icon: 6});
                //return false;
            }
        }

        if(dom.$date.length){
            if(!dom.$date.val()){
                showWarn(dom.$date,false);
                //return false;
            }else{
                showWarn(dom.$date,true);
            }
        }
        if(dom.$times.length){
            if(dom.$times.val() == 0){
                showWarn(dom.$times,false);
                //return false;
            }else{
                showWarn(dom.$times,true);
            }
        }
        if(dom.$ticket_type.length){
            if(dom.$ticket_type.val() == 0){
                showWarn(dom.$ticket_type,false);
                //return false;
            }else{
                showWarn(dom.$ticket_type,true);
            }
        }
        //城市联动
        if(dom.$distpicker.length){
            var sels = dom.$distpicker.find("select");
            $.each(sels,function(i,sel){
                console.log($(sel).val());
            });
        }
        if(dom.$address.length){
            if(!dom.$address.val()){
                showWarn(dom.$address,false);
                //return false;
            }else{
                showWarn(dom.$address,true);
            }
        }
        if(dom.$name.length){
            if(!dom.$name.val()){
                showWarn(dom.$name,false);
                //return false;
            }else{
                showWarn(dom.$name,true);
            }
        }
        if(dom.$phone.length){
            if(dom.$phone.val()){
                if(tool.checkMobilePhone(dom.$phone.val())){
                    showWarn(dom.$phone,true);
                }else{
                    showWarn(dom.$phone,false);
                }
                //return false;
            }else{
                showWarn(dom.$phone,false);
            }
        }
        if(dom.$phone_code.length){
            if(!dom.$phone_code.val()){
                showWarn(dom.$phone_code,false);
            }else{
                showWarn(dom.$phone_code,true);
            }
        }
        if(dom.$age.length){
            if(!dom.$phone.val()){
                showWarn(dom.$age,false);
                //return false;
            }else{
                showWarn(dom.$age,true);
            }
        }
        //图像验证码
        if(dom.$yan_zheng_ma.length){
            if(!dom.$phone.val()){
                showWarn(dom.$yan_zheng_ma,false);
                //return false;
            }else{
                showWarn(dom.$yan_zheng_ma,true);
            }
        }
        if(dom.$sehn_fen_zheng_hao.length){
            if(!dom.$sehn_fen_zheng_hao.val()){
                showWarn(dom.$sehn_fen_zheng_hao,false);
                //return false;
            }else{
                if(tool.validateIdcard(dom.$sehn_fen_zheng_hao.val())){
                    showWarn(dom.$sehn_fen_zheng_hao,true);
                }else{
                    showWarn(dom.$sehn_fen_zheng_hao,false);
                }
            }
        }

        if(dom.$xueli.length){
            if(dom.$xueli.val() == 0){
                showWarn(dom.$xueli,false);
                //return false;
            }else{
                showWarn(dom.$xueli,true);
            }
        }

        if(dom.$gongsi.length){
            if(!dom.$gongsi.val()){
                showWarn(dom.$gongsi,false);
                //return false;
            }else{
                showWarn(dom.$gongsi,true);
            }
        }
        if(dom.$bu_men.length){
            if(!dom.$bu_men.val()){
                showWarn(dom.$bu_men,false);
                //return false;
            }else{
                showWarn(dom.$bu_men,true);
            }
        }
        if(dom.$zhi_wei.length){
            if(!dom.$zhi_wei.val()){
                showWarn(dom.$zhi_wei,false);
                //return false;
            }else{
                showWarn(dom.$zhi_wei,true);
            }
        }

        if(dom.$shen_fen_zheng_img.length){
            if(!dom.$shen_fen_zheng_img){
                $("[data-shen-fen-span]").show();
            }else{
                $("[data-shen-fen-span]").hide();
            }
        }

        if(dom.$ben_ren_img.length){
            console.log(dom.$ben_ren_img.val());
            if(dom.$ben_ren_img.val()){
                $("[data-ben-ren-span]").hide();
            }else{
                $("[data-ben-ren-span]").show();
            }

        }

        //条宽框
        if(!$('[name="tiao_kuan"]:checked').length){
            layer.msg('请勾选条款同意框！', {icon: 6});
        }

    });

    function showWarn (el,type){
        var next_el = el.parent().next();
        if(type){
            next_el.hide();
        }else{
            next_el.show();
        }
    }


    $(".select-pay-main").on("click",'label',function(){
        $(this).parent().addClass("selected").siblings(".selected").removeClass("selected");
    });

    var img_tpl = `<div class="use-info-update-img-item">
                               <img src="images/selected_img.png" alt=""/>
                               <input type="hidden" value="" name=""/>
                               <p class="use-info-update-img-item-del"><i class="layui-icon">&#xe640;</i></p>
                           </div>`;

    upload.render({
        elem:"#shen-fen-zheng-upload",
        done:function(){},
        error:function(){},
        before:function(obj){},
        choose:function(obj){
            obj.preview(function(index, file, result){
                //var $img_tpl = $(img_tpl);
                //$img_tpl.find("img").attr("src",result);
                //$img_tpl.find("input").attr("name",'shen_fen_zheng');
                //$("#shen-fen-zheng-upload").parent().prepend($img_tpl);
                $("#shen-fen-zheng-upload").find("img").attr("src",result);
                $("#shen-fen-zheng-upload").find("input").val(result);
                //$.ajax({
                //type:"post",
                //url:"/generalf/index.php?g=Asset&m=Asset&a=up_base64",
                //data:{img:result},
                //success:function(data){
                //if(data.status){
                //$('#backimg').val(data.url);
                //}
                //},
                //error:function(){}
                //});
            });
        },
        auto:false
    });

    upload.render({
        elem:"#ben-ren-upload",
        done:function(){},
        error:function(){},
        before:function(obj){},
        choose:function(obj){
            obj.preview(function(index, file, result){
                $("#ben-ren-upload").find("img").attr("src",result);
                $("#ben-ren-upload").find("input").val(result);
                //var $img_tpl = $(img_tpl);
                //$img_tpl.find("img").attr("src",result);
                //$img_tpl.find("input").attr("name",'ben_ren');
                //$("#ben-ren-upload").parent().prepend($img_tpl);
                //$.ajax({
                //type:"post",
                //url:"/generalf/index.php?g=Asset&m=Asset&a=up_base64",
                //data:{img:result},
                //success:function(data){
                //if(data.status){
                //$('#backimg').val(data.url);
                //}
                //},
                //error:function(){}
                //});
            });
        },
        auto:false
    });

});
