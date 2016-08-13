<template>
  <router-view transition="slide"></router-view>
  <!--吐丝 用于显示错误信息-->
  <toast :show.sync="message.show" type="text">{{message.msg}}</toast>
  <!--用于显示加载框-->
  <loading :show="loading.show" :text="loading.msg"></loading>
  <!--输入身份证弹出层-->
  <popup style="background-color: #f7f7f7;" :show.sync="showIdentityInput">
    <div class="identity_input_container">
      <header>
        <h3>输入身份证后4位</h3>
        <div @click="showIdentityInput = false" class="close_btn">x</div>
      </header>
      <div class="res_container">
        <flexbox class="res">
          <template v-for="n in 4">
            <flexbox-item><div class="item">{{IdentityNums[n]}}</div></flexbox-item>
          </template>
        </flexbox>
      </div>
      <div class="keyboard_container">
        <ul>
          <li>1</li><li>2</li><li>3</li>
          <li>4</li><li>5</li><li>6</li>
          <li>7</li><li>8</li><li>9</li>
          <li>x</li><li>0</li><li class="back_space" @click="IdentityNums.pop()"><i class="iconfont icon-backspace"></i></li>
        </ul>
      </div>
    </div>
  </popup>
</template>

<script>
import { Popup, Flexbox, FlexboxItem, Toast, Loading } from 'vux/src/components'
import TFooter from './components/TFooter'
import store from './store'
export default {
  replace: false,
  components: {
    TFooter, Popup, Flexbox, FlexboxItem, Toast, Loading
  },
  data () {
    return {
      showIdentityInput: false,
      message: {
        show: false,
        msg: '出错了'
      },
      loading: {
        show: false,
        msg: '加载中'
      },
      IdentityNums: [],
      // 学号
      sutdentId: null
    }
  },
  methods: {
    showMessage (msg) {
      this.message.msg = msg
      this.message.show = true
    },
    showLoading (msg) {
      this.loading.msg = msg
      this.loading.show = true
    },
    inputIdentity (number) {
      if (this.IdentityNums.length < 4) {
        this.IdentityNums.push(number)
        if (this.IdentityNums.length === 4) {
          store.login(this.sutdentId, this.IdentityNums.join(''), this).then(res => {
            // 登陆成功
            this.showIdentityInput = false
            this.$route.router.go({name: 'checkinfo'})
          }, res => {
            // 登陆失败
            this.showIdentityInput = false
            this.IdentityNums = []
          })
        }
      }
    }
  },
  ready () {
    let lis = this.$el.querySelectorAll('.keyboard_container>ul>li:not(.back_space)')
    let self = this
    for (let liIndex in lis) {
      if (liIndex !== 'length') {
        lis[liIndex].onclick = function () {
          self.inputIdentity(this.innerHTML)
        }
      }
    }
  }
}
</script>

<style lang="less">
body,h1,h2,h3,p,div,ol,ul,input,button{margin:0;padding:0}body{font-family:Arial, Helvetica, sans-serif;-webkit-text-size-adjust:none;overflow-x:hidden}ol,ul{list-style:none}a{text-decoration:none}input,button,textarea{border:0;border-radius:0;background:transparent;-webkit-appearance:none;-webkit-box-sizing:border-box;box-sizing:border-box}button{outline:none}
html {
  font-family: sans-serif;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
}
@media only screen and (min-width: 414px){
  html {
    font-size: 22.08px !important;
  }
}
@media only screen and (min-width: 400px){
  html {
    font-size: 21.33333333px !important;
  }
}
html {
  font-size: 20px;
}
body{
  background:#f5f5f5;
  font-size: 0.85rem;
  line-height: 1.5;
}
*{
  box-sizing: border-box;
}
//page transition
.fade-transition {
  opacity: 1;
  transition: opacity .3s;
}
.fade-enter, .fade-leave {
  opacity: 0;
}

.slide-transition {
  opacity: 1;
  transform: translate3d(0, 0, 0);
  transition: all .3s;
}
.slide-enter {
  opacity: 0;
  transform: translate3d(50%, 0, 0);
}
.slide-leave {
  opacity: 0;
  transform: translate3d(-50%, 0, 0);
}

.transition-reverse {
  .slide-enter {
    opacity: 0;
    transform: translate3d(-50%, 0, 0);
  }
  .slide-leave {
    opacity: 0;
    transform: translate3d(50%, 0, 0);
  }
}
// page content
.page_content {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
/* 图片字体 */
@font-face {font-family: "iconfont";
  src: url('./assets/fonts/iconfont.eot?t=1470466667'); /* IE9*/
  src: url('./assets/fonts/iconfont.eot?t=1470466667#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('./assets/fonts/iconfont.woff?t=1470466667') format('woff'), /* chrome, firefox */
  url('./assets/fonts/iconfont.ttf?t=1470466667') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
  url('./assets/fonts/iconfont.svg?t=1470466667#iconfont') format('svg'); /* iOS 4.1- */
}

.iconfont {
  font-family:"iconfont" !important;
  font-size:16px;
  font-style:normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
.icon-jiantou:before { content: "\e600"; }
.icon-chuang:before { content: "\e602"; }
.icon-backspace:before { content: "\e601"; }

/* 身份证弹出层 */
.identity_input_container{
  >header{
    position: relative;
    border-bottom: 1px solid #ededed;
    >h3{
      font-weight: 100;
      text-align: center;
      margin: .7rem 0;
    }
    >.close_btn{
      position: absolute;
      left: .7rem;
      top: .1rem;
      padding: 0.1rem 0.6rem;
      &:active{
        background-color: #e1e1e1;
      }
    }
  }
  >.res_container{
    padding: 0 1rem;
    >.res{
      height: 3rem;
      border: 1px #ccc solid;
      border-radius: 5px;
      margin: 1rem 0;
      >.vux-flexbox-item{
        height: 100%;
        line-height: 3rem;
        margin-left: 0!important;
        &:not(:last-child){
          border-right: 1px #e1e1e1 solid;
        }
        >.item{
          font-size: 1.2rem;
          text-align: center;
        }
      }
    }
  }
  >.keyboard_container{
    margin-top: 1.5rem;
    >ul{
      background-color: #fff;
      overflow: hidden;
      >li{
        float: left;
        width: 33.333333%;
        text-align: center;
        border-right: 1px #eee solid;
        border-bottom: 1px #eee solid;
        line-height: 2.3;
        font-size: 1.2rem;
        &:active{
          background-color: #f1f1f1;
        }
        &.back_space{
          background-color: #ddd;
          color: #fff;
          &:active{
            color: #333;
          }
          >i{
            line-height: normal;
            font-size: 1.3rem;
          }
        }
      }
    }
  }
}

</style>
