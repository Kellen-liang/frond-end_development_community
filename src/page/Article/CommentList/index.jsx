import React from "react";
import { useState } from "react";
import styles from "./index.module.scss"
import resource from "@/assets/resource";

function Comment(props) {
  const { commentId, username, userIcon, content, addTime, replyLate, canDel, onReply, onGetuserInfo, onDel } = props
  
  const [isShowReply, setIsShowReply] = useState(false)
  const [replyValue, setReplyValue] = useState('')
  const [isHovered, setIsHovered] = useState(false);

  //回复按钮事件
  const _onReply = () => {
    console.log('username', username); 
    console.log('replyLate', replyLate);  //回复对象名
    console.log('replyValue', replyValue);  //回复内容

    onReply(replyLate, replyValue)

    setReplyValue('')
    setIsShowReply(false)
  }

  //删除事件
  const _onDel = () => {
    console.log('reply_late', replyLate); //回复对象
    console.log('commentId', commentId); //评论/回复唯一id

    onDel(commentId, replyLate)
  }

  //获取用户信息事件
  const _onGetuserInfo = () => {
    console.log('username', username); //目标用户名
    onGetuserInfo(username)
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
            <img src={isShowReply ? resource('./img/已评论.png') : resource('./img/未评论.png')} alt="" /> {isShowReply ? '取消回复' : '回复'}
          </div>
          <div
            style={{ display: canDel ? 'block' : 'none' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={_onDel}
          >
            <img src={isHovered ? resource('./svg/删除.svg' ) : resource('./svg/默认删除.svg')} alt="" />删除</div>
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
  const { commentId, username, userIcon, content, addTime, replyCommentList, canDel, onReply, onGetuserInfo, onDel } = props

  return (
    <div className={styles.commentContainer}>
      {/* 一级评论 */}
      <Comment
        commentId={commentId}
        username={username}
        userIcon={userIcon}
        content={content}
        addTime={addTime}
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
                key={index}
                commentId={item.comment_id}
                username={item.username}
                userIcon={item.userIcon}
                content={item.content}
                addTime={item.addTime}
                canDel={item.canDel}
                replyLate={item.reply_late}
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