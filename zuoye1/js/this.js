
var obj={
    fn:(function(i){
        console.log(this);
        //this->Window {external: Object, chrome: Object, document: document, alogObjectConfig: Object, alogObjectName: "alog"��}
        return function(){
            console.log(this);
            //this->Object {}
        }
    })(0)//-->��ִ�к���ִ�У������this��Windows
};
obj.fn();//-->return�����ĺ���ִ�У�ִ�е�this��obj

//1. ָ��windowȫ�ֱ���

    alert(this);//���� [object Window]
//ȫ�ֺ���

function sayHello(){
    alert(this);
}
sayHello();
//2. ָ��ö�����ȫ������thisָ��window,��ĳ����������thisָ��ö����ڱհ�����thisָ��window��

var user="the Window";
var box={
    user:'the box',
    getThis:function(){
        return this.user;
    },
    getThis2:function(){
        return function (){
            return this.user;
        }
    }
};
alert(this.user);//the Window
alert(box.getThis());//the box
alert(box.getThis2()());
//the Window ������ʹ���˱հ��������thisָ��window��
alert(box.getThis2().call(box));
//the box ����ð�䣨�����thisָ��box����
//3. ��apply,call�ı亯����thisָ��

function sum(num1, num2){
    return num1+num2;
}
function box(num1, num2){
    return sum.apply(this, [num1, num2]);
    //this ��ʾwindow�������� boxð��sum��ִ��
}
console.log(box(10,10)); //20
//4. new ����

function Person(){
    console.log(this) //�� this ָ��һ���½��Ŀն���
}
var p = new Person();

