---
title: extends函数的实现
---
在阅读本章节之前请先阅读 [javascript | 原型链的继承](./extends) 和 [javascript | 继承静态属性](./extendsStatic)
它们是实现 `extends` 函数的基础

```js
const Extends = (function() {
  // 继承静态属性方法
  const extendStatic = (function() {
     // 继承静态属性的第一种方法
    const extendStaticAttrWidthForIn = function(son, parent) {
      for (let key in parent) {
        if (Object.hasOwnProperty(parent, key)) {
          son[key] = parent[key]
        }
      }
    }
    // 继承静态属性的第二种方法
    const extendStaticAttrWidthObjectKeys = function(son, parent) {
      son[key] = parent[key]
    }
    // 继承静态属性的第三种方法
    const extendStaticAttrWidthProto = function(son, parent) {
      son.__proto__ = parent
    }
    return Object.setPrototypeOf || extendStaticAttrWidthForIn || extendStaticAttrWidthObjectKeys || extendStaticAttrWidthProto
  })()
  return function(son, parent) {
    // 继承静态属性和方法
    extendStatic(son, parent)
    // 寄生组合继承
    if (parent) {
      function middle() {}
      middle.prototype = parent.prototype
      middle.prototype.constructor = son
      son.prototype = new middle()
    } else {
      son.prototype = Object.create(null);
    }
  }
})()
```

## 测试用例
```js
function P(name) {
  this.name = name
}
P.say = function() {
  console.log('say静态方法')
}
P.prototype.sayHello = function() {
  console.log('my name is ' + this.name)
}

function S() {
  P.call(this, 'son')
}

Extends(S, P) 
S.say();

const s1 = new S()
s1.sayHello();
```