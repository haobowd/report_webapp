<template>
  <div class="page_content">
    <t-nav title="确认报道"></t-nav>
    <group>
      <cell title="学号" :value="userInfo.student_num"></cell>
      <cell title="姓名" :value="userInfo.name"></cell>
      <cell title="性别" :value="userInfo.gender_title"></cell>
      <cell title="联系电话" :value="userInfo.tel"></cell>
      <cell title="身份证" :value="userInfo.id_card"></cell>
      <cell title="毕业中学" :value="userInfo.graduate_school"></cell>
    </group>
    <div class="submit_btn"><x-button :text="submitBtn.title" :disabled="submitBtn.disabled" @click="processButton()" type="primary"></x-button></div>
    <t-footer></t-footer>
    <confirm confirm-text="确认" cancel-text="取消" :show.sync="ensureSub" title="提示" @on-cancel="onCancel()" @on-confirm="onConfirm()">
      <p style="text-align:center;">确认报道？</p>
    </confirm>
  </div>
</template>
<script>
  import { Group, Cell, XButton, Confirm } from 'vux/src/components'
  import TFooter from './components/TFooter'
  import TNav from './components/TNav'
  import store from './store'
  export default{
    components: {
      TFooter, TNav, Group, Cell, XButton, Confirm
    },
    data () {
      return {
        userInfo: {},
        // 提交按钮
        submitBtn: {
          title: '确定报道',
          disabled: false
        },
        ensureSub: false
      }
    },
    methods: {
      // 点击提交按钮
      processButton () {
        this.submitBtn.title = '提交中'
        this.submitBtn.disabled = true
        this.ensureSub = true
      },
      onCancel () {
        this.submitBtn.title = '确定报道'
        this.submitBtn.disabled = false
      },
      // 确认报道回调
      onConfirm () {
        store.report(this).then(res => {
          this.$route.router.go({name: 'reportok'})
        })
      }
    },
    ready () {
      // 获取登陆者信息
      store.getMe(this).then(res => {
        this.userInfo = res.student
        if (this.userInfo.is_report === 1 && this.userInfo.whether_has_dorm === 1) {
          // 直接跳转到最终页面
          this.$route.router.go('final')
        } else if (this.userInfo.is_report === 1) {
          // 跳转到登记成功页面
          this.$route.router.go('reportok')
        }
      }, res => {
        if (res.status === 401) {
          this.$route.router.replace({name: 'login'})
        }
      })
    }
  }
</script>

<style scoped lang="less">
  .submit_btn{
    padding: 2rem 1rem;
  }
</style>
