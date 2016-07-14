/**
 * name
 * @param {Object}
 * @return {Object} 实例
 * @author xxx@yiche.com
 * @example
 *
 */
define(function (require, exports, module) {
    //---引用定义区----------------------------------
    var $ = require("jquery");

    //----------------------------------------------

    //---构造函数----------------------------------
    function init() {
        bindDOM();
    }

    //----------------------------------------------
    //获取4个select的id
    var start_year = $("#start_year");
    var end_year = $("#end_year");
    var start_month = $("#start_month");
    var end_month = $("#end_month");

    //设定起始时间
    var year=2010;
    var month=5;

   //获取结束时间为当前时间
    var d = new Date();
    var y = d.getFullYear();
    var m = d.getMonth() + 1;

    //---变量量定义区----------------------------------
    var _this = {

        //把年月日动态添加到页面
        CreateYear: function (startY, endY, curEle) {
            curEle.children('option').remove();//移除HTML里的元素
            curEle.prepend("<option value='0'>请选择</option>");//为Select插入一个Option(第一个位置)
            for (var i = startY; i <= endY; i++) {
                var Value = i;
                var str = "";
                if (i >= 1 && i <= 12) {
                    str = "<option value=" + Value + ">" + i + "月" + "</option>";
                } else {
                    str = "<option value=" + Value + ">" + i + "年" + "</option>";
                }
                curEle.append(str);
            }
        },

        //设置起始,结束默认日期
    //    show:function (curYear, curMonth) {
    //        start_year.find("option[value=" + curYear + "]").attr("selected", "selected");
    //        start_month.find("option[value=" + curMonth + "]").attr("selected", "selected");
    //        end_year.find("option[value=" + y + "]").attr("selected", "selected");
    //        end_month.find("option[value=" + m + "]").attr("selected", "selected");
    //},

        //设置结束年的结束月之后的月不可选
        //max: function (curM,curY) {
        //    var end_option=curM.children("option");
        //    var end_year=curY.find("option:selected")[0];//获取选中的项
        //    //console.log(end_year)
        //    for(var i=1;i<end_option.length;i++){
        //        var n=end_option[i];
        //
        //        if(end_year==y){
        //            if(parseInt(n.value)>parseInt(m)){
        //                $(n).attr("disabled",true);
        //            }
        //        }
        //    }
        //},
        //设置开始年的开始月份
        //min: function (cur) {
        //    var start_option=cur.children("option");
        //    var start_selected=cur.find("option:selected")[0];//获取选中的项
        //    for(var i=1;i<start_option.length;i++){
        //        var n=start_option[i];
        //        if(parseInt(n.value)<parseInt(month)){
        //            $(n).attr("disabled",true);
        //        }
        //    }
        //},

       // 判断时间选择范围
        timeFrame: function (startEle,endEle) {
            var stat_option=startEle.children("option");
            var end_option=endEle.children("option");
            startEle.on("change", function () {
                var start_selected=startEle.find("option:selected")[0];//获取选中的项
                var end_selected=endEle.find("option:selected")[0];//获取选中的项
                for(var i=1;i<end_option.length;i++){
                    var n=end_option[i];
                    $(n).attr("disabled", false);
                    if(parseInt(start_selected.value)>parseInt(n.value) ){
                        $(n).attr("disabled",true);
                    }
                }
            });

            endEle.on("change", function () {
                var start_selected=startEle.find("option:selected")[0];//获取选中的项
                var end_selected=endEle.find("option:selected")[0];//获取选中的项
                //var stat_option=stat_option
                for(var i=1;i<stat_option.length;i++){
                    var n=stat_option[i];
                    $(n).attr("disabled",false);
                    if(parseInt(end_selected.value) <parseInt( n.value)){
                        $(n).attr("disabled",true);
                    }
                }
            });
        },


//判断开始月和结束月的范围
       monthFrame: function (startY,startM) {
           startY.on("change", function () {//当年发生变化时月的取值范围
                var start_selectedM=startM.find("option:selected")[0];//获取选中的月
                var start_selectedY=startY.find("option:selected")[0];//获取选中的年
                var stat_optionM=startM.children("option");//获取月的集合
                for(var i=1;i<stat_optionM.length;i++){
                    var n=stat_optionM[i];
                    $(n).attr("disabled",false);//在选择之前所有的月都是可选的
                    if(parseInt(start_selectedY.value)==year){//当选择的年是起始年的时候
                        if(parseInt(n.value)<month ){
                            $(n).attr("disabled",true);//所有比起始月小的月份都不可选
                        }
                    }else if(year<parseInt(start_selectedY.value)<y){//当所选年是在起始年份与结束年份之间的时候
                        $(n).attr("disabled",false);                //12个月都为可选
                    }
                    if(parseInt(start_selectedY.value)==y){//当所选年为结束年的时候
                        if(parseInt(n.value)>m){          //比结束月大的月份都为不可选
                            $(n).attr("disabled",true);

                        }
                    }
                }
            });
        }
    };


//----------------------------------------------

//---DOM事件绑定方法定义区-------------------------
    var bindDOM = function () {
        _this.CreateYear(year,y, start_year);
        _this.CreateYear(year, y, end_year);
        _this.CreateYear(1,12,start_month);
        _this.CreateYear(1,12,end_month);
        _this.timeFrame(start_year,end_year);
        _this.timeFrame(start_month,end_month);
        //_this.max(end_month,end_year);
        //_this.min(start_month);
        //_this.show(year,month);
        _this.monthFrame(start_year,start_month);
        _this.monthFrame(end_year,end_month)
    };
//-------------------------------------------

//---组件公开属性或方法的赋值区----------------------
    module.exports = init;
//-------------------------------------------
})
;