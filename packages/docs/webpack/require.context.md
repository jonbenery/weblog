*It allows you to pass in a directory to search, a flag indicating whether subdirectories should be searched too, and a regular expression to match files against.*

意思是它允许你通过一个目录进行搜索,flag指定是否搜索子目录，以及与文件匹配的正则表达式。


**也就是说 require.context 有三个参数：**

* directory：说明需要检索的目录
* useSubdirectories：是否检索子目录
* regExp: 匹配文件的正则表达式

例如:
```js
require.context('./test', false, /\.test\.js$/);
```

**context module API**

*A context module exports a (require) function that takes one argument: the request.
The exported function has 3 properties: resolve, keys, id.
resolve is a function and returns the module id of the parsed request.
keys is a function that returns an array of all possible requests that the context module can handle.
id is the module id of the context module. This may be useful for module.hot.accept*

意思是该上下文导出一个必须的函数,并且这个函数接受一个请求的参数.
导出的函数有3个属性：`resolve`, `keys` 和 `id`。

* `resolve` 是一个函数，返回解析请求的模块ID。
* `keys` 是一个函数，返回上下文模块可以处理的所有可能请求的数组.
* `id` 是上下文模块的模块ID。 这可能对 `module.hot.accept` 有用

```js
var cache = {};
function importAll (r) {
  r.keys().forEach(key => cache[key] = r(key));
}
importAll(require.context('../components/', true, /\.js$/));
```

**导出当前目录文件下的所有js文件并且不包含该index.js文件**
首先创建两个测试文件index.js和test.js
```js
var cache = {};
function importAll (r) {
  r.keys().forEach(key => {
    if(key === './index.js') return
    cache[key] = r(key).defalut
  });
}
importAll(require.context('.', false, /\.js$/));
console.log(cache) //可以看下cache现在是什么样子
export default cache
```

