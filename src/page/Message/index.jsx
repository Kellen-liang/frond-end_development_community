import React, { Suspense, useState, useRef } from "react";
import styles from './index.module.scss'
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import { Menu } from 'antd'
import ArticleCard from "@/component/ArticleCard";
import CommentCard from "./CommentCard";
import Comment from "@/component/Comment";
import Loading from "@/component/Loading";
import { Empty } from "antd";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons'
import { cloneDeep } from "lodash";




function Message(props) {

  const menu = useRef([
    {
      key: 'like',
      icon: <VideoCameraOutlined />,
      label: '点赞'
    },
    {
      key: 'comment',
      icon: <UploadOutlined />,
      label: '评论'
    },
    {
      key: 'collect',
      icon: <UploadOutlined />,
      label: '收藏'
    },
  ])
  const [menuKey, setMenuKey]= useState(null)
  const onClickMenu = ({ key }) => {
    if (key === menuKey) {
      return
    }
    setMenuKey(key)
    console.log(key);

  }

  
  const articleShowJSX = (key) => {
    switch (key) {
      case 'like': return
      case 'comment': return commentContentJSX()
      case 'collect': return collectContentJSX()
      default: return emptyContentJSX()
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
          key={item.id}
          userIcon={item.userIcon}
          username={item.username}
          replyContent={item.replyContent}
          addTime={item.addTime}
          sourceTitle={item.sourceTitle}
          SourceCover={item.SourceCover}
        />
      ))
    ) : <Empty className={styles.empty}/>
  )

  const emptyContentJSX = () => (
      <Empty className={styles.empty}/>
  )

  //评论
  const ommentList = [
    { 
      id: '001',
      userIcon: '/src/assets/svg/带刀剑士.svg',
      username: 'kellen',
      replyContent: '这是一段回复',
      addTime: '2023-03-26',
      sourceTitle: '如何优雅的写出一个组件',
      SourceCover: '/src/assets/svg/带刀剑士.svg',
    },
    { 
      id: '002',
      userIcon: '/src/assets/svg/带刀剑士.svg',
      username: 'kellen',
      replyContent: '这是一段回复',
      addTime: '2023-03-26',
      sourceTitle: '如何优雅的写出一个组件',
      SourceCover: '/src/assets/svg/带刀剑士.svg',
    },
    { 
      id: '003',
      userIcon: '/src/assets/svg/带刀剑士.svg',
      username: 'kellen',
      replyContent: '这是一段回复',
      addTime: '2023-03-26',
      sourceTitle: '如何优雅的写出一个组件',
      SourceCover: '/src/assets/svg/带刀剑士.svg',
    },
    { 
      id: '004',
      userIcon: '/src/assets/svg/带刀剑士.svg',
      username: 'kellen',
      replyContent: '这是一段回复',
      addTime: '2023-03-26',
      sourceTitle: '如何优雅的写出一个组件',
      SourceCover: '/src/assets/svg/带刀剑士.svg',
    },
  ]
  const [comments, setComments] = useState(ommentList);
 
  


  //收藏
  const navigate = useNavigate()
  
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