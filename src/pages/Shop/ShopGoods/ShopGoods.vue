<template>
  <!--商家详细页面点餐tab页面-->
  <div>
    <div class="goods">
      <!--左边侧边栏,优惠，折扣等-->
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li class="menu-item" v-for="(good,index) of goods" :key="index"
              :class="{current: index === currentIndex}"
              @click="clickLeftScroll(index)">
        <span class="text bottom-border-1px">
        <img class="icon" :src="good.icon" v-if="good.icon">
        {{good.name}}
        </span>
          </li>
        </ul>
      </div>
      <!--右边商品信息-->
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul>
          <!--边里分类信息-->
          <li class="food-list-hook" v-for="(good,index) of goods" :key="index">
            <h1 class="title"> {{good.name}}</h1>
            <ul>
              <!--每一个分类里面又有一些商品信息-->
              <li class="food-item bottom-border-1px" v-for="(food,index) of good.foods" :key="index"
                  @click="showFoodDetail(food)">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售 {{food.sellCount}} 份</span>
                    <span>好评率 {{food.rating}}%</span></div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food"/>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <!--购物车-->
      <ShopCart/>
      <!--点击查看详细商品信息-->
      <Food v-if="isShowFood" :food="food" @closeFoodDetail="closeFoodDetail"/>
    </div>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import BScroll from '@better-scroll/core'
  import Shop from '../Shop'

  export default {
    name: 'ShopGoods',
    data () {
      return {
        scrollY: 0,
        tops: [],
        food: {},
        isShowFood: false
      }
    },
    mounted () {
      //异步获取数据
      this.actionShopGoods(() => {
        //后台数据重新获取更新dom显示之后执行
        this.$nextTick(() => {
          this.initLeftScroll()
          this.initRightScroll()
          let top = 0
          //存放所有坐标信息
          const tops = []
          tops.push(top)
          //获取所有的子标签,返回一个伪数组
          const tag = this.$refs['foodsWrapper'].getElementsByClassName('food-list-hook')
          //将一个伪数组包装成真数组遍历
          Array.prototype.slice.call(tag).forEach(li => {
            // li.clientHeight当前元素偏离顶部的坐标(Y轴)
            top += li.clientHeight
            tops.push(top)
          })
          //更新状态
          this.tops = tops
        })
      })
    },
    computed: {
      //读取状态
      ...mapState(['goods']),
      currentIndex () {
        const {scrollY, tops} = this
        return tops.findIndex((top, index) => {
          //找到一个值的下标要求大于当前值下标且小于下一个值下标
          return scrollY >= top && scrollY < tops[index + 1]
        })
      }
    },
    methods: {
      /**
       *关闭弹出商品详情页
       */
      closeFoodDetail () {
        this.isShowFood = false
      },
      /**
       * 显示food详细内容,例如配料，轮播图
       * @param  food 显示的内容
       */
      showFoodDetail (food) {
        this.food = food
        this.isShowFood = true
      },
      ...mapActions(['actionShopGoods']),
      //创建左侧滑动组件
      initLeftScroll () {
        new BScroll('.menu-wrapper', {
          //设置可以点击,默认原生的click事件会被better-scroll阻止
          click: true
        })
      },
      //创建右侧滑动组件
      initRightScroll () {
        this.rightScroll = new BScroll('.foods-wrapper', {
          //设置响应级别,0 1 2 3
          probeType: 2
        })
        this.rightScroll.on('scroll', (position) => {
          this.scrollY = Math.abs(position.y)
        })
        this.rightScroll.on('scrollEnd', (position) => {
          this.scrollY = Math.abs(position.y)
        })
      },
      /**
       * 点击左侧滑动组件
       * @param index
       */
      clickLeftScroll (index) {
        const y = this.tops[index]
        this.rightScroll.scrollTo(0, -y, 100)
      }
    },
    components: {
      Shop,
      CartControl: () => import('../../../components/CartControl/CartControl'),
      Food: () => import('../../../components/Food/Food'),
      ShopCart: () => import('../../../components/ShopCart/ShopCart'),
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"
  .goods
    display: flex
    position: absolute
    top: 195px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden

    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7

      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px

        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700

          .text
            border-none()

        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat

        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px

    .foods-wrapper
      flex: 1

      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7

      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))

        &:last-child
          border-none()
          margin-bottom: 0

        .icon
          flex: 0 0 57px
          margin-right: 10px

        .content
          flex: 1

          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)

          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)

          .desc
            line-height: 12px
            margin-bottom: 8px

          .extra
            .count
              margin-right: 12px

          .price
            font-weight: 700
            line-height: 24px

            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)

            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)

          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
