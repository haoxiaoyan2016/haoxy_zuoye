
var obj={
    fn:(function(i){
        console.log(this);
        //this->Window {external: Object, chrome: Object, document: document, alogObjectConfig: Object, alogObjectName: "alog"…}
        return function(){
            console.log(this);
            //this->Object {}
        }
    })(0)//-->自执行函数执行，里面的this是Windows
};
obj.fn();//-->return出来的函数执行，执行的this是obj

//1. 指向window全局变量

    alert(this);//返回 [object Window]
//全局函数

function sayHello(){
    alert(this);
}
sayHello();
//2. 指向该对象（在全局里面this指向window,在某个对象里面this指向该对象，在闭包里面this指向window）

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
//the Window （由于使用了闭包，这里的this指向window）
alert(box.getThis2().call(box));
//the box 对象冒充（这里的this指向box对象）
//3. 用apply,call改变函数的this指向

function sum(num1, num2){
    return num1+num2;
}
function box(num1, num2){
    return sum.apply(this, [num1, num2]);
    //this 表示window的作用域 box冒充sum来执行
}
console.log(box(10,10)); //20
//4. new 对象

function Person(){
    console.log(this) //将 this 指向一个新建的空对象
}
var p = new Person();

