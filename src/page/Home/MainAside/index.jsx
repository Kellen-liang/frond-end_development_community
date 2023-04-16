import React , { useState } from "react";
import styles from "./index.module.scss"
import { TAG, categoryTag } from "@/utils/common";

const MainAside = ({ width, style, chooseCategory, chooseTag }) => {
  const [ activeCategory, setCategory ] = useState('全部')
  const [ activeTag, setActiveTag ] = useState('全部')

  const _chooseCategory = (e) => {
    const category = e.target.dataset.category
    setCategory(category)
    chooseCategory(category)
  }
TAG
  const _chooseTAG = (e) => {
    const tag = e.target.dataset.tag
    setActiveTag(tag)
    chooseTag(tag)
  }

  return (
    <div className={styles.mainArticleContent} style={{ width, ...style }}>
      <section className={styles.articleCategory}>
        <h1 className={styles.articleCategoryHeadline}>
          <span>种类</span>
          <img src="/src/assets/svg/category-txt.svg" alt="" />
        </h1>
        <ul className={styles.articleCategoryContent}>
          <li 
            data-category='全部'
            className={ activeCategory=== '全部' ? styles.activeCategory : ''}
            onClick={_chooseCategory}
          >
              <i><img src='/src/assets/img/带刀剑士.png' alt="" /></i><span>全部</span>
          </li>
          {categoryTag.map((item, index) => (
            <li 
              key={index}
              data-category={item.value}
              className={ activeCategory === item.value ? styles.activeCategory : ''}
              onClick={_chooseCategory} 
            >
                <i><img src={item.url} alt="" /></i><span>{item.value}</span>
            </li>
          ))}
        </ul>
      </section>
      <section className={styles.articleTag}>
        <h1 className={styles.articleTagHeadline}>
          <span>标签</span>
          <img src="/src/assets/svg/tag-txt.svg" alt="" />
        </h1>
        <ul className={styles.articleTagContent}>
          <li 
            data-tag='全部'
            className={ activeTag === '全部' ? styles.activeTag : ''}
            onClick={_chooseTAG}
          > 
            全部 
          </li>
          {TAG.map((item, index) => (
            <li 
              key={index}
              data-tag={item}
              className={ activeTag === item ? styles.activeTag : ''}
              onClick={_chooseTAG}
            > 
              {item} 
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default MainAside