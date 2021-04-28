/*所有的网络请求*/
import instance from './index'
import {mockJsInstance} from './index'

/**
 * 获取位置信息
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
// export const getAddress = (params) => instance.get('/position' + params)
/**
 * 获取分类信息
 * @returns {Promise<AxiosResponse<any>>}
 */
// export const getIndexCategory = () => instance.get('/index_category')
/**
 * 获取商家信息
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
// export const getShops = (params) => instance.get('/shops', {params})
/**
 * 根据经纬度和关键词获取商铺信息
 * @param params {geohash,keyword}
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getSearchShops = (params) => instance.get('/search_shops', {params})
/**
 * 通过用户名和密码登录
 * @param params  {name,pwd,captcha}
 * @returns   响应的data数据
 */
export const loginByUsername = (params) => instance.post('/login_pwd', params)

/**
 * 发送短信验证码
 * @param params {phone} 手机号
 * @returns {Promise<AxiosResponse<any>>}
 */
export const sendCode = (params) => instance.get('/sendcode', {params})
/**
 * 根据会话获取用户信息
 * @returns {Promise<AxiosResponse<any>>}
 */
// export const getUserInfo = () => instance.get('/userinfo')
/**
 * 用户登出
 * @returns {Promise<AxiosResponse<any>>}
 */
export const logout = () => instance.get('/logout')

/**
 * 通过mock模拟数据获取goods数据
 */
export const mockGetGoods = () => mockJsInstance.get('/goods')
export const mockGetRatings = () => mockJsInstance.get('/ratings')
export const mockGetInfo = () => mockJsInstance.get('/info')

/*搜索商铺信息,优先搜索商铺,商铺不存在则搜索商品信息*/
export const mockGetSearch = () => mockJsInstance.get('/cname')

/**
 * 获取位置信息
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getAddress = () => mockJsInstance.get('/position')

/**
 * 获取分类信息
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getIndexCategory = () => mockJsInstance.get('/index_category')
/**
 * 获取商家信息
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getShops = () => mockJsInstance.get('/shops')
/**
 * 获取用户信息
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getUserInfo = () => mockJsInstance.get('/userinfo')
