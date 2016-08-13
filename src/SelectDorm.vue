<template>
  <div class="selectdorm page_content">
    <t-nav title="选择宿舍" :show-back="false"></t-nav>
    <crumb :nav-list="navList"></crumb>
    <template  v-for="(unitKey, unit) in dorms">
    <template  v-for="(buildNumKey, buildNum) in unit">
    <template  v-for="(floorKey, floor) in buildNum">
      <div class="selectdorm_body">
        <header>
          <span class="directionS">南</span>
          {{unitKey}}单元{{buildNumKey}}栋{{floorKey}}层
          <span class="directionN">北</span>
        </header>
        <section>
          <div class="south">
            <div class="null" v-if="floor.south === undefined"></div>
            <ul>
              <li @click="goSelBed(dorm.id, dorm.dorm_num, dorm.galleryful, dorm.selected_beds, dorm.position)" v-for="dorm in floor.south" :style="{'background-color': dormSColors[$index].bgcolor}">
                <h4 :style="{ 'color': dormNColors[$index].textcolor }">{{dorm.dorm_num}}</h4>
                <span class="surplus">剩余:{{dorm.surplus_beds_num}}/{{dorm.galleryful}}</span>
                <span class="hot"></span>
              </li>
            </ul>
          </div>
          <div class="aisle">
            <span class="top">过</span>
            <span class="bottom">道</span>
          </div>
          <div class="north">
            <div class="null" v-if="floor.north === undefined"></div>
            <ul>
              <li @click="goSelBed(dorm.id, dorm.dorm_num, dorm.galleryful, dorm.selected_beds, dorm.position)" v-for="dorm in floor.north" :style="{'background-color': dormNColors[$index].bgcolor}">
                <h4 :style="{ 'color': dormNColors[$index].textcolor }">{{dorm.dorm_num}}</h4>
                <span class="surplus">剩余:{{dorm.surplus_beds_num}}/{{dorm.galleryful}}</span>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </template>
    </template>
    </template>
    <t-footer></t-footer>
  </div>
</template>

<script>
import { XHeader } from 'vux/src/components/'
import TNav from './components/TNav'
import Crumb from './components/Crumb'
import TFooter from './components/TFooter'
import store from './store'
export default {
  components: {
    XHeader, TNav, Crumb, TFooter
  },
  data () {
    return {
      dormSColors: [
        {bgcolor: '#FBF2A5', textcolor: '#FA8612'},
        {bgcolor: '#CEDEF8', textcolor: '#4F72E6'},
        {bgcolor: '#98FB98', textcolor: '#6CCF6C'},
        {bgcolor: '#C8EAF3', textcolor: '#327296'}
      ],
      dormNColors: [
        {bgcolor: '#FEDCDA', textcolor: '#DA787F'},
        {bgcolor: '#FCA4CE', textcolor: '#FCF2FA'},
        {bgcolor: '#BCD3FC', textcolor: '#3A81D5'},
        {bgcolor: '#E0FFFF', textcolor: '#8FDBDB'}
      ],
      dorms: {},
      // 面包屑导航
      navList: [
        {
          title: '选择宿舍',
          href: 'selectdorm'
        }
      ]
    }
  },
  ready () {
    store.getDorms(this).then(res => {
      this.dorms = res
    }, res => {
      if (res.status === 401) {
        this.$route.router.replace({name: 'checkinfo'})
      }
    })
  },
  methods: {
    goSelBed (currDormId, currDorm, galleryful, selBeds, position) {
      let selBedInfo = {
        galleryFul: galleryful,
        selBeds: selBeds,
        currDorm: currDorm,
        currDormId: currDormId,
        position: position
      }
      window.localStorage.selDromBedInfo = JSON.stringify(selBedInfo)
      this.$route.router.go({name: 'selectbed'})
    }
  }
}
</script>

<style lang="less" scoped>
  .selectdorm{
    background-color: #f5f5f5;
    >.selectdorm_body{
      background-color: #fff;
      margin-top: .5rem;
      overflow:hidden;
      padding-bottom: .5rem;
      >header{
        color:#999;
        font-size: .6rem;
        text-align: center;
        padding:.5rem 0;
        >.directionS{
          float: left;
          margin-left: 20px;
        }
        >.directionN{
          float: right;
          margin-right: 20px;
        }
      }
      >section{
        position: relative;
        overflow: hidden;
        >.aisle{
          position: absolute;
          width: 20%;
          top:0;
          left:50%;
          transform: translate(-50%,0);
          height: 100%;
          >span{
            position: absolute;
          }
          >.top{
            top:20%;
            left:50%;
            transform: translate(-50%,0);
          }
          >.bottom{
            bottom:20%;
            left:50%;
            transform: translate(-50%,0);
          }
        }
        >.south,>.north{
          width: 40%;
          float: left;
          >.null{
            position: absolute;
            top: 0;
            bottom: 0;
            width: 40%;
            background-color: #f6f6f6;
            &::after{
              content: '空';
              color: #ccc;
              font-size: 0.7rem;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
            }
          }
          >ul{
            >li{
              height: 5rem;
              width: 100%;
              position: relative;
              &:not(:last-child){
                margin-bottom: 10px;
              }
              >h4{
                position: absolute;
                top: 50%;
                left: 50%;
                font-size: 1rem;
                color:#555;
                transform: translate(-50%,-50%);
              }
              >.surplus{
                position: absolute;
                left: .3rem;
                bottom: .2rem;
                font-size: .6rem;
                color: #666;
              }
            }
          }
        }
        >.north{
          float:right!important;
        }
      }
    }
  }
</style>
