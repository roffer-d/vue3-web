<template>
    <div class="basicUserRole-edit">
        <el-form ref="basicUserRoleFormRef" :model="form" :rules="rules" label-width="80px">
            <el-form-item label="" prop="id">
                <el-input v-model="form.id" placeholder=""/>
            </el-form-item>
            <el-form-item label="用户id" prop="userId">
                <el-input v-model="form.userId" placeholder="用户id"/>
            </el-form-item>
            <el-form-item label="角色id" prop="roleId">
                <el-input v-model="form.roleId" placeholder="角色id"/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm(basicUserRoleFormRef)">保存</el-button>
                <el-button @click="resetForm(basicUserRoleFormRef)">重设</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import {ref, reactive, toRefs, defineComponent} from 'vue'
    import * as basicUserRoleApi from '../api'
    import {ElMessage} from 'element-plus'

    export default defineComponent({
        name: 'basicUserRole-edit',
        props: ['id'],
        emits: ['success'],
        setup(props, content) {
            const basicUserRoleFormRef = ref(null)

            const data = reactive({
                form: {
                    id:'',
                    userId:'',
                    roleId:'',
                }
            })

            /** 获取用户角色信息 **/
            const getUser = () => {
                if (props.id) {
                    basicUserRoleApi.getById({id: props.id}).then(res => {
                        if (res.code == 200) {
                            for(let key in data.form){
                                data.form[key] = res.data.basicUserRole[key]
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
                userId: [
                    {required: true, message: '用户id不能为空'},
                ],
                roleId: [
                    {required: true, message: '角色id不能为空'},
                ],
            })

            /** 提交保存 **/
            const submitForm = async (form) => {
                form = form || basicUserRoleFormRef.value
                await form.validate((valid, fields) => {
                    if (valid) {
                        let form = JSON.parse(JSON.stringify(data.form))

                        let method = props.id ? basicUserRoleApi.update : basicUserRoleApi.save
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
                form = form || basicUserRoleFormRef.value
                form.resetFields()
            }

            getUser()

            return {
                ...toRefs(data),
                basicUserRoleFormRef,
                rules,
                submitForm,
                resetForm,
            }
        }
    })
</script>