## 1. definePrototype

```javascript
Object.defineProperty(obj, props, descriptor)
```
作用： 在对象上定义一个新属性或者修改原有属性
返回值： 修改后的目标对象obj
参数定义：
obj: 在其上定义或修改属性的目标对象
props: 属性名称
descriptor: 属性描述符


## 2. defineProperties
```javascript
 Object.defineProperties(obj, props)
```
作用：在对象上定义多个新的属性或者修改多个原有属性
返回值： 修改后的目标对象obj
参数含义：
obj: 在其上定义或修改属性的目标对象
props: 属性对象，其属性值为属性描述符，包括数据属性描述符和访问器属性描述符。

:::tip 提示
关于数据属性描述符和访问器属性描述符用defineProperties定义的数据属性默认是不可枚举的，即enumerable: false
:::