<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/" class="jkname">
                <el-breadcrumb-item>日志列表</el-breadcrumb-item>
            </el-breadcrumb>

        </div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="select_word" placeholder="筛选关键词"  class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
            </div>
            <el-table :data="tableData" border class="table" @cell-mouse-enter = "cellMouseEnter">

                <el-table-column prop="trade_no" label="trade_no"   align="center">
                </el-table-column>
                <el-table-column prop="trade_type" label="trade_type"  align="center">
                </el-table-column>
                <el-table-column prop="trans_id" label="trans_id"  align="center" width="250">
                </el-table-column>
                 <el-table-column prop="deviceid" label="deviceid"  align="center">
                </el-table-column>
                <el-table-column prop="operator" label="operator"  align="center">
                </el-table-column>
                <el-table-column prop="trade_date" label="trade_date" align="center" width="200">
                </el-table-column>
                 <el-table-column prop="return_text" label="return_text" align="center" :show-overflow-tooltip="true">
                </el-table-column>
 <el-table-column prop="return_code" label="return_code" align="center" >
                </el-table-column>

                <el-table-column label="操作" width="250" align="center">
                    <template slot-scope="scope">
                    
                         <el-button type="text" icon="el-icon-delete" @click="handledetail(scope.$index, scope.row)">详情</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                 <pagination v-show="total>0" :total="total" :page.sync="page" :pagesize.sync="pagesize" @pagination="getData" />
              
            </div>
        </div>
       <deldialog :visible.sync="visible" @delete="deleteRow"></deldialog>
    </div>
</template>

<script>
import { scrollTo } from '@/utils/scrollTo'
 import  Mixin  from '../min.js' //引入Mixin
    export default {
        name: 'loglist',
        mixins: [Mixin],
        doNotInit:true,
        data() {
             return {
                getDataurl: '/static/log.json',
                delUrl:'/myapi/logout',//删除请求后台接口
                isFirstEnter:false,
             }
            },
        computed: {

        },
        methods: {
            handledetail(index,row){
                //详情先存储到 cookie
               
               this.$cookie.set('logdet',row);
               this.$router.push('detail');
            },
            initData(){
                //初始化一些数据
                  scrollTo(0, 300);// 这个是回到顶部效果
                this.tableData = [] ;
                this.page = 1;
                this.select_word = "" ;
            //         select_word:'',//搜索关键字
            // fromname:'addeditfrom',//增加或者修改数据时候表单的 ref
            // page: 1, //当前页码
            }
        },
      created(){
        // 定义一个变量，不需要调用min.js的 created()
       //如果是第一次进入，或者刷新操作的话，也请求数据,这个就是为了刷新，必须要加这个参数。
     this.isFirstEnter = true
    },
    activated() {
             console.log('进来获取数据');
      if (!this.$route.meta.isBack || this.isFirstEnter) {
         // 这里要先把列表的数据清空 ,不清除的话就会有之前的商品缓存，延迟显示最新的商品
         this.initData() // 这里许要初始化dada()中的数据，一般的列表要初始化 页码数，页数，关键字
        this.getData(); // 这里发起数据请求，（之前是放在created或者mounted中，现在只需要放在这里就好了，不需要再在created或者mounted中请求！！）
      }
      this.$route.meta.isBack = false //请求完后进行初始化
      this.isFirstEnter = false;//请求完后进行初始化
    },



    }

</script>

<style scoped>



</style>
