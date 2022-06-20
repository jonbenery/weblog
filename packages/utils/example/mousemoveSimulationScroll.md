---
title: 鼠标移动模拟滚动条滚动
---

### 目标
当页面出现横向滚动条的时候，想要左右滚动只能通过拖动滚动条的方式，不方便用户操作，要实现的是通过鼠标的拖动实现页面的横向滚动

### 原理
通过记录鼠标按下和移动的距离设置滚动条的滚动距离

### 实现

* 带阻尼感的拖动，更好的模拟原生滚动
```js
function mouseMoveSimulationScroll(el) {
  if (!el) return
  let startScroll = 0;
  let startX = 0;
  let previousX = 0; // 保存上一次的clientX坐标
  let currentX = 0; // 获取每次移动的位置
  let velocity = 0; // 控制速度
  let direction = 0; // 控制左右滑动
  let momentum = 0.875; // 控制滑动距离
  let momentumInterval = null;
  let velocityInterval = null;
  el.onmousedown = function (event) {
    startScroll = el.scrollLeft;
    startX = event.clientX;
    previousX = startX;
    currentX = startX;
    clearInterval(velocityInterval);
    velocityInterval = setInterval(function () {
      // previousX保存上一次移动鼠标的clientX值
      // 慢速移动时currentX与previousX数值相同或者差值较小（慢速移动鼠标一直在一个点上）
      // 快速滑动时鼠标左滑previousX大于currentX，右滑currentX大于previousX
      // 原理：当快速移动时，松开鼠标的时候已经不在当时点击的点位上，50毫秒后就出现了2个变量的数值差
      // 原因：鼠标移动时，不会存储所有的移动信息。尤其是在快速移动鼠标时
      velocity = Math.abs(currentX - previousX);
      // 正负数转换用于控制左右滑动
      // 左滑动为正数，右滑动为负数
      direction = currentX > previousX ? -1 : 1;

      previousX = currentX;
    }, 50);
    el.onmousemove = function(event) {
      currentX = event.clientX;
      el.scrollLeft = startScroll + (startX - currentX);
    }
    el.onmouseleave = function () {
      el.onmousemove = null
    };
    el.onmouseup = function () {
      let num = 0;
      clearInterval(velocityInterval);
      clearInterval(momentumInterval);
      num = velocity;
      // 鼠标松开后开始执行滑动
      momentumInterval = setInterval(function () {
        // 滑动距离依次减小
        el.scrollLeft = el.scrollLeft + num * direction;
        // 数值依次减小
        num *= momentum;
        // 小于1销毁定时器，滑动结束
        if (Math.abs(num) < 1) {
          clearInterval(momentumInterval);
        }
      }, 15);
      el.onmousemove = null
      el.onmouseleave = null
      el.onmouseup = null
    };
  };

}

```

* 仅仅是拖动，简单的实现
```js
function handlemousedownControlScroll(evt, el) {
  const scrollLeft = el.scrollLeft
  const startPos = evt.clientX
  document.onmouseup = function() {
    document.onmousemove = null
  }
  document.onmouseleave = function() {
    document.onmousemove = null
  }
  if (evt.which === 3) {
    document.onmousemove = function(e) {
      el.scrollLeft = scrollLeft + (startPos - e.clientX)
    }
  }
}

```