<template>
  <div class="detail">
      <div class="error-handle">
          <router-link to="/">
            <el-button type="primary" size="large">返回首页</el-button>
          </router-link>
           <router-link to="/log/index">
          <el-button class="error-btn" type="primary" size="large">返回上一页</el-button>
          </router-link>
      </div>
      <div class="mes">
    
               <div class="clear" v-for="(item,key) in dedata" :key="key">
                   <p class="fl p1">{{key}}：</p>
               <p class="fl">{{item}}</p></div>

      </div>
      <back-to-top  :visibility-height="300" :back-position="0" transition-name="fade"/>
  </div>
</template>

<script>
import BackToTop from '@/components/common/BackToTop'

 import { getLocal } from '@/utils/localStorage.js'
export default {
     components: { BackToTop },
       data: function(){
            return {
                dedata :{},
            }
        },
  methods: {

  },
  mounted(){
      var data =  getLocal('logdet');
      this.dedata=JSON.parse(data);
  }
}
</script>


<style scoped>
.detail{padding: 30px 0 0 30px;}
.mes {padding-top: 20px;}
.mes p{max-width: 1000px;line-height: 35px;}
.mes .p1{width: 120px;}
</style>
