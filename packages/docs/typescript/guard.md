---
title: 自定义守卫
---

### 1. 先来看个问题
```ts
function isString(data: any): boolean {
  return typeof data === 'string'
}
function adjustType(data: unknown) {
  if (isString(data)) {
    data.substring() // 类型“unknown”上不存在属性“substring”。
  }
}
```
`类型“unknown”上不存在属性“substring”`是因为，此处的`isString`函数在还未运行的状态下ts是获取不到函数内部的结果，所以无法断定`data`为字符串类型

### 2. 由此引出类型守卫 ｜ 字符串类型守卫
```ts
function isString(data: any): data is string {
  return typeof data === 'string'
}

function adjustType(data: unknown) {
  if (isString(data)) {
    data.substring()
  }
}
```

### 3. 对象类型守卫
```ts
function isObject(data: any): data is Record<any, any> {
  return data !== null && typeof data === 'object'
}
```

### 4. 函数类型守卫
```ts
function isFunction(data: any): data is Function {
  return typeof data === 'function'
}
```

### 5. promise类型守卫
```ts
function isPromise(data: any): data is Promise<any> {
  return isObject(data) && isFunction(data.then)
}
```

### 6. 其他类型的守卫，工作中遇到后依次补充