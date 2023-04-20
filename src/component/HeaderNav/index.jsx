import React , { useContext }from "react";
import { Link, useNavigate } from "react-router-dom";
import { Popover } from "antd"
import styles from "./index.module.scss"
import { AuthContext } from "@/context/authContext";


function HeaderNav(props) {
  
  
  const navigate = useNavigate()
  const { logout, currentUser } = useContext(AuthContext)
  const onPushUserCenter = (e) => {
    const type = e.target.dataset.type
    if (!type) return 

    switch (type) {
      case 'mine': navigate(`/userCenter/${currentUser.id}`, {state: {navKey: 'article'}})
        break;
      case 'subscribe': navigate(`/userCenter/${currentUser.id}`, {state: {navKey: 'subscribe'}})
        break;
      case 'like': navigate(`/userCenter/${currentUser.id}`, {state: {navKey: 'like'}})
        break;
      case 'collect': navigate(`/userCenter/${currentUser.id}`, {state: {navKey: 'collect'}})
        break;
      default:
        break;
    }
  }

  const onLogOut = async () => {
    const res = await logout()
    console.log(res);
    navigate('/login')
  }
  
  
  const content = () => (
    <div className={styles.userInfoPopover} onClick={onPushUserCenter}>
      <section className={styles.userInfoPopoverHeader}>
        <img src={currentUser?.user_icon || "/src/assets/img/Icon.png"} alt="" />
        <span>{currentUser?.username}</span>
      </section>
      <section className={styles.userInfoPopoverNav}>
        <div data-type='subscribe'><span>0</span><span>关注</span></div>
        <div data-type='like'><span>{currentUser?.likeCount || 0}</span><span>赞过</span></div>
        <div data-type='collect'><span>{currentUser?.collectCount || 0}</span><span>收藏</span></div>
      </section>
      <section className={styles.userInfoPopoverFooter}>
        <div data-type='mine'>个人中心</div>
        <div onClick={onLogOut}>退出登录</div>
      </section>
    </div>
  )

  return (
    <header className={styles.headerContainer}>
      <nav className={styles.headerNav}>
        <div className={styles.navLeftBar}>
          <Link to={'/home'}><img src="/src/assets/img/标题.png" alt=""></img></Link>
        </div>
        <ul className={styles.navRightBar}>
          <li className={styles.search}>
            {/* <input type="text" placeholder="查找" onChange={(e) => setValue(e.target.value?.trim())}/>
            <div className={styles.searchBtn} onClick={sendData}></div> */}
          </li>
          <li><Link to={'/inbox'}>Inbox</Link></li>
          <li><Link to={'/message'}>meseege</Link></li>
          <li><Link to={'/creactionCenter'}>CreactionCenter</Link></li>
          <li>
            <Popover 
              trigger="click" 
              placement="bottom" 
              content={content} 
              arrow={false}
            >
              <img src="/src/assets/img/Icon.png" alt=""></img>
            </Popover>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default HeaderNav