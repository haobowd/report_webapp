<template>
  <div class="page_content">
    <div class="logo">
      <div class="logo_img"></div>
      <p>(。・`ω´・) E8全体小伙伴欢迎新同学到来</p>
    </div>
    <div class="input_box">
      <p class="tip">{{college}} <template v-if="major != ''">{{major}}{{counterparts}}</template> {{stuClass}}</p>
      <input id="student_id" :class="{'error': inputErr}" type="number" maxlength="10" v-model="sutdentId" name="student_id" class="student_input" placeholder="请输入你的学号">
    </div>
    <t-footer v-if="showFooter" :position="true"></t-footer>
  </div>
</template>

<script>
import store from './store'
import TFooter from './components/TFooter'
export default {
  components: {
    TFooter
  },
  init () {
    store.getMe(this, true).then(res => {
      if (res.student.is_report === 1 && res.student.whether_has_dorm === 1) {
        // 直接跳转到最终页面
        this.$route.router.go('final')
      } else if (res.student.is_report === 1) {
        // 跳转到登记成功页面
        this.$route.router.go('reportok')
      }
    })
  },
  data () {
    return {
      // 学院
      college: '',
      // 专业
      major: '',
      // 是否对口
      counterparts: '',
      // 班级
      stuClass: '',
      // 学号
      sutdentId: null,
      // 学号信息对照表
      studentIdInfo: {
        '08': {
          name: '计算机学院',
          major: {
            '1': '计算机科学与技术',
            '2': '网络工程',
            '3': '物联网工程',
            '4': '软件工程'
          }
        }
      },
      inputErr: false,
      showFooter: true
    }
  },
  ready () {
    let self = this
    let studentIdInput = this.$el.querySelector('#student_id')
    studentIdInput.onfocus = function () {
      self.showFooter = false
    }
    studentIdInput.onblur = function () {
      setTimeout(function () {
        self.showFooter = true
      }, 500)
    }
  },
  watch: {
    'sutdentId' () {
      this.inputErr = false
      // 获取学院
      let collegeCode = this.sutdentId.substr(2, 2)
      if (collegeCode.length >= 2) {
        if (collegeCode !== undefined && collegeCode in this.studentIdInfo) {
          this.college = this.studentIdInfo[collegeCode].name
        } else {
          // TODO 学院错误
          this.college = ''
          this.inputErr = true
          return
        }
        // 判断是否对口
        let counterpartsCode = this.sutdentId.substr(4, 1)
        if (counterpartsCode.length >= 1) {
          switch (counterpartsCode) {
            case '1':
              this.counterparts = ''
              break
            case '2':
              this.counterparts = '(对口)'
              break
            default:
              // TODO 对口错误
              this.counterparts = ''
              this.inputErr = true
              return
          }
          // 获取专业
          let majorCode = this.sutdentId.substr(5, 1)
          if (majorCode.length >= 1) {
            if (majorCode !== undefined && majorCode in this.studentIdInfo[collegeCode].major) {
              this.major = this.studentIdInfo[collegeCode].major[majorCode]
            } else {
              // TODO 专业错误
              this.major = ''
              this.inputErr = true
              return
            }
            // 获取班级
            let classCode = this.sutdentId.substr(6, 2)
            if (classCode.length >= 2) {
              if (classCode !== undefined) {
                this.stuClass = parseInt(classCode) + 1 + '班'
                // 判断输入的学号位数
                if (this.sutdentId.length > 10) {
                  // TODO 大于十位数字
                  this.inputErr = true
                } else if (this.sutdentId.length === 10) {
                  // 成功已经输入了十位数 ajax验证是否存在
                  store.studentIdIsExit(this.sutdentId, this).then(res => {
                    let selt = this
                    setTimeout(function () {
                      selt.$root.showIdentityInput = true
                      selt.$root.IdentityNums = []
                    }, 500)
                    this.$root.sutdentId = this.sutdentId
                    this.$el.querySelector('#student_id').blur()
                  }, res => {
                    this.$root.showMessage('该学号不存在')
                    this.stuClass = ''
                    this.inputErr = true
                  })
                }
              } else {
                // TODO 班级错误
                this.stuClass = ''
                this.inputErr = true
                return
              }
            } else {
              // 没有班级
              this.stuClass = ''
            }
          } else {
            // 没有专业
            this.stuClass = ''
            this.major = ''
          }
        } else {
          // 没有对口
          this.stuClass = ''
          this.major = ''
          this.counterparts = ''
        }
      } else {
        // 没有学院
        this.stuClass = ''
        this.major = ''
        this.counterparts = ''
        this.college = ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .logo{
    margin-top: 1rem;
    margin-bottom: .5rem;
    >.logo_img{
      width: 12.6rem;
      height: 3.5rem;
      padding-top: .8rem;
      background: url('./assets/logo.png') no-repeat 50% 50%;
      background-size: 100% 100%;
      margin: 0 auto;
    }
    >p{
      font-size: .6rem;
      text-align: center;
      margin-top: .6rem;
      color: #aaa;
    }
  }
  .input_box{
    padding: 1rem;
    margin-top: 1.5rem;
    >.tip{
      color: #999;
      font-size: .6rem;
      margin: 0 0 5px 5px;
      min-height: 1rem;
    }
    >.student_input{
      background-color: #fff;
      height: 2.2rem;
      width: 100%;
      border-radius: 0.1rem;
      padding: 0 0.5rem;
      border: 1px solid #eee;
      outline: 0;
      transition: border-color .3s, box-shadow .3s;
      font-size: .75rem;
      color: #333;
      &:focus{
        border: 1px solid #82c3fe;
        box-shadow: inset 0 1px 1px rgba(0,0,0,0.1);
      }
      &.error{
        border-color: #f30;
      }
    }
  }
</style>
