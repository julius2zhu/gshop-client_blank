// const Mock = require('mockjs'),该种方式也可以
//引入mockjs
import Mock from 'mockjs'
//引入自制json数据
import data from './data.json'

// Random.cname()
const arr = []
for (let i = 0; i < 1000; i++) {
  arr.push(Mock.Random.cname())
}

Mock.mock('/cname', {
  data: arr
})

Mock.mock('/goods', {code: 0, data: data.goods})
Mock.mock('/ratings', {code: 0, data: data.ratings})
Mock.mock('/info', {code: 0, data: data.info})
