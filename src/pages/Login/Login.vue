<template>
  <!--登录页面-->
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">享吃</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on:isSelect}" @click="isSelect=true">短信登录</a>
          <a href="javascript:;" :class="{on:!isSelect}" @click="isSelect=false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form>
          <!--验证码登录-->
          <div :class="{on:isSelect}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
              <button :disabled="!rightButton" class="get_verification"
                      :class="{right_button:rightButton}" @click.prevent="getCode">
                {{ computeTime > 0 ? `已发送${computeTime}s` : '获取验证码' }}
              </button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
            </section>
            <section class="login_hint">
              温馨提示：未注册享吃外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <!--密码登录-->
          <div :class="{on:!isSelect}">
            <section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
              </section>
              <section class="login_verification">
                <input type="text" maxlength="8" placeholder="密码" v-model="pwd" v-if="showPwd">
                <input type="password" maxlength="8" placeholder="密码" v-model="pwd" v-else>
                <div class="switch_button " :class="showPwd===true?'on':'off'" @click="showPwd=!showPwd">
                  <div class="switch_circle" :class="{right:showPwd}"></div>
                  <span class="switch_text">{{ showPwd === true ? 'abc' : '...' }}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha_code">
                <span class="get_verification" ref="captcha" alt="captcha"
                      @click="getCaptcha">{{ captcha }}</span>
              </section>
            </section>
          </div>
          <button class="login_submit" @click.prevent="login">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back">
        <i class="iconfont icon-jiantou2" @click="back('/profile')"></i>
      </a>
    </div>
  </section>
</template>

<script>
import {loginByUsername} from '../../api/api'

export default {
  name: 'Login',
  data () {
    return {
      isSelect: true,//默认是短信登录,false为密码登录
      code: '',//短信验证码
      phone: '',//手机号
      computeTime: 0,//倒计时
      showPwd: false,//是否显示密码,默认不显示
      name: '',//登录用户名
      pwd: '',//密码
      captcha_code: '',//用户输入验证码
      captcha: '',//图片验证码
    }
  },
  computed: {
    rightButton () {
      //以1开头,后面必须是数字且是10位
      return /^1\d{10}$/.test(this.phone)
    }
  },
  methods: {
    /**
     * 动态获图形验证码
     */
    getCaptcha () {
      this.nextCode()
    },
    /**
     * 页面跳转
     */
    back (path) {
      this.$router.replace(path)
    },
    /**
     * 获取验证码
     */
    getCode () {
      //只有当前值没有开始计时
      if (this.computeTime === 0) {
        //开启计时器
        this.computeTime = 30
        const intervalId = setInterval(() => {
          this.computeTime--
          if (this.computeTime === 0) {
            clearInterval(intervalId)
          }
        }, 1000)
      }
    },
    /**
     * 前端登录校验
     */
    login () {
      //判断是手机短信验证码还是账号密码
      //短信登录
      if (this.isSelect) {
        //取出手机号和短信验证码
        const {rightButton, phone, code} = this
        //校验手机号
        if (!rightButton) {
          this.$dialog.alert({message: '手机号输入不正确'})
          //校验验证码,必须是6位数字
        } else if (!/^\d{6}$/.test(code)) {
          this.$dialog.alert({message: '验证码必须是6位数字'})
        }
        //账号密码登录
      } else {
        const {name, pwd, captcha_code} = this
        if (name.length < 1) {
          this.$dialog.alert({message: '用户名必须指定'})
        } else if (pwd.length < 1) {
          this.$dialog.alert({message: '密码必须指定'})
        } else if (captcha_code.length < 1) {
          this.$dialog.alert({message: '验证码必须输入'})
        } else {
          //调用登录请求
          this.loginByUsername()
        }
      }
    },
    /**
     * 账号密码登录
     */
    async loginByUsername () {
      const {name, pwd, captcha_code, captcha} = this
      if (!(captcha.toUpperCase() === captcha_code.toUpperCase())) {
        this.$dialog.alert({message: '验证码输入不一致，请检查!'})
        return
      }
      const result = await loginByUsername({name, pwd, captcha_code})
      if (result.code === 0) {
        const user = result.data
        //将数据保存到vuex中
        await this.$store.dispatch('actionUserInfo', user)
        //去个人中心
        await this.$router.replace('/profile')
      } else {
        //重新获取验证码
        await this.getCaptcha()
        await this.$dialog.alert({message: result.msg})
      }
    },
    /**
     * 生成随机验证码
     */
    nextCode () {
      this.captcha = ''
      // 验证码组成库
      const arrays = ['1', '2', '3', '4', '5', '6', '7', '8',
        '9', '0', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
        'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
        'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G',
        'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
        'U', 'V', 'W', 'X', 'Y', 'Z']
      let code = ''
      for (let i = 0; i < 4; i++) {
        let index = Math.round(Math.random() * arrays.length)
        code += arrays[index]
      }
      this.captcha = code
    }
  },
  mounted () {
    this.nextCode()
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixins.styl"
.loginContainer
  width 100%
  height 100%
  background #fff

  .loginInner
    padding-top 60px
    width 80%
    margin 0 auto

    .login_header
      .login_logo
        font-size 40px
        font-weight bold
        color #02a774
        text-align center

      .login_header_title
        padding-top 40px
        text-align center

        > a
          color #333
          font-size 14px
          padding-bottom 4px

          &:first-child
            margin-right 40px

          &.on
            color #02a774
            font-weight 700
            border-bottom 2px solid #02a774

    .login_content
      > form
        > div
          display none

          &.on
            display block

          input
            width 100%
            height 100%
            padding-left 10px
            box-sizing border-box
            border 1px solid #ddd
            border-radius 4px
            outline 0
            font 400 14px Arial

            &:focus
              border 1px solid #02a774

          .login_message
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff

            .get_verification
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              border 0
              color black
              font-size 14px
              background transparent

              &.right_button
                color black

          .login_verification
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff

            .switch_button
              font-size 12px
              border 1px solid #ddd
              border-radius 8px
              transition background-color .3s, border-color .3s
              padding 0 6px
              width 30px
              height 16px
              line-height 16px
              color #fff
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)

              &.off
                background #fff

                .switch_text
                  float right
                  color #ddd

              &.on
                background #02a774

              > .switch_circle
                //transform translateX(27px)
                position absolute
                top -1px
                left -1px
                width 16px
                height 16px
                border 1px solid #ddd
                border-radius 50%
                background #fff
                box-shadow 0 2px 4px 0 rgba(0, 0, 0, .1)
                transition transform .3s

                &.right //主要这这个地方设置移动
                  transform translateX(30px)

          .login_hint
            margin-top 12px
            color #999
            font-size 14px
            line-height 20px

            > a
              color #02a774

        .login_submit
          display block
          width 100%
          height 42px
          margin-top 30px
          border-radius 4px
          background #4cd96f
          color #fff
          text-align center
          font-size 16px
          line-height 42px
          border 0

      .about_us
        display block
        font-size 12px
        margin-top 20px
        text-align center
        color #999

    .go_back
      position absolute
      top 5px
      left 5px
      width 30px
      height 30px

      > .iconfont
        font-size 20px
        color #999
</style>
