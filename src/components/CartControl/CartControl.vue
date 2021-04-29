<template>
  <!--控制商品的数量加减-->
  <div>
    <van-icon color="green" size="18" name="close" @click.stop="updateFoodCount(false)" v-if="food.count"/>
    <span class="count" v-if="food.count ">
     {{ food.count }}
   </span>
    <van-icon color="green" size="18" name="add" @click.stop="updateFoodCount(true)"/>
  </div>
</template>

<script>
export default {
  props: {
    food: Object
  },
  methods: {
    updateFoodCount (isAdd) {
      this.$store.dispatch('actionUpdateFoodCount', {isAdd, food: this.food})
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixins.styl"

.cart-decrease
  display: inline-block
  padding: 6px
  line-height: 24px
  font-size: 24px
  color: rgb(0, 160, 220)

.icon-remove_circle_outline
  display: inline-block
  padding 6px
  line-height 24px
  font-size 24px
  color $green

  &.move-enter-active, &.move-leave-active
    transition all .3s

  &.move-enter, &.move-leave-to
    opacity 0
    transform translateX(15px) rotate(180deg)

.icon-add_circle
  display: inline-block
  padding: 6px
  line-height: 24px
  font-size: 24px
  color $green
</style>
