import React, { useState } from "react";
import styles from './index.module.scss'
import { Input } from 'antd'
const { TextArea } = Input;

/**
 * @desc 评论卡片组件
 * @param {object} props 
 * @param {object} props.record -整条数据
 * @param {CSSProperties} props.style -自定义样式
 * @param {string} props.userIcon -用户头像
 * @param {string} props.username -用户名称
 * @param {string} props.addTime -添加时间
 * @param {string|number} props.sourceId -来源文章id
 * @param {string} props.sourceTitle -来源文章标题
 * @param {Function} props.onGetuserInfo -点击头像回调
 * @param {Function} props.onSearchArticl -点击点击文章标题回调
 * @returns {JSX.Element}
 */
function LikeCard(props) {
  const {
    record,
    style,
    userIcon,
    username,
    addTime,
    sourceId,
    sourceTitle,
    onGetuserInfo,
    onSearchArticl,
  } = props

  //点击用户头像事件
  const _onGetuserInfo = () => {
    onGetuserInfo(username, record)
  }

  //点击文章标题事件
  const _onSearchArticl = () => {
    onSearchArticl(sourceId, record)
  }

  return (
    <div className={styles.likeCardContainer} style={style}>
      <div className={styles.likeCardContent}>
        <div 
          className={styles.userIcon} 
          onClick={_onGetuserInfo}
          style={{ backgroundImage: `url(${userIcon})` }}
        ></div>
        <div className={styles.likeInfo}>
          <div>
            {username}点赞了你的文章<span className={styles.title} onClick={_onSearchArticl}>《{sourceTitle}》</span>
          </div>
          <div className={styles.addTime}>{addTime}</div>
        </div>
      </div>
    </div>
  )
}

export default LikeCard;