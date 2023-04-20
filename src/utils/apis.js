import axios from "axios";
const baseUrl =  'http://localhost:3002/api'


export const createNewArticle = (params) => axios.post(baseUrl + '/article/create', params)

export const getArticle = (params) => axios.get(baseUrl + '/article/getArticle', { params: {...params} })

export const getArticleByid = (params) => axios.get(baseUrl + '/article/getArticle_id', { params: {...params} })

export const getArticleByUserId = (params) => axios.get(baseUrl + '/article/getArticle_user_id', { params: {...params} })

export const deleteArticle = (params) => axios.post(baseUrl + '/article/deleteArticle', params)

export const updataArticle = (params) => axios.post(baseUrl + '/article/updataArticle', params)

export const operateLikeOrCollect = (params) => axios.post(baseUrl + '/likeCollectCount/operate', params)

export const getLikeList = (params) => axios.get(baseUrl + '/likeCollectCount/searchLikeList', { params: {...params} })

export const getCollectList = (params) => axios.get(baseUrl + '/likeCollectCount/searchCollectList', { params: {...params} })

export const getCommentList = (params) => axios.get(baseUrl + '/comment/list', { params: {...params} })

export const createComment = (params) => axios.post(baseUrl + '/comment/create', params)

export const createReply = (params) => axios.post(baseUrl + '/comment/createReply', params)

export const deleteComment = (params) => axios.post(baseUrl + '/comment/deleteComment', params)

export const deleteReply = (params) => axios.post(baseUrl + '/comment/deleteReply', params)

export const getMessageLikeList = (params) => axios.get(baseUrl + '/message/likeList', { params: {...params} })

export const getMessageCommentList = (params) => axios.get(baseUrl + '/message/commentList', { params: {...params} })

export const getUserInfo = (params) => axios.get(baseUrl + '/userCenter/userInfo', { params: {...params} })

export const updataUserInfo = (params) => axios.post(baseUrl + '/user/updataUserInfo', params )

export const updataUserPassword = (params) => axios.post(baseUrl + '/user/updataUserPassword', params )
