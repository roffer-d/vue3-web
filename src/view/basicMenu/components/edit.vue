<template>
    <div class="basicMenu-edit">
        <el-form ref="basicMenuFormRef" :model="data.form" :rules="data.rules" label-width="80px">
            <el-form-item label="父级菜单" prop="parentId">
                <el-input v-model="data.form.parentId" placeholder="父级菜单"/>
            </el-form-item>
            <el-form-item label="名称" prop="name">
                <el-input v-model="data.form.name" placeholder="名称"/>
            </el-form-item>
            <el-form-item label="路由" prop="router">
                <el-input v-model="data.form.router" placeholder="路由"/>
            </el-form-item>
            <el-form-item label="图标" prop="icon">
                <el-input v-model="data.form.icon" placeholder="图标"/>
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
    </div>
</template>
<script setup>
import {ref, reactive,onMounted} from 'vue'
import * as basicMenuApi from '../api'
import {ElMessage} from 'element-plus'

const basicMenuFormRef = ref(null)
const props = defineProps(['id'])
const emit = defineEmits(['success']);

const data = reactive({
    form: {
        id:'',
        parentId:'',//父级菜单id
        name:'',//名称
        router:'',//路由
        icon:'',//图标
        sort:'',//排序
        remark:'',//菜单说明
    },
    rules:{
        parentId: [
            {required: true, message: '父级菜单不能为空'},
        ],
        name: [
            {required: true, message: '名称不能为空'},
        ],
        router: [
            {required: true, message: '路由不能为空'},
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
    }
})

/** 获取信息 **/
const getUser = () => {
    if (props.id) {
        basicMenuApi.getById({id: props.id}).then(res => {
            if (res.code == 200) {
                for(let key in data.form){
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

/** 提交保存 **/
const submitForm = async (form) => {
    form = form || basicMenuFormRef.value
    await form.validate((valid, fields) => {
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
})
</script>