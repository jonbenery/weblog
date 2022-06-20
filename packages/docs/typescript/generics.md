---
title: 泛型
---
 * 定义时数据类型不确定，使用时数据类型明确（泛型的宽泛）
 * 编译期间进行数据类型安全检查（泛型的严谨 ）

## 1. 先来看一个问题
```ts
class Car {
  cars!: Array<any>;
  add(car: any) {
    this.cars.push(car)
  }
  getCar(index: number) {
    return this.cars[index]
  }
}
const cars = new Car()

cars.add({
  name: '奔驰',
  price: 400000
})

const car = cars.getCar(0);

// car. //此时编译器不会提供car下的属性提示
```
但我们想读取`car`的`name`或者`price`的时候，我们发现使用`car.`编辑器并没给我们提示，这是因为`Car`类中定义的`cars`是一个`Array<any>`类型，所以当我们通过下标获取到数组中的数据也是`any`类型，导致我们无法使用编译器给我们提供的语法提示，一定程度上造成了我们开发效率的下降

## 2. 接下来我们使用泛型解决这个问题
```ts
interface CarInferface{
  name: string,
  price: number
}

class Car<T> {
  cars!: Array<T>;
  add(car: T) {
    this.cars.push(car)
  }
  getCar(index: number) {
    return this.cars[index]
  }
}

const cars = new Car<CarInferface>()

cars.add({
  name: '奔驰',
  price: 400000
})

const car = cars.getCar(0);

// car. // 此时编译器就会提供car下的属性提示
```
当我们在`new Car`的时候我们将接口类型`CarInferface`传递给泛型T，然后就确定了`Car`类中定义的`cars`是一个`Array<CarInferface>`的类型，所以当我们通过下标获取到数组中的数据就是`CarInferface`类型，然后编译器就能给出正确的提示。


## 3. 泛型约束
我们通过Vue3的一段源码`toRefTmpl`来介绍泛型约束
```ts
class toRefTmpl<T extends object, K extends keyof T> {
  constructor(private readonly obj: T, private readonly key: K) {}
  get() {
    return this.obj[this.key]
  }
  // 要获取泛型某一个属性的类型，我们可以通过 泛型[属性名] 的形式获取
  set(newValue: T[K]) {
    this.obj[this.key] = newValue
  }
}
const person: PersonInterface = {
  name: 'jonben',
  age: 18
}
type PersonInterface = {
  name: string
  age: number
}
const p = new toRefTmpl<PersonInterface, 'name'>(person, 'name');
p.set('jonbenery')

```
* `T extends object`代表`T`要符合`object`类型的约束；

* `K extends keyof T`代表`K`要符合`keyof T`的联合类型的约束，即满足`'name'|'age'`；

:::tip 小总结
 要获取泛型某一个属性的类型，我们可以通过 泛型[属性名] 的形式获取，如`toRefTmpl`案例中的`set`方法
:::