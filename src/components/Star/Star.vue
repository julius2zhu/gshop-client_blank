<template>
  <div class="star" :class="'star-'+size">
    <span class="star-item" v-for="(starClass,index) in  starClasses"
          :class="starClass" :key="index">
    </span>
    <!--        <span class="star-item on"></span>-->
    <!--        <span class="star-item on"></span>-->
    <!--        <span class="star-item on"></span>-->
    <!--        <span class="star-item half"></span>-->
    <!--        <span class="star-item off"></span>-->
  </div>
</template>

<script>
  const CLASS_ON = 'on'
  const CLASS_HALF = 'half'
  const CLASS_OFF = 'off'
  export default {
    name: 'Star',
    computed: {
      starClasses () {
        const {score} = this
        const cls = []
        /**数组中只能添加三种类型的class,总个数为5个
         * 可以添加0或者n个on
         * 可以添加0/1个half
         * 可以添加0个或者n个off
         *
         * 举个例子：
         * 3.5   3个on 1个half  1个off
         * 3.2   3个on  0个half 2个off
         */
          //取出整数部分
        const scoreInteger = Math.floor(score)
        for (let i = 0; i < scoreInteger; i++) {
          cls.push(CLASS_ON)
        }
        //向cls中添加0、1个half
        if (score - scoreInteger >= .5) {
          cls.push(CLASS_HALF)
        }
        while (cls.length < 5) {
          cls.push(CLASS_OFF)
        }
        return cls
      }
    },
    props: {
      score: { //评分
        type: Number
      },
      size: {//尺寸大小
        type: Number
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .star //2x图 3x图
    float left
    font-size 0

    .star-item
      display inline-block
      background-repeat no-repeat

    &.star-48
      .star-item
        width 20px
        height 20px
        margin-right 22px
        background-size 20px 20px

        &:last-child
          margin-right: 0

        &.on
          bg-image('./images/star48_on')

        &.half
          bg-image('./images/star48_half')

        &.off
          bg-image('./images/star48_off')

    &.star-36
      .star-item
        width 15px
        height 15px
        margin-right 6px
        background-size 15px 15px

        &:last-child
          margin-right 0

        &.on
          bg-image('./images/star36_on')

        &.half
          bg-image('./images/star36_half')

        &.off
          bg-image('./images/star36_off')

    &.star-24
      .star-item
        width 10px
        height 10px
        margin-right 3px
        background-size 10px 10px

        &:last-child
          margin-right 0

        &.on
          bg-image('./images/star24_on')

        &.half
          bg-image('./images/star24_half')

        &.off
          bg-image('./images/star24_off')

</style>
