<template>
  <div class="page_content">
    <t-nav :show-back="false" title="完成报道"></t-nav>
    <p class="info">恭喜你完成报道所有流程，下面是你的基本信息。</p>
    <group>
      <cell title="学号" :value="userInfo.student_num"></cell>
      <cell title="姓名" :value="userInfo.name"></cell>
      <cell title="性别" :value="userInfo.gender_title"></cell>
      <cell title="联系电话" :value="userInfo.tel"></cell>
      <cell title="身份证" :value="userInfo.id_card"></cell>
      <cell title="毕业中学" :value="userInfo.graduate_school"></cell>
      <cell title="报道时间" :value="userInfo.report_time"></cell>
      <cell title="你选择的宿舍" :value="userInfo.dorm_selection?userInfo.dorm_selection.dorm.dorm_num:''"></cell>
    </group>
    <group :title="userInfo.dorm_selection?userInfo.dorm_selection.dorm.dorm_num+ ' 的室友':''">
      <div class="weui_media_box weui_media_text">
        <p class="weui_media_desc">
          <span v-if="roomMates.length === 0">你是第一个选择 {{userInfo.dorm_selection ? userInfo.dorm_selection.dorm.dorm_num : ''}} 宿舍的。过一会在来看看吧。</span>
          <span v-for="mate in roomMates">{{mate.name}}</span>
        </p>
      </div>
    </group>
    <div class="exit_btn"><x-button @click="logOut()" type="warn">退出登陆</x-button></div>
    <t-footer></t-footer>
  </div>
</template>
<script>
  import { Group, Cell, XButton } from 'vux/src/components'
  import TNav from './components/TNav'
  import TFooter from './components/TFooter'
  import store from './store'
  export default{
    components: {
      TNav, Group, Cell, TFooter, XButton
    },
    data () {
      store.getMe(this).then(res => {
        this.userInfo = res.student
        store.getRoomMates(this).then(res => {
          this.roomMates = res
        })
      }, res => {
        if (res.status === 401) {
          this.$route.router.replace({name: 'login'})
        }
      })
      return {
        userInfo: {},
        roomMates: []
      }
    },
    methods: {
      logOut () {
        store.logOut(this).then(res => {
          this.$route.router.replace({name: 'login'})
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .info{
    margin: .5rem 1rem 0 1rem;
    padding: .7rem;
    color: #3c763d;
    background-color: #dff0d8;
    font-size: .65rem;
    text-align: center;
  }
  .weui_media_desc{
    overflow: hidden;
    padding: .2rem;
    >span {
      color: #666;
      font-size: .7rem;
      line-height: 2;
      padding: .2rem;
      float: left;
    }
  }
  .exit_btn{
    padding: 1rem;
  }
</style>
