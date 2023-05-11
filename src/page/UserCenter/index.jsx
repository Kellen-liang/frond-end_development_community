import React, { useState, useRef, useLayoutEffect } from "react";
import styles from './index.module.scss'
import { Tag, Menu, Empty } from "antd";
import { EditOutlined, PlusOutlined, MailOutlined } from '@ant-design/icons'
import { useLocation, useNavigate } from "react-router-dom"
import ArticleCard from "@/component/ArticleCard";
import SubscribeCard from "./SubscribeCard";
import { resource } from "@/utils/common";

function UserCenter(props) {
  const { state } = useLocation()
  useLayoutEffect(() => {
    setMenuKey(state?.navKey)
  }, [state])

  const navigate = useNavigate()
  const [menuKey, setMenuKey] = useState( state?.navKey )
  const isMime = true
  //文章
  const articleList = [
    {
      'id': '001',
      'author': 'Kellen',
      'user-icon': resource('/img/Icon.png'),
      'title': '如何优雅地写出一个组件',
      'cover': resource('/img/Icon.png'),
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
      'user-icon': resource('/img/Icon.png'),
      'title': '如何优雅地写出一个组件',
      'cover': resource('/img/Icon.png'),
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
    }
  ]
  const [data, setData] = useState(articleList)
  //订阅
  const subscribes = [
    {
      user_id: '001',
      username: 'Kellen',
      user_icon: resource('/img/Icon.png'),
      is_subscribe: 1
    },
    {
      user_id: '002',
      username: 'Coco',
      user_icon: resource('/img/Icon.png'),
      is_subscribe: 1
    },
    {
      user_id: '003',
      username: 'Mike',
      user_icon: resource('/img/Icon.png'),
      is_subscribe: 1
    },
  ]
  const [subscribeList, setSubscribeList] = useState(subscribes)
  //被订阅
  const beSubscribes = [
    {
      user_id: '004',
      username: 'Kellen',
      user_icon: resource('/img/Icon.png'),
      is_subscribe: 0
    },
    {
      user_id: '005',
      username: 'Coco',
      user_icon: resource('/img/Icon.png'),
      is_subscribe: 1
    },
    {
      user_id: '006',
      username: 'Mike',
      user_icon: resource('/img/Icon.png'),
      is_subscribe: 0
    },
  ]
  const [beSubscribeList, setBeSubscribeList] = useState(beSubscribes)
  const menu = useRef([
    {
      key: 'article',
      // icon: <SmileOutlined />,
      label: '文章'
    },
    {
      key: 'like',
      // icon: <SmileOutlined />,
      label: '赞过'
    },
    {
      key: 'collect',
      // icon: <SmileOutlined />,
      label: '收藏'
    },
    {
      key: 'subscribe',
      // icon: <MessageOutlined />,
      label: '关注'
    },
    {
      key: 'beSubscribe',
      // icon: <StarOutlined />,
      label: '粉丝'
    },
  ])

  //事件操作:
  //文章页
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
    console.log('type---', type);
    console.log('value---', value);
    if (value.length) {

    }
    else {
      navigate('/article')
    }
  }

  //<关注><粉丝>页
  /**
   * 
   * @param {string} userName -用户名
   * @param {object} record -当前整条数据
   */
  const onGetuserInfo = (userName, record) => {
    console.log(userName, record);
  }

  /**
   * 
   * @param {boolean} type -是否被激活
   * @param {*} record -当前整条数据
   */
  const onChangeSubscribe = (type, record) => {
    console.log(type, record);
  }

  //内容显示控制：
  //顶部数据用户信息显示
  const showUserInfo = (isMime) => {
    if (isMime) {
      return isMimeInfoJSX()
    }
    else {
      return notMimeInfoJSX()
    }
  }

  const isMimeInfoJSX = () => (
    <>
      <div className={styles.userCard}>
        <section className={styles.userCardLeft}><img src={resource("/svg/带刀剑士.svg")} alt="" /></section>
        <section className={styles.userCardCenter}>
          <h2>Kellen</h2>
          <div className={styles.userInfo}>+ 添加从事的职业</div>
          <div className={styles.userInfo}>+ 添加个性签名</div>
        </section>
        <section className={styles.userCardRight}>
          <div className={styles.editBtn} onClick={() => { navigate('/userCenter/editUserInfo')}}><EditOutlined /> 编辑个人信息</div>
        </section>
      </div>
    </>
  )

  const notMimeInfoJSX = () => (
    <>
      <div className={styles.userCard}>
        <section className={styles.userCardLeft}><img src={resource("/svg/带刀剑士.svg")} alt="" /></section>
        <section className={styles.userCardCenter}>
          <h2>Kellen</h2>
          <div>+ 添加从事的职业</div>
          <div>+ 添加个性签名</div>
        </section>
        <section className={styles.userCardRight}>
          <div className={styles.concernBtn}><PlusOutlined /> 关注</div>
          <div className={styles.inboxBtn} style={{ marginLeft: 20 }}><MailOutlined /> 私信</div>
        </section>
      </div>
    </>
  )

  //主内容显示
  const onClickMenu = ({ key }) => {
    if (key === menuKey) {
      return
    }
    setMenuKey(key)
  }

  const showContent = (key) => {
    switch (key) {
      case 'article': return articleContentJSX()
      case 'like': return articleContentJSX()
      case 'collect': return articleContentJSX()
      case 'subscribe': return subscribeContentJSX()
      case 'beSubscribe': return beSubscribeContentJSX()
      default: return
    }
  }

  const articleContentJSX = () => (
    data.length ? (
      data.map((item, index) => (
        <ArticleCard
          width={'100%'}
          isHaveHoverShadow={false}
          style={{ boxShadow: 'none' }}
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
    ) : <Empty className={styles.empty} />
  )

  const subscribeContentJSX = () => (
    subscribeList.length ? (
      subscribeList.map((item, index) => (
        <SubscribeCard
          key={index}
          record={item}
          userIcon={item.user_icon}
          username={item.username}
          isSubscribe={item.is_subscribe}
          onGetuserInfo={onGetuserInfo}
          onChange={onChangeSubscribe}
        />
      ))
    ) : <Empty className={styles.empty} />
  )

  const beSubscribeContentJSX = () => (
    beSubscribeList.length ? (
      beSubscribeList.map((item, index) => (
        <SubscribeCard
          key={item.user_id}
          record={item}
          userIcon={item.user_icon}
          username={item.username}
          isSubscribe={item.is_subscribe}
          onGetuserInfo={onGetuserInfo}
          onChange={onChangeSubscribe}
        />
      ))
    ) : <Empty className={styles.empty} />
  )

  return (
    <div className={styles.userCenterContainer}>
      <article className={styles.left}>
        {showUserInfo(isMime)}
        <section className={styles.contentCard}>
          <Menu
            style={{ height: '100%' }}
            items={menu.current}
            defaultSelectedKeys={[menuKey]}
            selectedKeys={[menuKey]}
            mode="horizontal"
            onClick={onClickMenu}
          />
          <div className={styles.content}>
            {showContent(menuKey)}
          </div>
        </section>

      </article>
      <aside className={styles.right}>
        <div className={styles.successCard}>
          <h2>个人成就</h2>
          <ul>
            <li><img src={resource("/img/已点赞.png")} alt="" /><span>文章被点赞 3</span></li>
            <li><img src={resource("/img/已查看.png")} alt="" /><span>文章被阅读 512</span></li>
            <li><img src={resource("/img/已评论.png")} alt="" /><span>文章被评论 124</span></li>
          </ul>
        </div>
        <div className={styles.countCard}>
          <div onClick={() => setMenuKey('subscribe')}><span>关注了</span><span className={styles.count}>123</span></div>
          <div onClick={() => setMenuKey('beSubscribe')}><span>关注者</span><span className={styles.count}>123</span></div>
        </div>
      </aside>
    </div>
  )
}

export default UserCenter;