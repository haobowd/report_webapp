<template>
  <div class="footer" :class="{'position': position}">
    &copy; 2016 <a target="_blank" href="http://www.e8net.cn">e8网络</a>
  </div>
</template>
<style scoted lang="less">
  .footer{
    margin: 1.5rem 0;
    font-size: 0.6rem;
    text-align: center;
    width: 100%;
    color:#666;
    >a{
      color:#666;
    }
    &.position{
      position: absolute;
      bottom: 1rem;
      margin: 0;
    }
  }
</style>
<script>
  export default{
    props: {
      position: {
        type: Boolean,
        default: false
      }
    }
  }
</script>
