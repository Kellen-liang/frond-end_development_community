import React from "react";
import MainAside from './MainAside'
import ArticleCard from "@/component/ArticleCard";
import Information from "../../component/Information";
import styles from "./index.module.scss"
import { useState, useLayoutEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { cloneDeep, tap } from 'lodash';
import { getArticle } from "@/utils/apis";
import { Empty } from "antd";
import { message } from "antd";

const Home = (props) => {
  const [value, setValue] = useState('')
  const [data, setData] = useState([])
  const navigate = useNavigate()

  useLayoutEffect(()=> {
    // initData()
  },[])

  

  const initData = async () => {
    const params = {
      article_title: value
    }

    const res = await getArticle(params)
    console.log(res);
    if(res.data?.status) {
      message.success('查询成功')
      setData(res.data.data)
    }
    else {
      message.error(res.data.errmsg)
    }
  }

  const chooseCategory = (category) => {
    console.log(category);
  }
  const chooseTag = (tag) => {
    console.log(tag);
  }

  /**
   * @desc ArticleCard组件的默认onClick事件会返回点击对象的的value值
   * @param {string} value  - 值
   * @param {object} record - 整条数据
   * @param {'userIcon'|'user'|'tag'|'other'} type - 触发事件的类型：userIcon | user | tag | other
   */
  const onArticleClick = (value, record, type) => {
    console.log('type---', type);
    console.log('value---', value);
    if (value.length) {

    }
    else {
      navigate('/article')
    }
  }

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
          <input type="text" placeholder="输入需要查找的文章标题" onChange={(e) => setValue(e.target.value?.trim())}/>
          <div className={styles.searchBtn} onClick={initData}></div>
        </div>
      </section>
      <section className={styles.mianContent}>
        <MainAside
          width={'20%'}
          chooseCategory={chooseCategory}
          chooseTag={chooseTag}
        />
        <div className={styles.mainArticle} >
          <h1 className={styles.articleHeadline}>
            <span>文章</span>
            <img src="/src/assets/img/ARTICLE.png" alt="" />
          </h1>
          <ul className={styles.articleList}>
            {
              data.length > 0 ? (
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
              ) : 
              <div className={styles.noData}><Empty></Empty></div>
            }
          </ul>
        </div>

        {/* <MainArticle 
          width={'60%'}
          data={data}
          onOperateClick={onOperateClick}
          onArticleClick={onArticleClick}
        /> */}
        <Information width={'20%'} />
      </section>
    </div>
  )
}

export default Home