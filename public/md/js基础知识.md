
# 箭头函数

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

## 书写方式不同

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

## this指向不同

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
