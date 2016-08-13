<template>
  <div class="footer" :class="{'position': position}">
    &copy; 2016 <a target="_blank" href="http://www.e8net.cn">e8网络</a>
    <a class="gh-btn" id="gh-btn" href="https://github.com/3tnet/report_webapp" target="_blank" aria-label="Star on GitHub"><span class="gh-ico" aria-hidden="true"></span> <span class="gh-text">Star</span></a>
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
      margin-right: 0.2rem;
    }
    &.position{
      position: absolute;
      bottom: 1rem;
      margin: 0;
    }
    .gh-btn {
      position: relative;
      background-color: #eee;
      background-image: -webkit-gradient(linear,left top,left bottom,color-stop(0,#fcfcfc),color-stop(100%,#eee));
      background-image: -webkit-linear-gradient(top,#fcfcfc 0,#eee 100%);
      background-image: -moz-linear-gradient(top,#fcfcfc 0,#eee 100%);
      background-image: -ms-linear-gradient(top,#fcfcfc 0,#eee 100%);
      background-image: -o-linear-gradient(top,#fcfcfc 0,#eee 100%);
      background-image: linear-gradient(to bottom,#fcfcfc 0,#eee 100%);
      filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#fcfcfc', endColorstr='#eeeeee', GradientType=0);
      background-repeat: no-repeat;
      border: 1px solid #d5d5d5;
      padding: 2px 5px 2px 4px;
      color: #333;
      text-decoration: none;
      text-shadow: 0 1px 0 #fff;
      white-space: nowrap;
      cursor: pointer;
      border-radius: 0.15rem;
      &:active{
        background-image:none;
        background-color:#dcdcdc;
        border-color:#b5b5b5;
        box-shadow:inset 0 2px 4px rgba(0,0,0,.15);
      }
      .gh-ico {
        display: block;
        position: absolute;
        width: 0.7rem;
        height: 0.7rem;
        margin-right: 0.2rem;
        background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjQwcHgiIGhlaWdodD0iNDBweCIgdmlld0JveD0iMTIgMTIgNDAgNDAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMTIgMTIgNDAgNDAiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxwYXRoIGZpbGw9IiMzMzMzMzMiIGQ9Ik0zMiAxMy40Yy0xMC41IDAtMTkgOC41LTE5IDE5YzAgOC40IDUuNSAxNS41IDEzIDE4YzEgMC4yIDEuMy0wLjQgMS4zLTAuOWMwLTAuNSAwLTEuNyAwLTMuMiBjLTUuMyAxLjEtNi40LTIuNi02LjQtMi42QzIwIDQxLjYgMTguOCA0MSAxOC44IDQxYy0xLjctMS4yIDAuMS0xLjEgMC4xLTEuMWMxLjkgMC4xIDIuOSAyIDIuOSAyYzEuNyAyLjkgNC41IDIuMSA1LjUgMS42IGMwLjItMS4yIDAuNy0yLjEgMS4yLTIuNmMtNC4yLTAuNS04LjctMi4xLTguNy05LjRjMC0yLjEgMC43LTMuNyAyLTUuMWMtMC4yLTAuNS0wLjgtMi40IDAuMi01YzAgMCAxLjYtMC41IDUuMiAyIGMxLjUtMC40IDMuMS0wLjcgNC44LTAuN2MxLjYgMCAzLjMgMC4yIDQuNyAwLjdjMy42LTIuNCA1LjItMiA1LjItMmMxIDIuNiAwLjQgNC42IDAuMiA1YzEuMiAxLjMgMiAzIDIgNS4xYzAgNy4zLTQuNSA4LjktOC43IDkuNCBjMC43IDAuNiAxLjMgMS43IDEuMyAzLjVjMCAyLjYgMCA0LjYgMCA1LjJjMCAwLjUgMC40IDEuMSAxLjMgMC45YzcuNS0yLjYgMTMtOS43IDEzLTE4LjFDNTEgMjEuOSA0Mi41IDEzLjQgMzIgMTMuNHoiLz48L3N2Zz4=);
        background-size: 100% 100%;
        background-repeat: no-repeat;
        left: 0.1rem;
        top: 0.05rem;
      }
      .gh-text{
        padding-left: 0.75rem;
      }
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
