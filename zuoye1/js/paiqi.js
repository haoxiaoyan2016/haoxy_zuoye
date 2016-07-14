$(function() {
    ;(function($) {
        //页面初始化开始请求当前时间
        newD();
        // 保存我选择的日期
        var saveData = [0];
        /*
         * 请求当前服务器时间
         */
        function newD() {
            // $.ajax({
            //     url: '/path/to/file',
            //     type: 'default GET (Other values: POST)',
            //     dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
            //     data: { param1: 'value1' },
            //     success: function(data) {
            //         var year =年
            //         var month =月
            //         var day = 日
            //         开始执行事件
            //         startClc(year, month, day)
            //     },
            //     error(function() {
            //         /* 请求错误 */
            //     });
            // })
            /*静态数据模拟*/
            var year = 2016;
            var month = 7;
            var day = 4;
            $("#vali_length_time").html(year);
            startClc(year, month, day)
        }


        /*
         * 事件区域
         */
        function startClc(year, month, day) {

            var schedule = $("#schedule");
            /*是否显示*/
            $(".switch").on("click", function() {
                if ($("#schedule").is(':visible')) {
                    schedule.hide();
                    saveData = [0]; //除第一项保留，置空其他保存值
                    $("#table tbody tr td").removeClass('flag my_disabled'); //移除所有我已经选择的排期
                } else {
                    /*初始化当前年排期渲染*/
                    render(schedule, year, month, day)
                }
            });


            /*点击右侧年份累加*/
            $(".triangle-right").on("click", function() {
                var value = $("#vali_length_time").html();
                $("#vali_length_time").html(++value);
                var newYear = $("#vali_length_time").html();
                if (value > year) {
                    $(".triangle-left").css("display", "block");
                }
                /*下一年排期渲染*/
                render(schedule,year, month, day, newYear)
            });


            /*点击左侧年份累减*/
            $(".triangle-left").on("click", function() {
                var value = $("#vali_length_time").html();
                $("#vali_length_time").html(--value);
                var newYear = $("#vali_length_time").html();
                if (value == year) {
                    $(this).css("display", "none");
                    render(schedule,year, month, day, newYear) //目前为当前年份排期只执行一次
                    return false
                }
                /*上一年排期渲染*/
                render(schedule,year, month, day, newYear)
            });


            /*提交确定选择排期*/
            $(".btn .sure").on("click", function() {
                var newYear = $("#vali_length_time").html();
                saveData[0] = newYear
                /*此处应该写ajax，，将savaData这个数组传递给后端*/
                /*数组console.log(saveData)结构是这样的
                 [
                 "2016",
                 {
                 day:4,
                 month:7
                 },
                 {
                 day:9,
                 month:8
                 },
                 ]*/
                console.log(saveData)
            })

            /*取消选择排期*/
            $(".btn .cancel").on("click", function() {
                schedule.hide(); //隐藏结构
                saveData = [0]; //除第一项保留，置空其他保存值
                $("#table tbody tr td").removeClass('flag my_disabled'); //移除所有我已经选择的排期
            })
        }
        /*
         * 渲染方法
         */
        function render(schedule, year, month, day,newY) {
            $("#table tbody").remove()
            // 创建表格一个12行，32列的tbody
            CreateTable(12, 32);
            // 显示整个结构
            schedule.show()
            // 渲染结构里面的内容
            pageDate(year, month, day,newY)
        }

        /*
         * 创建表
         */
        function CreateTable(rowCount, cellCount) {
            var obj;
            var tbody = $("<tbody></tbody>");
            var num = 0;
            for (var i = 1; i <= rowCount; i++) {
                var tr = $("<tr></tr>");
                tr.appendTo(tbody);
                for (var j = 1; j <= cellCount; j++) {
                    var td = $("<td></td>");
                    td.appendTo(tr);
                    tbody.appendTo($("table"));
                    var td_0 = $("table > tbody > tr").find("td:first");
                    td_0.addClass("first_column");
                }
            }
            $(".first_column").each(function(a, b) {
                b.innerHTML ? null : b.innerHTML = num;
                num++;
            })
        }


        /*
         * 请求当前年，排期的数据
         */
        function pageDate(year, month, day,newY) {
            // 从数据库获取当前年份的数据
            // $.ajax({
            //     url: '/path/to/file',
            //     type: 'default GET (Other values: POST)',
            //     dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
            //     data: { y: newY },
            //     success: function(req) {
            //         bind(req)
            //     },
            //     error(function() {
            //         /* 请求错误 */
            //     });
            // })
            /*模拟静态数据*/
            var req = {
                "one": {
                    "employ": [7, 10, 11],
                    "disabled": [1, 2, 4, 6, 25]
                },
                "two": {
                    "employ": [8, 11, 12],
                    "disabled": [1, 18, 14, 16, 17]
                },
                "three": {
                    "employ": [28, 21, 19],
                    "disabled": [5, 18, 14, 26, 27]
                }
            };
            bind(req)
            disabledSchedule(year, month, day,newY)
        }


        /*
         * 渲染结构里面的内容
         */
        function bind(req) {
            //获取body下面的每一行tr
            var trs = $("table tbody tr");
            // 遍历后端返回值，活的月份进行区分，month：月份，req:返回参数
            for (var month in req) {
                //每个月份进行筛选
                if (month == "one") {
                    //employ:选取已占用日期返回值，disabled：选取不可用日期返回值
                    var employ = req["one"]["employ"];
                    var dis = req["one"]["disabled"];
                    //分别遍历已占用和不可用日期，做页面处理
                    for (var day in employ) {
                        //找到第一行下面的所用td，，将遍历的日期当作索引选取到页面的td
                        trs.eq(0).find("td").eq(employ[day]).addClass("disabled cur")
                    }
                    for (var day in dis) {
                        trs.eq(0).find("td").eq(dis[day]).addClass("already cur")
                    }
                } else if (month == "two") {
                    var employ = req["two"]["employ"];
                    var dis = req["two"]["disabled"];
                    for (var day in employ) {
                        trs.eq(1).find("td").eq(employ[day]).addClass("disabled cur")
                    }
                    for (var day in dis) {
                        trs.eq(1).find("td").eq(dis[day]).addClass("already cur")
                    }
                } else if (month == "three") {
                    var employ = req["three"]["employ"];
                    var dis = req["three"]["disabled"];
                    for (var day in employ) {
                        trs.eq(2).find("td").eq(employ[day]).addClass("disabled cur")
                    }
                    for (var day in dis) {
                        trs.eq(2).find("td").eq(dis[day]).addClass("already cur")
                    }
                }
            }
            //可选排期，点击变色
            $("tbody td:not('.first_column,.disabled')").click(function() {
                if (!$(this).hasClass("cur")) {
                    // $(this).toggleClass("my_disabled")不用toggleClass
                    //获取当前选择月和当前日
                    var trIndex_month = $(this).parent().index() + 1
                    var tdIndex_day = $(this).index()
                    var obj = {
                        month: trIndex_month,
                        day: tdIndex_day
                    }
                    //开关我得排期，并将排期序列到数组里
                    if (!$(this).hasClass('flag')) {
                        $(this).addClass('flag my_disabled');
                        saveData.push(obj)
                    } else {
                        $(this).removeClass('flag my_disabled')
                        $.each(saveData, function(index, item) {
                            if (JSON.stringify(item) == JSON.stringify(obj)) {
                                saveData.splice(index, 1);
                            }
                        });
                    }
                }
            });
        }

        /*
         * 判断当前日期前排期不可用
         */
        function disabledSchedule(year, month, day,newY) {
            var selectY = $("#vali_length_time").html();
            if (selectY < year) {
                $("table tbody tr td").addClass("disabled cur")
            } else if (selectY == year) {
                $("table tbody tr:lt(" + (month - 1) + ")").find('td').addClass("disabled cur");
                $("table tbody tr:lt(" + month + ")").find("td:lt(" + day + ")").addClass("disabled cur");
                $(".first_column").removeClass("disabled already")
            }
            /*排除没有31号的排期*/
            var _month = ['2','4','6','9','11'];
            for(var index in _month){
                // console.log(_month[index])
                $("table tbody tr:eq("+(_month[index]-1)+")").find('td:gt(30)').addClass("disabled cur");
                console.log($("table tbody tr:eq("+(_month[index]-1)+")"))
                if(_month[index] == 2){
                    // 判断是闰年平年
                    if((newY%4==0&&newY%100!=0)||(newY%400==0)) {
                        // 闰年29
                        $("table tbody tr:eq(1)").find('td:gt(29)').addClass("disabled cur");
                    }else{
                        //平年28
                        $("table tbody tr:eq(1)").find('td:gt(28)').addClass("disabled cur");
                    }
                }
            }
        }
    })($)
});
