export default {
    data() {
        return {
            getDataurl: '',//获取数据接口
            addUrl:'',//增加请求后台接口
            editUrl:'',//编辑请求后台接口
            delUrl:'',//删除请求后台接口
            tableData: [], //获取到要展示列表的数据
            select_word:'',//搜索关键字
            loading: false,//提交按钮的loading
            page: 1, //当前页码
            pagesize:10, //每页显示个数,这里是默认是8
            total : 0, // 总数
            isEdit:false,//是否是修改
            addeditVisible: false, //修改框和增加框是一个框，开始状态
            visible:false,// 删除框开始状态
            postForm: { },//弹窗表单数据
            delData:{},//删除的数据
        }
    },
    created() {
         
         let option = this.$options.doNotInit
       
if (!option) {
this.getData();
}
     },
    methods: {
        //临时解决鼠标悬停报错 elemnyt-ui
cellMouseEnter(row, column, cell, event){
    // console.log(arguments);
    // 判断是否text-overflow, 如果是就显示tooltip --->//官方报错那里面的注释
    var cellChild = event.target.querySelector('.cell');
    // console.log(cellChild.innerHTML==='');
    if(''===cellChild.innerHTML){
      cellChild.innerHTML = '&nbsp';
    } 
  }, 
  // 获取数据,搜索的时候，page传init是true
getData(init=false) {
     if(init){
        this.page=1;
     }
              //这里是带了几个参数，页码的参数
              this.$axios.get(this.getDataurl,{ params:{
                  "page": this.page,
                  "pagesize":this.pagesize,
                  "select_word":this.select_word
              }}).then((res) => {
                  this.tableData = res.data.list;
                  this.total = res.data.count; //  页码数量
              })
          },
           //点击编辑
          handleEdit(index, row) { 
            this.isEdit=true;//弹窗的类型是编辑
               this.setEditFrom(row);//设置编辑数据
            this.addeditVisible = true; //编辑框出现
            
        },
 //点击增加,增加框弹出来
handleAdd(){
  this.isEdit=false;
  this.setAddFrom();//给某些初始值赋值都在这方法里面
  this.addeditVisible = true; //编辑框出现
},
//  点击删除，删除框弹出来
handleDelete(row) {
     this.delData=  Object.assign({}, row);
     this.visible = true;
},
 //增加或者编辑的弹窗消失
 handleClose(){
    this.$refs.postForm.resetFields(); //对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
    this.loading=false;
     this.addeditVisible = false ;//弹窗消失
 },   
 //提交表单
submitForm(fromname) {
                this.$refs[fromname].validate(valid => {
                  if (valid) {   
                   this.loading = true;
                   console.log(this.postForm);
                    let url = this.isEdit?this.editUrl:this.addUrl;
                      // 增加或者是编辑前再次的组织数据
               let resultData =  this.getPostData();
                     this.$axios.post(url,{ data:
                  resultData
             }).then(() => {
                      this.loading = false; //关闭提交按钮的loading
                      this.getData();//刷新数据
                      this.handleClose();//关闭弹窗
                      //  弹窗提示成功。
             }).catch(err=>{
               //新增或者修改数据失败
            this.loading = false
          
             })
                    
                  } else {
                    console.log('error submit!!')
                    return false
                  }
                })
              },
// 确定删除
deleteRow(){
    console.log('删除目录');
    //发送删除请求
this.$axios.post(this.delUrl,{ data:this.delData}).then(() => {

this.visible = false; // 让这个删除框消失
this.delData={};//情况删除的数据
this.getData();//重新获取数据
// this.alertMessage('删除') //提示成功跳转。
}).catch(err=>{
//删除数据失败，


})

},           //搜索
  search()
 {
    //  this.cur_page=1;//搜索要设置页面数为1
    //  this.getData();
    this.$message({
        type: 'success',
        duration:1000,
showClose: true,
message: `对不起，此功能正在完善`
});
 },
 //设置编辑数据，这个一般的用下面这个就可以了
 setEditFrom(row)
 {
     //这个就是整个的数据拷贝，要是要对数据进行特殊化处理，要修改这个方法
 this.postForm =Object.assign({}, row); //对象要拷贝
 },
 //增加或者编辑的时候，最后的得到这个提交的数据对象
 getPostData(){
       return Object.assign({}, this.postForm);
 },
 setAddFrom()
 {
      
 },
 //成功或者失败的弹窗，type 0表示失败，默认成功
alertMessage(caozuoname,typeNum=1){
    let type ="success",message="成功";
    if(typeNum == 0)
    {
        type = "error";
        message = "失败"
    }
    this.$message({
        type: type,
        duration:1000,
showClose: true,
message: `${caozuoname}${message}`
});
},

    }
}