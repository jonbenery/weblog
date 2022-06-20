---
title: 根据时间戳计算出具体时间
---
```js
function computedTime(time) {
  // 获取输入时间与今天时间戳的差值
  const duration = new Date().getTime() - time
  // 天
  const d = Math.floor(duration / (24 * 60 * 60 * 1000));
  // 小时
  const h = Math.floor((duration % (24 * 60 * 60 * 1000)) / 3600000);
  // 分钟
  const m = Math.floor((duration % (60 * 60 * 1000)) / 60000);
  // 秒
  const s = Math.floor(duration % (60 * 1000) / 1000);

  return `${d}天${h}小时${m}分钟${s}秒`
}

```