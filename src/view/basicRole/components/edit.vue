<template>
    <div class="basicRole-edit">
        <el-form ref="basicRoleFormRef" :model="data.form" :rules="data.rules" label-width="80px">
            <el-form-item label="角色名称" prop="name">
                <el-input v-model="data.form.name" placeholder="角色名称"/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm(basicRoleFormRef)">保存</el-button>
                <el-button @click="resetForm(basicRoleFormRef)">重设</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script setup>
import {ref, reactive,onMounted} from 'vue'
import * as basicRoleApi from '../api'
import {ElMessage} from 'element-plus'

const basicRoleFormRef = ref(null)
const props = defineProps(['id'])
const emit = defineEmits(['success']);

const data = reactive({
    form: {
        id:'',
        name:'',//角色名称
    },
    rules:{
        name: [
            {required: true, message: '角色名称不能为空'},
        ],
    }
})

/** 获取信息 **/
const getUser = () => {
    if (props.id) {
        basicRoleApi.getById({id: props.id}).then(res => {
            if (res.code == 200) {
                for(let key in data.form){
                    data.form[key] = res.data.basicRole[key]
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
    form = form || basicRoleFormRef.value
    await form.validate((valid, fields) => {
        if (valid) {
            let form = JSON.parse(JSON.stringify(data.form))

            let method = props.id ? basicRoleApi.update : basicRoleApi.save
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
    form = form || basicRoleFormRef.value
    form.resetFields()
}

onMounted(() => {
    getUser()
})
</script>