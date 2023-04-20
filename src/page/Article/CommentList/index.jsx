import React from "react";
import { useState } from "react";
import styles from "./index.module.scss"
import moment from "moment";

function Comment(props) {
  const { commentId, username, userIcon, content, addTime, replyLate, canDel, onReply, onGetuserInfo, onDel, record } = props
  
  const [isShowReply, setIsShowReply] = useState(false)
  const [replyValue, setReplyValue] = useState('')
  const [isHovered, setIsHovered] = useState(false);

  //回复按钮事件
  const _onReply = () => {
    // console.log('username', username); 
    // console.log('replyLate', replyLate);  //回复对象名
    // console.log('replyValue', replyValue);  //回复内容

    onReply(replyLate, replyValue, record)

    setReplyValue('')
    setIsShowReply(false)
  }

  //删除事件
  const _onDel = () => {
    onDel(record)
  }

  //获取用户信息事件
  const _onGetuserInfo = () => {
    // console.log('username', username); //目标用户名
    // console.log('record',record);
    onGetuserInfo(username, record)
  }
  return (
    <div className={styles.commentContainer}>
      <div 
        className={styles.left} 
        style={{ backgroundImage: `url(${userIcon})` }}
        onClick={_onGetuserInfo}
      >  
      </div>
      <div className={styles.right}>
        <div className={styles.rightHeader} onClick={_onGetuserInfo}>
          { username }
          { replyLate ? <span >回复</span> : null }
          { replyLate }
        </div>
        <div className={styles.rightContent}>{content}</div>
        <div className={styles.rightfooter}>
          <span>{addTime}</span>
          <div
            onClick={() => setIsShowReply(!isShowReply)}
            style={{ color: isShowReply ? 'rgb(205, 170, 37) ' : 'rgb(148, 148, 148)' }}
          >
            <img src={isShowReply ? '/src/assets/img/已评论.png' : '/src/assets/img/未评论.png'} alt="" /> {isShowReply ? '取消回复' : '回复'}
          </div>
          <div
            style={{ display: canDel ? 'block' : 'none' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={_onDel}
          >
            <img src={isHovered ? '/src/assets/svg/删除.svg' : '/src/assets/svg/默认删除.svg'} alt="" />删除</div>
        </div>
      </div>
      <form
        className={styles.footer}
        style={{ display: isShowReply ? 'flex' : 'none' }}
      >
        <textarea 
          cols="30" 
          className={styles.content}  
          value={replyValue}
          onChange={(e) => setReplyValue(e.target.value.trim())}
        />
        <div onClick={_onReply}>回 复</div>
      </form>
    </div>
  )
}


function CommentList(props) {
  const { commentId, username, userIcon, content, addTime, replyCommentList, canDel, onReply, onGetuserInfo, onDel, record } = props

  return (
    <div className={styles.commentContainer}>
      {/* 一级评论 */}
      <Comment
        commentId={commentId}
        username={username}
        userIcon={userIcon}
        content={content}
        addTime={addTime}
        record={record}
        canDel={canDel}
        onReply={onReply}
        onGetuserInfo={onGetuserInfo}
        onDel={onDel}
      />
      {/* 二级评论 */}
      {
        replyCommentList.length ? (
          <div className={styles.replyContainer}>
            {replyCommentList.map((item, index) => (
              <Comment
                key={item.id}
                commentId={item.comment_id}
                username={item.username}
                userIcon={item.user_icon}
                content={item.content}
                addTime={moment(item.createdAt).format('YYYY-MM-DD')}
                replyLate={item.reply_late}
                canDel={item.isMine}
                record={item}
                onReply={onReply}
                onGetuserInfo={onGetuserInfo}
                onDel={onDel}
              />
            ))}
          </div>
        ) : null
      }
      
    </div>
  
  )
}

export default CommentList