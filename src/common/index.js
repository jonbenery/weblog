import React from 'react'
import styles from './index.module.css'
export function RenderImg({width = 300, src, text}) {
  return (
    <div
      className={styles.preview}
      style={{width: width}}>
      <img
        className={styles.img}
        src={src}
        alt=""/>
        <div>{text}</div>
    </div>
  )
}