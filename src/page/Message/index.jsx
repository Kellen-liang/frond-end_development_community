import React, { Suspense, useState, useRef } from "react";
import styles from './index.module.scss'
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import { Menu } from 'antd'
import ArticleCard from "@/component/ArticleCard";
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

function Message(props) {
  const navigate = useNavigate()
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
    {
      key: 'collect',
      icon: <StarOutlined />,
      label: '收藏'
    },
  ])
  const [menuKey, setMenuKey]= useState('like')
  //评论
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
  const [comments, setComments] = useState(commentList);
  //收藏
  const articleList = [
    {
      'id': '001',
      'author': 'Kellen',
      'user-icon': '/src/assets/img/Icon.png',
      'title': '如何优雅地写出一个组件',
      'cover': '/src/assets/img/Icon.png',
      'intro': '这是一段很长很长的简介,这是一段很长很长的简介,这是一段很长很长的简介,这是一段很长很长的简介,这是一段很长很长的简介,这是一段很长很长的简介',
      'tag': ['前端', 'JS'],
      'article': '文章正文',
      'add-time': '创建时间',
      'update-time': '更新时间',
      'count': 20,
      'likes': 14,
      'is-like': false,
      'comments': 12,
      'is-comment': false,
    },
    {
      'id': '002',
      'author': 'Kellen',
      'user-icon': '/src/assets/img/Icon.png',
      'title': '如何优雅地写出一个组件',
      'cover': '/src/assets/img/Icon.png',
      'intro': '这是一段很长很长的简介,这是一段很长很长的简介,这是一段很长很长的简介,这是一段很长很长的简介,这是一段很长很长的简介,这是一段很长很长的简介',
      'tag': ['前端', 'JS'],
      'article': '文章正文',
      'add-time': '创建时间',
      'update-time': '更新时间',
      'count': 20,
      'likes': 14,
      'is-like': false,
      'comments': 12,
      'is-comment': false,
    },
    {
      'id': '003',
      'author': 'Kellen',
      'user-icon': '/src/assets/img/Icon.png',
      'title': '如何优雅地写出一个组件',
      'cover': '/src/assets/img/Icon.png',
      'intro': '这是一段很长很长的简介,这是一段很长很长的简介,这是一段很长很长的简介,这是一段很长很长的简介,这是一段很长很长的简介,这是一段很长很长的简介',
      'tag': ['前端', 'JS'],
      'article': '文章正文',
      'add-time': '创建时间',
      'update-time': '更新时间',
      'count': 20,
      'likes': 14,
      'is-like': false,
      'comments': 12,
      'is-comment': false,
    },
    {
      'id': '004',
      'author': 'Kellen',
      'user-icon': '/src/assets/img/Icon.png',
      'title': '如何优雅地写出一个组件',
      'cover': '/src/assets/img/Icon.png',
      'intro': '这是一段很长很长的简介,这是一段很长很长的简介,这是一段很长很长的简介,这是一段很长很长的简介,这是一段很长很长的简介,这是一段很长很长的简介',
      'tag': ['前端', 'JS'],
      'article': '文章正文',
      'add-time': '创建时间',
      'update-time': '更新时间',
      'count': 20,
      'likes': 14,
      'is-like': false,
      'comments': 12,
      'is-comment': false,
    },
    {
      'id': '005',
      'author': 'Kellen',
      'user-icon': '/src/assets/img/Icon.png',
      'title': '如何优雅地写出一个组件',
      'cover': '/src/assets/img/Icon.png',
      'intro': '这是一段很长很长的简介,这是一段很长很长的简介,这是一段很长很长的简介,这是一段很长很长的简介,这是一段很长很长的简介,这是一段很长很长的简介',
      'tag': ['前端', 'JS'],
      'article': '文章正文',
      'add-time': '创建时间',
      'update-time': '更新时间',
      'count': 20,
      'likes': 14,
      'is-like': false,
      'comments': 12,
      'is-comment': false,
    },
    {
      'id': '006',
      'author': 'Kellen',
      'user-icon': '/src/assets/img/Icon.png',
      'title': '如何优雅地写出一个组件',
      'cover': '/src/assets/img/Icon.png',
      'intro': '这是一段很长很长的简介,这是一段很长很长的简介,这是一段很长很长的简介,这是一段很长很长的简介,这是一段很长很长的简介,这是一段很长很长的简介',
      'tag': ['前端', 'JS'],
      'article': '文章正文',
      'add-time': '创建时间',
      'update-time': '更新时间',
      'count': 20,
      'likes': 14,
      'is-like': false,
      'comments': 12,
      'is-comment': false,
    },
    {
      'id': '007',
      'author': 'Kellen',
      'user-icon': '/src/assets/img/Icon.png',
      'title': '如何优雅地写出一个组件',
      'cover': '/src/assets/img/Icon.png',
      'intro': '这是一段很长很长的简介,这是一段很长很长的简介,这是一段很长很长的简介,这是一段很长很长的简介,这是一段很长很长的简介,这是一段很长很长的简介',
      'tag': ['前端', 'JS'],
      'article': '文章正文',
      'add-time': '创建时间',
      'update-time': '更新时间',
      'count': 20,
      'likes': 14,
      'is-like': false,
      'comments': 12,
      'is-comment': false,
    },
  ]
  const [data, setData] = useState(articleList)
  //点赞
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
  const [likes, setLike] = useState(likeList)
  const onClickMenu = ({ key }) => {
    if (key === menuKey) {
      return
    }
    setMenuKey(key)
    console.log(key);

  }

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


  const articleShowJSX = (key) => {
    switch (key) {
      case 'like': return commentLikeJSX()
      case 'comment': return commentContentJSX()
      case 'collect': return collectContentJSX()
      default: return 
    }
  }

  const collectContentJSX = () => (
    data.length ? (
      data.map((item, index) => (
        <ArticleCard
          width={'100%'}
          key={item.id}
          index={index}
          record={item}
          cover={item.cover}
          header={{
            userIcon: item['user-icon'],
            userName: item.author,
            addTime: item['add-time'],
            tags: item.tag,
          }}
          content={{
            title: item.title,
            intro: item.intro,
          }}
          operate={{
            count: item.count,
            likes: item.likes,
            isLike: item['is-like'],
            comments: item.comments,
            isComment: item['is-comment'],
          }}
  
          onClick={onArticleClick}
          onOperateClick={onOperateClick}
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
  
  /**
   * 操作：点赞，评论
   * @param {'comments'|'likes'} type -操作类型
   * @param {number} value  -值
   * @param {number} index  -下标
   * @param {object} record -当前整条数据
   */
  const onOperateClick = (type, value, index, record) => {
    if (type === 'likes') {
      const tempData = cloneDeep(data)
      tempData.forEach((item, _index) => {
        if (_index === index) {
          item['is-like'] = !item['is-like']
          item.likes = item['is-like'] ? value + 1 : value - 1
        }
      })
      setData(tempData)
    }
    else {
      console.log(value);
    }
  }

  /**
   * @desc ArticleCard组件的默认onClick事件会返回点击对象的的value值
   * @param {string} value  - 值
   * @param {object} record - 整条数据
   * @param {'userIcon'|'user'|'tag'|'other'} type - 触发事件的类型：userIcon | user | tag | other
   */
  const onArticleClick = (value, record, type) => {
    console.log('type---',type);
    console.log('value---',value);
    if (value.length) {
      
    } 
    else {
      navigate('/article')
    }
  }

 


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
          {articleShowJSX(menuKey)}
        </div>
      </article>
    </div>
  )
}

export default Message;