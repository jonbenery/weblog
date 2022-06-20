---
title: 抽象类
---
定义： 一个在任何位置都不能被实例化的类叫做抽象类

```ts
abstract class People {
  abstract eat(): void;
}
class ChinesePoples extends People {
  eat() {
    console.log('用筷子吃饭');
  }
}
class AmericanPoples extends People {
  eat() {
    console.log('用叉子吃饭');
  }
}

```
:::tip 总结
* 一个抽象类可以有一个或者多个抽象方法
* 一个抽象类中的抽象方法规定了该方法的实现规则且子类必须将其实现
* 抽象类带来的好处: 提供了统一的抽象方法，规定子类必须实现，保证代码的可维护性
:::