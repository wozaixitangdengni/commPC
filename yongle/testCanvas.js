var _this = null;
var obj ={
    seatSet:{w:25,h:25},
    interval:{x:5,y:5},
    seatCount:{c:5,r:5},
    img_w_h:{w:80,h:80},//图片的宽度
    img_border:{w:5,h:5},//图片的border宽度
    img_scale:0,//图片的缩放比例
    imgSrc:['images/seat.png','images/zhanwei.png','images/suoding.png','images/yishou.png','images/xuanzhong.png'],
    imgList:[],
    canvas_wrap:null,
    canvas_wrap_height:0,
    canvas_wrap_width:0,
    canvas:null,
    canvas_context:null,
    canvas_w:0,
    canvas_h:0,
    canvasBuffer:null,
    canvasBuffer_context:null,
    posX:0,
    posY:0,
    scale:1,
    scale_min:1,
    scale_max:3,
    scale_max_el:null,
    scale_min_el:null,
    start_x:0,
    start_y:0,
    posX_cope:0,
    posY_cope:0,
    seat_posX_posY:[],
    selectedSeat:[],
    init:function(){
        _this = this;
        //画布容器
        this.canvas_wrap = $(".canvas_wrap");
        this.canvas_wrap_width = parseFloat(this.canvas_wrap.css("width")) << 0;
        this.canvas_wrap_height = parseFloat(this.canvas_wrap.css("height")) << 0;
        //展现画布
        this.canvas = document.getElementById("canvas");
        //设置画布的大小
        this.canvas.width = this.canvas_w =  this.canvas_wrap_width;
        this.canvas.height = this.canvas_h = this.canvas_wrap_height;
        //虚拟画布
        this.canvasBuffer = document.createElement("canvas");
        this.canvasBuffer_context = this.canvasBuffer.getContext("2d");
        this.canvas_context = this.canvas.getContext("2d");

        $("#max").click(function(){
            _this.posX_cope = _this.posX;
            _this.posY_cope = _this.posY;

            var old_canvasBuffer_width = _this.canvasBuffer.width * _this.scale;
            var old_canvasBuffer_height = _this.canvasBuffer.height * _this.scale;

            _this.scale += 0.5;
            _this.scale>=_this.scale_max?(_this.scale =_this.scale_max):void 0;
            _this.posX_cope -= (_this.canvasBuffer.width * _this.scale - old_canvasBuffer_width) / 2;
            _this.posY_cope -= (_this.canvasBuffer.height * _this.scale - old_canvasBuffer_height) / 2;

            _this.clearCanvas();
            _this.drawCanvas(_this.posX_cope,_this.posY_cope);
        });

        $("#min").click(function(){
            _this.posX_cope = _this.posX;
            _this.posY_cope = _this.posY;

            var old_canvasBuffer_width = _this.canvasBuffer.width * _this.scale;
            var old_canvasBuffer_height = _this.canvasBuffer.height * _this.scale;


            _this.scale -= 0.5;
            _this.scale<=_this.scale_min?(_this.scale =_this.scale_min):void 0;

            _this.posX_cope += (_this.canvasBuffer.width * _this.scale - old_canvasBuffer_width) / 2;
            _this.posY_cope += (_this.canvasBuffer.height * _this.scale - old_canvasBuffer_height) / 2;

            _this.clearCanvas();
            _this.drawCanvas(_this.posX_cope,_this.posY_cope);
        });

        //使用 mousedown 和 mouseup 事件模拟拖拽事件
        /*
         * 注意：使用 bind 方法绑定的函数，所传入的参数中，事件对象总是在arguments的最后一个
         * */
        this.moveFun = this.getSelectedSeat.bind(this,"MOVE");
        this.canvas.addEventListener("mousemove", this.moveFun, false);
        this.canvas.onmousedown = this.dragCanvasStart.bind(this);
        this.canvas.onmouseup = this.dragCanvasEnd.bind(this);
        this.canvas.addEventListener("mouseout",function(){$("#singleSeatMessage").hide();} , false);


        $.ajax({
            url:'seatData.json',
            success:function(res){
                _this.seatData = res;
                _this.seatCount.r = 0;
                _this.seatCount.c = 0;
                for(var r in res){
                    var c_data = res[r];
                    r = parseFloat(r);
                    _this.seatCount.r>r?void 0:(_this.seatCount.r = r);
                    for(var c in c_data){
                        c = parseFloat(c);
                        _this.seatCount.c>c?void 0:(_this.seatCount.c = c);
                    }
                }
                _this.setMaxMin();
                //console.log(seatData,_this.seatCount.r,_this.seatCount.c);
            }
        });
    },
    imgLoad:function(){
        var _this = this;
        var img = new Image;
        _this.img_scale = _this.seatSet.w /_this.img_w_h.w;
        if(_this.imgSrc[0]){
            img.src = _this.imgSrc[0];
            img.onload = function(){
                _this.imgList.push(this);
                _this.imgSrc.shift();//弹出已创建的图片
                _this.imgLoad();
            }
        }else{
            _this.drawCanvasBuffer("INIT");
        }
    },
    drawCanvasBuffer:function(type){
        var res = _this.seatData,img;

        for(var r = 1;r <= this.seatCount.r;r++){
            for(var c =1;c <= this.seatCount.c;c++){
                var posX = ((c-1) * (this.seatSet.w + this.interval.x)) + this.interval.x;
                var posY = ((r-1) * (this.seatSet.h + this.interval.y)) + this.interval.y;
                var seat = res[r][c];
                var status = parseFloat(seat.status);
                img = _this.imgList[status];

                //this.canvasBuffer_context.strokeStyle  = "red";
                //this.canvasBuffer_context.lineWidth   = 1;
                //this.canvasBuffer_context.strokeRect(0,0,this.canvasBuffer.width,this.canvasBuffer.height);

                if(status==0 && seat.isSelected){
                    img = _this.imgList[_this.imgList.length-1];
                    this.canvasBuffer_context.fillStyle   = "#ccc";
                }else{
                    this.canvasBuffer_context.fillStyle   = status==0 ?seat.color:"#fff";
                }
                this.canvasBuffer_context.fillRect((posX),(posY),this.seatSet.w,this.seatSet.h);
                this.canvasBuffer_context.drawImage(img,(posX),(posY),this.seatSet.w,this.seatSet.h);
                /**
                 * 注意：必须加上img边框的宽度
                 * */
                this.seat_posX_posY.push({r:r,c:c,x:posX + this.img_scale * this.img_border.w,y:posY + this.img_scale * this.img_border.h});
            }
        }

        //var posX = type == "INIT"?null:_this.posX;
        //var posY = type == "INIT"?null:_this.posY;
        this.drawCanvas(type == "INIT"?null:_this.posX,type == "INIT"?null:_this.posY);
    },
    getSelectedSeat:function(e,type){
        $("#singleSeatMessage").hide();
        var arg = arguments;
        if(typeof e == "string"){
            e = [arg[arg.length-1],arg[arg.length-1]=e][0];
        }

        var offsetX = e.offsetX;
        var offsetY = e.offsetY;
        var scaleX,scaleY;

        /*
         *  计算放大后的虚拟画布的高宽 canvas_buffer_scale_width 和 canvas_buffer_scale_height
         *  取得鼠标相对于展现画布的座位 offsetX 和 offsetY
         *     判断是否在点击范围
         *       判断 posX 和 posY 大于0还是小于0，
         *            大于0表示在canvas可显示位置绘画，
         *            小于0表示虚拟画布放大后有部分超出可显示的画布
         *       如果 posX 大于0，
         *            则使用
         *                如果 offsetX 小于 posX ，则表示没有达到虚拟画布的范围，则 return
         *                offsetX - posX = scaleX;
         *                如果 scaleX 大于 canvas_buffer_scale_width 则表示超出了虚拟画布的范围，return
         *       如果 posX 小于 0，
         *            则取 posX 的绝对值 posX_copy
         *            posX_copy + offsetX = scaleX;
         *            如果 scaleX 大于 canvas_buffer_scale_width ，则表示超出了虚拟画布的范围
         *       如果 posY 大于0，
         *            则使用
         *                如果 offsetY 小于 posY ，则表示没有达到虚拟画布的范围，则 return
         *                offsetY - posY = scaleY;
         *                如果 scaleY 大于 canvas_buffer_scale_height 则表示超出了虚拟画布的范围，return
         *       如果 posY 小于 0，
         *            则取 posY 的绝对值 posY_copy
         *            posY_copy + offsetY = scaleY;
         *            如果 scaleY 大于 canvas_buffer_scale_height ，则表示超出了虚拟画布的范围
         *
         *
         * */
        var canvas_buffer_scale_width = _this.canvasBuffer.width * _this.scale;
        var canvas_buffer_scale_height = _this.canvasBuffer.height * _this.scale;

        var posX_copy = _this.posX<0?Math.abs(_this.posX):_this.posX;
        var posY_copy = _this.posY<0?Math.abs(_this.posY):_this.posY;

        //console.log("posX: "+posX_copy,",posY: "+posY_copy);
        if(_this.posX>0){
            //没到达可点击范围
            if(offsetX < _this.posX){
                return false;
            }
            //超出可点击范围
            scaleX = offsetX - _this.posX;
            if(scaleX > canvas_buffer_scale_width){
                return false;
            }
        }else if(_this.posX < 0){
            scaleX = posX_copy + offsetX;
            //超出可点击范围
            if(scaleX > canvas_buffer_scale_width){
                return false;
            }
        }

        if(_this.posY>0){
            if(offsetY < _this.posY){
                return false;
            }
            scaleY = offsetY - _this.posY;
            if(scaleY > canvas_buffer_scale_height){
                return false;
            }
        }else if(_this.posY < 0){
            scaleY = posY_copy + offsetY;
            if(scaleY > canvas_buffer_scale_height){
                return false;
            }
        }
        //console.log(this.posX,this.posY,offsetX,offsetY,scaleX,scaleY);
        //console.log(scaleX, _this.scale * (_this.interval.x + _this.img_scale * _this.img_border.w), ((_this.seatCount.c * (_this.seatSet.w + _this.interval.x )) - (_this.img_scale * _this.img_border.w)) * _this.scale);
        //console.log(scaleY, _this.scale * (_this.interval.y + _this.img_scale * _this.img_border.h), ((_this.seatCount.r * (_this.seatSet.h + _this.interval.y )) - (_this.img_scale * _this.img_border.h)) * _this.scale);
        if(  scaleX < _this.scale * (_this.interval.x + _this.img_scale * _this.img_border.w)
            || scaleX > ((_this.seatCount.c * (_this.seatSet.w + _this.interval.x )) - (_this.img_scale * _this.img_border.w)) * _this.scale
            || scaleY < _this.scale * (_this.interval.y + _this.img_scale * _this.img_border.h)
            || scaleY > ((_this.seatCount.r * (_this.seatSet.h + _this.interval.y )) - (_this.img_scale * _this.img_border.h)) * _this.scale
        ){
            return false;
        }
        //减去上下左右图片边框的距离
        var seat_scale_width = (_this.seatSet.w - (_this.img_scale * _this.img_border.w) * 2 ) * _this.scale;
        var seat_scale_height = (_this.seatSet.h - (_this.img_scale * _this.img_border.h) *2 ) * _this.scale;
        //console.log(scaleX,scaleY);
        for(var i =0 ;i<_this.seat_posX_posY.length;i++){
            var seat = this.seat_posX_posY[i];
            var seat_scaleX = seat.x * _this.scale;
            var seat_scaleY = seat.y * _this.scale;
            //判断是否选中座位
            if((seat_scaleX+seat_scale_width) > scaleX && scaleX > seat_scaleX && (seat_scaleY+seat_scale_height) > scaleY && scaleY > seat_scaleY){
                var selected_seat = _this.seatData[seat.r][seat.c];
                if(type == "CLICK"){
                    //console.log(selected_seat);
                    if(selected_seat.status != 0){
                        return false;
                    }else{
                        selected_seat.isSelected = !selected_seat.isSelected;
                        if(selected_seat.isSelected){
                            _this.selectedSeat.push(selected_seat);
                        }else{
                            for(var s_i = 0;s_i < _this.selectedSeat.length;s_i++){
                                if(_this.selectedSeat[s_i].seat == selected_seat.seat){
                                    _this.selectedSeat.splice(s_i,1);
                                    break;
                                }
                            }
                        }
                    }
                    _this.drawCanvasBuffer("CLICK");
                    console.log(_this.selectedSeat);
                    return false;
                }

                if(type == "MOVE"){
                    if(selected_seat.status !=1){
                        _this.showSeatMsg(e,selected_seat);
                        console.log('showmsg...');
                    }
                    return false
                }
            }else{
                console.log('hidemsg...');
                $("#singleSeatMessage").hide();
            }
        }

        _this.drawCanvas(_this.posX,_this.posY);
    },
    showSeatMsg:function(e,seat){
        var posObj = this.canvas.getBoundingClientRect();

        //左边到canvas的距离
        var window_to_canvas_width = posObj.right - this.canvas.width;
        //上边到canvas的距离
        var window_to_canvas_top = posObj.bottom - this.canvas.height;

        var top = window_to_canvas_top + e.offsetY + 10;
        var left = window_to_canvas_width + e.offsetX -10;

        if(this.canvas.width - e.offsetX < 100){
            left -=100;
        }

        $("#singleSeatMessage").show().css({top:top,left:left}).text(seat.seat);

    },
    //开始移动
    dragCanvasStart:function(e){
        this.start_x = e.clientX;
        this.start_y = e.clientY;
        this.posX_cope = this.posX;
        this.posY_cope = this.posY;

        $("#singleSeatMessage").hide();

        start_time = new Date().getTime();
        //绑定鼠标移动事件
        this.canvas.addEventListener("mousemove", this.dragCanvasMove, false);
        this.canvas.addEventListener("mouseout",function(){
            _this.canvas.removeEventListener("mousemove", _this.dragCanvasMove, false);
            _this.canvas.addEventListener("mousemove", _this.moveFun, false);
        } , false);
        //开始移动时取消moveFun函数
        this.canvas.removeEventListener("mousemove", this.moveFun, false);

        _this.clearCanvas();
        _this.drawCanvas(this.posX_cope,this.posY_cope);
    },
    //移动中
    dragCanvasMove:function(e){
        console.log('moveing....');
        var y = (e.clientY - _this.start_y + _this.posY_cope);
        var x = (e.clientX - _this.start_x + _this.posX_cope);
        _this.clearCanvas();
        //判断判断最大移动距离
        if(x >= _this.canvas.width/2){
            x =  _this.canvas.width/2;
        }
        if(y >= _this.canvas.height/2){
            y =  _this.canvas.height/2;
        }
        if((x<0 || (_this.canvasBuffer.width * _this.scale) + x < _this.canvas.width/2) && _this.canvasBuffer.width * _this.scale + x < _this.canvas.width/2){
            x = -(_this.canvasBuffer.width * _this.scale - _this.canvas.width/2);
        }
        if((y<=0 || (_this.canvasBuffer.height * _this.scale) + y < _this.canvas.height/2) && _this.canvasBuffer.height * _this.scale + y < _this.canvas.height/2){
            y = -(_this.canvasBuffer.height * _this.scale - _this.canvas.height/2);
        }
        _this.drawCanvas(x,y);
    },
    //移动结束
    dragCanvasEnd:function(e){
        end_time = new Date().getTime();
        //判断时间差，如果大于100毫秒则为拖动，否则为点击事件
        if(end_time - start_time < 200 && Math.abs(Math.abs(_this.posX) - Math.abs(_this.posX_cope)) < 1 && Math.abs(Math.abs(_this.posY) - Math.abs(_this.posY_cope)) < 1 ){
            this.getSelectedSeat(e,"CLICK");
        }
        this.canvas.addEventListener("mousemove", this.moveFun, false);
        this.canvas.removeEventListener("mousemove", this.dragCanvasMove, false);
        _this.clearCanvas();
        _this.drawCanvas(_this.posX,_this.posY);
    },
    drawCanvas:function(x,y){
        //绘画到展示板上
        //绘画位置
        this.posX = (x==0?'0':x) || (this.canvas.width - this.canvasBuffer.width * this.scale) / 2;
        this.posY = (y==0?'0':y) || (this.canvas.height - this.canvasBuffer.height * this.scale) / 2 ;
        this.canvasBuffer.height>this.canvas.height?(this.posY = 0):void 0;
        this.canvas_context.drawImage(this.canvasBuffer,this.posX,this.posY,(this.canvasBuffer.width * this.scale),(this.canvasBuffer.height * this.scale));
    },
    clearCanvas:function(){
        this.canvas_context.clearRect(0,0,this.canvas.width,this.canvas.height);
    },
    //设置虚拟画布大小
    setMaxMin:function(){
        var width = ((this.seatSet.w + this.interval.x) * this.seatCount.c) + this.interval.x;
        var height = ((this.seatSet.h  + this.interval.y) * this.seatCount.r) + this.interval.y;

        var w_scale = 1;
        var h_scale = 1;

        if(width < this.canvas_w && height < this.canvas_h){
            this.scale = 1;
        }else{
            if(width > this.canvas_w){
                w_scale = this.canvas_w / width;
            }
            if(height > this.canvas_h){
                h_scale = this.canvas_h / height;
            }
            w_scale<h_scale?(this.scale = w_scale):(this.scale = h_scale);
        }

        this.canvasBuffer.width = width;
        this.canvasBuffer.height = height;
        this.imgLoad();
        //console.log(this.canvas_w,width, this.interval.x,this.canvas_w / this.seatCount.c / (this.seatSet.w + this.interval.x));
        //console.log(this.canvas_h,height, this.interval.y,this.canvas_h / this.seatCount.r / (this.seatSet.h + this.interval.y));
    },
    getPosXPosY:function(){
        /*
        * 获取坐标值：
        *   offsetX  -->当前
        * */

    }
};
obj.init();