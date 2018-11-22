<template>
    <div class="table mytable">
        <div class="crumbs">
            <el-breadcrumb separator="/" class="jkname">
                <el-breadcrumb-item>接口管理</el-breadcrumb-item>
            </el-breadcrumb>
              <el-button type="primary" @click="handleAdd">增加接口</el-button>
        </div>
        <div class="container">
             <div class="handle-box">
                <el-input v-model="select_word" placeholder="筛选关键词"  class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
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
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination :page-size="pagezize" background @current-change="handleCurrentChange" layout="prev, pager, next,total" :total="count">
                </el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog :title="type==0?'新增接口':'编辑接口'" :visible.sync="addeditVisible" width="30%" @close="close">
            <el-form  :model="form" label-width="120px"  :ref="this.fromname" :rules="rules">
                 
                <el-form-item label="接口方：" prop="interface">
                      <el-input v-model.trim="form.interface"></el-input>
                </el-form-item>
                <el-form-item label="授权码：" prop="authen_key">
                    <el-input v-model.trim="form.authen_key" class="myinput" :disabled="true" max="16" min="16"></el-input>
                    <el-button type="primary" class="myshouquan" @click="setCode">生成授权码</el-button>
                </el-form-item>
                <el-form-item label="配置参数user：">
                    <el-input v-model.trim="form.user"></el-input>
                </el-form-item>
                <el-form-item label="配置参数dev：">
                    <el-input v-model.trim="form.dev"></el-input>
                </el-form-item>
                <el-form-item label="备注：" prop="remark">
                    <el-input v-model.trim="form.remark"></el-input>
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

 import { GUID} from '../../../static/js/guid.js';
 import  Mixin  from './min.js' //引入Mixin
    export default {
        name: 'basetable',
        mixins: [Mixin],
        data() {
            return {
                getDataurl: '/static/user.json',//获取数据接口
                addUrl:'/myapi/logout',//增加请求后台接口
                editUrl:'/myapi/logout',//编辑请求后台接口
                delUrl:'/myapi/logout',//删除请求后台接口
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
        //     cellMouseEnter(){
        //        console.log(arguments);
        // // 判断是否text-overflow, 如果是就显示tooltip --->//官方报错那里面的注释
        // var cellChild = event.target.querySelector('.cell');
        // // console.log(cellChild.innerHTML==='');
        // if(''===cellChild.innerHTML){
        //   cellChild.innerHTML = '&nbsp';
        // }
        // // range.cloneRange()
        // // range.insertNode();
        // // var range = document.createRange();
        // // range.setStart(cellChild, 0);
        // // range.setEnd(cellChild, 1);
        //     },
             setAddFrom(){

             },
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
                this.form = {
                    interface: begindata.interface,
                    authen_key: begindata.authen_key,
                    user : obg.user,
                    dev : obg.dev ,
                    remark: begindata.remark,
                }
             },
           // 组织增加或者编辑的数据
          editData(){
                      let newdata  = {};
                      newdata.config={};
                      
                      //构建最里面的参数对象
                      let def={};
                      let defaudata={};
                     if(this.form.user){
                     defaudata.user=this.form.user;
                     
                     }
                        if(this.form.dev){
                     defaudata.dev=this.form.dev;
                  
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
                        interface: this.form.interface,
                    authen_key: this.form.authen_key,
                    config : newdata.config,
                     remark: this.form.remark,
                    } ;
                   return result; //需要的结果

          },
        //     saveEdit() {
                
        //          // 保存编辑
        //           this.$refs["addruleForm"].validate((valid) => {
        //   if (valid) {
        //             // 根据填写的值去组织配置参数的值
        //              console.log(this.form);

        //              var newdata  = {};
        //               newdata.interface=this.form.interface ;
        //               newdata.authen_key=this.form.authen_key ;
        //               newdata.remark=this.form.remark ;
        //              newdata.config={};
                      
        //               //构建最里面的参数对象
        //               var def={};
        //               var defaudata={};
        //              if(this.form.user){
        //              defaudata.user=this.form.user;
                     
        //              }
        //                 if(this.form.dev){
        //              defaudata.dev=this.form.dev;
                  
        //             }
        //             if(Object.keys(defaudata).length !=0)
        //             {
        //                def.default =defaudata;
        //                newdata.config = JSON.stringify(def);
        //             }else
        //             {
        //                 newdata.config = "" ; //user和dev 都没有填写，就直接赋值为 空字符串。
        //             }

        //                if(this.type == 1) //更新数据的情况
        //              {
        //              this.tableData.splice(this.idx,1,newdata); // 更新当前数据
                 
        //                this.$message({
        //                    type: 'success',
        //                    duration:1000,
        //   showClose: true,
        //   message: `修改第 ${this.idx+1} 行成功`
        // });
        //             }
        //             else
        //             {
        //                  // 新增数据的情况 ，把新增的数据放到第一个
        //                 this.tableData.unshift(newdata);

                     
        //                              this.$message({
        //                    type: 'success',
        //                    duration:1000,
        //   showClose: true,
        //   message: `新增数据成功`
        // });
        //             }
                    
              
        //         this.addeditVisible = false; //编辑框消失
                
        //   } else {
        //     console.log('error submit!!');
        //     return false;
        //   }
        // });
               
        //     },

            setCode()
            {
                //生成验证码
                   
                var guid = new GUID();
                
                this.$set(this.form,"authen_key",guid.newGUID())
                //  console.log(this.form.authen_key);
            }
        }
    }

</script>

<style>
.mytable .jkname{display: inline-block;margin-right: 20px;margin-left: 15px;position: relative;top: 4px;}
 .mytable .handle-box {
        margin-bottom: 20px;
    }

.mytable .handle-select {
        width: 120px;
    }
.mytable .handle-input {
        width: 300px;
        display: inline-block;
    }
.mytable .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
.mytable .table{
        width: 100%;
        font-size: 14px;
    }
.mytable .red{
        color: #ff0000;
    }
 .mytable .myinput{width: 71%;}
 .mytable .myinput .el-input__inner{color: red;}
.mytable  .el-input.is-disabled .el-input__inner{color: red !important}
 .mytable .myshouquan{width: 28%;}
    

</style>
