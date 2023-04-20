import React, { useState } from "react";
import styles from './index.module.scss'

function SubscribeCard(props) {
  const { 
    record,
    userIcon,
    username,
    onGetuserInfo,
    onChange,
    isSubscribe = false
  } = props
  const [_isSubscribe, setIsSubscribe] = useState(isSubscribe)

  const _onGetuserInfo = () => {
    onGetuserInfo(username, record)
  }

  const _onChange = (active) => {
    setIsSubscribe(active)
    onChange(active, record)
  }
  return (
    <div className={styles.subscribeCardContainer}>
      <img 
        src={userIcon}
        alt="" 
        onClick={_onGetuserInfo}
      />
      <h1>{username}</h1>
      <div 
        className={`${styles.subscribeBtn} ${_isSubscribe ? styles.isActive : styles.isNotActive}`}
        onClick={() => _onChange(!_isSubscribe)}
      >
        {_isSubscribe ? '已关注' : '关注'}
      </div>
    </div>
  )
}

export default SubscribeCard;