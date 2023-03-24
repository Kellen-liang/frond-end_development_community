import React from "react";
import styles from './index.module.scss'
import { Menu } from 'antd';

function Message(props) {
  return (
    <div className={styles.messageContainer}>
      <Menu></Menu>
    </div>
  )
}

export default Message;