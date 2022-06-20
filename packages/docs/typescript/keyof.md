定义： 将一个数据类型转换为联合类型
## 1. keyof 类型别名，接口，对象

```ts
const obj = {
  address: '浦东',
  phone: 18
}
type mytypkeyof = keyof typeof obj // 'address' | 'phone'
```

## 2. keyof any
`keyof any` 返回 联合类型`string | number | symbol`
```ts
type res1 = keyof any // string | number | symbol
```

## 3. keyof 索引类型
```
如果该类型是带有`number`索引签名的类型，那么keyof则返回`number`类型
```ts
interface Map<T> {
  [key: number]: T;
}
type res1 = keyof Map<number>; // number
let value: Map<number>[1]; //number
```
但是，如果该类型是带有`string`索引签名的类型，那么keyof则返回`string | number`联合类型
```ts
interface Map<T> {
  [key: string]: T;
}
type res1 = keyof Map<number>; //string | number
const value: Map<number>['antzone'];//number
```
在此示例中, `type res1` 是 `string | number` 这是因为 JavaScript 对象`键`始终强制转换为字符串，因此`obj["0"]`始终与`obj[0]`的结果是相同的
