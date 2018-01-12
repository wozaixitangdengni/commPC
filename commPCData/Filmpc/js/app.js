layui.config({
    base: root //根目录
}).extend({
    distpicker:"/lib/distpicker/distpicker",
    testCanvas:"/js/testCanvas",
    use_info:"/js/use_info"
});

layui.use(['form',"jquery","testCanvas","laydate","distpicker","upload","use_info"],function(){
    var form = layui.form;
    var $ = layui.jquery;
    var upload = layui.upload;
    var laydate = layui.laydate;
    var use_info = layui.use_info;
    var distpicker = layui.distpicker;
    window.ChineseDistricts && use_info($,upload,laydate,form,distpicker,ChineseDistricts);


    $("#canvas").length && layui.testCanvas($);


    $(".select-pay-main").on("click",'label',function(){
        $(this).parent().addClass("selected").siblings(".selected").removeClass("selected");
    });

});
