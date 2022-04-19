<template>
  <div class="user-edit">
    <el-form ref="userFormRef" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="登录账号" prop="account">
        <el-input maxlength="20" v-model="form.account" placeholder="登录账号"/>
      </el-form-item>
      <el-form-item label="真实姓名" prop="name">
        <el-input maxlength="20" v-model="form.name" placeholder="真实姓名"/>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" maxlength="20" v-model="form.password" placeholder="密码"/>
      </el-form-item>
      <el-form-item label="确认密码" prop="repassword">
        <el-input type="password" maxlength="20" v-model="form.repassword" placeholder="确认密码"/>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" placeholder="邮箱"/>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="form.status" placeholder="请选择状态">
          <el-option label="启用" value="1"/>
          <el-option label="禁用" value="0"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(userFormRef)">保存</el-button>
        <el-button @click="resetForm(userFormRef)">重设</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {ref, reactive, toRefs, defineComponent} from 'vue'
import md5 from 'js-md5'
import * as userApi from '../api'
import {ElMessage} from 'element-plus'

export default defineComponent({
  name: 'user-edit',
  props: ['id'],
  emits: ['success'],
  setup(props, content) {
    const userFormRef = ref(null)

    const data = reactive({
      form: {
        id:undefined,
        account: '',
        name: '',
        password: '',
        repassword: '',
        email: '',
        status: '1'
      }
    })

    /** 获取用户信息 **/
    const getUser = () => {
      if (props.id) {
        userApi.getById({id: props.id}).then(res => {
          if (res.code == 200) {
            for(let key in data.form){
              data.form[key] = res.data.user[key]
            }
            data.form.password = ''
          } else {
            ElMessage({
              type: 'danger',
              message: res.message
            })
          }
        })
      }
    }

    /** 验证密码 **/
    const validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('密码不能为空'))
      } else {
        if (data.form.repassword) {
          userFormRef.value.validateField('password', () => null)
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

    /** 表单验证配置 **/
    const rules = reactive({
      account: [
        {required: true, message: '登录账号不能为空'},
      ],
      name: [
        {required: true, message: '真实姓名不能为空'},
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
        {required: true, message: '邮箱不能为空'},
        {type: 'email', message: '请输入正确的邮箱地址'},
      ],
      status: [
        {required: true, message: '请选择状态'},
      ],
    })

    /** 提交保存 **/
    const submitForm = async (form) => {
      form = form || userFormRef.value
      await form.validate((valid, fields) => {
        if (valid) {
          let form = JSON.parse(JSON.stringify(data.form))
          form.password = md5(form.password)
          form.repassword = md5(form.repassword)

          let method = props.id ? userApi.update : userApi.save
          let title = props.id ? '编辑' : '添加'
          method(form).then(res => {
            if (res.code == 200) {
              ElMessage({
                type: 'success',
                message: `${title}成功!`
              })

              resetForm()

              content.emit('success', form)
            }
          })
        }
      })
    }

    /** 重置表单 **/
    const resetForm = (form) => {
      form = form || userFormRef.value
      form.resetFields()
    }

    getUser()

    return {
      ...toRefs(data),
      userFormRef,
      rules,
      submitForm,
      resetForm,
    }
  }
})
</script>