import React from "react";
import MainAside from './MainAside'
import MainArticle from './MainArticle'
import Information from "../../component/Information";
import styles from "./index.module.scss"

const Index = (props) => {
  return (
    <div className={styles.main}>
      <section className={styles.mianHeader}>
        <ul className={styles.imageWall}>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        <div className={styles.search}>
          <input type="text" placeholder="输入需要查找的文章标题" />
          <div className={styles.searchBtn}></div>
        </div>
      </section>
      <section className={styles.mianContent}>
        <MainAside width={'20%'} />
        <MainArticle width={'60%'} />
        <Information width={'20%'} />
      </section>
    </div>
  )
}

export default Index