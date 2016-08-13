<template>
<div class="crumb">
  <ul>
    <li v-link="{'name': item.href}" v-for="item in navList">
    {{item.title}}
    </li>
  </ul>
</div>
</template>

<script>
export default {
  props: {
    navList: Array
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="less" scoped>
  .crumb{
    height:2rem;
    background-color: #fff;
    >ul{
      >li{
        font-size: 0.6rem;
        float: left;
        line-height: 2rem;
        padding: 0 0.5rem;
        position: relative;
        color:#666;
        &::after{
          content: '\e600';
          position:absolute;
          font-size: 0.7rem;
          top:0;
          right:-5px;
          color:#ccc;
          font-family:"iconfont" !important;
          font-style:normal;
          -webkit-font-smoothing: antialiased;
          -webkit-text-stroke-width: 0.2px;
          -moz-osx-font-smoothing: grayscale;
        }
      }
    }
  }
</style>