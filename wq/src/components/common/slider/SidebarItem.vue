<template>
  <div v-if="!item.hidden&&item.children&&item.children.length>0" class="menu-wrapper">

    <template v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow">

     <!-- v-if="!onlyOneChild.noShowingChildren"是自己新加的，是为了不让下面的showingChildren.length =0 的情况显示 -->
      <!-- <app-link :to="resolvePath(onlyOneChild.path)" v-if="!onlyOneChild.noShowingChildren"> -->
        <app-link :to="resolvePath(onlyOneChild.path)"> 
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
          <!-- 这个地方要注意，为什么有||item.meta.icon，是因为匹配下去的子类有可能没有icon,必须保证第一级的有icon-->
        <item v-if="onlyOneChild.meta" :icon="onlyOneChild.meta.icon||item.meta.icon" :title="onlyOneChild.meta.title" />
        </el-menu-item>
      </app-link>

    </template>

    <el-submenu v-else  :index="resolvePath(item.path)">
      <template slot="title">
        <item v-if="item.meta" :icon="item.meta.icon" :title="item.meta.title" />
      </template>

      <template v-for="child in item.children" v-if="!child.hidden">
        <sidebar-item
          v-if="child.children&&child.children.length>0"
          :is-nest="true"
          :item="child"
          :key="child.path"
          :base-path="resolvePath(child.path)"
          class="nest-menu" />
        <app-link v-else :to="resolvePath(child.path)" :key="child.name">,
          
          <el-menu-item :index="resolvePath(child.path)">
<item v-if="child.meta" :icon="child.meta.icon" :title="child.meta.title" />
          </el-menu-item>
        </app-link>
      </template>
    </el-submenu>

  </div>
</template>

<script>
import path from 'path'
import { isExternal , item } from '@/utils'
import AppLink from './Link'
import Item from './Item'
export default {
  name: 'SidebarItem',
  components: {AppLink , Item },
  // mixins: [FixiOSBug],
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    //以后扩展用的，保证只有一个子菜单class是submenu-title-noDropdown
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      onlyOneChild: null
    }
  },
  methods: {
    hasOneShowingChild(children, parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item
          return true
        }
      })

      // 匹配的本身只有一个没隐藏的子类，或者有多个子类，匹配大一个隐藏的。
      if (showingChildren.length === 1) {
        
        // console.log(showingChildren[0].name);
        return true
      }

      // Show parent if there are no child router to display
      //下面这个个人感觉没什么意义，能都下面这里来的都是路由没有写好的,根本不能允许下面这样子写的路由
      //父类不隐藏，子类都是隐藏状态，没什么意义
      
      if (showingChildren.length === 0) {
           console.log('呵呵');
          // console.log(this.onlyOneChild);
        // 下面这个情况 onlyOneChild 就会有  children ，设置一个  noShowingChildren，就可以让上面第二个条件也成立
           this.onlyOneChild = { ... parent, path: '', noShowingChildren: true }
          // this.onlyOneChild = { ... parent, children: [], noShowingChildren: true }
      console.log(this.onlyOneChild);
      
        return true
      }

      return false
    },
    resolvePath(routePath) {
      if (this.isExternalLink(routePath)) {
        return routePath
      }
      return path.resolve(this.basePath, routePath)
    },
    isExternalLink(routePath) {
      return isExternal(routePath)
    },
    // generateTitle
  }
}
</script>
