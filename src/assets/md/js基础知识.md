# 1. 数据类型

js数据类型包括原始类型和引用类型

① **原始类型（值类型、基本类型）**：字符串（String）、数字(Number)、布尔(Boolean)、空（Null）、未定义（Undefined）、Symbol。

② **引用数据类型（对象类型）**：对象(Object)、数组(Array)、函数(Function)，还有两个特殊的对象：正则（RegExp）和日期（Date）。

# 2. 箭头函数

箭头函数与普通函数的区别：

> 书写方式不同：
>
> ① 只有一形参时可以省略括号
>
> ② 只有简单的返回时可以去掉花括号和return关键字
>
> this指向不同：
>
> ① **普通函数，谁调用这个函数，this就指向谁**
>
> ② **箭头函数，在哪里定义函数，this指向谁（可以说指向父级作用域）**

注：像这种匿名函数`function(){}`，它的调用者是顶部对象window（在node环境是node）

## 1.1 书写方式不同

```js
//1.
const Fn = function () {
    return 'function'
}
//等价于
const Fn = () => 'function'

//2.
const Fn = function (a) {
    return a
}
//等价于
const Fn = (a) => a

//3.
const Fn = function (a, b) {
    return { a, b }
}
//等价于
const Fn = (a, b) => { a, b }
```

## 1.2 this指向不同

~~~js
let obj = {
    name: '小明',
    sayName(){
        // 调用内部匿名函数的时顶部对象widow，它没有name
        setTimeout(function(){
            console.log(this.name);
        },500)
    }
}
obj.sayName() //undefined
~~~

~~~js
let obj = {
    name: '小明',
    sayName(){
        // this 指向父级上下文
        setTimeout(() => {
            console.log(this.name);
        },500)
    }
}
obj.sayName() //小明
~~~

# 3. 闭包

① 基本概念：函数嵌套函数，内部函数就是闭包

② 特性：正常情况下，函数执行完成之后，内部变量会被销毁（JS垃圾回收机制：释放内存空间）；**而在闭包中内部函数没有执行完成前，外部函数函数的变量不会被销毁。**

~~~js
function outerFun() {
    const a = 1
    console.log(a);
}

//执行完了，所以内部变量a销毁了
outerFun()
~~~

~~~js
function outerFun() {
    const a = 1
    function innerFun() {
        console.log(a);
    }
    return innerFun
}

//外部函数执行完了，但是内部函数没执行完，所以内部变量a还未销毁
const fun = outerFun()
~~~

③ 应用：封装功能代码，实现模块化

~~~js
//fun模块内部有2个方法
const fun = (function(){
    //私有变量
    let a = 1
    let b = 2
    function increment() {
        return a + b
    }
    function decrement() {
        return b - a
    }

    return {increment, decrement}
})()

const result1 = fun.increment()
const result2 = fun.decrement()

console.log(result1, result2)

~~~
