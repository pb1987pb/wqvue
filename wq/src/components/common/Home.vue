<template>
    <div class="wrapper">
        <v-head></v-head>
        <v-sidebar class="sidebar-container"></v-sidebar>
        <div class="content-box" :class="{'content-collapse':colla}">
            <!--<v-tags></v-tags>-->
            <div class="content">
                <transition name="move" mode="out-in">
                    <keep-alive :include="tagsList">
                        <router-view></router-view>
                    </keep-alive>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
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
        created(){
            
            // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
            // bus.$on('tags', msg => {
            //     let arr = [];
            //     for(let i = 0, len = msg.length; i < len; i ++){
            //         msg[i].name && arr.push(msg[i].name);
            //     }
            //     this.tagsList = arr;
            // })
        }
    }
</script>
<style>
.sidebar-container{transition: width 0.28s;
    position: absolute !important;
    font-size: 0px;
    top: 70px;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;}
</style>

