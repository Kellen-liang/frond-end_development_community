import React, { useState, useRef, useLayoutEffect } from "react";
import styles from './index.module.scss'
import { Menu, Empty } from "antd";
import { EditOutlined } from '@ant-design/icons'
import { useLocation, useNavigate, useParams } from "react-router-dom"
import ArticleCard from "@/component/ArticleCard";
import SubscribeCard from "./SubscribeCard";
import { 
  getArticleByUserId, 
  getLikeList, 
  getCollectList,
  getUserInfo
} from "@/utils/apis";
import moment from "moment";
import { cloneDeep } from "lodash";
 

function UserCenter(props) {
  const { state } = useLocation()
  const navigate = useNavigate()
  const params = useParams()
  const userIdRef = useRef('')
  const [userInfo, setUserInfo] = useState([])
  const [articelData, setArticelData] = useState([])
  const [likeArticelData, setLikeArticelData] = useState([])
  const [colletArticelData, setColletArticelData] = useState([])
  const [menuKey, setMenuKey] = useState( state?.navKey )
  const [isMime, setIsMine] = useState(false)
  

  useLayoutEffect(() => {
    setMenuKey(state?.navKey)
    
    const id = params.id
    userIdRef.current = id
    getUserInfoById(id)
    getArticle(id)
    getLikes(id)
    getCollects(id)

  }, [state])
 

  const getUserInfoById = async (id) => {
    const params = { id }
    const res = await getUserInfo(params)
    setUserInfo(res.data.data)
    setIsMine(res.data.data.isMine)
    console.log(res);
  }

  const getArticle = async (id) => {
    const params = { id }
    const res = await getArticleByUserId(params)
    setArticelData(res.data.data)
  }

  const getLikes = async (id) => {
    const params = { id }
    const res = await getLikeList(params)
    setLikeArticelData(res.data.data)
  }

  const getCollects = async (id) => {
    const params = { id }
    const res = await getCollectList(params)
    setColletArticelData(res.data.data)
  }

  //订阅
  const subscribes = [
    {
      user_id: '001',
      username: 'Kellen',
      user_icon: '/src/assets/img/Icon.png',
      is_subscribe: 1
    },
    {
      user_id: '002',
      username: 'Coco',
      user_icon: '/src/assets/img/Icon.png',
      is_subscribe: 1
    },
    {
      user_id: '003',
      username: 'Mike',
      user_icon: '/src/assets/img/Icon.png',
      is_subscribe: 1
    },
  ]
  const [subscribeList, setSubscribeList] = useState(subscribes)
  //被订阅
  const beSubscribes = [
    {
      user_id: '004',
      username: 'Kellen',
      user_icon: '/src/assets/img/Icon.png',
      is_subscribe: 0
    },
    {
      user_id: '005',
      username: 'Coco',
      user_icon: '/src/assets/img/Icon.png',
      is_subscribe: 1
    },
    {
      user_id: '006',
      username: 'Mike',
      user_icon: '/src/assets/img/Icon.png',
      is_subscribe: 0
    },
  ]
  const [beSubscribeList, setBeSubscribeList] = useState(beSubscribes)
  const menu = useRef([
    {
      key: 'article',
      label: '文章'
    },
    {
      key: 'like',
      label: '赞过'
    },
    {
      key: 'collect',
      label: '收藏'
    },
    // {
    //   key: 'subscribe',
    //   label: '关注'
    // },
    // {
    //   key: 'beSubscribe',
    //   label: '粉丝'
    // },
  ])

  //事件操作:
  //文章页
  /**
   * 操作：点赞，评论
   * @param {'comments'|'likes'} type -操作类型
   * @param {number} value  -值
   * @param {boolean} selected  -是否已经选择
   * @param {number} index  -下标
   * @param {object} record -当前整条数据
   */
  const onOperateClick = async (type, value, selected, index, record) => {
    if (type === 'likes') {
      
    }
    else {
      const { id } = record 
      navigate(`/article/${id}`,) 
    }
  }

  /**
   * @desc ArticleCard组件的默认onClick事件会返回点击对象的的value值
   * @param {string} value  - 值
   * @param {object} record - 整条数据
   * @param {'userIcon'|'user'|'tag'|'other'} type - 触发事件的类型：userIcon | user | tag | other
   */
  const onArticleClick = (value, record, type) => {
    if (type === 'user' || type === 'userIcon') {
      const { user_id } = record 
      console.log(user_id);
      navigate(`/userCenter/${user_id}`)      
    }
    else {
      const { id } = record
      navigate(`/article/${id}`,)     
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
        <section className={styles.userCardLeft}><img src={userInfo.user_icon} alt="" /></section>
        <section className={styles.userCardCenter}>
          <h2>{userInfo?.username || ''}</h2>
          <div 
            className={styles.userInfo}
            onClick={() => { navigate(`/userCenter/editUserInfo/${userIdRef.current}`)}}
          >
            {userInfo?.posts ? userInfo?.posts : '+ 添加从事的职业'}
          </div>
          <div 
            className={styles.userInfo}
            onClick={() => { navigate(`/userCenter/editUserInfo/${userIdRef.current}`)}}
          >
            {userInfo?.introduction ? userInfo?.introduction : '+ 添加个性签名'}
          </div>
        </section>
        <section className={styles.userCardRight}>
          <div className={styles.editBtn} onClick={() => { navigate(`/userCenter/editUserInfo/${userIdRef.current}`)}}><EditOutlined /> 编辑个人信息</div>
        </section>
      </div>
    </>
  )

  const notMimeInfoJSX = () => (
    <>
      <div className={styles.userCard}>
        <section className={styles.userCardLeft}><img src={userInfo.user_icon} alt="" /></section>
        <section className={styles.userCardCenter}>
          <h2>{userInfo?.username || ''}</h2>
          <div>{userInfo?.posts ? userInfo?.posts : '没有职业描述'}</div>
          <div>{userInfo?.introduction ? userInfo?.introduction : '+ 没有个性签名'}</div>
        </section>
        {/* <section className={styles.userCardRight}>
          <div className={styles.concernBtn}><PlusOutlined /> 关注</div>
          <div className={styles.inboxBtn} style={{ marginLeft: 20 }}><MailOutlined /> 私信</div>
        </section> */}
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
      case 'like': return likeArticleContentJSX()
      case 'collect': return collectArticleContentJSX()
      case 'subscribe': return subscribeContentJSX()
      case 'beSubscribe': return beSubscribeContentJSX()
      default: return
    }
  }

  const articleContentJSX = () => (
    articelData.length ? (
      articelData.map((item, index) => (
        <ArticleCard
          width={'100%'}
          isHaveHoverShadow={false}
          style={{ boxShadow: 'none' }}
          key={item.id}
          index={index}
          record={item}
          cover={item.article_cover}
          header={{
            userIcon: item.user_icon,
            userName: item.username,
            addTime: moment(item.updatedAt).format('YYYY-MM-DD'),
            tags: item.tag.split(','),
          }}
          content={{
            title: item.article_title,
            intro: item.article_intro,
          }}
          operate={{
            count: item?.count || 0,
            likes: item?.likes || 0,
            comments: item?.comment_count || 0,
            isLike: item?.is_like || false,
            isComment: item.is_comment || false,
          }}

          onClick={onArticleClick}
          onOperateClick={onOperateClick}
        />
      ))
    ) : <Empty className={styles.empty} />
  )

  const likeArticleContentJSX = () => (
    likeArticelData.length ? (
      likeArticelData.map((item, index) => (
        <ArticleCard
          width={'100%'}
          isHaveHoverShadow={false}
          style={{ boxShadow: 'none' }}
          key={item.id}
          index={index}
          record={item}
          cover={item.article_cover}
          header={{
            userIcon: item.user_icon,
            userName: item.username,
            addTime: moment(item.updatedAt).format('YYYY-MM-DD'),
            tags: item.tag.split(','),
          }}
          content={{
            title: item.article_title,
            intro: item.article_intro,
          }}
          operate={{
            count: item?.count || 0,
            likes: item?.likes || 0,
            comments: item?.comment_count || 0,
            isLike: item?.is_like || false,
            isComment: item.is_comment || false,
          }}

          onClick={onArticleClick}
          onOperateClick={onOperateClick}
        />
      ))
    ) : <Empty className={styles.empty} />
  )

  const collectArticleContentJSX = () => (
    colletArticelData.length ? (
      colletArticelData.map((item, index) => (
        <ArticleCard
          width={'100%'}
          isHaveHoverShadow={false}
          style={{ boxShadow: 'none' }}
          key={item.id}
          index={index}
          record={item}
          cover={item.article_cover}
          header={{
            userIcon: item.user_icon,
            userName: item.username,
            addTime: moment(item.updatedAt).format('YYYY-MM-DD'),
            tags: item.tag.split(','),
          }}
          content={{
            title: item.article_title,
            intro: item.article_intro,
          }}
          operate={{
            count: item?.count || 0,
            likes: item?.likes || 0,
            comments: item?.comment_count || 0,
            isLike: item?.is_like || false,
            isComment: item.is_comment || false,
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
            <li><img src="/src/assets/img/已点赞.png" alt="" /><span>文章被点赞 {userInfo.countLike || 0}</span></li>
            <li><img src="/src/assets/img/已查看.png" alt="" /><span>文章被阅读 {userInfo.countLook || 0}</span></li>
            <li><img src="/src/assets/img/已评论.png" alt="" /><span>文章被评论 {userInfo.countComment || 0}</span></li>
          </ul>
        </div>
        {/* <div className={styles.countCard}>
          <div onClick={() => setMenuKey('subscribe')}><span>关注了</span><span className={styles.count}>123</span></div>
          <div onClick={() => setMenuKey('beSubscribe')}><span>关注者</span><span className={styles.count}>123</span></div>
        </div> */}
      </aside>
    </div>
  )
}

export default UserCenter;