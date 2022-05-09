<template>
  <div class="auth-config">
    <div class="title">
      <div>菜单名称 <span class="menu-name">{{ props.menu.name }}</span></div>
    </div>
    <div class="form">
      <div class="item" style="justify-content: flex-start">
        <div class="label">菜单配置</div>
        <div class="content"><el-button type="primary" size="small" @click="addItem">添加</el-button> </div>
      </div>
      <div class="item auth" v-for="(item,index) in data.authList" :key="index">
        <div class="sub">
          <div class="label">权限值</div>
          <div class="content">
            <el-input v-model="item.code" placeholder="权限值" style="width: 120px"/>
          </div>
        </div>
        <div class="sub">
          <div class="label">权限名</div>
          <div class="content">
            <el-input v-model="item.name" placeholder="权限名" style="width: 120px" />
          </div>
          <div class="action">
            <i class="iconfont icon-tianjia" @click="addItem" v-if="index == data.authList.length - 1"></i>
            <i class="iconfont icon-shanchu" @click="removeItem(index)" v-if="data.authList.length > 1"></i>
          </div>
        </div>
      </div>
      <div class="form-btn" v-if="data.authList.length">
        <el-button type="primary" size="small" @click="submitForm">保存</el-button>
        <el-button size="small" @click="resetForm">重置</el-button>
      </div>
    </div>
  </div>
</template>
<script setup>
import {reactive, ref, onBeforeMount, defineProps, defineEmits} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import * as basicMenuApi from "../api";
import {ElMessage} from 'element-plus'
import {menuAuth} from "../api";

const route = useRoute()
const router = useRouter()
const props = defineProps(['menu'])
const emit = defineEmits(['success']);

const data = reactive({
  authList: [{
    code: '',
    name: ''
  }]
})

if(props.menu.auth){
  data.authList = JSON.parse(props.menu.auth)
}

/** 添加权限 **/
const addItem = () => {
  data.authList.push({
    code: '',
    name: ''
  })
}

/** 移除权限 **/
const removeItem = (index) => {
  data.authList.splice(index, 1)
}

/** 表单验证 **/
const validateForm = () =>{
  return data.authList.filter(auth=>{
    return auth.code == '' && auth.name == ''
  }).length == 0
}

/** 提交保存 **/
const submitForm = () => {
  const valid = validateForm()
  if (valid) {
    let params = {
      menuId: props.menu.id,
      authList: JSON.stringify(data.authList)
    }
    basicMenuApi.menuAuth(params).then(res => {
      if (res.code == 200) {
        ElMessage({
          type: 'success',
          message: `配置成功!`
        })

        emit('success')
      }
    })
  }else{
    ElMessage({
      type: 'warning',
      message: `权限配置属性为必填！`
    })
  }
}

/** 重置表单 **/
const resetForm = () => {
  data.authList = [{
    code: '',
    name: ''
  }]
}

onBeforeMount(() => {

})
</script>
<style scoped lang="scss">
.auth-config {
  .iconfont {
    font-size: 20px;
    cursor: pointer;
  }

  .icon-tianjia {
    color: #409eff;
    margin-left: 10px;
  }

  .icon-shanchu {
    color: #f56c6c;
    margin-left: 10px;
  }

  .title{
    margin-bottom: 20px;
    .menu-name{
      font-weight: 700;
      color:#409eff;
    }
  }

  .form{
    .item{
      display: flex;
      align-items: center;

      &.auth{
        padding: 0 20px;
      }

      &:not(:last-child){
        margin-bottom: 20px;
      }

      .sub{
        display: flex;
        align-items: center;
        justify-content: space-between;

        &:first-child{
          margin-right: 20px;
        }
      }
      .label{
        margin-right: 10px;
      }
      .content{
        display: flex;
        align-items: center;
      }
    }
  }

  .form-btn{
    text-align: center;
    margin-top: 40px;
  }
}
</style>