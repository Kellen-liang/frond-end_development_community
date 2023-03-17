import React from "react";
import styles from "./index.module.scss"
import Information from "../../component/Information";

function Article(props) {
  return (
    <div className={styles.articleContainer}>
      <div className={styles.articleMain}>
        <section className={styles.articleContent}></section>
        <section className={styles.articleComment}>
          <div className={styles.articleCommentTop}>
            <h1>评论</h1>
            <div className={styles.articleCommentUser}>
              <img src="/src/assets/img/白梅.png" alt=""/>
              <textarea name="" id="" cols="30" rows="3"></textarea>
            </div>
          </div>
          <div className={styles.articleCommentList}></div>
        </section>
      </div>
      <Information width={'25%'}/>
    </div>
  )
}

export default Article;