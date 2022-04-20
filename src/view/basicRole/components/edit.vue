<template>
    <div class="basicRole-edit">
        <el-form ref="basicRoleFormRef" :model="form" :rules="rules" label-width="80px">
            <el-form-item label="" prop="id">
                <el-input v-model="form.id" placeholder=""/>
            </el-form-item>
            <el-form-item label="" prop="role">
                <el-input v-model="form.role" placeholder=""/>
            </el-form-item>
            <el-form-item label="是否启用" prop="status">
                <el-input v-model="form.status" placeholder="是否启用"/>
            </el-form-item>
            <el-form-item label="创建时间" prop="createTime">
                <el-input v-model="form.createTime" placeholder="创建时间"/>
            </el-form-item>
            <el-form-item label="更新时间" prop="updateTime">
                <el-input v-model="form.updateTime" placeholder="更新时间"/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm(basicRoleFormRef)">保存</el-button>
                <el-button @click="resetForm(basicRoleFormRef)">重设</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import {ref, reactive, toRefs, defineComponent} from 'vue'
    import * as basicRoleApi from '../api'
    import {ElMessage} from 'element-plus'

    export default defineComponent({
        name: 'basicRole-edit',
        props: ['id'],
        emits: ['success'],
        setup(props, content) {
            const basicRoleFormRef = ref(null)

            const data = reactive({
                form: {
                    id:'',
                    role:'',
                    status:'',
                    createTime:'',
                    updateTime:'',
                }
            })

            /** 获取角色信息 **/
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

            /** 表单验证配置 **/
            const rules = reactive({
                id: [
                    {required: true, message: '不能为空'},
                ],
                role: [
                    {required: true, message: '不能为空'},
                ],
                status: [
                    {required: true, message: '是否启用不能为空'},
                ],
                createTime: [
                    {required: true, message: '创建时间不能为空'},
                ],
                updateTime: [
                    {required: true, message: '更新时间不能为空'},
                ],
            })

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

                                content.emit('success', form)
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

            getUser()

            return {
                ...toRefs(data),
                basicRoleFormRef,
                rules,
                submitForm,
                resetForm,
            }
        }
    })
</script>