---
title: 两个列表区域同步滚动
---
### 目标
页面中有两个列表元素，其中一个元素的滚动要和一个元素的滚动同步

### 原理
 * 监听元素对象的滚动条事件
```js
var box = document.getElementById('box') // 获取id为box的元素
box.onscroll = function() {
    // box的滚动条滚动时触发
}

```
* 滚动条的属性
```js
// 垂直滚动条
box.scrollHeight // 可滚动的高度
box.clientHeight // 滑块的高度
box.scrollTop // 已纵向滚动的距离
// 水平滚动条
box.scrollWidth // 可滚动的宽度
box.clientWidth // 滑块的宽度
box.scrollLeft // 已横向滚动的距离

```

### 思路
监听第一个滚动条，当滚动条滚动时，获取第一个滚动条的位置，然后改变第二个滚动条的位置；
监听第二个滚动条，当滚动条滚动时，获取第二个滚动条的位置，然后改变第一个滚动条的位置。

### 实现
```js
let first = document.getElementById('first')
let second = document.getElementById('second')
first.onscroll = () => {
  second.scrollTop = first.scrollTop / (first.scrollHeight - first.clientHeight) * (second.scrollHeight - second.clientHeight) // 按百分比同步位置
}
second.onscroll = () => {
  first.scrollTop = second.scrollTop / (second.scrollHeight - second.clientHeight) * (first.scrollHeight - first.clientHeight)
}


```
### 出现的问题
由于第一个元素滚动时触发了第二个元素的滚动，两个元素的滚动被相互制约

### 修复问题
于是，我使用两个变量firstchange和secondchange分别表示允许第一个元素滚动和允许第二个元素滚动；
当第一个元素首先触发滚动时，设置secondchange为false；
第二个元素触发时，根据secondchange，不对元素进行滚动，然后将设置secondchange设置回true，完成一次同步滚动。
第二个元素首先触发滚动时类似。

### 最终结果
```js
let first = document.getElementById('first')
let second = document.getElementById('second')
let firstchange = true
let secondchange = true
first.onscroll = () => {
  if (firstchange) {
    second.scrollTop = first.scrollTop / (first.scrollHeight - first.clientHeight) * (second.scrollHeight - second.clientHeight)
    secondchange = false
  } else {
    firstchange = true
  }
}
second.onscroll = () => {
  if (secondchange) {
    first.scrollTop = second.scrollTop / (second.scrollHeight - second.clientHeight) * (first.scrollHeight - first.clientHeight)
    firstchange = false
  } else {
    secondchange = true
  }
}

```
