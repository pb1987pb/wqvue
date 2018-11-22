<template>
  <div class="detail">
      <div class="error-handle">
          <router-link to="/">
            <el-button type="primary" size="large">返回首页</el-button>
          </router-link>
          <el-button class="error-btn" type="primary" size="large" @click="goBack">返回上一页</el-button>
      </div>
      <div class="mes">
    
               <div class="clear" v-for="(item,key) in dedata" :key="key">
                   <p class="fl p1">{{key}}：</p>
               <p class="fl">{{item}}</p></div>

      </div>
  </div>
</template>

<script>
 import { getLocal } from '@/utils/localStorage.js'
export default {
       data: function(){
            return {
                dedata :{},
            }
        },
  methods: {
      goBack(){
          this.$router.go(-1);
      }
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
