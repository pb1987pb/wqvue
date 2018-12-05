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
// 在外层获取slot-scope="scope"，就可以在里面使用。
 import { setLocal } from '@/utils/localStorage.js'
 import pagination from '@/components/common/pagination' // Secondary package based on el-pagination
 import  Mixin  from '../min.js' //引入Mixin
    export default {
        mixins: [Mixin],
         components: { pagination },
        data() {
             return {
                getDataurl: '/static/log.json',
                delUrl:'/myapi/logout',//删除请求后台接口
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
        }
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
