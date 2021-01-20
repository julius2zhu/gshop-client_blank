/**
 *通过mutation间接更新state状态
 */
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RESET_USER_INFO,
  RECEIVE_INFO,
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  CLEAR_CART_INFO
} from './mutation_types'
import {
  getAddress, getIndexCategory, getShops, getUserInfo,
  logout, mockGetGoods, mockGetInfo, mockGetRatings
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
  },
  /**
   * 获取当前登录用户的会话信息
   * @param commit
   * @param state
   * @param userInfo
   */
  async actionGetCurrentUserInfo ({commit, state}) {
    const result = await getUserInfo()
    if (result.code === 0) {
      commit(RECEIVE_USER_INFO, {userInfo: result.data})
    }
  },
  /**
   * 重置当前登录用户信息
   * @param commit
   * @param state
   * @returns {Promise<void>}
   */
  async actionRestCurrentUserInfo ({commit, state}) {
    const result = await logout()
    if (result.code === 0) {
      commit(RESET_USER_INFO)
    }
  },
  // 异步获取商家头部信息
  async actionShopInfo ({commit}) {
    const result = await mockGetInfo()
    if (result.code === 0) {
      const info = result.data
      info.score = 3.5
      commit(RECEIVE_INFO, {info})
    }
  },
  // 异步获取商家评价列表
  async actionShopRatings ({commit}, fn) {
    const result = await mockGetRatings()
    if (result.code === 0) {
      commit(RECEIVE_RATINGS, {ratings: result.data})
    }
    fn && fn()
  },
  // 异步获取商家商品列表
  async actionShopGoods ({commit}, fn) {
    const result = await mockGetGoods()
    if (result.code === 0) {
      commit(RECEIVE_GOODS, {goods: result.data})
      //当调用者没有传递回调函数，此处为undefined
      //undefined && undefined 还是为undefined,不加这个操作则会出错
      fn && fn()
    }
  },
  //更新购物车商品数量
  actionUpdateFoodCount ({commit}, {isAdd, food}) {
    if (isAdd) {
      commit(INCREMENT_FOOD_COUNT, {food})
    } else {
      commit(DECREMENT_FOOD_COUNT, {food})
    }
  },
  //清空购物车
  actionClearCart ({commit}) {
    commit(CLEAR_CART_INFO)
  }
}
