import React, { Suspense, useState } from "react";
import styles from './index.module.scss'
import { Menu } from 'antd'
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons'
import { Link, Routes, Route } from "react-router-dom";
import { useRef } from "react";
import Comment from "@/component/Comment";



function Message(props) {

  const menu = useRef([
    {
      key: '2',
      icon: <VideoCameraOutlined />,
      label: '点赞'
    },
    {
      key: '3',
      icon: <UploadOutlined />,
      label: '评论'
    },
    {
      key: '4',
      icon: <UploadOutlined />,
      label: '收藏'
    },
  ])
  const menuKey= useRef(null)
  const onClickMenu = ({ key }) => {
    if (key === menuKey.current) {
      return
    }
    menuKey.current = key
    console.log(key);

  }
  console.log(menu.current);


  const [comments, setComments] = useState([
    {
      id: 1,
      avatar: "https://picsum.photos/50",
      author: "Alice",
      content: "这个组件好用极了！",
      createdAt: "2022-03-30T16:12:00.000Z",
      replies: [
        {
          id: 2,
          avatar: "https://picsum.photos/50",
          author: "Bob",
          content: "同意！",
          createdAt: "2022-03-30T16:13:00.000Z",
        },
      ],
    },
    {
      id: 3,
      avatar: "https://picsum.photos/50",
      author: "Charlie",
      content: "我觉得还可以再改进一下。",
      createdAt: "2022-03-30T16:14:00.000Z",
      replies: [],
    },
  ]);
  
  

  const handleAddComment = (newComment) => {
    setComments([...comments, newComment]);
  };


  return (
    <div className={styles.messageContainer}>
      <aside className={`${styles.messageLeft} commonCard`}>
        <Menu
          style={{ height: '100%' }}
          items={menu.current}
          onClick={onClickMenu}
        />
      </aside>
      <article className={`${styles.messageRight} commonCard`}>
        <h1>My React App</h1>
        <Comment onAddComment={handleAddComment} comments={comments} />
      </article>
    </div>
  )
}

export default Message;