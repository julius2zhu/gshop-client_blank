/*本地化存储数据工具类*/
/*用户信息*/
const COMMERCE_TOKEN = 'commerce_token'
/*用户信息*/
const TAKE_OUT_USER_INFO = 'TAKE_OUT_USER_INFO'
/**
 * 存储token
 * @param token
 */
export const saveToken = token => window.localStorage.setItem(COMMERCE_TOKEN, JSON.stringify(token))

/**
 * 获取token
 * @returns {any}
 */
export const getToken = () => JSON.parse(window.localStorage.getItem(COMMERCE_TOKEN) || '[]')
/**
 * 存储用户信息
 * @param user
 */
export const saveUser = user => window.localStorage.setItem(TAKE_OUT_USER_INFO, JSON.stringify(user))
/**
 * 获取用户信息
 * @returns {any}
 */
export const getUser = () => JSON.parse(window.localStorage.getItem(TAKE_OUT_USER_INFO) || '[]')

