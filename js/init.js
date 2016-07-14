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
    require('jqueryui');
    var autoHeight = require("../../../module/ui/widget.autoHeight.js");
    var metisMenu = require("../../../module/ui/widget.metisMenu.js");
    var autoTab = require("../../../module/ui/widget.autoTab.js");
    var jqueryForm = require("../../../module/ui/jquery.form.js");
    var $bootstrap = require("bootstrap");
    var validate = require("../../../module/ui/jquery.validate.js");
    var moment = require("moment");
    var datetimepicker = require("datetimepicker");
    var timeRange = require("../../../module/ui/widget.timeRange.js");
    timeRange($);
    require("datatable")($);
    require("fileupload");
    require("iframe_transport");

    //var timeRange = require("timeRange");
    //timeRange($);

    //---常量定义区----------------------------------
    var TEMP = {};
    //----------------------------------------------

    //---构造函数----------------------------------
    function init() {
        // argsCheck();
        initPlugins();
        bindDOM();
        bindCustEvt();
        bindListener();
    }
    //----------------------------------------------

    //---变量量定义区----------------------------------
    var cloneHtml = $('#operating_department').html();
    var $form = $("#hdNeeds");
    //存放图片地址数组
    var ary=[];
    var _this;
    _this = {
        DOM: {}, //节点容器
        objs: {}, //组件容器
        ary: [],//存放图片地址数组
        DOM_eventFun: { //DOM事件行为容器
            fileSelected: function (that, flag) {
                var fileWrap = that.parents('.col-sm-8 ');
                function bytesToSize(bytes) {
                    var sizes = ['Bytes', 'KB', 'MB'];
                    if (bytes == 0) return 'n/a';
                    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
                    return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
                }

                var iMaxFilesize = 1048576;
                var oFile = that[0].files[0];
                var rFilter = /^(image\/bmp|image\/gif|image\/jpeg|image\/png|image\/tiff)$/i;
                if (!rFilter.test(oFile.type)) {
                    fileWrap.find('[node-type="error"]').show();
                    return;
                }
                if (oFile.size > iMaxFilesize) {
                    fileWrap.find('[node-type="warnsize"]').show();
                    return;
                }

                var oImage = fileWrap.find('[node-type="preview"]')[0];

                var oReader = new FileReader();
                oReader.onload = function (e) {
                    oImage.src = e.target.result;
                    oImage.onload = function () {//图片载入完成后进行操作
                        _this.DOM_eventFun.onreadyImgChange();
                        that.parents(".img-wrap").find(".change-img").css("display", "block");
                        if (flag == 1) {
                            ary[0] = oImage.src;
                        } else if (flag == 2) {
                            ary[1] = oImage.src;
                        }
                    };
                };
                oReader.readAsDataURL(oFile);

            },
            picShow: function (num, src) {
                $('#fileImg_' + num).attr("src", src);
            },
            //表单验证
            verifyForm: function () {
                // var $form = $('#hdNeeds');
                /**
                 *Fixme:需要跟页面上的 name值对应上
                 * */
                $form.validate({
                    debug: true,
                    rules: {
                        //项目ID  非必填，填写的话会有 数据回填“项目名称”“业务部门”“时间”
                        vali_lengthProjectId: {
                            maxlength: 12,
                            digits: true
                        },
                        //项目名称
                        vali_length_must_projectName: {
                            maxlength: 38,
                            required: true
                        },

                        //立项金额 必填项，只能填数字，最多12个英文字符，超过12个字符后或输入非数字，标题和输入框标红，不能提交。例如1300000输入后格式样式为1,300,000在新建采购单页面所有有字符数限制的输入框，其输入超限后，标题和输入框标红提示，不能提交成功。一个汉字算是两个英文字符，一个标点符号算是一个英文字符。
                        vali_length_money: {
                            required: true,
                            maxlength: 12,
                            // digits:true
                        },

                        //申请充值时间  日期选择，精确到天 必填项，点击展示日历选项，充值时间>=当前日期

                        vali_length_time: {
                            required: true
                        },
                        //ERP项目编号  ERP项目编号输入框 必填项，只能填数字，最多24个英文字符，超过24个字符后或输入非数字，标题和输入框标红，不能提交。
                        vali_length_budget: {
                            required: true,
                            maxlength: 24,
                            digits: true
                        },
                        //ERP立项名称 必填项，最多48个英文字符，可输入汉字、字母、数字、符号。
                        vali_length_testCost: {
                            required: true,
                            maxlength: 48
                        },
                        //媒体简称 必填项，媒体简称列表和其相对应的供应商名称列表将另列表展示
                        sel_pl: {
                            required: true
                        },
                        //付款类型 下拉菜单+输入框 必填项，下拉菜单有两个选项“预充值”和“账期”，选择账期时，在下拉框后面展示输入框，此时为必填项。
                        pay_type: {
                            required: true
                        },
                        //供应商名称 默认不显示根据媒体简称选择自动显示对应的供应商名称
                        // vali_length_projectId:{
                        // },
                        //媒体账号 必填项，最多24个英文字符，字母、数字、汉字、标点符号均可
                        vali_length_must_mediaName: {
                            required: true,
                            maxlength: 24
                        },

                        //签订金额 必填项，只能输数字，最多12个英文字符，显示格式为1,300,000，超过12个字符后或输入非数字，标题和输入框标红，不能提交。
                        vali_length_money: {
                            required: true,
                            maxlength: 15,
                            number: true
                            // digits:true
                        },
                        vali_length_money2: {
                            required: true,
                            maxlength: 15,
                            number: true
                            // digits:true
                        },

                        //项目说明  输入框  非必填项，最多240个英文字符，可输入汉字、字母、数字、符号。
                        vali_length_explain: {
                            maxlength: 240
                        },
                        //费用确认凭证 必填项，上传本地图片，默认显示缩略图，右下角显示“重新上传”，字样，点击缩略图，显示原图，点击“重新上传”字样，可重新上传本地图片

                        feiyong: {
                            required: true
                        },

                        //立项截图 必填项，上传本地图片，默认显示缩略图，右下角显示“重新上传”，字样，点击缩略图，显示原图，点击“重新上传”字样，可重新上传本地图片
                        lixiang: {
                            required: true
                        },
                        crm: {
                            required: true
                        },
                        pay_type_2: {
                            required: true
                        },
                        //驳回理由
                        refuse_reason: {
                            required: true
                        }
                    },

                    showErrors: function (errorMap, errorList) {
                        // console.log(errorList,errorMap);
                        $('.error_required').removeClass('has-error')
                            .find('.help-block').text('');
                        for (var i = 0, len = errorList.length; i < len; i++) {
                            var $errorEl = $(errorList[i].element),
                                mess = errorList[i].message;
                            $errorEl.closest('.error_required').addClass('has-error')
                                .find('.help-block').text(mess)
                        }
                    }
                });
            },
            //输入金额加千分符
            fmoney: function (s, n) {
                s = s.replace(/,/g, '');
                var reg = /^(-?\d+)(\.\d+)?$/;
                if (!reg.test(s)) return; //如果输入的内容并不是浮点数字，return空
                n = n > 0 && n <= 20 ? n : 2;
                s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
                var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];
                t = "";
                for (i = 0; i < l.length; i++) {
                    t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
                }
                return t.split("").reverse().join("") + "." + r;
            },
            //以下是项目ID绑定接口
            formField: function (proId) {
                $.ajax({
                    url: '/tool/media/ajax/get_xq?project_id=' + proId,
                    //url:'text.json',
                    type: 'GET',
                    dataType: 'json',
                    success: function (res) {
                        //console.log(res);
                        // res=JSON.parse(res)
                        if (res.code == true) {
                            //这里开始绑定数据
                            _this.DOM_eventFun.bindData(res);
                        } else {
                            $('#myModal').modal('show');
                            $('.modal-body').html(res.msg);
                            $("#vali_lengthProjectId").val('');
                            $("#vali_length_must_projectName").val('').attr("disabled", false);
                            $('#operating_department').html(cloneHtml).attr("disabled", false);
                            $('#operating_department option').eq(0).prop("selected", "true");
                            $("#start_time").val('').attr("disabled", false);
                            $("#end_time").val('').attr("disabled", false);
                        }
                    }

                });
            },

            //把从后台取到的值都放进去
            bindData: function (res) {
                $("#vali_length_must_projectName").val(res.data.project_name).attr({
                    disabled: true
                });
                // value:res.data.sort_name,
                $("#operating_department").attr({
                    disabled: true
                }).html('<option value="' + res.data.sort_id + '">' + res.data.sort_name + '</option>');
                $("#start_time").val(res.data.start_time).attr("disabled", true);
                $("#end_time").val(res.data.end_time).attr("disabled", true);
            },
            formField_1: function (proId) {
                $("#vali_lengthProjectId").val('');
                $("#vali_length_must_projectName").val('').attr("disabled", false);
                $("#start_time").val('').attr("disabled", false);
                $("#end_time").val('').attr("disabled", false);
                $('#operating_department').html(cloneHtml).attr("disabled", false);
                $('#operating_department option').eq(0).prop("selected", "true")
            },

            //提交表单
            formToJson: function (data) {
                data = data.replace(/&/g, "\",\"");
                data = data.replace(/=/g, "\":\"");
                data = "{\"" + data + "\"}";
                return data;
            },

            formSubmit: function () {
                setTimeout(function () {
                    if ($('.has-error').length >= 1) {
                        // console.log('有错误');
                        return false;
                    } else {
                        //  console.log('已经提交');
                        $("#vali_length_must_projectName").attr({disabled:false});
                        $("#operating_department").attr({disabled:false});
                        $("#start_time").attr("disabled",false);
                        $("#end_time").attr("disabled",false);
                        $form[0].submit();
                    }
                }, 100)


            },
            //媒体简介的关联供应商名称
            meadi: function (select_id) {
                $(".gys-box").css("display", "block");
                $(".gys-box .gys-val").html("");
                $.ajax({
                    url: '/tool/media/ajax/purchase_message?id=' + select_id,
                    type: 'GET',
                    dataType: 'json',
                    success: function (res) {
                        if (res.code == true) {
                            //  console.log(res.data.supplier_name)//获取到供应商名称
                            $(".gys-box").css("display", "block");
                            $(".gys-box .gys-val").html(res.data.supplier_name)
                        } else {
                            $(".gys-box").css("display", "none");
                        }
                    }
                })
            }
        }
    };
//----------------------------------------------
//---自定义事件绑定的回调函数定义区--------------------
    var bindCustEvtFuns = {};
//----------------------------------------------

//---广播事件绑定的回调函数定义区---------------------
    var bindListenerFuns = {};
//-------------------------------------------

//---参数的验证方法定义区---------------------------
    var argsCheck = function (node) {
        if (node == null) {
            throw "[]:argsCheck()-The param node is not a DOM node.";
        } else {
            _this.DOM = node;
        }
    };
//-------------------------------------------

//---模块的初始化方法定义区-------------------------
    var initPlugins = function () {

        //高度自适应
        autoHeight({
            'leftDom': '[node-type="autoHeightLeft"]',
            'rightDom': '[node-type="autoHeightRight"]',
            'pageHeadHeight': 160
        });
        var minDate = moment().format('YYYY-MM-DD');
        $('#datetimepicker5').datetimepicker({
            format: 'YYYY-MM-DD',
            useCurrent: false,
            minDate:minDate
        });
        $('#datetimepicker3').datetimepicker({
            format:"YYYY-MM-DD HH:mm:ss",
            useCurrent: false

        });
        $('#datetimepicker4').datetimepicker({
             format:"YYYY-MM-DD HH:mm:ss",
             useCurrent: false
        });
        $("#datetimepicker3").on("dp.change", function (e) {
            $('#datetimepicker4').data("DateTimePicker").minDate(e.date);
        });
        $("#datetimepicker4").on("dp.change", function (e) {
            $('#datetimepicker3').data("DateTimePicker").maxDate(e.date);
        });


        //$('#timeRange1').timeChoose();
        _this.DOM_eventFun.verifyForm();

    };
//-------------------------------------------

//---DOM事件绑定方法定义区-------------------------
    var bindDOM = function () {
        $(".img-wrap").on("mouseover",function(){
            var picName = "transparent.gif",picL = picName.length,picUrl = $(this).find(".default-img").attr("src");
            if(picUrl.slice(-(picL)) == picName){
                $(this).find('.fi').attr("title","未选择");
            }else{
                $(this).find('.fi').attr("title","已选择");
            }
        });
        $('#fileImg').fileupload({
            url: '/tool/media/ajax/save_file',
            sequentialUploads: true //上传顺序
        }).on("fileuploaddone",function(e,data){
            var _src = JSON.parse(data.result).data.img_url;
            var _src0 = _src;
            var start = _src.lastIndexOf("/mediaima");
            _src = _src.slice(start);
            $('#img_1').attr('value',_src);
            $('#fileImg_1').attr('src',_src0);
            $('.view_picture1').css("display","block").attr("href",_src0);
            _this.DOM_eventFun.picShow(1,_src0);

        });

        $('#fileImg_screenshot').fileupload({
            url: '/tool/media/ajax/save_file',
            sequentialUploads: true //上传顺序
        }).on("fileuploaddone",function(e,data){
            var _src_1= JSON.parse(data.result).data.img_url;
            var _src_0 = _src_1;
            var start = _src_1.lastIndexOf("/mediaima");
            _src_1= _src_1.slice(start);
            $('#img_2').attr('value',_src_1);
            $('#fileImg_2').attr('src',_src_0);
            $('.view_picture2').css("display","block").attr("href",_src_0);
            _this.DOM_eventFun.picShow(2,_src_0);
            //$('[node-type="fileImg_screenshot"]').attr("title","已选择");
        });

        $('#fileImg_crm').fileupload({
            url: '/tool/media/ajax/save_file',
            sequentialUploads: true //上传顺序
        }).on("fileuploaddone",function(e,data){
            var _src_3= JSON.parse(data.result).data.img_url;
            var _src_0_ = _src_3;
            var start = _src_3.lastIndexOf("/mediaima");
            _src_3= _src_3.slice(start);
            $('#img_3').attr('value',_src_3);
            $('#fileImg_3').attr('src',_src_0_);
            $('.view_picture3').css("display","block").attr("href",_src_0_);
            _this.DOM_eventFun.picShow(3,_src_0_);
            //$('[node-type="fileImg_screenshot"]').attr("title","已选择");
        });

//优化前
        //立项金额绑定失去焦点加千分符
        $('[node-type="vali_length_money"]').on('blur',function(){
            var text = $('[node-type="vali_length_money"]').val();//1、获取表单内容
            var txt = _this.DOM_eventFun.fmoney(text,2);//调用方法处理，并接收返回值
            $(this).val(txt);//将返回值放回input
        });
        //绑定签订金额失去焦点加千分符
        $('[node-type="vali_length_money2"]').on('blur',function(){
            var text = $('[node-type="vali_length_money2"]').val();//1、获取表单内容
            var txt = _this.DOM_eventFun.fmoney(text,2);//调用方法处理，并接收返回值
            $(this).val(txt);//将返回值放回input
        });
        //绑定项目ID失去焦点，项目名称、业务部门、项目时间自动填入表单且置灰，不可修改
//优化后
        $('[node-type="vali_length_money"]','[node-type="vali_length_money2"]').on('blur',function(){
            var text1 = $('[node-type="vali_length_money"]').val();//1、获取表单内容
            var text2 = $('[node-type="vali_length_money2"]').val();//1、获取表单内容
            var txt1 = _this.DOM_eventFun.fmoney(text1,2);//调用方法处理，并接收返回值
            var txt2 = _this.DOM_eventFun.fmoney(text2,2);//调用方法处理，并接收返回值
            $(this).val(txt1);//将返回值放回input
            $(this).val(txt2);//将返回值放回input
        });

        $('#vali_lengthProjectId').on('blur',function(e){
            var _that = this;
            $('body').on('mouseup',function(){
                var proId = $(_that).val();
                if(proId){
                    _this.DOM_eventFun.formField(proId);
                }else if((proId=="") && ($("#vali_length_must_projectName").attr("disabled") == "disabled") ){
                   _this.DOM_eventFun.formField_1(proId);
                }
                $('body').off('mouseup');
            })

        });

        $("#sel_pl").on("change",function () {
            var select_id = $(this).find("option:selected").attr("data-id");
            _this.DOM_eventFun.meadi(select_id)
        });

//        //绑定提交按钮
        $('[node-type="form_submit"]').on('click',_this.DOM_eventFun.formSubmit);

        //绑定当付款类型状态
        $("#pay_type").on("change",function () {
            var select_id = $(this).find("option:selected");
            if(this.value==2){
                $("#pay_type_2").css("display","block")
            }else {
                $("#pay_type_2").css("display","none")
            }
        });

        //采购审批页面弹窗
       $('#reject').on("click",function () {
           $('#myModal').modal('show')
       });
        $('#cancel').on("click", function () {
            $('[name="refuse_reason"]').val("");
            $('#myModal').modal('hide');
        });
        $('#sure').on("click", function () {
                if($('#reason').val()==""){
                    $('.error_required').addClass('has-error');
                    return false;
                }else{
                    //  console.log('已经提交');
                    $('#reason_1')[0].submit();
                }
        })

    };
//-------------------------------------------


//---自定义事件绑定方法定义区------------------------
    var bindCustEvt = function () {

    };
//-------------------------------------------

//---广播事件绑定方法定义区------------------------
    var bindListener = function () {

    };
//-------------------------------------------

//---组件公开方法的定义区---------------------------
    init.prototype.destroy = function () {
        if (_this) {
            $.foreach(_this.objs, function (o) {
                if (o && o.destroy) {
                    o.destroy();
                }
            });
            _this = null;
        }
    };
//-------------------------------------------
//---组件的初始化方法定义区-------------------------
// var init = function() {
// };
//-------------------------------------------

//---组件公开属性或方法的赋值区----------------------
    module.exports = init;
//-------------------------------------------
})
;