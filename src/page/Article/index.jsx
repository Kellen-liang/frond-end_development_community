import React from "react";
import styles from "./index.module.scss";
import Information from "@/component/Information";
import CommentList from "./CommentList";
import { useState, useLayoutEffect } from "react";
import MEDitor from '@uiw/react-md-editor';




function Article(props) {
  const [markdown, setMarkdown] = useState('');
  useLayoutEffect(() => {
    fetch('/src/assets/md/js基础知识.md')
      .then(response => response.text())
      .then(text => {
        // console.log(text);
        setMarkdown(text)
      })
  }, [])


  const list = [
    {
      comment_id: 'comment_id-13288923',//评论（回复）唯一id
      article_id: 'article_id-1', //文章id(同一篇文章id相同)
      article_title: '如有优雅的写出一个组件', //文章标题
      user_id: 'user_id-1', //评论（回复）创建者id
      username: 'Kellen', //评论（回复）创建者名
      userIcon: '/src/assets/svg/带刀剑士.svg', //评论（回复）创建者头像
      content: '这是一段评论 ', //评论、回复内容
      addTime: '2020-03-91',  //添加时间
      canDel: 1, //是否可进行删除操作
      reply_comment_list: [
        {
          comment_id: 'comment_id-13288924',//评论（回复）唯一id
          reply_id: 'reply_id-1', //回复id（没有,表示为评论）
          reply_late_id: 'user_id-1',  //回复对象id
          reply_late: 'Kellen', //回复对象名
          user_id: 'user_id-2', //评论（回复）创建者id
          username: 'Coco', //评论（回复）创建者名
          userIcon: '/src/assets/svg/带刀剑士.svg', //评论（回复）创建者头像
          content: '回复Kellen ', //评论、回复内容
          addTime: '2020-03-91',  //添加时间
          canDel: 1
        },
        {
          comment_id: 'comment_id-13288925',//评论（回复）唯一id
          reply_id: 'reply_id-2', //回复id（没有,表示为评论）
          reply_late: 'Coco', //回复对象名
          reply_late_id: 'user_id-2',  //回复对象id
          user_id: 'user_id-3', //评论（回复）创建者id
          username: 'Mike', //评论（回复）创建者名
          userIcon: '/src/assets/svg/带刀剑士.svg', //评论（回复）创建者头像
          content: '这是一段评论 ', //评论、回复内容
          addTime: '2020-03-91',  //添加时间
          canDel: 1
        },
      ]
    },
  ]

  const onGetuserInfo = (username) => {
    console.log('username', username);
  }

  const onReply = (replyLate, replyValue) => {
    console.log(replyLate, replyValue);
  }

  const onDel = (commentId, replyLate) => {
    console.log(commentId, replyLate);
  }

  return (
    <div className={styles.articleContainer}>
      <div className={styles.articleMain}>
        <section className={styles.articleContent}>
          <MEDitor.Markdown  // 文本展示
            source={markdown}
          />

        </section>
        <section className={styles.articleComment}>
          <div className={styles.articleCommentTop}>
            <h1>评论</h1>
            <div className={styles.articleCommentUser}>
              <img src="/src/assets/img/白梅.png" alt="" />
              <textarea name="" id="" cols="30" rows="3" placeholder="输入评论，Shift + Enter键发送"></textarea>
            </div>
          </div>
          <div className={styles.articleCommentList}>
            <h1>全部评论 <span>8</span></h1>
            {list.map(item => (
              <CommentList
                key={item.comment_id}
                commentId={item.comment_id}
                username={item.username}
                userIcon={item.userIcon}
                replyContent={item.content}
                addTime={item.addTime}
                replyCommentList={item.reply_comment_list}
                canDel={item.canDel}
                onGetuserInfo={onGetuserInfo}
                onReply={onReply}
                onDel={onDel}
              />
            ))}
          </div>
        </section>
      </div>
      <Information width={'25%'} />
    </div>
  )
}

export default Article;