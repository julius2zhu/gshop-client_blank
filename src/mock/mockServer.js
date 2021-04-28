// const Mock = require('mockjs'),该种方式也可以
//引入mockjs
import Mock from 'mockjs'
//引入自制json数据
import data from './data.json'
import index_category from './index_category.json'
import shops from './shops.json'
// Random.cname()
const arr = []
for (let i = 0; i < 1000; i++) {
  arr.push(Mock.Random.cname())
}

Mock.mock('/cname', {
  data: arr
})

/**
 * 获取位置信息
 */
Mock.mock('/position', {
  code: 0, data: '淮安市清江浦区'

})

/**
 * 首页分类信息
 */
Mock.mock('/index_category', {code: 0, data: index_category})

/**
 * 首页店铺信息
 */
Mock.mock('/shops', {code: 0, data: shops})

/**
 * 商品信息
 */
Mock.mock('/goods', {code: 0, data: data.goods})
/**
 * 评分信息
 */
Mock.mock('/ratings', {code: 0, data: data.ratings})
/**
 * 店铺信息
 */
Mock.mock('/info', {code: 0, data: data.info})
/**
 * 获取用户信息
 */
Mock.mock('/userinfo', {code: 0, data: {}})

