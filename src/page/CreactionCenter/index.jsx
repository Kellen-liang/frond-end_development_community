import React from "react";
import styles from "./index.module.scss";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Table } from 'antd'

const CreactionCenter = (props) => {
  const navigate = useNavigate()
  const columns = [
    {
      title: '文章标题',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '发布时间',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: '阅览数',
      dataIndex: 'looks',
      key: 'looks',
    },
    {
      title: '点赞数',
      dataIndex: 'likes',
      key: 'likes',
    },
    {
      title: '评论数',
      dataIndex: 'comments',
      key: 'comments',
    },
    {
      title: '收藏数',
      dataIndex: 'collets',
      key: 'collets',
    },
    {
      title: '操作',
      dataIndex: 'operate',
      key: 'operate',
    },
  ];

  const dataSource = [
    // {
    //   key: '1',
    //   name: '胡彦斌',
    //   age: 32,
    //   address: '西湖区湖底公园1号',
    // },
    // {
    //   key: '2',
    //   name: '胡彦祖',
    //   age: 42,
    //   address: '西湖区湖底公园1号',
    // },
    // {
    //   key: '3',
    //   name: '胡彦祖',
    //   age: 42,
    //   address: '西湖区湖底公园1号',
    // },
    // {
    //   key: '4',
    //   name: '胡彦祖',
    //   age: 42,
    //   address: '西湖区湖底公园1号',
    // },
    // {
    //   key: '4',
    //   name: '胡彦祖',
    //   age: 42,
    //   address: '西湖区湖底公园1号',
    // },
    // {
    //   key: '4',
    //   name: '胡彦祖',
    //   age: 42,
    //   address: '西湖区湖底公园1号',
    // },
    // {
    //   key: '4',
    //   name: '胡彦祖',
    //   age: 42,
    //   address: '西湖区湖底公园1号',
    // },
  ];

  const pushEditor = () => {
    const w = window.open('_black') //这里是打开新窗口
    let url = '/meditor'
    w.location.href = url //这样就可以跳转了
  }

  //菜单列表
  const menu = useRef([
    {
      key: 'counts',
      label: '数据统计'
    },
    {
      key: 'articleMamage',
      label: '文章管理'
    },
  ])

  const [menuKey, setMenuKey] = useState('counts')
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
      case 'counts': return countsJSX()
      case 'articleMamage': return articleMamageJSX()
      default: return
    }
  }

  const countsJSX = () => (
    <div className={styles.countsMain}>
      <section className={styles.countsContent}>
        <h1>数据统计</h1>
        <ul className={styles.counts}>
          <li>
            <span>文章总数</span>
            <span>0</span>
          </li>
          <li>
            <span>文章阅读数</span>
            <span>0</span>
          </li>
          <li>
            <span>文章点赞数</span>
            <span>0</span>
          </li>
          <li>
            <span>文章评论数</span>
            <span>0</span>
          </li>
          <li>
            <span>回复评论数</span>
            <span>0</span>
          </li>
          <li>
            <span>文章收藏数</span>
            <span>0</span>
          </li>
        </ul>
      </section>
      <section className={styles.countsArticle}>
        <h1>最近发布</h1>
        <Table
          dataSource={dataSource}
          columns={columns}
        />
      </section>
    </div>
  )

  const articleMamageJSX = () => (
    <div className={styles.articleMain}>
      <h1>文章管理</h1>
      <ul className={styles.articleList}>
        <li>
          <div>
            <span className={styles.title}>前端基础知识</span>
            <div className={styles.info}>
              <span>2020-08-20 15:20</span>
              <span>39阅读</span>
              <span>223点赞</span>
              <span>290评论</span>
              <span>0收藏</span>
            </div>
          </div>
          <div className={styles.operate}>
            <span>编辑</span>
            <span>删除</span>
          </div>
        </li>
      </ul>
    </div>
    // <Empty className={styles.empty}/>
  )

  return (
    <div className={styles.creactionCenterContainer}>
      <div className={styles.left}>
        <div className={styles.createBtn} onClick={pushEditor}>写文章</div>
        <Menu
          items={menu.current}
          defaultSelectedKeys={['counts']}
          onClick={onClickMenu}
        />
      </div>
      <div className={styles.right}>
        {contentShow(menuKey)}
      </div>
    </div>
  )
}

export default CreactionCenter