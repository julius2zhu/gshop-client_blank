// const Mock = require('mockjs'),该种方式也可以
//引入mockjs
import Mock from 'mockjs'
//引入自制json数据
import data from './data.json'

Mock.mock('/goods', {code: 0, data: data.goods})
Mock.mock('/ratings', {code: 0, data: data.ratings})
Mock.mock('/info', {code: 0, data: data.info})
