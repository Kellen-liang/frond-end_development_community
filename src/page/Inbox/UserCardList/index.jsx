import React from "react";
import { useRef } from "react";
import { useState } from "react";
import styles from "./index.module.scss"

/**
 * 
 * @param {*} props 
 * @param {number|string} props.userId -用户Id
 * @param {string} props.userId -用户头像
 * @param {string} props.userId -用户名
 * @param {string} props.userId -用户信息
 * @param {boolean} props.userId -卡片状态
 * @param {fucntion} props.userId -点击事件回调
 * @returns {JSX.Element}
 */
function UserCard({ userId, userIcon, userName, userMessage, isActive, onClick }) {
  return (
    <div
      className={`${styles.userCardContainer} ${isActive ? styles.userCardActive : ''}`}
      data-user-card-index={userId}
      onClick={onClick}
    >
      <img className={styles.userIcon} src={userIcon} alt=''></img>
      <section className={styles.userInfo}>
        <p className={styles.userName}>{userName}</p>
        <p className={styles.userMessage}>{userMessage}</p>
      </section>
    </div>
  )
}

/**
 * @param {*} props 
 * @param {string[]} props.data -用户卡片数据列表
 * @param {function} props.onClick -点击事件回调
 * @returns {JSX.Element}
 */
function UserCardList({data, onClick}) {
  const [activeCard, setActiveCard] = useState('')
  const clickFlag = useRef('')
  const _onClick = (e) => {
    //阻值冒泡
    e.stopPropagation();
    //阻止原始事件冒泡
    e.nativeEvent.stopImmediatePropagation();
    const index = e.target.dataset.userCardIndex
    //检测是否是重复点击同一项
    if (index === clickFlag.current) {
      return
    }
    onClick(index, data)
    clickFlag.current = index
  }

  return (
    <div>
      {data.length > 0 && data.map((item, index) => (
        <UserCard
          key={index}
          userMessage={item.userMessage}
          userName={item.userName}
          userIcon={item.userIcon}
          userId={item.userId}
          isActive={activeCard === index}
          onClick={(e) => {
            setActiveCard(index)
            return _onClick(e)
          }}
        />
      ))}
    </div>
  )
}

export default UserCardList;