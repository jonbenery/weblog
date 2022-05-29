---
title: 继承静态属性
---
## `Person`类

```js
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.common = [1, 2, 3]
  console.log('persion执行了');
}

// person的静态方法
Person.sayHello = function() {
  console.log('person say hello')
}
// person的原型方法
Person.prototype.say = function() {
  console.log(`my name is ${this.name}, years old is ${this.age}`)
}
```

## `Student`类
```js
function Student(name, age, school) {
  Person.call(this, name, age)
  this.school = school
}
```

## Student继承Person的静态方法

### 1. for in
```js
for(let key in Person) {
  // key in 可以沿着链条访问到所有的key
  if (Object.hasOwnProperty.call(Person, key)) {
    Student[key] = Person[key]
  }
}
```
### 2. Object.keys
```js
Object.keys(Person).forEach(key => {
  Student[key] = Person[key]
})
```

### 3. __proto__
```js
Student.__proto__ = Person;
```

### 4. Object.setPrototypeOf
```js
Object.setPrototypeOf(Student, Person)
```

## 调用
```js
Student.sayHello()
```