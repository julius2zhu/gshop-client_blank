/*封装网络请求*/
/*引入axios*/
import axios from 'axios'
/*创建axios实例对象*/
const instance = axios.create({
  baseURL: '/api',
  timeout: 3000
})

/*请求拦截器*/
instance.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

/*响应拦截器*/
instance.interceptors.response.use(response => {
  return response.data
}, error => {
  return Promise.reject(error)
})

/*对外默认暴露出去*/
export default instance
