<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="colla"
      mode="vertical"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
      class="myslider"
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
  }
}
</script>
<style>
/* 这个下面是针对自己代码写的样式 */
.myslider{height: 100%;}
.myslider:not(.el-menu--collapse) {
    width: 240px;
    height: 100%;
}
.myslider.el-menu--collapse{width: 64px;}
.scrollbar-wrapper
.el-menu--collapse>.menu-wrapper .el-menu-item span, .el-menu--collapse>.menu-wrapper>.el-submenu>.el-submenu__title span{height: 0;
    width: 0;
    overflow: hidden;
    visibility: hidden;
    display: inline-block}
/* .el-menu--collapse .el-submenu.is-opened>.el-submenu__title .el-submenu__icon-arrow {
    transform: none;} */

    .el-menu--collapse>.menu-wrapper .el-menu-item .el-submenu__icon-arrow, 
    .el-menu--collapse>.menu-wrapper>.el-submenu>.el-submenu__title .el-submenu__icon-arrow{display: none}

    .el-submenu.is-opened>.el-submenu__title .el-submenu__icon-arrow{transform: rotate(180deg);}
     
     .el-scrollbar__view{height: 100%;}

</style>
