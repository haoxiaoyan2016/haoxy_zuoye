
//媒体采购项目关于图片上传部分优化

//优化前
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
};

//优化后
var bindDOM = function () {
    $(".img-wrap").on("mouseover",function(){
        var picName = "transparent.gif",picL = picName.length,picUrl = $(this).find(".default-img").attr("src");
        if(picUrl.slice(-(picL)) == picName){
            $(this).find('.fi').attr("title","未选择");
        }else{
            $(this).find('.fi').attr("title","已选择");
        }
    });

    $('.img-wrap .fi').fileupload({
        url: '/tool/media/ajax/save_file',
        sequentialUploads: true //上传顺序
    }).on("fileuploaddone",function(e,data){
        var _src = JSON.parse(data.result).data.img_url;
        var _src0 = _src;
        var start = _src.lastIndexOf("/mediaima");
        _src = _src.slice(start);
        $('.img-wrap~input').attr('value',_src);
        $('.img-wrap img').attr('src',_src0);
        $('.img-wrap a').css("display","block").attr("href",_src0);
        _this.DOM_eventFun.picShow(1,_src0);

    });
};
