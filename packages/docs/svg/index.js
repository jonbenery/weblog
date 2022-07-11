import React from 'react'
import styles from './index.module.css'

export function RenderBezier3() {
  return (
    <div className={styles.svgBox}>
      <svg id="svg" width="200" height="130">
        <desc>三次贝塞尔曲线</desc><defs></defs>
        <path
          d="M20,20 C-60,20 200,80 120,80"
          stroke="#000000"
          fill="none"
          style={{strokeWidth: '2px'}}></path>
        <text x="60" y="120">三次贝塞尔曲线</text>
      </svg>
    </div>
  )
}
