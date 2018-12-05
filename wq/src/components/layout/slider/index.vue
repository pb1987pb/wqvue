<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :show-timeout="200"
      :default-active="getIndex"
      :collapse="collapse"
      mode="vertical"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
      class="myslider" :router="true"
    >
      <sidebar-item v-for="route in permission_routers" :key="route.path" :item="route"
      :base-path="route.path" />
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import mixcollapse from '../mixcollapse.js';
export default {
  components: { SidebarItem },
  mixins:[mixcollapse],
  computed: {
    ...mapGetters([
      'permission_routers',
    ]),
    getIndex(){
      if(this.$route.meta.tag){
          return this.$route.meta.tag
      }else
      {
        return this.$route.path
      }
      
    }
  }
}
</script>
<style>


</style>
