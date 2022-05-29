定义： 条件类型为我们提供了一种使用infer关键字进行占位，然后通过比较条件的成立否，从而推断出类型的方法

## 1. 第一种infer出现的位置
```ts
// 
type fn = (x: string) => any;

type inferType<T> = T extends (args: infer P) => any ? P : T

type res = inferType<fn> // string
```
## 2. 第二种infer出现的位置
```ts
type fn = (x: string) => number;

type inferType<T> = T extends (args: any) => infer P ? P : T

type res = inferType<fn> // number
```
## 3. 第三种infer出现的位置

```ts
type myType = Array<boolean>;

type inferType<T> = T extends Array<infer P> ? P : never

type res = inferType<myType> // boolean
```

```ts
const setObj = new Set<object>();
type myType = typeof setObj;

type inferType<T> = T extends Set<infer P> ? P : never

type res = inferType<myType> // object
```
