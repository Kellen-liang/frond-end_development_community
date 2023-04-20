import React, { useEffect, useState, useRef } from "react";
import styles from './index.module.scss'
import { useNavigate } from "react-router-dom";
import { Menu } from 'antd'
import CommentCard from "./CommentCard";
import LikeCard from "./LikeCard";
import { Empty, message } from "antd";
import { 
  getMessageLikeList, 
  getMessageCommentList,
  createReply
 } from "@/utils/apis";
import {
  SmileOutlined,
  MessageOutlined,
} from '@ant-design/icons'
import moment from "moment";

function Message(props) {
  const [likes, setLike] = useState([])
  const [comments, setComments] = useState([]);
  useEffect(()=>{
    getLikeList()
    getCommentList()
  },[])
  const navigate = useNavigate()

  
  //菜单列表
  const menu = useRef([
    {
      key: 'like',
      icon: <SmileOutlined />,
      label: '点赞'
    },
    {
      key: 'comment',
      icon: <MessageOutlined />,
      label: '评论'
    },
  ])
  const [menuKey, setMenuKey]= useState('like')
  //评论数据
  const commentList = [
      { 
        comment_id: '001', //评论（回复）唯一id
        user_icon: '/src/assets/svg/带刀剑士.svg',
        username: 'kellen',
        content: '这是一段回复',
        add_time: '2023-03-26',
        article_id: '12345',
        article_title: '如何优雅的写出一个组件',
        isReply: 0 //是否是回复信息
      },
      { 
        comment_id: '002', //评论（回复）唯一id
        user_icon: '/src/assets/svg/带刀剑士.svg',
        username: 'kellen',
        content: '这是一段回复',
        add_time: '2023-03-26',
        article_id: '12345',
        article_title: '如何优雅的写出一个组件',
        isReply: 1 //是否是回复信息
      },
      
  ]
  //点赞数据
  const likeList = [
    { 
      article_id: '001', 
      article_title: '如何优雅的写出一个组件',
      add_time: '2023-03-26',
      user_id: '007',
      username: 'kellen',
      user_icon: '/src/assets/svg/带刀剑士.svg',
    },
    { 
      article_id: '002', 
      article_title: '如何优雅的写出一个组件',
      add_time: '2023-03-26',
      user_id: '006',
      username: 'Coco',
      user_icon: '/src/assets/svg/带刀剑士.svg',
    },
    { 
      article_id: '003', 
      article_title: '如何优雅的写出一个组件',
      add_time: '2023-03-26',
      user_id: '008',
      username: 'Mike',
      user_icon: '/src/assets/svg/带刀剑士.svg',
    },
  ]
  

  const getLikeList = async () => {
    const res = await getMessageLikeList()
    setLike(res.data.data)
  }

  const getCommentList = async () => {
    const res = await getMessageCommentList()
    setComments(res.data.data)
  }
  

  //事件操作:  
  //点赞和评论页操作
  /**
   * @desc 跳转值对应用户详情页（点赞/评论通用）
   * @param {string} username -用户名
   * @param {object} record -当前整条数据
   */
  const onLikeGetuserInfo = (username, record) => {
    console.log(record);
    const { likesUserId } = record
    navigate(`/userCenter/${likesUserId}`)
  }

  const onCommentGetuserInfo = (username, record) => {

  }

  /**
   * @desc 查找文章详情（点赞评论通用）
   * @param {number|string} articleId 
   * @param {object} record 
   */
  const onSearchArticl = (articleId, record) => {
    console.log(articleId, record);
    navigate(`/article/${articleId}`,)
  }

  /**
   * @desc 点击回复事件（评论）
   * @param {string|number} id -文章id
   * @param {string} replyLate -回复对象
   * @param {*} value -回复内容
   * @param {*} record -当前整条数据
   */
  const onReply = async (id, replyLate, value, record) => {
    // console.log(id, replyLate, value, record);
    const { id: article_id, comment_id, create_comment_user_id } = record
    const params = {
      article_id,
      content: value,
      comment_id,
      reply_late_id: create_comment_user_id
    }
    const res = await createReply(params)
    if(res.data.status) {
      message.success('回复成功')
    }
    else {
      message.error(res.data?.errmsg || '回复失败')
    }
  }


  //内容显示控制:
  //内容显示菜单
  const onClickMenu = ({ key }) => {
    if (key === menuKey) {
      return
    }
    setMenuKey(key)
  }

  const contentShow = (key) => {
    switch (key) {
      case 'like': return commentLikeJSX()
      case 'comment': return commentContentJSX()
      default: return 
    }
  }

  const commentLikeJSX = () => (
    likes.length ? (
      likes.map((item, index) => (
        <LikeCard
          key={item.id}
          record={item}
          userIcon={item.likesUserIcon}
          username={item.likesUsername}
          addTime={moment(item.createDate).format('YYYY-MM-DD')}
          sourceId={item.id}
          sourceTitle={item.article_title}
          onGetuserInfo={onLikeGetuserInfo}
          onSearchArticl={onSearchArticl}
        />
      ))
    ) : <Empty className={styles.empty}/>
  )

  const commentContentJSX = () => (
    comments.length ? (
      comments.map((item, index) => (
        <CommentCard
          key={item.comment_id}
          record={item}
          userIcon={item.comment_user_icon}
          username={item.create_comment_username}
          content={item.comment_content}
          addTime={moment(item.comment_create_date).format('YYYY-MM-DD')}
          sourceId={item.id}
          sourceTitle={item.article_title}
          isReply={0}
          onGetuserInfo={onCommentGetuserInfo}
          onReply={onReply}
          onSearchArticl={onSearchArticl}
        />
      ))
    ) : <Empty className={styles.empty}/>
  )
  
  return (
    <div className={styles.messageContainer}>
      <aside className={`${styles.messageLeft} commonCard`}>
        <Menu
          style={{ height: '100%' }}
          items={menu.current}
          defaultSelectedKeys={['like']}
          onClick={onClickMenu}
        />
      </aside>
      <article className={`${styles.messageRight}  customScorllType`}>
        <div className={`${styles.messageRightContainer} commonCard`} >
          {contentShow(menuKey)}
        </div>
      </article>
    </div>
  )
}

export default Message;