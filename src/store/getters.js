/**
 *包含state的getter计算属性的对象
 */
export default {

  /**
   * 购物车总数量
   * @param state
   */
  totalCount (state) {
    /**
     * reduce函数用于遍历数组,数组为空时则不会进行遍历
     * 接收一个函数,total代表要返回的的值,food代表当前遍历的元素,0为初始值
     * 此处则实现计算food中所有count>0的总数量
     */
    return state.cartFoods.reduce((total, food) => total + food.count, 0)
  },
  /**
   * 购物车总价格
   * @param state
   */
  totalPrice (state) {
    return state.cartFoods.reduce((total, food) => total + food.count * food.price, 0)
  },
  /**
   * 计算出评价满意的数量
   * @param state
   * @returns {*}
   */
  positiveSize (state) {
    return state.ratings.reduce((preTotal, rating) => preTotal + (rating.rateType === 0 ? 1 : 0), 0)
  }
}
