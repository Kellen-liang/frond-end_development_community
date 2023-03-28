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
 * @param {string} props.content -回复内容
 * @param {string} props.addTime -回复时间
 * @param {string|number} props.sourceId -来源文章id
 * @param {string} props.sourceTitle -来源文章标题
 * @param {number} props.isReply -是否是回复（1：回复，0：评论）
 * @param {Function} props.onGetuserInfo -点击头像回调
 * @param {Function} props.onReply -点击回复回调
 * @param {Function} props.onSearchArticl --点击点击文章标题回调
 * @returns {JSX.Element}
 */
function CommentCard(props) {
  const {
    record,
    style,
    userIcon = '/src/assets/svg/带刀剑士.svg',
    username,
    content,
    addTime,
    sourceId,
    sourceTitle,
    isReply,
    onGetuserInfo,
    onReply,
    onSearchArticl
  } = props
  const [reply, setReply] = useState('')
  const [isShowReply, setIsShowReply] = useState(false)

  //点击回复事件
  const onShowReplyContent = (e) => {
    setIsShowReply(!isShowReply)
  }

  //点击用户头像信息事件
  const _onGetuserInfo = () => {
    onGetuserInfo(username,record)
  }

  //提交回复事件
  const _onReply = (e) => {
    setReply('')
    setIsShowReply(false)
    onReply(sourceId, username, reply, record)
  }

  //点击文章标题事件
  const _onSearchArticl = () => {
    onSearchArticl(sourceId, record)
  }

  return (
    <div className={styles.commentCardContainer} style={style}>
      <div className={styles.commentCardContent}>
        <div 
          className={styles.userIcon} 
          onClick={_onGetuserInfo}
          style={{ backgroundImage: `url(${userIcon})` }}
        ></div>
        <div className={styles.commentInfo}>
          <div>
            { isReply ? 
              <>{username}回复了你在<span className={styles.title} onClick={_onSearchArticl}>《{sourceTitle}》</span>文章下的评论</> : 
              <>{username}评论了你的文章<span className={styles.title} onClick={_onSearchArticl}>《{sourceTitle}》</span></>
            }
          </div>
          <p>{content}</p>
          <div className={styles.footer}>
            <span>{addTime}</span>
            <div
              onClick={onShowReplyContent}
              style={{ color: isShowReply ? 'rgb(205, 170, 37) ' : 'rgb(148, 148, 148)' }}
            ><img src={isShowReply ? '/src/assets/img/已评论.png' : '/src/assets/img/未评论.png'} alt="" />{isShowReply ? '取消回复' : '回复'} </div>
          </div>
        </div>
      </div>
      <form
        // onSubmit={handleReplySubmit}
        className={styles.commentReplyContainer}
        style={{ display: isShowReply ? 'flex' : 'none' }}
      >
        <TextArea
          className={`${styles.replyContent} customScorllType`}
          value={reply}
          allowClear={true}
          bordered={false}
          onClick={(e) => { e.stopPropagation() }}
          onChange={(e) => setReply(e.target.value.trim())}
        />
        <div onClick={_onReply}>回 复</div>
      </form>
    </div>
  )
}

export default CommentCard;