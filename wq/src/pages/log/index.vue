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

 <!-- <el-table-column prop="trade_text" label="trade_text" align="center" show-overflow-tooltip="true">
                </el-table-column> -->
                 <el-table-column prop="return_text" label="return_text" align="center" :show-overflow-tooltip="true">
                </el-table-column>
 <el-table-column prop="return_code" label="return_code" align="center" >
                </el-table-column>

                <el-table-column label="操作" width="250" align="center">
                    <template slot-scope="scope">
                    
                         <el-button type="text" icon="el-icon-delete" class="red" @click="handledetail(scope.$index, scope.row)">详情</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                 <pagination v-show="total>0" :total="total" :page.sync="page" :pagesize.sync="pagesize" @pagination="getData" />
                </el-pagination>
            </div>
        </div>


        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
//Scoped slot 可以获取到 row, column, $index 和 store（table 内部的状态管理）的数据，
import { scrollTo } from '@/utils/scrollTo'
 import { setLocal } from '@/utils/localStorage.js'
 import pagination from '@/components/common/pagination' // Secondary package based on el-pagination
 import  Mixin  from '../min.js' //引入Mixin
    export default {
        mixins: [Mixin],
        doNotInit:true,
         components: { pagination },
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
                //详情先存储到 本地
                setLocal('logdet',JSON.stringify(row))
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
      beforeRouteEnter(to, from, next) {
       // 这里，不管是进来还是返回，还是有没有keep-alive，都会先到这里
      if (from.path == '/log/detail') { // 这个name是下一级页面的路由name
        to.meta.isBack = true; // 设置为true说明你是返回到这个页面，而不是通过跳转从其他页面进入到这个页面
      }
      next()
    },
      created(){
        // 定义一个变量，不需要调用min.js的 created()
       //如果是第一次进入，或者刷新操作的话，也请求数据,这个就是为了刷新，必须要加这个参数。
     this.isFirstEnter = true
    },
    activated() {

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

<style scope scoped>
 .jkname{display: inline-block;margin-right: 20px;margin-left: 15px;position: relative;top: 4px;}
 .handle-box {
        margin-bottom: 20px;
    }

 .handle-select {
        width: 120px;
    }
 .handle-input {
        width: 300px;
        display: inline-block;
    }
 .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
 .table{
        width: 100%;
        font-size: 14px;
    }




</style>
