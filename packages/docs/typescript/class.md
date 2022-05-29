---
title: class 类
---
### 1. 什么是类

类就是拥有相同属性和方法的一系列对象的集合，类是一个模版，是从这该类包含的所有具体对象中抽象出来的一个概念，类定义了它所包含的全体对象的静态特征和动态特征

### 2. 类定义属性的方式

* 先在类中定义属性然后在构造函数中通过`this`赋值
```js
class Person {
  name: string
  constructor(name: string) {
    this.name = name
  }
  say() {}
}
```
* 构造函数直接为参数增加`public`，这个参数就变成了一个属性
```js
class Person {
  constructor(public name: string) {
    this.name = name
  }
  say() {}
}
```
### 3. 类编译后的源码

```js
var Person = /** @class */ (function () {
    function Person(name_) {
        this.name = name_
    }
    Person.prototype.say = function () {
    };
    return Person;
  }());
```

### 4. 类的继承

ts类的继承其实就是`原型链`之间继承的实现，所以如果想彻底了解`ts类的继承`就需要先了解`原型链的继承`

现在有两个类`Person`和`Student`, `Student`继承了`Person`

```js
class Person {
  name: string
  constructor(name: string) {
    this.name = name
  }
  say() {}
}

class Student extends Person {
  school: string
  constructor(name: string, school: string) {
    super(name)
    this.school = school
  }
}

```

编译后的源码为：

```js
var Person = /** @class */ (function () {
    function Person(name) {
      this.name = name;
    }
    Person.prototype.say = function () { };
    return Person;
}());
var Student = /** @class */ (function (_super) {
    // 使用__extend函数实现静态方法和属性完成原型链之间的继承
    __extends(Student, _super);
    function Student(name, school) {
        var _this = _super.call(this, name) || this;
        _this.school = school;
        return _this;
    }
    return Student;
}(Person));

```
其中`__extend`函数的实现即为`原型链`继承的实现，可移步至[`javascript | extends函数的实现`](../javascript/extends)
