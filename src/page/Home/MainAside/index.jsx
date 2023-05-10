import React from "react";
import styles from "./index.module.scss"
import { TAG } from "@/utils/common";

const Index = ({ width, style }) => {


  const CATEGORY = [
    {
      id: '001',
      url: '/src/assets/img/带刀剑士.png',
      text: '前端'
    },
    {
      id: '002',
      url: '/src/assets/img/带刀剑士.png',
      text: '后端'
    },
    {
      id: '003',
      url: '/src/assets/img/带刀剑士.png',
      text: 'Android'
    },
    {
      id: '004',
      url: '/src/assets/img/带刀剑士.png',
      text: 'IOS'
    },
    {
      id: '005',
      url: '/src/assets/img/带刀剑士.png',
      text: '人工智能'
    },
    {
      id: '006',
      url: '/src/assets/img/带刀剑士.png',
      text: '云计算'
    }
  ]

  return (
    <div className={styles.mainArticleContent} style={{ width, ...style }}>
      <section className={styles.articleCategory}>
        <h1 className={styles.articleCategoryHeadline}>
          <span>种类</span>
          <img src="/src/assets/svg/category-txt.svg" alt="" />
        </h1>
        <ul className={styles.articleCategoryContent}>
          {CATEGORY.map(item => (
            <li key={item.id}><i><img src={item.url} alt="" /></i><span>{item.text}</span></li>
          ))}
        </ul>
      </section>
      <section className={styles.articleTag}>
        <h1 className={styles.articleTagHeadline}>
          <span>标签</span>
          <img src="/src/assets/svg/tag-txt.svg" alt="" />
        </h1>
        <ul className={styles.articleTagContent}>
          {TAG.map((item, index) => <li key={index}> {item} </li>)}
        </ul>
      </section>
    </div>
  )
}

export default Index