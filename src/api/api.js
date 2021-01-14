/*所有的网络请求*/
import instance from './index'

/**
 * 登录请求
 * @param params 请求参数
 * @returns   响应的data数据
 */
export const login = (params) => instance.get('/login_pwd', {params})

/**
 * 获取位置信息
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getAddress = (params) => instance.get('/position' + params)
/**
 * 获取分类信息
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getIndexCategory = () => instance.get('/index_category')
/**
 * 获取商家信息
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getShops = (params) => instance.get('/shops', {params})
