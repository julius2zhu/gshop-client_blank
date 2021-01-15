<template>
  <div id="app">
    <router-view/>
    <FooterGuide
      v-if="$route.path==='/msite'||$route.path==='/search'
    ||$route.path==='/order'||$route.path==='/profile'"/>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'

  export default {
    name: 'App',
    mounted () {
      // this.$store.dispatch('actionAddress')
      //两种方式均可,别人写的要能看懂
      this.actionAddress()
      this.actionGetCurrentUserInfo()
    },
    methods: {
      ...mapActions(['actionAddress', 'actionGetCurrentUserInfo'])
    },
    components: {
      FooterGuide: () => import('./components/FooterGuide/FooterGuide')
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .app
    width 100%
    height 100%
    background #f5f5f5
</style>
