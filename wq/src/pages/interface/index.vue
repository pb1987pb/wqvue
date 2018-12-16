<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/" class="jkname">
                <el-breadcrumb-item>接口管理</el-breadcrumb-item>
            </el-breadcrumb>
              <el-button type="primary" @click="handleAdd">增加接口</el-button>
        </div>
        <div class="container">
             <div class="handle-box">
                <el-input v-model="select_word" placeholder="筛选关键词"  class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="getData(true)">搜索</el-button>
            </div>
            <el-table :data="tableData" border class="table" @cell-mouse-enter = "cellMouseEnter">
                
                <el-table-column prop="interface" label="接口方"  width="150" align="center">
                </el-table-column>
                <el-table-column prop="authen_key" label="授权码" width="200" align="center">
                </el-table-column>
                <el-table-column prop="config" label="参数配置"  align="center">
                </el-table-column>
                <el-table-column prop="remark" label="备注" align="center" width="150">
                </el-table-column>

                <el-table-column label="操作" width="250" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页开始 -->
            <div class="pagination">
                 <pagination v-show="total>0" :total="total" :page.sync="page" :pagesize.sync="pagesize" @pagination="getData" /> 
            </div>
        </div>

        <!-- 编辑和增加弹出框 -->
        <el-dialog :title="isEdit?'编辑接口':'新增接口'" :visible.sync="addeditVisible" width="30%" :before-close="handleClose">
            <el-form  :model="postForm" label-width="120px"  ref="postForm" :rules="rules">
                 
                <el-form-item label="接口方：" prop="interface">
                      <el-input v-model.trim="postForm.interface"></el-input>
                </el-form-item>
                <el-form-item label="授权码：" prop="authen_key">
                    <el-input v-model.trim="postForm.authen_key" class="myinput" :disabled="true" max="16" min="16"></el-input>
                    <el-button type="primary" class="myshouquan" @click="setCode">生成授权码</el-button>
                </el-form-item>
                <el-form-item label="配置参数user：" prop="user">
                    <el-input v-model.trim="postForm.user"></el-input>
                </el-form-item>
                <el-form-item label="配置参数dev：" prop="dev">
                    <el-input v-model.trim="postForm.dev"></el-input>
                </el-form-item>
                <el-form-item label="备注：" prop="remark">
                    <el-input v-model.trim="postForm.remark"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button v-loading="loading" type="primary" @click="submitForm('postForm')">确 定</el-button>
            </span>
        </el-dialog>


        <!-- 删除提示框 -->
  <deldialog :visible.sync="visible" @delete="deleteRow"></deldialog>
    </div>
</template>

<script>

 import { GUID} from './guid.js';
 import  Mixin  from '../min.js' //引入Mixin
    export default {
        name: 'basetable',
        mixins: [Mixin],
        data() {
            return {
                getDataurl: '/static/user.json',//获取数据接口
                addUrl:'/myapi/logout',//增加请求后台接口
                editUrl:'/myapi/logout',//编辑请求后台接口
                delUrl:'/myapi/logout',//删除请求后台接口
                //默认表单数据,//弹窗表单数据
                postForm: {
                  interface: '',
                 authen_key: '', 
                   user: '', 
                    dev: '', 
                    remark: '', 
                     },
                loading: false,//提交按钮的loading
                   rules: {//验证规则
                    interface: [
                        { required: true, message: '请输入接口名', trigger: 'blur' }
                    ],
                    authen_key: [
                        { required: true, message: '请输入授权码', trigger: 'blur' }
                    ],
                    remark:[
                         { required: true, message: '备注', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
             //设置编辑数据
             setEditFrom(row){
                 let begindata =Object.assign({}, row); //对象要拷贝
                    let config=begindata.config;
                let obg={user:'',dev:''}
                if(config)
                {
                //把 string数据强行转换为对象
                //  let configObj = eval('(' + config + ')'); 
                 let configObj =(new Function("return " + config))(); ;
                   obg.user =configObj.default.user;
                   obg.dev  =configObj.default.dev;
                     
                } 
                // 这个是传给编辑框的数据
                this.postForm = {
                    interface: begindata.interface,
                    authen_key: begindata.authen_key,
                    user : obg.user,
                    dev : obg.dev ,
                    remark: begindata.remark,
                }
             },
           // 组织增加或者编辑的数据
            getPostData(){
                   let newdata  = {};
                      newdata.config={};
                      
                      //构建最里面的参数对象
                      let def={};
                      let defaudata={};
                      console.log(this.postForm);
                     if(this.postForm.user){
                     defaudata.user=this.postForm.user;
                     
                     }
                        if(this.postForm.dev){
                     defaudata.dev=this.postForm.dev;
                  
                    }
                    if(Object.keys(defaudata).length !=0)
                    {
                       def.default =defaudata;
                       newdata.config = JSON.stringify(def);
                    }else
                    {
                        newdata.config = "" ; //user和dev 都没有填写，就直接赋值为 空字符串。
                    }
                   
                    let result ={
                        interface: this.postForm.interface,
                    authen_key: this.postForm.authen_key,
                    config : newdata.config,
                     remark: this.postForm.remark,
                    } ;
                   return result; //需要的结果
        },
            setCode()
            {
                //生成验证码       
                var guid = new GUID();
                this.$set(this.postForm,"authen_key",guid.newGUID())
            }
        }
    }

</script>

<style>
.table .jkname{display: inline-block;margin-right: 20px;margin-left: 15px;position: relative;top: 4px;}
 .table .handle-box {
        margin-bottom: 20px;
    }

.table .handle-select {
        width: 120px;
    }
.table .handle-input {
        width: 300px;
        display: inline-block;
    }
.table .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
.table .table{
        width: 100%;
        font-size: 14px;
    }
.table .red{
        color: #ff0000;
    }
 .table .myinput{width: 71%;}
 .table .myinput .el-input__inner{color: red;}
.table  .el-input.is-disabled .el-input__inner{color: red !important}
 .table .myshouquan{width: 28%;}
    

</style>
