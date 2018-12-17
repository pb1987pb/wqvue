<template>
    <div class="wrapper">
        <v-head></v-head>
        <v-sidebar class="sidebar-container"></v-sidebar>
        <div class="content-box" :class="{'content-collapse':collapse}">
            <!--<v-tags></v-tags>-->
            <div class="content">
<transition name="fade-transform" mode="out-in">
           <keep-alive :include="keepAlive" >
      <router-view :key="$route.fullpath"/>
    </keep-alive>
    </transition>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import vHead from './Header.vue';
    import vSidebar from './slider/index.vue';
    import vTags from './Tags.vue';
    import mixcollapse from './mixcollapse.js';
    export default {
        data(){
            return {
                tagsList: [],
            }
        },
        mixins:[mixcollapse],
        components:{
            vHead, vSidebar, vTags
        },
          computed: {
                     ...mapGetters([
          'keepAlive',
        ])
  },
        created(){
    
                 this.checkRouter(this.$route);
        },
        methods:{
            //验证路由里面是否有  keepAlive 属性，是否加入 keepAlive 中
            checkRouter(curentrouter){
                     if(curentrouter.meta.keepAlive == true  && this.tagsList.indexOf(curentrouter.name)==-1){
                            this.tagsList.push(curentrouter.name);
                           this.$store.commit('SET_KEEP_ALIVE',this.tagsList);
                        }
            }
        },
           watch:{
            $route:{
                handler : function(to){
                    this.checkRouter(to);
                },
            }
          
        }
    }
</script>
<style>

</style>

