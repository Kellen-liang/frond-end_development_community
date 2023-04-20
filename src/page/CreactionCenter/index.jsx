import React from "react";
import styles from "./index.module.scss";
import { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Table, message } from 'antd'
import { AuthContext } from "@/context/authContext";
import { getArticleByUserId, getUserInfo, deleteArticle } from "@/utils/apis";
import moment from "moment";
import { Empty } from "antd";
const CreactionCenter = (props) => {
  const [data, setData] = useState([])
  const [statistics, setStatistics] = useState({})
  const currentUserId = useRef('')
  const navigate = useNavigate()
  const { currentUser } = useContext(AuthContext)

  useEffect(() => {
    currentUserId.current = currentUser.id
    getArticle(currentUser.id)
    getArticleStatistics(currentUser.id)
  }, [])

  const columns = [
    {
      title: '文章标题',
      dataIndex: 'article_title',
      key: 'article_title',
    },
    {
      title: '发布时间',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (time) => {
        return <span>{moment(time).format('YYYY-MM-DD')}</span>
      }
    },
    {
      title: '阅览数',
      dataIndex: 'count',
      key: 'count',
    },
    {
      title: '点赞数',
      dataIndex: 'likes',
      key: 'likes',
    },
    {
      title: '评论数',
      dataIndex: 'comment_count',
      key: 'comment_count',
    },
    {
      title: '收藏数',
      dataIndex: 'collects',
      key: 'collects',
    },
    {
      title: '操作',
      dataIndex: 'id',
      key: 'id',
      render: (id, record) => {
        return (
          <div className={styles.tableOperate}>
            <span onClick={() => onEditArticle(id)}>编辑</span>
            <span onClick={() => onDeleteArticle(id)}>删除</span>
          </div>
        )
      }
    },
  ];

  const getArticle = async (id) => {
    const params = { id }
    const res = await getArticleByUserId(params)
    setData(res.data.data)
    console.log(res);
  }

  const getArticleStatistics = async (id) => {
    const params = { id }
    const res = await getUserInfo(params)
    setStatistics(res.data.data)
    console.log(res);

  }

  const pushEditor = () => {
    const w = window.open('_black') //这里是打开新窗口
    let url = '/meditor'
    w.location.href = url //这样就可以跳转了
  }

  const onDeleteArticle = async (id) => {
    const params = {
      id
    }
    const res = await deleteArticle(params)
    if (res.data.status) {
      message.success('删除成功')
      getArticle(currentUserId.current)
    }
    else {
      message.error(res.data.errmsg || '请求出错')
    }
  }

  const onEditArticle = (id) => {
    navigate(`/meditor?id=${id}`,)
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
            <span>{statistics.countArticle}</span>
          </li>
          <li>
            <span>文章阅读数</span>
            <span>{statistics.countLook}</span>
          </li>
          <li>
            <span>文章点赞数</span>
            <span>{statistics.countLike}</span>
          </li>
          <li>
            <span>文章评论数</span>
            <span>{statistics.countComment}</span>
          </li>
          <li>
            <span>回复评论数</span>
            <span>{statistics.countReply}</span>
          </li>
          <li>
            <span>文章收藏数</span>
            <span>{statistics.countCollect}</span>
          </li>
        </ul>
      </section>
      <section className={styles.countsArticle}>
        <h1>最近发布</h1>
        <Table
          dataSource={data}
          columns={columns}
          rowKey={(record) => record.id}
        />
      </section>
    </div>
  )

  const articleMamageJSX = () => (
    <div className={styles.articleMain}>
      <h1>文章管理</h1>
      <ul className={styles.articleList}>
        {data?.length
          ? data.map(item => (
            <li key={item.id}>
              <div>
                <span className={styles.title}>{item.article_title}</span>
                <div className={styles.info}>
                  <span>{moment(item.updatedAt).format('YYYY-MM-DD HH:mm:ss')}</span>
                  <span>{item.count}阅读</span>
                  <span>{item.likes}点赞</span>
                  <span>{item.comment_count}评论</span>
                  <span>{item.collects}收藏</span>
                </div>
              </div>
              <div className={styles.operate}>
                <span onClick={() => onEditArticle(item.id)}>编辑</span>
                <span onClick={() => onDeleteArticle(item.id)}>删除</span>
              </div>
            </li>
          ))
          : <Empty className={styles.empty} />}
      </ul>
    </div>
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