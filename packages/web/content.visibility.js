import React from 'react'
const styles = {
  hidden: {
    "content-visibility": "hidden"
  },
  item: {
    "width": "60px",
    "height": "60px",
    "line-height": "60px",
    "text-align": "center",
    "color": "#fff",
    "background": "#000",
    "margin-bottom": "10px"
  }
}

export function RenderHtml({hidden}) {
  return (
    <div className="g-wrap">
      <div style={styles.item}>1111</div>
      <div
        style={hidden ? {
          ...styles.hidden,
          ...styles.item
        } : styles.item}>2222</div>
    </div>
  )
}