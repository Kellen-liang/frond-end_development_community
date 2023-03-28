import React from "react";
import { Link } from "react-router-dom";
import styles from "./index.module.scss"

function HeaderNav(props) {
  return (
    <header className={styles.headerContainer}>
      <nav className={styles.headerNav}>
        <div className={styles.navLeftBar}>
          <Link to={'/home'}>首页</Link>
        </div>
        <ul className={styles.navRightBar}>
          <li className={styles.search}><input type="text" placeholder="查找"/><div className={styles.searchBtn}></div></li>
          <li><Link to={'/inbox'}>Inbox</Link></li>
          <li><Link to={'/message'}>meseege</Link></li>
          <li><Link to={'/creactionCenter'}>CreactionCenter</Link></li>
          <li><Link to={'/userCenter'}><img src="/src/assets/img/Icon.png" alt=""></img></Link></li>
        </ul>
      </nav>
    </header>
  )
}

export default HeaderNav