---
title: 原型链的继承
---
JavaScript 常被描述为一种基于原型的语言 (prototype-based language)——每个对象拥有一个原型对象，对象以其原型为模板、从原型继承方法和属性。原型对象也可能拥有原型，并从中继承方法和属性，一层一层、以此类推。这种关系常被称为原型链 (prototype chain)，它解释了为何一个对象会拥有定义在其他对象中的属性和方法。

准确地说，这些属性和方法定义在 Object 的构造器函数 (constructor functions) 之上的prototype属性上，而非对象实例本身。

在传统的 OOP 中，首先定义“类”，此后创建对象实例时，类中定义的所有属性和方法都被复制到实例中。在 JavaScript 中并不如此复制——而是在对象实例和它的构造器之间建立一个链接（它是__proto__属性，是从构造函数的prototype属性派生的），之后通过上溯原型链，在构造器中找到这些属性和方法。

:::info 注意
理解对象的原型（可以通过Object.getPrototypeOf(obj)或者已被弃用的__proto__属性获得）与构造函数的prototype属性之间的区别是很重要的。前者是每个实例上都有的属性，后者是构造函数的属性。也就是说，Object.getPrototypeOf(new Foobar())和Foobar.prototype指向着同一个对象。
:::
## 1. 简单继承
```js
function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.say = function() {
  console.log(`my name is ${this.name}, years old is ${this.age}`)
}

function Student(school) {
  this.school = school
}
Student.prototype.getSchool = function() {
  console.log(`my school name is ${this.school}`)
}


Student.prototype = new Person()
Student.prototype.constructor = Student;

const stu1 = new Student('清华')
console.log(stu1);

// 此种继承的缺点
// 1. 子类不能获取父类的属性
// 2. 子类的原型方法被替换掉了
```
## 2. 冒充对象继承
```js
function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.say = function() {
  console.log(`my name is ${this.name}, years old is ${this.age}`)
}

function Student(name, age, school) {
  Person.call(this, name, age)
  this.school = school
}
Student.prototype.getSchool = function() {
  console.log(`my school name is ${this.school}`)
}


// Student.prototype = Person.prototype
// 当时认为这样也可以实现继承，但是有一个缺点是：
// 当去修改了子类原型身上的say方法时，其父类的say方法就会被替换，导致后面在创建person对象时say方法就被替换掉了
// 我们并不希望此类事件发生，所以我们要使用new Person()来规避这个问题
Student.prototype = new Person()
Student.prototype.constructor = Student;
// Student.prototype.say = function() {
//   console.log('我被修改了');
// }

const stu1 = new Student('小明', 18, '清华')
stu1.say()
// const person = new Person('12', 18);
// person.say()


// 优化1继承.js使用冒充对象call来构造复制父类的方法到子类
// 缺点
//  1. 父类被new了2次，浪费性能
//  2. 仍旧存在子类的原型方法被替换掉了

```

## 3. 冒充对象和借用构造函数继承
```js
function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.say = function() {
  console.log(`my name is ${this.name}, years old is ${this.age}`)
}

function Student(name, age, school) {
  Person.call(this, name, age)
  this.school = school
}
Student.prototype.getSchool = function() {
  console.log(`my school name is ${this.school}`)
}

function Extends(parent) {
  // 借用另外一个中间函数
  function middle() {}
  middle.prototype = parent.prototype;
  return new middle()
}

Student.prototype = Extends(Person);
Student.prototype.constructor = Student;

const stu1 = new Student('小明', 18, '清华')
console.log(stu1);

// 父类不在被new 多次
// 缺点：
//  仍旧存在子类的原型方法被替换掉了

```

## 4. 寄生组合式继承 方式1
#### 将子类原型的`__proto__`属性指向父类对象
```js
function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.say = function() {
  console.log(`my name is ${this.name}, years old is ${this.age}`)
}

function Student(name, age, school) {
  Person.call(this, name, age)
  this.school = school
}
Student.prototype.getSchool = function() {
  console.log(`my school name is ${this.school}`)
}


function Extends(parent) {
  // 借用另外一个中间函数
  function middle() {}
  middle.prototype = parent.prototype;
  return new middle()
}

Student.prototype.__proto__ = Extends(Person);

const stu1 = new Student('小明', 18, '清华')
console.log(stu1);
stu1.getSchool()

//  子类原型不在被替换

```

## 5. 寄生组合式继承 方式2
#### 使用`Object.setPrototypeOf`属性，实现将子类原型的`__proto__`属性指向父类对象
```js
function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.say = function() {
  console.log(`my name is ${this.name}, years old is ${this.age}`)
}

function Student(name, age, school) {
  Person.call(this, name, age)
  this.school = school
}
Student.prototype.getSchool = function() {
  console.log(`my school name is ${this.school}`)
}
function Extends(son, parent) {
  Object.setPrototypeOf(son.prototype, parent.prototype)
  // son.prototype.__proto__ = parent.prototype
}



Extends(Student, Person);

const stu1 = new Student('小明', 18, '清华')
stu1.getSchool()

// setPrototypeOf
```
## 6.原型链继承图
![原型链继承图](../../../static/img/javascript/prototype.jpeg)