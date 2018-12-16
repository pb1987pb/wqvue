<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/" class="jkname">
                <el-breadcrumb-item>reponse管理</el-breadcrumb-item>
            </el-breadcrumb>
              <el-button type="primary" @click="handleAdd">增加reponse</el-button>
        </div>
        <div class="container">
              <div class="handle-box">
                <el-input v-model="select_word" placeholder="筛选关键词"  class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
            </div>
            <el-table :data="tableData" border class="table" @cell-mouse-enter = "cellMouseEnter">
                
                <el-table-column prop="trade_no" label="交易命令"  width="120" align="center">
                </el-table-column>
                <el-table-column prop="trade_code" label="交易编码" width="150" align="center">
                </el-table-column> 
                <el-table-column prop="trade_name" label="交易名称"  align="center">
                </el-table-column>
                 <el-table-column prop="trade_seq" label="交易序号"  align="center">
                </el-table-column>
                <el-table-column prop="trade_type" label="交易类型"  align="center">
                </el-table-column>
                <el-table-column prop="level_type" label="层数" align="center">
                </el-table-column>
                   <el-table-column prop="value_type" label="值类型" align="center">
                </el-table-column>
                 <el-table-column prop="group_by" label="分组字段" align="center" width="100">
                </el-table-column>
                 <el-table-column prop="parent_node" label="父节点标签" align="center" width="100">
                </el-table-column>
                 <el-table-column prop="valid" label="有效标志" align="center" >
                </el-table-column>
   
                <el-table-column label="操作" width="250" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
             <pagination v-show="total>0" :total="total" :page.sync="page" :pagesize.sync="pagesize" @pagination="getData" />
                </el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog  :title="isEdit?'编辑reponse':'新增reponse'"  :visible.sync="addeditVisible" width="40%" :before-close="handleClose">
            <el-form  :model="postForm" label-width="160px"  ref="postForm" :rules="rules">
                 
                <el-form-item label="交易命令：" prop="trade_no">
                      <el-input v-model="postForm.trade_no"></el-input>
                </el-form-item>
                <el-form-item label="交易编码：" prop="trade_code">
                    <el-input v-model.trim="postForm.trade_code" ></el-input>
                </el-form-item>
                <el-form-item label="交易名称：" prop="trade_name">
                    <el-input v-model="postForm.trade_name"></el-input>
                </el-form-item>
                <el-form-item label="交易序号：" prop="trade_seq">
                    <el-input v-model="postForm.trade_seq"></el-input>
                </el-form-item>
                <el-form-item label="交易类型：" prop="trade_type">
                        <el-radio v-model="postForm.trade_type" label="0">返回字符串</el-radio>
                    <el-radio v-model="postForm.trade_type" label="1">返回cursor</el-radio>
                    
                </el-form-item>
                 <el-form-item label="层数：" prop="level_type">
                       
                    <el-input-number v-model="postForm.level_type"  :min="1" :max="100" label="描述文字"></el-input-number>
                    
                </el-form-item>
            <el-form-item label="值类型：" prop="value_type">
                        <el-radio v-model="postForm.value_type" label="0">标题（不需赋值）</el-radio>
                    <el-radio v-model="postForm.value_type" label="1">标签（需赋值）</el-radio>
                    
                </el-form-item>
                  <el-form-item label="分组字段('|分隔')：" prop="group_by">
                    <el-input v-model="postForm.group_by"></el-input>
                </el-form-item>
                 <el-form-item label="父节点标签：" prop="parent_node">
                    <el-input v-model="postForm.parent_node"></el-input>
                </el-form-item>
                 <el-form-item label="有效标志：" prop="valid">
                      <el-radio v-model="postForm.valid" label="Y">有效</el-radio>
                    <el-radio v-model="postForm.valid" label="N">无效</el-radio>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="submitForm('postForm')">确 定</el-button>
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

import  Mixin  from '../min.js'; //引入Mixin
    export default {
        mixins: [Mixin],
        data() {
            return {
               getDataurl: '/static/response.json',//获取数据接口
                addUrl:'/myapi/logout',//增加请求后台接口
                editUrl:'/myapi/logout',//编辑请求后台接口
                delUrl:'/myapi/logout',//删除请求后台接口
                postForm: {
                  trade_no: '',
                 trade_code: '', 
                   trade_name: '', 
                    trade_seq: '', 
                    trade_type: '',
                    level_type: '1', 
                    value_type: '', 
                    group_by: '', 
                    parent_node: '',
                    valid: 'Y',
                     },
                   rules: {//验证规则
                    trade_no: [
                        { required: true, message: '请输入交易命令', trigger: 'blur' }
                    ],
                    trade_code: [
                        { required: true, message: '请输入交易代码', trigger: 'blur' }
                    ]
           
                }
       
            }
        },
        computed: {
 
        },
        methods: {

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
