/**
 *通过mutation间接更新state状态
 */
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO
} from './mutation_types'
import {
  getAddress, getIndexCategory, getShops
} from '../api/api'

export default {
  /**
   * 获取地址信息
   * @param commit
   * @param state
   * @returns {Promise<void>}
   */
  async actionAddress ({commit, state}) {
    //发送异步请求
    const geohash = '/' + state.latitude + ',' + state.longitude
    const response = await getAddress(geohash)
    if (response.code === 0) {
      const address = response.data
      //通知state更新状态,对象名称必须是address
      commit(RECEIVE_ADDRESS, {address})
    }
  },
  /**
   * 获取首页食品分类信息
   * @param commit
   * @returns {Promise<void>}
   */
  async actionIndexCategory ({commit}) {
    //发送异步请求
    const result = await getIndexCategory()
    //通知state更新状态
    commit(RECEIVE_CATEGORYS, {categorys: result.data})
  },
  /**
   * 获取商家信息
   * @param commit
   * @param state
   * @returns {Promise<void>}
   */
  async actionShops ({commit, state}) {
    const {latitude, longitude} = state
    //发送异步请求
    const result = await getShops({latitude, longitude})
    //通知state更新状态
    commit(RECEIVE_SHOPS, {shops: result.data})
  },
  /**
   * 同步记录用户信息,不需要再去后台发送请求
   * @param commit
   * @param state
   * @param userInfo
   */
  actionUserInfo ({commit, state}, userInfo) {
    commit(RECEIVE_USER_INFO, {userInfo})
  }

}
