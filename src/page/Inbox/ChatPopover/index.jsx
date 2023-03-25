import React from "react";
import styles from "./index.module.scss"

/**
 * 
 * @param {object} props 
 * @param {boolean} props.isMine -是否是自己发的评论
 * @param {string} props.userIcon -用户头像
 * @param {any} props.username -用户名
 * @param {string} props.chatContent -聊天内容
 * @param {string} props.addTime -添加时间
 * @param {Function} props.onClick -回调函数
 * @param {object} props.record -该条数据的详细信息
 * @returns {JSX.Element}
 */
function ChatPopover(props) {
  const {
    isMine = false,
    userIcon,
    username,
    chatContent,
    addTime,
    onClick,
    record
  } = props

  const _onClick = (e) => {
    e.stopPropagation();
    //阻止原始事件冒泡
    e.nativeEvent.stopImmediatePropagation();
    const username = e.target.dataset.username
    onClick(username, record)
  }
  return (
    <div className={styles.chatPopoverContainer}>
      <div className={styles.header}>{addTime}</div>
      <div className={`${styles.content} ${isMine ? styles.isMineContent : ''}`}>
        <img
          data-username={username}
          className={styles.userIcon}
          src={userIcon}
          alt=""
          onClick={_onClick}
        />
        <div className={`${styles.chatContent} ${isMine ? styles.isMineChatContent : ''}`}>
          {chatContent}
        </div>
      </div>
    </div>
  )
}

export default ChatPopover;