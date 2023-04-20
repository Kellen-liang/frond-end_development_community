import React from "react";
import MainAside from './MainAside'
import ArticleCard from "@/component/ArticleCard";
import Information from "../../component/Information";
import styles from "./index.module.scss"
import { useState, useLayoutEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { cloneDeep } from 'lodash';
import { getArticle, operateLikeOrCollect } from "@/utils/apis";
import { Empty, message } from "antd";
import moment from "moment";


const Home = (props) => {
  const [value, setValue] = useState('')
  const [category, setCategory] = useState('')
  const [tag, setTag] = useState('')
  const [data, setData] = useState([])
  const navigate = useNavigate()

  useLayoutEffect(()=> {
    initData('','')
  },[])

  const initData = async (c_category, c_tag) => {
    const params = {
      article_title: value,
      category: c_category || category,
      tag: c_tag || tag
    }

    if (params.category === '全部') params.category= ''
    if (params.tag === '全部') params.tag= ''

    console.log('req--', params);
    const res = await getArticle(params)
    console.log('res--',res);
    if(res.data?.status) {
      message.success('查询成功')
      setData(res.data.data)
    }
    else {
      message.error(res.data.errmsg)
    }
  }

  const chooseCategory = (category) => {
    console.log('category--',category);
    setCategory(category)
    initData(category)
  }
  const chooseTag = (tag) => {
    console.log('tag--',tag);
    setTag(tag)
    initData('',tag)
  }

  /**
   * @desc ArticleCard组件的默认onClick事件会返回点击对象的的value值
   * @param {string} value  - 值
   * @param {object} record - 整条数据
   * @param {'userIcon'|'user'|'tag'|'other'} type - 触发事件的类型：userIcon | user | tag | other
   */
  const onArticleClick = (value, record, type) => {
    if (type === 'tag' && value.length) {
      setTag(value)
      initData('', value)
    } 
    else if (type === 'user' || type === 'userIcon') {
      const { user_id } = record 
      navigate(`/userCenter/${user_id}`)      
    }
    else {
      const { id } = record 
      navigate(`/article/${id}`,)     
    }
  }

  /**
   * 操作：点赞，评论
   * @param {'comments'|'likes'} type -操作类型
   * @param {number} value  -值
   * @param {boolean} selected  -是否已经选择
   * @param {number} index  -下标
   * @param {object} record -当前整条数据
   */
  const onOperateClick = async (type, value, selected, index, record) => {
    if (type === 'likes') {
      const tempData = cloneDeep(data)
      tempData.forEach((item, i) => {
        if (i === index) {
          item.likes = item.is_like ? value - 1 : value + 1
          item.is_like = !selected
        }
      })
      setData(tempData)
      const params = {
        article_id : record.id,
        operate_type: 'like', 
        operate_code: selected ? 0 : 1
      }
      const res = await operateLikeOrCollect(params)
      if (res.data.status) {
        message.success(res.data.data)
      } 
      else {
        message.error(res.data.errmsg)
      }
    }
    else {
      const { id } = record 
      navigate(`/article/${id}`,) 
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
          <div className={styles.searchBtn} onClick={() => initData('','')}></div>
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
                    cover={item.article_cover}
                    header={{
                      userIcon: item.user_icon,
                      userName: item.username,
                      addTime: moment(item.updatedAt).format('YYYY-MM-DD'),
                      tags: item.tag.split(','),
                    }}
                    content={{
                      title: item.article_title,
                      intro: item.article_intro,
                    }}
                    operate={{
                      count: item?.count || 0,
                      likes: item?.likes || 0,
                      comments: item?.comment_count || 0,
                      isLike: item?.is_like || false,
                      isComment: item.is_comment || false,
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