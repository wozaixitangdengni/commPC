/*
* 动态生成的元素，所有样式基本上引用weui库
* */
(function(doc,win){
    var Tool = function(){

    };
    //验证身份证
    Tool.prototype.validateIdcard = function(idCard){
        /**
         * 注意:idCard由于是数字，而数字太长会导致计算机运行的省却值而导致得到的数值不正确，所以需要接收字符串去避免这个问题
         * */
        //15位和18位身份证号码的正则表达式
        var regIdCard=/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;

        //如果通过该验证，说明身份证格式正确，但准确性还需计算
        if(regIdCard.test(idCard)){
            if(idCard.length==18){
                var idCardWi=new Array( 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ); //将前17位加权因子保存在数组里
                var idCardY=new Array( 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ); //这是除以11后，可能产生的11位余数、验证码，也保存成数组
                var idCardWiSum=0; //用来保存前17位各自乖以加权因子后的总和
                for(var i=0;i<17;i++){
                    idCardWiSum+=idCard.substring(i,i+1)*idCardWi[i];
                }

                var idCardMod=idCardWiSum%11;//计算出校验码所在数组的位置
                var idCardLast=idCard.substring(17);//得到最后一位身份证号码

                //如果等于2，则说明校验码是10，身份证号码最后一位应该是X
                if(idCardMod==2){
                    if(idCardLast=="X"||idCardLast=="x"){
                        return true;
                        //alert("恭喜通过验证啦！");
                    }else{
                        return false;
                        //alert("身份证号码错误！");
                    }
                }else{
                    //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
                    if(idCardLast==idCardY[idCardMod]){
                        return true;
                        //alert("恭喜通过验证啦！");
                    }else{
                        return false;
                        //alert("身份证号码错误！");
                    }
                }
            }
        }else{
            return false;
            //alert("身份证格式不正确!");
        }
        return "没有执行判断";
    };
    //验证手机号码
    Tool.prototype.checkMobilePhone = function(str){
        if (str.match(/(^13\d{9}$)|(^14)[5,7]\d{8}$|(^15[0,1,2,3,5,6,7,8,9]\d{8}$)|(^17)[6,7,8]\d{8}$|(^18\d{9}$)/g) == null) {
            return false;
        }
        else {
            return true;
        }
    };
    //去除前后空格
    Tool.prototype.trim = function(str){
        return str.replace(/^\s+|\s+$/g, "");
    };
    //判断是否为空
    Tool.prototype.checkNull = function(str){
        if(this.trim(str).length != 0){
            return false;
        }else{
            return true;
        }
    }


    win.tool = new Tool();
})(document,window);


