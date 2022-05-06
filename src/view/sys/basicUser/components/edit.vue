<template>
  <div class="basicUser-edit">
    <el-form ref="basicUserFormRef" :model="data.form" :rules="data.rules" label-width="80px">
      <el-form-item label="真实姓名" prop="name">
        <el-input v-model="data.form.name" maxlength="20" placeholder="真实姓名"/>
      </el-form-item>
      <el-form-item label="登录账号" prop="account">
        <el-input v-model="data.form.account" maxlength="20" placeholder="登录账号"/>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" maxlength="20" v-model="data.form.password" placeholder="密码"/>
      </el-form-item>
      <el-form-item label="确认密码" prop="repassword">
        <el-input type="password" maxlength="20" v-model="data.form.repassword" placeholder="确认密码"/>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="data.form.email" placeholder="邮箱"/>
      </el-form-item>
      <el-form-item label="用户状态" prop="status">
        <el-select v-model="data.form.status" placeholder="用户状态">
          <el-option label="启用" value="1"/>
          <el-option label="禁用" value="0"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(basicUserFormRef)">保存</el-button>
        <el-button @click="resetForm(basicUserFormRef)">重设</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup>
import {ref, reactive, onMounted,defineProps,defineEmits} from 'vue'
import md5 from 'js-md5'
import * as basicUserApi from '../api'
import {ElMessage} from 'element-plus'

const basicUserFormRef = ref(null)
const props = defineProps(['id'])
const emit = defineEmits(['success']);

/** 验证密码 **/
const validatePassword = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('密码不能为空'))
  } else {
    if (data.form.repassword) {
      basicUserFormRef.value.validateField('password', () => null)
    }
    callback()
  }
}
/** 验证确认密码 **/
const validateRepassword = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('确认密码不能为空'))
  } else if (value !== data.form.password) {
    callback(new Error("两次密码不一致"))
  } else {
    callback()
  }
}

const data = reactive({
  form: {
    id: '',
    name: '',//真实姓名
    account: '',//登录账号
    password: '',//密码
    email: '',//邮箱
    status: '',//用户状态（0禁用，1启用）
  },
  rules: {
    name: [
      {required: true, message: '真实姓名不能为空'},
    ],
    account: [
      {required: true, message: '登录账号不能为空'},
    ],
    password: [
      {required: true, message: '密码不能为空'},
      {validator: validatePassword},
    ],
    repassword: [
      {required: true, message: '确认密码不能为空'},
      {validator: validateRepassword},
    ],
    email: [
      {type: 'email', message: '请输入正确的邮箱地址'},
    ],
    status: [
      {required: true, message: '用户状态不能为空'},
    ],
  }
})

/** 获取信息 **/
const getUser = () => {
  if (props.id) {
    basicUserApi.getById({id: props.id}).then(res => {
      if (res.code == 200) {
        for (let key in data.form) {
          data.form[key] = res.data.basicUser[key]
        }
      } else {
        ElMessage({
          type: 'danger',
          message: res.message
        })
      }
    })
  }
}

/** 提交保存 **/
const submitForm = async (form) => {
  form = form || basicUserFormRef.value
  await form.validate((valid) => {
    if (valid) {
      let form = JSON.parse(JSON.stringify(data.form))
      form.password = md5(form.password)
      form.repassword = md5(form.repassword)

      let method = props.id ? basicUserApi.update : basicUserApi.save
      let title = props.id ? '编辑' : '添加'
      method(form).then(res => {
        if (res.code == 200) {
          ElMessage({
            type: 'success',
            message: `${title}成功!`
          })

          resetForm()

          emit('success', form)
        }
      })
    }else{
      console.log('表单验证失败')
    }
  })
}

/** 重置表单 **/
const resetForm = (form) => {
  form = form || basicUserFormRef.value
  form.resetFields()
}

onMounted(() => {
  getUser()
})
</script>