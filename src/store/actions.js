/**
 *通过mutation间接更新state状态
 */
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS
} from './mutation_types'
import {
  getAddress, getIndexCategory, getShops
} from '../api/api'

export default {
  async actionAddress ({commit, state}) {
    //发送异步请求
    const geohash = '/' + state.latitude + ',' + state.longitude
    const address = await getAddress(geohash)
    //通知state更新状态
    commit(RECEIVE_ADDRESS, {address})
  },
  async actionIndexCategory ({commit}) {
    //发送异步请求
    const categorys = await getIndexCategory()
    //通知state更新状态
    commit(RECEIVE_CATEGORYS, {categorys})
  },
  async actionShops ({commit, state}) {
    const {latitude, longitude} = state
    //发送异步请求
    const shops = await getShops({latitude, longitude})
    //通知state更新状态
    commit(RECEIVE_SHOPS, {shops})
  },
}
