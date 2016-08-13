<template>
  <div class="page_content">
    <t-nav :show-back="false" title="报道成功"></t-nav>
    <div class="weui_msg">
      <div class="weui_icon_area"><i class="weui_icon_success weui_icon_msg"></i></div>
      <div class="weui_text_area">
        <h2 class="weui_msg_title">报道成功</h2>
        <p class="weui_msg_desc">恭喜你，报道成功！ 接下来你可以选择宿舍</p>
      </div>
      <div class="weui_opr_area">
        <p class="weui_btn_area">
          <a v-link="{name: 'selectdorm'}" class="weui_btn weui_btn_primary">选择宿舍</a>
        </p>
      </div>
    </div>
    <t-footer :position="true"></t-footer>
  <div>
</template>
<script>
  import TNav from './components/TNav'
  import TFooter from './components/TFooter'
  export default {
    data () {
      return {
      }
    },
    components: {
      TNav, TFooter
    }
  }
</script>

<style lang="less" scoped>
  .weui_msg {
    padding-top: 36px;
    text-align: center;
    .weui_icon_area {
      margin-bottom: 30px;
    }
    .weui_text_area {
      margin-bottom: 25px;
      padding: 0 20px;
    }
    .weui_msg_title {
      margin-bottom: 5px;
      font-weight: 400;
      font-size: 20px;
    }
    .weui_msg_desc {
      font-size: 14px;
      color: #888;
    }
  }
  .page_content{
    background-color: #fbf9fe;
  }
</style>
