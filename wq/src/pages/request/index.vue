<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/" class="jkname">
                <el-breadcrumb-item>request管理</el-breadcrumb-item>
            </el-breadcrumb>
              <el-button type="primary" @click="handleAdd">增加request</el-button>
        </div>
        <div class="container">
             <div class="handle-box">
                <el-input v-model="select_word" placeholder="筛选关键词"  class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
            </div>
            <el-table :data="tableData" border class="table" @cell-mouse-enter = "cellMouseEnter">
                
                <el-table-column prop="interface" label="接口"  width="120" align="center">
                </el-table-column>
                <el-table-column prop="trade_code" label="交易代码" width="150" align="center">
                </el-table-column> 
                <el-table-column prop="trade_name" label="交易名称"  align="center">
                </el-table-column>
                 <el-table-column prop="cmdtext" label="交易命令"  align="center">
                </el-table-column>
                <el-table-column prop="parm_count" label="参数个数"  align="center">
                </el-table-column>
                <el-table-column prop="valid" label="有效标记" align="center" width="150">
                </el-table-column>

                <el-table-column label="操作" width="250" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">

      <pagination v-show="total>0" :total="total" :page.sync="page" :pagesize.sync="pagesize" @pagination="getData" />
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog :title="type==0?'新增request':'编辑request'" :visible.sync="addeditVisible" width="30%" @close="close">
            <el-form  :model="form" label-width="120px"  :ref="fromname" :rules="rules">
                 
                <el-form-item label="接口方：" prop="interface">
                      <!--<el-input v-model="form.interface"></el-input>-->
                      <el-select v-model="form.interface" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
                </el-form-item>
                <el-form-item label="交易代码：" prop="trade_code">
                    <el-input v-model.trim="form.trade_code" ></el-input>
                </el-form-item>
                <el-form-item label="交易名称：">
                    <el-input v-model.trim="form.trade_name"></el-input>
                </el-form-item>
                <el-form-item label="交易命令：" prop="cmdtext">
                    <el-input v-model.trim="form.cmdtext"></el-input>
                </el-form-item>
                <el-form-item label="参数个数：">
                    <!-- <el-input v-model.number="form.parm_count"></el-input> -->
                     <el-input-number v-model="form.parm_count"  :min="0" :max="100" ></el-input-number>
                </el-form-item>
           <el-form-item label="有效标记：" >
                    <el-radio v-model="form.valid" label="Y">有效</el-radio>
                    <el-radio v-model="form.valid" label="N">无效</el-radio>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addeditVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit()">确 定</el-button>
            </span>
        </el-dialog>


        <!-- 删除提示框 -->
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

import  Mixin  from '../min.js';//引入Mixin
import pagination from '@/components/common/pagination'; // Secondary package based on el-pagination
    export default {
      mixins: [Mixin],
      components: { pagination },
        data() {
             return {
                getDataurl: '/static/request.json',//获取数据接口
                addUrl:'/myapi/logout',//增加请求后台接口
                editUrl:'/myapi/logout',//编辑请求后台接口
                delUrl:'/myapi/logout',//删除请求后台接口
                   rules: {//验证规则
                    interface: [
                        { required: true, message: '请选择接口', trigger: 'blur' }
                    ],
                    trade_code: [
                        { required: true, message: '请输入交易代码', trigger: 'blur' }
                    ],
                    cmdtext:[
                         { required: true, message: '交易命令不能为空', trigger: 'blur' }
                    ]
                },
                options: [{ //这个就是接口选择的下拉数据
          value: 'tj',
          label: '体检'
        }, {
          value: 'common',
          label: 'HIS统一平台'
        }, {
          value: 'spt',
          label: '市平台'
        }, {
          value: 'hrp',
          label: 'HRP'
        }, {
          value: 'demo',
          label: '示例demo'
        },{
          value: 'operat',
          label: '手术接口'
        }]
            }
        },
        computed: {
 
        },
        methods: {
            setAddFrom()
            {
              this.$set(this.form,"valid","Y")//默认增加有效      
               this.$set(this.form,"parm_count","0")//默认增加有效       
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
