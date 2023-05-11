import React from "react";
import styles from "./index.module.scss";
import { resource } from "@/utils/common";
/**
 * 
 * @param {object} props
 * @param {CSSProperties} props.style -自定义样式
 * @param {boolean} props.isHaveHoverShadow -是否显示hover样式
 * @param {number} props.width -卡片宽度 
 * @param {number|string} props.index -唯一标识
 * @param {object} props.record -Item
 * @param {string} props.cover -封面
 * @param {object} props.header -头部信息
 * @param {string} props.header.userIcon  -头像
 * @param {string} props.header.userName  -用户名
 * @param {string} props.header.addTime -添加时间
 * @param {string[]} props.header.tags  -tag列表
 * @param {object} props.content  -内容信息
 * @param {object} props.content.title  -内容标题
 * @param {object} props.content.intro  -内容简介
 * @param {object} props.operate  -操作信息
 * @param {number} props.operate.count  -观看数
 * @param {number} props.operate.likes  -点赞数
 * @param {boolean} props.operate.isLike -是否点赞
 * @param {number} props.operate.comments  -评论数
 * @param {boolean} props.operate.isComment -是否评论
 * @returns {JSX.Element}
 */
function ArticleCard(props) {
  const index = props.index
  const cover = props.cover ||  resource('/img/Icon.png')
  const record = props.record

  const header = {
    userIcon: resource('/img/Icon.png'),
    userName: 'Kellen',
    addTime: '',
    tags: [],
  }

  const content = {
    title: '',
    intro: '',
  }

  const operate = {
    count: 0,
    likes: 0,
    isLike: false,
    comments: 0,
    isComment: false
  }

  Object.assign(header, props.header)
  Object.assign(content, props.content)
  Object.assign(operate, props.operate)


  //底部点赞、评论点击事件
  const _onOperateClick = (e) => {
    //阻止事件冒泡
    e.stopPropagation();
    //阻止原始事件冒泡
    e.nativeEvent.stopImmediatePropagation();
    //触发事件的元素
    const eventElement = e.target.nodeName.toLowerCase()
    //触发事件的类型：likes | comments
    const type = e.target.dataset.type
    const value = Number(e.target.innerText)
    if (eventElement === 'li') {
      props.onOperateClick(type, value, index, record)
    }
    else {
      return
    }
  }


  //默认点击事件
  const _onClick = (e) => {
    e.stopPropagation();
    //阻止原始事件冒泡
    e.nativeEvent.stopImmediatePropagation();
    let value = ''
    const eventElement = e.target.nodeName.toLowerCase()
    //触发事件的类型：userIcon | user | tag | other
    const type = e.target.dataset.type
    if (type === 'userIcon') {
      value = e.target.dataset.userName
    }

    if (type === 'user' || type === 'tag') {
      value = e.target.innerText
    }
    
    props.onClick(value , record, type)
  }
  return (
    <li className={`${styles.articleItem} ${props.isHaveHoverShadow ? styles.isHaveHoverShadow : styles.isNotHaveHoverShadow}`} onClick={(e) => _onClick(e)} style={{width: props.width , ...props.style}}>
      <section className={styles.articleItemLeft}>
        <ul className={styles.articleInfo}>
          <li><img data-type='userIcon' data-user-name={header?.userName} className={styles.userIcon} src={header?.userIcon} alt="" /></li>
          <li><span data-type='user' className='push'>{header?.userName}</span></li>
          <li><span style={{ color: 'rgb(134, 144, 168)' }}>{header?.addTime}</span></li>
          {
            header?.tags.length ? (
              <li>
                {header?.tags.map((i, k) => <span data-type='tag' className={`push ${styles.articleTag}`} key={k}>{i}</span>)}
              </li>
            ) : null
          }

        </ul>
        <h2>{content.title}</h2>
        <p>{content.intro}</p>
        <ul
          data-type='operate'
          className={styles.userOperate}
          onClick={(e) => _onOperateClick(e)}
        >
          <li><img src={resource('/img/未查看.png')} alt="" /><span>{operate.count}</span></li>
          <li data-type='likes' ><img src={resource(`/img/${operate.isLike ? '已点赞' : '未点赞'}.png`)} alt="" /><span>{operate.likes}</span></li>
          <li data-type='comments' ><img src={resource(`/img/${operate.isComment ? '已评论' : '未评论'}.png`)} alt="" /><span>{operate.comments}</span></li>
        </ul>
      </section>
      <section className={styles.articleItemRight}><img src={cover} alt="" /></section>
    </li>
  )
}


export default ArticleCard