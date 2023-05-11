import React, { Suspense, useState, useRef } from "react";
import styles from './index.module.scss'
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import { Menu } from 'antd'
import CommentCard from "./CommentCard";
import LikeCard from "./LikeCard";
import Loading from "@/component/Loading";
import { Empty } from "antd";
import {
  SmileOutlined,
  StarOutlined,
  MessageOutlined,
} from '@ant-design/icons'
import { cloneDeep } from "lodash";
import { resource } from "@/utils/common";

function Message(props) {
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
        user_icon: resource('.svg/带刀剑士.svg'),
        username: 'kellen',
        content: '这是一段回复',
        add_time: '2023-03-26',
        article_id: '12345',
        article_title: '如何优雅的写出一个组件',
        isReply: 0 //是否是回复信息
      },
      { 
        comment_id: '002', //评论（回复）唯一id
        user_icon: resource('/svg/带刀剑士.svg'),
        username: 'kellen',
        content: '这是一段回复',
        add_time: '2023-03-26',
        article_id: '12345',
        article_title: '如何优雅的写出一个组件',
        isReply: 1 //是否是回复信息
      },
      
  ]
  const [comments, setComments] = useState(commentList);
  //点赞数据
  const likeList = [
    { 
      article_id: '001', 
      article_title: '如何优雅的写出一个组件',
      add_time: '2023-03-26',
      user_id: '007',
      username: 'kellen',
      user_icon: resource('/svg/带刀剑士.svg'),
    },
    { 
      article_id: '002', 
      article_title: '如何优雅的写出一个组件',
      add_time: '2023-03-26',
      user_id: '006',
      username: 'Coco',
      user_icon: resource('/svg/带刀剑士.svg'),
    },
    { 
      article_id: '003', 
      article_title: '如何优雅的写出一个组件',
      add_time: '2023-03-26',
      user_id: '008',
      username: 'Mike',
      user_icon: resource('/svg/带刀剑士.svg'),
    },
  ]
  const [likes, setLike] = useState(likeList)
  
  //事件操作:  
  //点赞和评论页操作
  /**
   * @desc 跳转值对应用户详情页（点赞/评论通用）
   * @param {string} username -用户名
   * @param {object} record -当前整条数据
   */
  const onGetuserInfo = (username, record) => {
    console.log(username, record);
  }

  /**
   * @desc 查找文章详情（点赞评论通用）
   * @param {number|string} articleId 
   * @param {object} record 
   */
  const onSearchArticl = (articleId, record) => {
    console.log(articleId, record);
  }

  /**
   * @desc 点击回复事件（评论）
   * @param {string|number} id -文章id
   * @param {string} replyLate -回复对象
   * @param {*} value -回复内容
   * @param {*} record -当前整条数据
   */
  const onReply = (id, replyLate, value, record) => {
    console.log(id, replyLate, value, record);
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
          key={item.article_id}
          record={item}
          userIcon={item.user_icon}
          username={item.username}
          addTime={item.add_time}
          sourceId={item.article_id}
          sourceTitle={item.article_title}
          onGetuserInfo={onGetuserInfo}
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
          userIcon={item.user_icon}
          username={item.username}
          content={item.content}
          addTime={item.add_time}
          sourceId={item.article_id}
          sourceTitle={item.article_title}
          isReply={item.isReply}
          onGetuserInfo={onGetuserInfo}
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