import axios from "axios";
const baseUrl =  'http://localhost:3002/api'


export const createNewArticle = (params) => axios.post(baseUrl + '/article/create', params)

export const getArticle = (params) => axios.get(baseUrl + '/article/getArticle', params)

