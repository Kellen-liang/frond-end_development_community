import React, { useRef } from "react";
import styles from './index.module.scss'
import { Tag, Menu } from "antd";
import { EditOutlined, PlusOutlined, MailOutlined } from '@ant-design/icons'


function UserCenter(props) {
  const isMime = true
  const tagList = ['前端', 'Node']

  const menu = useRef([
    {
      key: 'like',
      // icon: <SmileOutlined />,
      label: '文章'
    },
    {
      key: 'comment',
      // icon: <MessageOutlined />,
      label: '点赞'
    },
    {
      key: 'collect',
      // icon: <StarOutlined />,
      label: '关注'
    },
  ])

  const showUserInfoJSX = (isMime) => {
    if (isMime) {
      return isMimeInfo()
    }
    else {
      return notMimeInfo()
    }
  }

  const isMimeInfo = () => (
    <>
      <div className={styles.userCard}>
        <section className={styles.userCardLeft}><img src="/src/assets/svg/带刀剑士.svg" alt="" /></section>
        <section className={styles.userCardCenter}>
          <h2>Kellen</h2>
          <div className={styles.tagList} >
            {tagList?.map((item, index) => <Tag className={styles.tag} key={index}>{item}</Tag>)}
          </div>
          <div className={styles.userInfo}>+ 添加从事的职业</div>
          <div className={styles.userInfo}>+ 添加个性签名</div>
        </section>
        <section className={styles.userCardRight}>
          <div className={styles.editBtn}><EditOutlined /> 编辑个人信息</div>
        </section>
      </div>
    </>
  )

  const notMimeInfo = () => (
    <>
      <div className={styles.userCard}>
        <section className={styles.userCardLeft}><img src="/src/assets/svg/带刀剑士.svg" alt="" /></section>
        <section className={styles.userCardCenter}>
          <h2>Kellen</h2>
          <div className={styles.tagList} >
            {tagList?.map((item, index) => <Tag className={styles.tag} key={index}>{item}</Tag>)}
          </div>
          <div>+ 添加从事的职业</div>
          <div>+ 添加个性签名</div>
        </section>
        <section className={styles.userCardRight}>
          <div className={styles.concernBtn}><PlusOutlined /> 关注</div>
          <div className={styles.inboxBtn} style={{marginLeft: 20}}><MailOutlined /> 私信</div>
        </section>
      </div>
    </>
  )
  return (
    <div className={styles.userCenterContainer}>
      <article className={styles.left}>
        {showUserInfoJSX(isMime)}
        <section className={styles.contentCard}>
          <Menu
            style={{ height: '100%' }}
            items={menu.current}
            defaultSelectedKeys={['like']}
            mode="horizontal"
            // onClick={onClickMenu}
          />
        </section>
      </article>
      <aside className={styles.right}>
        <div className={styles.successCard}>
          <h2>个人成就</h2>
          <ul>
            <li><img src="/src/assets/img/已点赞.png" alt="" /><span>文章被点赞 3</span></li>
            <li><img src="/src/assets/img/已查看.png" alt="" /><span>文章被阅读 512</span></li>
            <li><img src="/src/assets/img/已评论.png" alt="" /><span>文章被评论 124</span></li>
          </ul>
        </div>
        <div className={styles.countCard}>
          <div><span>关注了</span><span className={styles.count}>123</span></div>
          <div><span>关注者</span><span className={styles.count}>123</span></div>
        </div>
      </aside>
    </div>
  )
}

export default UserCenter;