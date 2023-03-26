import React, { useState, useRef } from "react";
import styles from './index.module.scss'
import { Input } from 'antd'
const { TextArea } = Input;

/**
 * 
 * @param {*} props 
 * @param {object} props.record -整条数据
 * @param {object} props.style -自定义样式
 * @param {object} props.userIcon -用户头像
 * @param {object} props.username -用户名称
 * @param {object} props.replyContent -回复内容
 * @param {object} props.addTime -回复时间
 * @param {object} props.sourceTitle -来源文章标题
 * @param {object} props.SourceCover -来源文章封面
 * @returns 
 */
function CommentCard(props) {
  const {
    record,
    style,
    userIcon = '/src/assets/svg/带刀剑士.svg',
    username,
    replyContent,
    addTime,
    sourceTitle,
    SourceCover,
  } = props
  const [reply, setReply] = useState('')
  const [isShowReply, setIsShowReply] = useState(false)

  //卡片默认点击事件
  const _onClick = (e) => {
    console.log(222);
  }

  //点击回复事件
  const onShowReplyContent = (e) =>{
    e.stopPropagation()
    setIsShowReply(!isShowReply)
    console.log(1111);
  }


  //提交回复事件
  const onReply = (e) => {
    e.stopPropagation()
    console.log(reply);
    setReply('')
    setIsShowReply(false)
  }
  return (
    <div className={styles.commentCardContainer} onClick={_onClick} style={style}>
      <div className={styles.commentCardLeft}>
        <div className={styles.commentCardLeftContainer}>
          <div className={styles.userIcon} data-type='user' style={{ backgroundImage: `url(${userIcon})` }}></div>
          <div className={styles.commentInfo}>
            <b>{username}</b><span>回复了你</span>
            <p>{replyContent}</p>
            <div className={styles.footer}>
              <span>{addTime}</span>
              <div
                data-type='replyBtn' 
                onClick={onShowReplyContent}
                style={{color: isShowReply ? 'rgb(205, 170, 37) ' : 'rgb(148, 148, 148)'}}
              ><img src={isShowReply ? '/src/assets/img/已评论.png' : '/src/assets/img/未评论.png'} alt="" /> 回复</div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.commentCardright}>
        <h1>{sourceTitle}</h1>
        <div style={{ backgroundImage: `url(${SourceCover})`}}></div>
      </div>
      <form 
        // onSubmit={handleReplySubmit}
        className={styles.commentReplyContainer}
        style={{display: isShowReply ? 'flex' : 'none'}}
      >
        <TextArea 
          className={`${styles.replyContent} customScorllType`}
          value={reply}
          allowClear={true} 
          bordered={false}
          onClick={(e) => {e.stopPropagation()}}
          onChange={(e) => setReply(e.target.value.trim())}
          />
        <div onClick={onReply}>回 复</div>
      </form>
    </div>
  )
}

export default CommentCard;