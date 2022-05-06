<template>
    <div class="basicDict-edit">
        <el-form ref="basicDictFormRef" :model="data.form" :rules="data.rules" label-width="80px">
            <el-form-item label="名称" prop="name">
                <el-input v-model="data.form.name" placeholder="名称"/>
            </el-form-item>
            <el-form-item label="值" prop="code">
                <el-input v-model="data.form.code" placeholder="值"/>
            </el-form-item>
            <el-form-item label="分类" prop="type">
                <el-input v-model="data.form.type" placeholder="分类"/>
            </el-form-item>
            <el-form-item label="描述" prop="remark">
                <el-input v-model="data.form.remark" placeholder="描述"/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm(basicDictFormRef)">保存</el-button>
                <el-button @click="resetForm(basicDictFormRef)">重设</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script setup>
import {ref, reactive,onMounted} from 'vue'
import * as basicDictApi from '../api'
import {ElMessage} from 'element-plus'

const basicDictFormRef = ref(null)
const props = defineProps(['id'])
const emit = defineEmits(['success']);

const data = reactive({
    form: {
        id:'',
        name:'',//名称
        code:'',//值
        type:'',//分类
        remark:'',//描述
    },
    rules:{
        name: [
            {required: true, message: '名称不能为空'},
        ],
        code: [
            {required: true, message: '值不能为空'},
        ],
        type: [
            {required: true, message: '分类不能为空'},
        ],
        remark: [
            {required: true, message: '描述不能为空'},
        ],
    }
})

/** 获取信息 **/
const getUser = () => {
    if (props.id) {
        basicDictApi.getById({id: props.id}).then(res => {
            if (res.code == 200) {
                for(let key in data.form){
                    data.form[key] = res.data.basicDict[key]
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
    form = form || basicDictFormRef.value
    await form.validate((valid, fields) => {
        if (valid) {
            let form = JSON.parse(JSON.stringify(data.form))

            let method = props.id ? basicDictApi.update : basicDictApi.save
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
    form = form || basicDictFormRef.value
    form.resetFields()
}

onMounted(() => {
    getUser()
})
</script>