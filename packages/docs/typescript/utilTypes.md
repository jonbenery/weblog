---
title: 内置类型
---

## 1. Extract
### 语法
```ts
type Extract<T, U> = T extends U ? T : never ;
```
### 函数
```ts
type functor1 = (one: string) => string;
type functor2 = (one: string, two: number) => string;

type res1 = functor1 extends functor2 ? functor1 : never; // functor1 S100
type res2 = functor2 extends functor1 ? functor2 : never; // never // S101

type res3 = Extract<functor1, functor2> // functor1 H100
type res4 = Extract<functor2, functor1> // never H101
```
:::tip 结论
针对函数的泛型约束，使用Extract和 直接使用 extends关键字一个结果
即 S100等同于H100; S101等同于H101
:::
### 类
```ts
class People {
  name!: string;
}
class Student extends People {
  school!: string
}
type res1 = Extract<Student, People> // Student
type res2 = Extract<People, Student> // never
```
:::tip 结论
对于类的继承（存在继承关系），Extract 仅仅是T的类型包含U的类型的时候才成立
:::

### 联合类型
```ts
type res1 = Extract<string | number, number> // number
```
:::tip 推导
1. string extends number => never
2. number extends number => number
3. 合并1和2步骤结果为 never | number => number
:::


## 2. Exclude
### 语法
```ts
type Exclude<T, U> = T extends U ? never : T;
```
### 联合类型
```ts
type res2 = Exclude<name | age | email | salary, 'salary'>
```
:::tip 推导
1. name extends salary => name
2. age extends salary => age
3. email extends salary => email
4. salary extends salary => never
5. 合并1，2，3，4的结果为 name | age | email | never => name | age | email 
:::

### 案例
需求： 通过 `Exclude` 实现排除 `Worker`接口中的`salary`属性
```ts
interface Worker {
  name: string;
  age: number;
  email: string;
  salary: number
}
type res2 = Exclude<keyof Worker, 'salary'> //  name | age | email
```
## 3. Pick
### 语法
```ts
type Pick<T, K extends keyof T> = {
  [P in K]: T[P]
}
```
### 案例
```ts
interface Email {
  title: string
  content: string
  code: number
}
type res1 = Picker<Email, 'title'|'content'>;
/***
  type res1 = {
    title: string
    content: string
  }
*/
```
## 4. Omit
获取一个`类型别名`或者`接口`中排除特定的一个属性后所形成的一个新的`类型别名`或者`接口`
### 语法
```ts
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
```
### 案例
需求：获取一个新的类型, 这个类型包含了`Wordker`接口中的`name`和`age`两个属性，即排除`description`属性
```ts
interface Worker = {
  name: string;
  age: number;
  description: string;
}

type res1 = Omit<Worker, 'description'>
/** 
  type res1 = {
    name: string
    age: number
  }
 */
```
## 5. Record
定义一个对象的key和value的类型
语法：
```ts
type Record<K extends keyof any, T> = {
  [P in K]: T
}
```
案例：
```ts
interface CatInfo {
  age: number;
  breed: string;
}
type CatName = "miffy" | "boris" | "mordred";

const cats: Record<CatName, CatInfo> = {
  miffy: { age: 10, breed: "Persian" },
  boris: { age: 5, breed: "Maine Coon" },
  mordred: { age: 16, breed: "British Shorthair" },
};
```
### 开发中常遇到的小问题总结
```ts
const obj = {}
obj.a = 2
```
当我们定一个对象`obj`并为其添加属性`a`并且赋值的时候ts会提醒错误`类型“{}”上不存在属性“a”`，其原因是ts的静态检查在`“{}”`中并未找到属性`a`，我们可以通过一下方式解决
```ts
const obj: Record<any, any> = {}
obj.a = 2
```

## 6. Required
去除所有的可选属性
### 语法
```ts
type Required<T> = {
  // -? 去掉问号
  [P in keyof T]-? : T[P]
}
```
## 7. Partial
全部变为可选属性
### 语法
```ts
type Partial<T> = {
  // 全部变为可选属性
  [P in keyof T]? : T[P]
}
```
## 8. ReadOnly
全部变为只读
### 语法
```ts
type ReadOnly<T> = {
  // 全部变为只读
  readonly [P in keyof T] : T[P]
}
```