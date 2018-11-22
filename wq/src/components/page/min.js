export default {
    data() {
        return {
            getDataurl: '',//获取数据接口
            addUrl:'',//增加请求后台接口
            editUrl:'',//编辑请求后台接口
            delUrl:'',//删除请求后台接口
            tableData: [], //获取到要展示列表的数据
            select_word:'',//搜索关键字
            fromname:'addeditfrom',//增加或者修改数据时候表单的 ref
            cur_page: 1, //当前页码
            pagezize:8, //每页显示个数,这里是默认是8
            count : 0, // 总数
            type:0,//0就是弹窗的类型，0表示新增，1表示修改
            addeditVisible: false, //修改框和增加框是一个框，开始状态
            delVisible: false, // 删除框开始状态
            form: { },//弹窗表单数据
            idx: -1 ,//默认的修改或者删除的数组的index
        }
    },
    created() {
        this.getData();
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
    // range.cloneRange()
    // range.insertNode();
    // var range = document.createRange();
    // range.setStart(cellChild, 0);
    // range.setEnd(cellChild, 1);
    
  },
           // 分页导航
           handleCurrentChange(val) {
            // val 是默认的页码数
            this.cur_page = val;
            //  这个是重新请求数据
            this.getData();
        },
           // 获取数据
               getData() {
              //这里是带了几个参数，页码的参数
              this.$axios.get(this.getDataurl,{ params:{
                  "page": this.cur_page,
                  "pagezize":this.pagezize,
                  "select_word":this.select_word
              }}).then((res) => {
                  this.tableData = res.data.list;
                  this.count = res.data.count; //  页码数量
              })
          },
          // 关闭增加或者编辑窗口
          close(){
            //这个是增加或者编辑框关闭的时候，在表单验证会出现错误，如果不清空这些错误，再次编辑就会出现错误。
    this.$refs[this.fromname].clearValidate();
   },
   handleEdit(index, row) {  //点击编辑
    this.type=1;//弹窗的类型是1
    this.idx = index; // 编辑的index
    this.setEditFrom(row);//给编辑的from写数据，这个如果不一样需要调用者重写 ***** 
    this.addeditVisible = true; //编辑框出现
    
},
 //点击增加,增加框弹出来
handleAdd(){
  this.type=0;//弹窗的类型是1
  this.form = {};//清空from里面数据
  this.setAddFrom();//给某些初始值赋值都在这方法里面，这个需要调用者必须重写 *******
  this.addeditVisible = true; //编辑框出现
},
//  点击删除，删除框弹出来
handleDelete(index, row) {
    this.idx = index; 
    this.form=row;
    // 这个是让删除的弹窗出来.
    this.delVisible = true;
},
saveEdit() {
    // 保存编辑或者保存增加的数据
     this.$refs[this.fromname].validate((valid) => {
if (valid) {

       // 更新或者是编辑前的组织数据
     let resultData =  this.editData();
     
          if(this.type == 1) //更新数据的情况
        {

     //发送更新请求
   this.$axios.post(this.editUrl,{ data:{
       "data": resultData
   }}).then(res => {
        this.addeditVisible = false; //编辑增加框消失
this.tableData.splice(this.idx,1,resultData); // 更新当前数据
  this.alertMessage('修改');//修改成功的提示

   }).catch(err=>{
       //更新数据失败，
  

   })
  }
       else //增加数据
       {
          
                  //发送增加请求
   this.$axios.post(this.addUrl,{ data:{
       "data": resultData
   }}).then(res => {
        this.addeditVisible = false; //编辑增加框消失
  // 新增数据的情况 ，把新增的数据放到第一个
           this.tableData.unshift(resultData);
           this.count+=1; //总数量增加一
           this.alertMessage('增加');
   }).catch(err=>{
       //新增数据失败，
   
   })
       
       }
       
   
} else {
 //编辑增加的时候没通过验证
console.log('error submit!!');
return false;
}
});
  
},
// 确定删除
deleteRow(){
    //发送删除请求
this.$axios.post(this.delUrl,{ data:{
"data": this.form
}}).then(res => {
this.delVisible = false; // 让这个删除框消失
this.tableData.splice(this.idx, 1);//删除这个数组中的这个数据，这个是可以触发数据更新的
this.count-=1; //总数量增加一
this.alertMessage('删除')

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
 this.form =Object.assign({}, row); //对象要拷贝
 },
 //组织需要改变的数据，这个一般的不需要 重写
 editData(){
       return Object.assign({}, this.form);
 },
 setAddFrom()
 {
       //这个是需要重写的方法，必须重写，哪怕是空，也必须重写
       throw new Error('component must implement handlePlaylist method')
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