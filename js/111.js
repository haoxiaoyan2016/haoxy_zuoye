define(function (require,exports,module){
    return function(jQuery){
        (function($){
            $.fn.task1 = function(time){
                var _that = this;
                var today = new Date().getTime();
                var _selectYear = $('#selectYear');
                var curYear = _selectYear.find('option:selected').val();
                function init(){
                    //���ɱ��
                    calender(curYear);

                    //����ѡ����
                    disabledDate(curYear);

                    //�Կ�ѡ���ڽ��в���
                    operate();

                }
                function calender(curYear){
                    var th = '',td = '';
                    var _th = '';
                    for(var i = 0;i <= 12;i++){//��
                        var _td = '';
                        for(j = 0;j <= 31;j++){//��
                            if(i == 0){//��һ��
                                if(j == 0){//��һ�е�һ��
                                    _th = '<th>��/��</th>';
                                }else{
                                    j = j < 10 ? '0' + j : j;
                                    _th += '<th>'+ j +'</th>'
                                }
                            }else{
                                if(j == 0){//��һ��
                                    _td = '<td action-type="">'+ i +'��</td>'
                                }else{
                                    _td += '<td data-node="date" action-type="'+ curYear + '-' + i + '-' + j +'"></td>';
                                }
                            }
                        }
                        if(i != 0){
                            td += '<tr  data-node="month" action-type="'+ i +'">' + _td + '</tr>';
                        }
                        th = '<tr>' + _th + '</tr>';
                    }
                    _table = '<table border=1 cellspacing=0>'+ th + td + '</table>'
                    _that.empty().append(_table);
                }
                function disabledDate(curYear){
                    //�ж��Ƿ���31��
                    var _month = ['2','4','6','9','11'];
                    var _date = $('[data-node="month"]');
                    for(var i = 0;i < _date.length; i++){
                        var _idx = _month.indexOf(_date.eq(i).attr('action-type'));
                        console.log(_idx)
                        if(_idx > -1){
                            if(_idx == 0){//2��
                                //�ж������껹��ƽ��
                                if(curYear % 100 == 0){//������
                                    if(curYear % 400 == 0){//����29
                                        _date.eq(i).find('td:eq(-1),td:eq(-2)').addClass('disabled');
                                    }else{//ƽ��28
                                        _date.eq(i).find('td:eq(-1),td:eq(-2),td:eq(-3)').addClass('disabled');
                                    }
                                }else{
                                    if(curYear % 4 == 0){//����29
                                        _date.eq(i).find('td:eq(-1),td:eq(-2)').addClass('disabled');
                                    }else{//ƽ��28
                                        _date.eq(i).find('td:eq(-1),td:eq(-2),td:eq(-3)').addClass('disabled');
                                    }
                                }
                            }else{
                                _date.eq(i).find('td:last').addClass('disabled');
                            }
                        }
                    }

                    //����֮ǰ�Ĳ���ѡ
                    beforeDisabled();

                    //����ռ�ú���ռ�õ�����
                    occupied();

                    //�ı���ݵ�ʱ������ˢ���������
                    changeYear();
                }
                function beforeDisabled(){
                    var _tdDate = $('[data-node="date"]');
                    for(var i = 0;i < _tdDate.length;i++){
                        var _date = _tdDate[i];
                        _time = new Date($(_date).attr('action-type')).getTime();
                        if(_time < today){
                            $(_date).addClass('disabled');
                        }
                    }
                }
                function occupied(){
                    console.log(time)
                    var _tr = $('[data-node="month"]');
                    var _myTime = time.myTime;
                    var _othersTime = time.othersTime;
                    //��ռ�õ�����
                    for(var i = 0;i < _myTime.length;i++){
                        _tr.find('[action-type="'+ _myTime[i] +'"]').addClass('myTime');
                    }
                    //����ռ�õ�����
                    for(var i = 0;i < _othersTime.length;i++){
                        _tr.find('[action-type="'+ _othersTime[i] +'"]').addClass('othersTime');
                    }
                }
                function changeYear(){
                    _selectYear.change(function(){
                        var curYear = _selectYear.find('option:selected').val();
                        calender(curYear);
                        disabledDate(curYear);
                    })
                }
                function operate(){
                    _that.on('click','[data-node="date"]',function(){
                        if(!$(this).hasClass('disabled') && !$(this).hasClass('othersTime')){
                            if($(this).hasClass('myTime')){
                                $(this).removeClass('myTime')
                            }else{
                                $(this).addClass('myTime')
                            }
                        }
                    })

                }
                init();
            }
        })(jQuery)
    }
})