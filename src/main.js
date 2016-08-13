import Vue from 'vue'
import App from './App'
// 引入vue-router
import Router from 'vue-router'
// 引入vue-resource
import Resource from 'vue-resource'

// 引入fastclick
import FastClick from 'fastclick'

// 引入Router config 用于路由返回动画
import RouterConfig from './router-config.js'
// 引入 截取字符串 过滤器
import { cutString, fromNow } from './filters'
// 引入BackLink指令 用于返回按钮
import BackLink from './directives/back-link'
// 注册BackLink指令
Vue.directive('back-link', BackLink)
// 注册 截取字符串 过滤器
Vue.filter('cutString', cutString)
Vue.filter('fromNow', fromNow)

// 不允许 vue-devtools 检查代码 开发版
Vue.config.devtools = false
// 关闭调试模式
Vue.config.debug = false

// 使用vue-router
Vue.use(Router)
// 使用vue-resource
Vue.use(Resource)
// Vue.http.options.root = 'http://api.report.dev'
Vue.http.options.root = 'http://report.3twd.cn/api'

// 通过http拦截器设置credentials = true开启cookie跨域
Vue.http.interceptors.push((request, next) => {
  request.credentials = true
  next()
})
// 不以json形式请求
Vue.http.options.emulateJSON = true

const router = new Router()

/**
 * 引入路由所需页面组件
 */
import Login from './Login.vue'
import SelectDorm from './SelectDorm.vue'
import SelectBed from './SelectBed.vue'
import CheckInfo from './CheckInfo.vue'
import ReportOk from './ReportOk.vue'
import Final from './Final.vue'

// 配置路由
router.map({
  '/login': {
    name: 'login',
    component: Login
  },
  '/selectdorm': {
    name: 'selectdorm',
    component: SelectDorm
  },
  '/selectbed': {
    name: 'selectbed',
    component: SelectBed
  },
  '/checkinfo': {
    name: 'checkinfo',
    component: CheckInfo
  },
  '/reportok': {
    name: 'reportok',
    component: ReportOk
  },
  '/final': {
    name: 'final',
    component: Final
  }
})
// 路由后滚动到开始
router.beforeEach(function () {
  window.scrollTo(0, 0)
})
// 重定向
router.redirect({
  '*': '/login'
})
// 开启应用
router.start(App, '#app')

var rc = new RouterConfig(router)
rc.config()

FastClick.attach(document.body)

