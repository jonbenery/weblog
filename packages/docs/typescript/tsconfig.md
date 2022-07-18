---
title: Ts简介
---

### 1. Typescript定义

融合了面向对象后端的思想的超级版的 javaScript  语言。

### 2. 优势:

* **编译时静态类型检测**：函数或方法传参或变量赋值不匹配时，会出现编译错误提示 ，规避了开发期间的大量低级错误，省时，省力。
* **能自动提示**：变量类型、变量属性，不用来回切换文件或不小心写错导致的编码隐患。
* **引入了泛型**：让大中项目，前端框架底层源码具备了高可扩展性这个巨大的优势，同时也有类型安全检查的优势。
* **强大的 d.ts 声明文件**：声明文件像一个书的目录一样，清晰直观展示了依赖库文件的接口，type类型，类，函数，变量等声明。
* **轻松编译成 JS 文件**：即使 TS 文件有错误，绝大多数情况也能编译出 JS 文件。
* **灵活性高：** 尽管 TS 是一门 强类型检查语言，但也提供了 any 类型 和 as any 断言，这提供了 TS的灵活度。

### 3. 环境搭建

```powershell
npm init -y 

yarn  add typescript -D

tsc --init
```


### 4. `tsconfig.json` 常用 18 项配置选项详解

```js
{
  "compilerOptions": {
    // 指定 TS 编译成 JS 后的js版本
    "target": "es2020",
    // TS 编译成 JS 后采用的模块规范 commonjs amd cmd  es等  
    "module": "commonjs", 
    // 指定 TS 编码期间可以使用的库文件版本 比如：ES5就不支持Set集合       
    "lib": ["DOM","ES2020"],
    // 指定 TS 文件编译成 JS 后的输出目录
    "outDir": "./dist",
    // 指定 TS 文件源码目录
    "rootDir": "./src",
    // 启用严格检查模式
    "strict": true,
    // null 和 undefined即是值，也是类型, null 和 undefined 值 只能赋值给 any ,unknown和它们各自的类型
    "strictNullChecks":false,
    // 一般是指表达式或函数参数上有隐含的 any类型时报错
    "noImplicitAny": true,
    // 启用ES7装饰器实验开启选项
    "experimentalDecorators": true,
    // 启用装饰器元数据开启选项
    "emitDecoratorMetadata": true,
    // 指定 TS 文件编译后生成相应的.d.ts文件
    "declaration": true,
    // TS 文件编译后删除所有的注释
    "removeComments": false,
    // 工作根目录  解析非相对模块的基地址
    "baseUrl": "src",
    "paths": {
      "@/datatype/*": ["datatype/*"]
    },    
    // 有些依赖库底层 为了兼容CommonJs规范、AMD规范这二者的规范中相互兼容，使用了 export =，将二者规范统一。
    // "esModuleInterop":true表示允许依赖库中出现export = 这种兼容规范导出的格式，TS 可以用import from导入 
    "esModuleInterop": true,  
  },
  // 需要编译的ts文件一个*表示文件匹配**表示忽略文件的深度问题
  "include": [ 
    // 匹配src下所有的ts文件
    "./src/**/*.ts", 
    "src/datatype/typepsenumts"
  ],
  "exclude": [
    "./src/**/test",
    "./src/**/premit", 
  ]
} 
```

