<template>
  <div class="user-role">
    <el-form ref="userRoleFormRef" :model="data.form" :rules="data.rules" label-width="80px">
      <el-form-item label="用户" prop="name">
        {{props.user.name}}
      </el-form-item>
      <el-form-item label="角色" prop="roleIds" style="margin-bottom: 40px;">
        <el-transfer
            v-model="data.form.roleIds"
            :titles="['所有角色', '已选角色']"
            :props="{key: 'id',label: 'name',}"
            :data="data.roleList"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">保存</el-button>
        <el-button @click="resetForm">重设</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup>
import {reactive, ref, onBeforeMount} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {getRoleList, getUserRoleData, saveRole} from '../api'
import {ElMessage} from 'element-plus'

const route = useRoute()
const router = useRouter()
const props = defineProps({
  user: {}
})
const emit = defineEmits(['success']);
const userRoleFormRef = ref(null)

const data = reactive({
  roleList: [],
  form: {
    userId: props.user.id,
    roleIds: []
  },
  rules: {
    roleIds: [
      {required: true, message: '请选择角色'},
    ],
  }
})

/** 提交保存 **/
const submitForm = async () => {
  const form = userRoleFormRef.value
  await form.validate((valid, fields) => {
    if (valid) {
      let form = JSON.parse(JSON.stringify(data.form))
      form.roleIds = form.roleIds.join(',')
      saveRole(form).then(res => {
        if (res.code == 200) {
          emit('success')
        } else {
          ElMessage({
            type: 'error',
            message: res.message
          })
        }
      })
    }
  })
}

/** 重置表单 **/
const resetForm = () => {
  const form = userRoleFormRef.value
  form.resetFields()
}

/** 获取所有角色 **/
const getAllRole = async () => {
  const res = await getRoleList()
  if (res.code == 200) {
    data.roleList = res.data.list
  }
}

/** 获取用户角色 **/
const getUserRole = async () => {
  const res = await getUserRoleData({userId:props.user.id})
  if (res.code == 200) {
    data.form.roleIds = res.data.list.map(item=>item.roleId)
  }
}

onBeforeMount(() => {
  getAllRole()
  getUserRole()
})
</script>
<style scoped lang="scss">
.user-role {

}
</style>