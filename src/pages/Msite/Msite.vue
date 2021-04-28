<template>
  <section class="msite">
    <!--首页头部-->
    <HeaderTop :title="address">
      <router-link class="header_search" slot="left" to="/search">
        <i class="iconfont icon-sousuo"></i>
      </router-link>
      <router-link class="header_login" slot="right" :to="userInfo._id ? '/userinfo' : '/login'">
        <span class="header_login_text">
           <i class="iconfont icon-person" v-if="userInfo._id"></i>
          <span v-else>登录|注册</span>
        </span>
      </router-link>
    </HeaderTop>
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(categories ,index) in categoriesArr" :key="index">
            <a href="javascript:" class="link_to_food" v-for="(category,index) in categories" :key="index">
              <div class="food_container">
                <img :src="baseImageUrl+category.image_url">
              </div>
              <span>{{category.title}}</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span>附近商家</span>
      </div>
      <ShopList/>
    </div>
  </section>
</template>

<script>
  import Swiper from 'swiper'
  import 'swiper/swiper-bundle.min.css'
  import {mapState} from 'vuex'

  export default {
    data () {
      return {
        // title: '昌平区北七家宏福科技园(337省道北)'
        baseImageUrl: 'https://fuss10.elemecdn.com'
      }
    },
    computed: {
      categoriesArr () {
        const {categorys} = this
        //大的二维数组
        const arr = []
        //每一个滑块里面的数组
        let categoryArr = []
        categorys.forEach(category => {
          //一个滑块中数组已经满了
          if (categoryArr.length === 8) {
            categoryArr = []
          }
          //一个滑块中长度为0添加到大的二维数组中
          if (categoryArr.length === 0) {
            arr.push(categoryArr)
          }
          categoryArr.push(category)
        })
        return arr
      },
      //该种方式也是可以的
      // address () {
      //   return this.$store.state.address
      // },
      ...mapState(['address', 'categorys', 'userInfo'])
    },
    watch: {
      categorys (val) {
        //dom还没更新
        this.$nextTick(() => {
          //dom更新了
          new Swiper('.swiper-container', {
            // direction: 'vertical', // 垂直切换选项
            loop: true, // 循环模式选项
          })
        })
      }
    },
    mounted () {
      //获取数据
      this.$store.dispatch('actionIndexCategory')
      this.$store.dispatch('actionShops')
    },
    components: {
      HeaderTop: () => import('../../components/HeaderTop/HeaderTop'),
      ShopList: () => import('../../components/ShopList/ShopList')
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .msite //首页
    width 100%

    .header_search
      color white
      font-weight bold

    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff

      .swiper-container
        width 100%
        height 100%

        .swiper-wrapper
          width 100%
          height 100%

          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap

            .link_to_food
              width 25%

              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0

                img
                  display inline-block
                  width 50px
                  height 50px

              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666

        .swiper-pagination
          > span.swiper-pagination-bullet-active
            background #02a774

    .msite_shop_list
      top-border-1px(#e4e4e4)
      margin-top 10px
      background #fff

      .shop_header
        padding 10px 10px 0

        .shop_icon
          margin-left 5px
          color #999

        .shop_header_title
          color #999
          font-size 14px
          line-height 20px
</style>
