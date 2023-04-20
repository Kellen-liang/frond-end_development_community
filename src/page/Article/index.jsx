import React from "react";
import styles from "./index.module.scss";
import Information from "@/component/Information";
import CommentList from "./CommentList";
import { useState, useLayoutEffect, useRef, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MEDitor from '@uiw/react-md-editor';
import { 
  getArticleByid, 
  operateLikeOrCollect, 
  deleteArticle,
  getCommentList,
  createComment,
  createReply,
  deleteComment,
  deleteReply
} from '@/utils/apis'
import { message, Empty } from "antd";
import moment from "moment";
import { AuthContext } from "@/context/authContext";

function Article(props) {
  const [isLike, setIsLike] = useState(false)
  const likeRef = useRef(false)
  const collectRef = useRef(false)
  const [isComment, setIsComment] = useState(false)
  const [isCollect, setIsCollect] = useState(false)
  const [isMine, setIsMine] = useState(true)
  const [data, setData] = useState({})
  const [commentData, setCommentData] = useState([])
  const [userInfo, setUserInfo] = useState({})
  const [commentValue ,setCommentValue] = useState('')

  const { currentUser } = useContext(AuthContext)
  const params = useParams()
  const navigate = useNavigate()

  useLayoutEffect(() => {
    // fetch('/src/assets/md/js基础知识.md')
    //   .then(response => response.text())
    //   .then(text => {
    //     // console.log(text);
    //     setMarkdown(text)
    //   })
    getArticle(params.id)
    getComment(params.id)
    
  }, [])

  
  const getArticle = async (id) => {
    const params = {
      id
    }
    const res = await getArticleByid(params)
    if(!res.data.status) return message.error(res.data?.errmsg || '请求错误')
    setData(res.data?.data)
    const { 
      user_id,
      username,
      user_icon,
      is_like,
      is_collect,
      isMine: flag,
    } = res.data?.data
    setUserInfo({
      user_id,
      username,
      user_icon
    })
    setIsLike(is_like)
    likeRef.current = is_like
    setIsCollect(is_collect)
    collectRef.current = is_collect
    setIsMine(flag)
  }

  const getComment = async (id) => {
    const params = {
      article_id: id
    }
    const res = await getCommentList(params)
    console.log(res);
    if(!res.data.status) return message.error(res.data?.errmsg || '请求错误')
    setCommentData(res.data.data)

  }

  const list = [
    {
      comment_id: 'comment_id-13288923',//评论（回复）唯一id
      article_id: 'article_id-1', //文章id(同一篇文章id相同)
      article_title: '如有优雅的写出一个组件', //文章标题
      user_id: 'user_id-1', //评论（回复）创建者id
      username: 'Kellen', //评论（回复）创建者名
      userIcon: '/src/assets/svg/带刀剑士.svg', //评论（回复）创建者头像
      content: '这是一段评论 ', //评论、回复内容
      addTime: '2020-03-91',  //添加时间
      canDel: 1, //是否可进行删除操作
      reply_comment_list: [
        {
          comment_id: 'comment_id-13288924',//评论（回复）唯一id
          reply_id: 'reply_id-1', //回复id（没有,表示为评论）
          reply_late_id: 'user_id-1',  //回复对象id
          reply_late: 'Kellen', //回复对象名
          user_id: 'user_id-2', //评论（回复）创建者id
          username: 'Coco', //评论（回复）创建者名
          userIcon: '/src/assets/svg/带刀剑士.svg', //评论（回复）创建者头像
          content: '回复Kellen ', //评论、回复内容
          addTime: '2020-03-91',  //添加时间
          canDel: 1
        },
        {
          comment_id: 'comment_id-13288925',//评论（回复）唯一id
          reply_id: 'reply_id-2', //回复id（没有,表示为评论）
          reply_late: 'Coco', //回复对象名
          reply_late_id: 'user_id-2',  //回复对象id
          user_id: 'user_id-3', //评论（回复）创建者id
          username: 'Mike', //评论（回复）创建者名
          userIcon: '/src/assets/svg/带刀剑士.svg', //评论（回复）创建者头像
          content: '这是一段评论 ', //评论、回复内容
          addTime: '2020-03-91',  //添加时间
          canDel: 1
        },
      ]
    },
  ]

  const onChangeLike = async() => {
    likeRef.current = !likeRef.current
    setIsLike(!isLike)
    const data = {
      article_id : params.id,
      operate_type: 'like', 
      operate_code: likeRef.current ? 1 : 0
    }
   
    const res = await operateLikeOrCollect(data)
    if(!res.data.status) {
      message.error(res.data.errmsg ||'请求失败')
    }
  }
  
  const onChangeCollect = async () => {
    collectRef.current = !collectRef.current
    setIsCollect(!isCollect)
    const data = {
      article_id : params.id,
      operate_type: 'collect', 
      operate_code: collectRef.current ? 1 : 0
    }
   
    const res = await operateLikeOrCollect(data)
    if(!res.data.status) {
      message.error(res.data.errmsg ||'请求失败')
    }
  }

  const onEditArticle = () => {
    navigate(`/meditor?id=${data.id}`,)
  }

  const onDeleteArticle = async () => {
    const params = {
      id : data.id
    }
    const res = await deleteArticle(params)
    if (res.data.status) {
      message.success('删除成功')
      navigate('/home')
    }
    else {
      message.error(res.data.errmsg || '请求出错')
    }
  }

  const createNewComment = async (e) => {
    if (e.shiftKey && e.keyCode === 13) {
      e.preventDefault(); //取消事件的默认动作*换行
      const value = e.target.value.trim()
      if (!value.length) return
      const data = {
        article_id: params.id,
        content: value
      }
      const res = await createComment(data)
      if (res.data.status) {
        setCommentValue('')
        getComment(params.id)
      }
      else {
        message.error(res.data.errmsg || '评论请求失败')
      }
    }
  }

  const onGetuserInfo = (username, record) => {
    // console.log('username', username);
    console.log('record', record);
    const { user_id } = record
    navigate(`/userCenter/${user_id}`) 
  }

  const onReply = async (replyLate, replyValue, record) => {
    const { reply_comment_list } = record

    //一级回复
    if (reply_comment_list !== undefined) {
      const data = {
        article_id: params.id,
        content: replyValue,
        comment_id: record.id,
        reply_late_id: record.user_id
      }
      const res = await createReply(data)
      if (res.data.status) {
        getComment(params.id)
      }
      else {
        message.error(res.data.errmsg || '回复请求失败')
      }
    }
    else {
      //二级回复
      const data = {
        article_id: record.article_id,
        content: replyValue,
        comment_id: record.comment_id,
        reply_late_id: record.reply_late_id
      }
      const res = await createReply(data)
      if (res.data.status) {
        getComment(params.id)
      }
      else {
        message.error(res.data.errmsg || '回复请求失败')
      }
    }
  }

  const onDel = async (record) => {
    const { reply_comment_list } = record

    //删除评论
    if (reply_comment_list !== undefined) {
      const res = await deleteComment({id: record.id})
      if (res.data.status) {
        getComment(params.id)
      }
      else {
        message.error(res.data.errmsg || '删除评论请求失败')
      }
    }
    else {
      //删除回复
      const res = await deleteReply({id: record.id})
      if (res.data.status) {
        getComment(params.id)
      }
      else {
        message.error(res.data.errmsg || '删除回复请求失败')
      }
    }
  }


  return (
    <div className={styles.articleContainer}>
      <div className={styles.articleMain}>
        <section className={styles.articleContent}>
          <div className={styles.title}>{data?.article_title}</div>
          <div className={styles.userInfo}>
            <img className={styles.userInfoLeft} src={data?.user_icon} alt="" />
            <div className={styles.userInfoRight}>
              <span>{userInfo?.username}</span>
              <span className={styles.date}>{moment(data?.updatedAt).format('YYYY-MM-DD HH:mm:ss')} · 阅读 {data?.count + 1}</span>
            </div>
          </div>
          {/* <div className={styles.cover}><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/841d0fcd9ec14527806f5b4129e1a9b1~tplv-k3u1fbpfcp-zoom-crop-mark:1512:1512:1512:851.awebp?" alt="" /></div> */}
          { data?.article_cover && <div className={styles.cover}><img src={data?.article_cover} alt="" /></div>}
          <MEDitor.Markdown  // 文本展示
            source={data?.article_content}
          />
        </section>
        <section className={styles.articleComment}>
          <div className={styles.articleCommentTop}>
            <h1>评论</h1>
            <div className={styles.articleCommentUser}>
              <img src={currentUser.user_icon} alt="" />
              <textarea 
                name="" 
                id="" 
                cols="30" 
                rows="3" 
                placeholder="输入评论，Shift + Enter键发送"
                value={commentValue}
                onChange={(e) => setCommentValue(e.target.value.trim())}
                onKeyDown={(e) => createNewComment(e)}
              ></textarea>
            </div>
          </div>
          <div className={styles.articleCommentList}>
            <h1>全部评论</h1>
            {
              commentData.length 
              ? commentData.map(item => (
                <CommentList
                  key={item.id}
                  commentId={item.id}
                  username={item.username}
                  userIcon={item.user_icon}
                  content={item.content}
                  addTime={moment(item.createdAt).format('YYYY-MM-DD')}
                  replyCommentList={item.reply_comment_list}
                  canDel={item.isMine}
                  record={item}
                  onGetuserInfo={onGetuserInfo}
                  onReply={onReply}
                  onDel={onDel}
                />
              ))
              : <Empty/>
            }
          </div>
        </section>
      </div>
      <ul className={styles.articleBar}>
        <li onClick={onChangeLike}><img src={isLike ? '/src/assets/img/已点赞.png' : '/src/assets/img/未点赞.png'} alt="" /></li>
        <li onClick={() => setIsComment(!isComment)}><img src={isComment ? '/src/assets/img/已评论.png' : '/src/assets/img/未评论.png'} alt="" /></li>
        <li onClick={onChangeCollect}><img src={isCollect ? '/src/assets/svg/已收藏.svg' : '/src/assets/svg/未收藏.svg'} alt="" /></li>
        <li style={{display: isMine ? 'block' : 'none'}} onClick={onEditArticle}><img src='/src/assets/svg/编辑.svg' alt="" /></li>
        <li style={{display: isMine ? 'block' : 'none'}} onClick={onDeleteArticle}><img src='/src/assets/svg/删除.svg' alt="" /></li>
      </ul>
      <Information width={'26%'} />
    </div>
  )
}

export default Article;