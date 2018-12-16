   
<template>
  <el-dialog title="提示" :visible.sync="visible" :width="width" :center="center" :beforeClose="delno">
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delno">取 消</el-button>
                <el-button type="primary" @click="confir">确 定</el-button>
            </span>
        </el-dialog>
</template>
<script>

export default {
  name: 'headtop',
    props: {
        //dialog宽度
      width:{
         type: String,
        default: '300px'
      },
      center:{
         type: Boolean,
        default: true
      },
    visible: {
      type: Boolean,
      default: false
    }
    },
    methods:{
        delno(){
              this.$emit('update:visible', false); 
        },
        confir(){
            this.$emit('delete');
        }
    }
}
</script>
