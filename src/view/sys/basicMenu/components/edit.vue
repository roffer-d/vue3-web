<template>
  <div class="basicMenu-edit">
    <el-form ref="basicMenuFormRef" :model="data.form" :rules="data.rules" label-width="80px">
      <el-form-item label="父级菜单" prop="parentId">
        <el-cascader
            ref="parentMenuRef"
            v-model="data.form.pid"
            :options="data.menuList"
            :props="cascaderProps"
            @change="parentMenuChange"
            style="width: 100%"
            placeholder="父级菜单"/>
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input v-model="data.form.name" placeholder="名称"/>
      </el-form-item>
      <el-form-item label="路由" prop="route">
        <el-input v-model="data.form.route" placeholder="路由"/>
      </el-form-item>
      <el-form-item label="权限标识" prop="code">
        <el-input v-model="data.form.code" placeholder="权限标识"/>
      </el-form-item>
      <el-form-item label="图标">
        <i :class="['iconfont',data.form.icon]" v-if="data.form.icon" style="margin-right: 8px"></i>
        <el-button size="small" type="warning" @click="data.iconVisible=true">选择</el-button>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input v-model="data.form.sort" placeholder="排序"/>
      </el-form-item>
      <el-form-item label="菜单说明" prop="remark">
        <el-input type="textarea" v-model="data.form.remark" placeholder="菜单说明"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(basicMenuFormRef)">保存</el-button>
        <el-button @click="resetForm(basicMenuFormRef)">重设</el-button>
      </el-form-item>
    </el-form>

    <el-dialog v-model="data.iconVisible" title="选择图标" width="30%"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
    >
      <r-icon v-model="data.form.icon" @success="handlerIconSuccess"/>
    </el-dialog>
  </div>
</template>
<script setup>
import {ref, reactive, onMounted, defineProps, defineEmits, nextTick} from 'vue'
import * as basicMenuApi from '../api'
import {ElMessage} from 'element-plus'
import rIcon from '@/components/r-icon'

const basicMenuFormRef = ref(null)
const parentMenuRef = ref(null)

const props = defineProps(['id', 'parentMenu'])
const emit = defineEmits(['success']);
const cascaderProps = reactive({
  // multiple: false,
  emitPath: false,
  value: 'id',
  label: 'name',
  checkStrictly: true
})

const data = reactive({
  form: {
    id: '',
    pid: '',//直属父级id
    pname: '',//直属父级名称
    pids: '',//所有父级id
    pnames: '',//所有父级名称
    name: '',//名称
    route: '',//路由
    code: '',//权限标识
    icon: '',//图标
    sort: '',//排序
    remark: '',//菜单说明
  },
  rules: {
    pid: [
      {required: true, message: '父级菜单不能为空'},
    ],
    name: [
      {required: true, message: '名称不能为空'},
    ],
    route: [
      {required: true, message: '路由不能为空'},
    ],
    code: [
      {required: true, message: '权限标识不能为空'},
    ],
    // icon: [
    //     {required: true, message: '图标不能为空'},
    // ],
    // sort: [
    //     {required: true, message: '排序不能为空'},
    // ],
    // remark: [
    //     {required: true, message: '菜单说明不能为空'},
    // ],
  },
  menuList: [],
  iconVisible:false,
})

/** 菜单下添加子菜单，初始化时赋值表单属性 **/
if (props.parentMenu) {
  data.form.pid = props.parentMenu.id
  data.form.pname = props.parentMenu.name
  data.form.pids = `${props.parentMenu.pids},${props.parentMenu.id}`
  data.form.pnames = `${props.parentMenu.pnames},${props.parentMenu.name}`
}

/** 选择完图标 **/
const handlerIconSuccess = ()=>{
  data.iconVisible = false
}

/** 获取信息 **/
const getUser = () => {
  if (props.id) {
    basicMenuApi.getById({id: props.id}).then(res => {
      if (res.code == 200) {
        for (let key in data.form) {
          data.form[key] = res.data.basicMenu[key]
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

/** 获取菜单树 **/
const getMenuList = () => {
  basicMenuApi.menuTree().then(res => {
    if (res.code == 200) {
      data.menuList = res.data.list
    } else {
      ElMessage({
        type: 'danger',
        message: res.message
      })
    }
  })
}

/** 父级菜单值改变触发 **/
const parentMenuChange = () => {
  const checkedNode = parentMenuRef.value.getCheckedNodes()[0]
  const pathValues = checkedNode.pathValues.join('/')
  const pathLabels = checkedNode.pathLabels.join('/')

  data.form.pname = checkedNode.label
  data.form.pids = pathValues
  data.form.pnames = pathLabels
}

/** 提交保存 **/
const submitForm = async (form) => {
  form = form || basicMenuFormRef.value
  await form.validate((valid) => {
    if (valid) {
      let form = JSON.parse(JSON.stringify(data.form))

      let method = props.id ? basicMenuApi.update : basicMenuApi.save
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
    }
  })
}

/** 重置表单 **/
const resetForm = (form) => {
  form = form || basicMenuFormRef.value
  form.resetFields()
}

onMounted(() => {
  getUser()
  getMenuList()
})
</script>