import React from "react";
import MainAside from './MainAside'
import MainArticle from './MainArticle'
import Information from "../../component/Information";
import styles from "./index.module.scss"

const Index = (props) => {
  return (
    <div className={styles.main}>
      <section className={styles.mianHeader}>
      </section>
      <section className={styles.mianContent}>
        <MainAside width={'20%'}/>
        <MainArticle width={'60%'}/>
        <Information width={'20%'}/>
      </section>
    </div>
  )
}

export default Index