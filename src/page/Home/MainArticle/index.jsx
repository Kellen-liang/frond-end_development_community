import React from "react";
import styles from "./index.module.scss"
import ArticleCard from "../../../component/ArticleCard";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cloneDeep } from 'lodash';
import { resource } from "@/utils/common";

function MainArticle({ width, style, onClick}) {

  const navigate = useNavigate()
  
  const articleList = [
    {
      'id': '001',
      'author': 'Kellen',
      'user-icon': '/src/assets/img/Icon.png',
      'title': '如何优雅地写出一个组件',
      'cover': '/src/assets/img/Icon.png',
      'intro': '这是一段很长很长的简介,这是一段很长很长的简介,这是一段很长很长的简介,这是一段很长很长的简介,这是一段很长很长的简介,这是一段很长很长的简介',
      'tag': ['前端', 'JS'],
      'article': '文章正文',
      'add-time': '创建时间',
      'update-time': '更新时间',
      'count': 20,
      'likes': 14,
      'is-like': false,
      'comments': 12,
      'is-comment': false,
    },
    {
      'id': '002',
      'author': 'Kellen',
      'user-icon': '/src/assets/img/Icon.png',
      'title': '如何优雅地写出一个组件',
      'cover': '/src/assets/img/Icon.png',
      'intro': '这是一段很长很长的简介,这是一段很长很长的简介,这是一段很长很长的简介,这是一段很长很长的简介,这是一段很长很长的简介,这是一段很长很长的简介',
      'tag': ['前端', 'JS'],
      'article': '文章正文',
      'add-time': '创建时间',
      'update-time': '更新时间',
      'count': 20,
      'likes': 14,
      'is-like': false,
      'comments': 12,
      'is-comment': false,
    },
    {
      'id': '003',
      'author': 'Kellen',
      'user-icon': '/src/assets/img/Icon.png',
      'title': '如何优雅地写出一个组件',
      'cover': '/src/assets/img/Icon.png',
      'intro': '这是一段很长很长的简介,这是一段很长很长的简介,这是一段很长很长的简介,这是一段很长很长的简介,这是一段很长很长的简介,这是一段很长很长的简介',
      'tag': ['前端', 'JS'],
      'article': '文章正文',
      'add-time': '创建时间',
      'update-time': '更新时间',
      'count': 20,
      'likes': 14,
      'is-like': false,
      'comments': 12,
      'is-comment': false,
    },
  ]
  const [data, setData] = useState(articleList)

  /**
   * 操作：点赞，评论
   * @param {'comments'|'likes'} type -操作类型
   * @param {number} value  -值
   * @param {number} index  -下标
   * @param {object} record -当前整条数据
   */
  const onOperateClick = (type, value, index, record) => {
    if (type === 'likes') {
      const tempData = cloneDeep(data)
      tempData.forEach((item, _index) => {
        if (_index === index) {
          item['is-like'] = !item['is-like']
          item.likes = item['is-like'] ? value + 1 : value - 1
        }
      })
      setData(tempData)
    }
    else {
      console.log(value);
    }
  }

  /**
   * @desc ArticleCard组件的默认onClick事件会返回点击对象的的value值
   * @param {string} value  - 值
   * @param {object} record - 整条数据
   * @param {'userIcon'|'user'|'tag'|'other'} type - 触发事件的类型：userIcon | user | tag | other
   */
  const onArticleClick = (value, record, type) => {
    console.log('type---',type);
    console.log('value---',value);
    if (value.length) {
      
    } 
    else {
      navigate('/article')
    }
  }

  return (
    <div className={styles.mainArticle} style={{width, ...style}}>
      <h1 className={styles.articleHeadline}>
        <span>文章</span>
        <img src={resource('/src/assets/img/ARTICLE.png')} alt="" />
        {/* <img src="/src/assets/img/ARTICLE.png" alt="" /> */}
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