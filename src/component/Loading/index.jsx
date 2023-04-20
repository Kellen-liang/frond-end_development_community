import React from "react";
import styles from "./index.module.scss"

/**
 * @param {*} param0 
 * @param {string} param0.icon -图标
 * @param {CSSProperties} param0.style -自定义样式
 * @returns {JSX.Element}
 */
function Loading({
  icon = '/src/assets/img/loading.png',
  style
}) {

  return (
    <div className={styles.loadingContainer} style={style}>
      <div  className={styles.loadingText}>
        <span>L</span>
        <span>o</span>
        <span>a</span>
        <span>d</span>
        <span>i</span>
        <span>n</span>
        <span>g</span>
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </div>
      <div 
        className={styles.loadingImg}
        style={{ backgroundImage : `url(${icon})`}} 
      ></div>
    </div>
  )
}

export default Loading