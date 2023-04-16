import React from "react";
import styles from "./index.module.scss"
import ArticleCard from "../../../component/ArticleCard";


function MainArticle({ 
  width, 
  style, 
  data, 
  onOperateClick,
  onArticleClick
}) {
  return (
    <div className={styles.mainArticle} style={{width, ...style}}>
      <h1 className={styles.articleHeadline}>
        <span>文章</span>
        <img src="/src/assets/img/ARTICLE.png" alt="" />
      </h1>
      <ul className={styles.articleList}>
        {
          data.map((item, index) => (
            <ArticleCard
              key={item.id}
              isHaveHoverShadow={true}
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
        }
      </ul>
    </div>
  )
}

export default MainArticle