import React, { Suspense } from "react";
import styles from './index.module.scss'
import { Menu } from 'antd'
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons'
import { Link, Routes, Route } from "react-router-dom";
import { useRef } from "react";


function Message(props) {

  const menu = useRef([
    {
      key: '1',
      icon: <UserOutlined />,
      label: '用户'
    },
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
        haah
      </article>
    </div>
  )
}

export default Message;