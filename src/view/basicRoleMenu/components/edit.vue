<template>
    <div class="basicRoleMenu-edit">
        <el-form ref="basicRoleMenuFormRef" :model="form" :rules="rules" label-width="80px">
            <el-form-item label="" prop="id">
                <el-input v-model="form.id" placeholder=""/>
            </el-form-item>
            <el-form-item label="角色id" prop="roleId">
                <el-input v-model="form.roleId" placeholder="角色id"/>
            </el-form-item>
            <el-form-item label="菜单id" prop="menuId">
                <el-input v-model="form.menuId" placeholder="菜单id"/>
            </el-form-item>
            <el-form-item label="权限类型(1、新增，2、编辑，3、删除，4、查询，5、导出，6、导入)" prop="authorityType">
                <el-input v-model="form.authorityType" placeholder="权限类型(1、新增，2、编辑，3、删除，4、查询，5、导出，6、导入)"/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm(basicRoleMenuFormRef)">保存</el-button>
                <el-button @click="resetForm(basicRoleMenuFormRef)">重设</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import {ref, reactive, toRefs, defineComponent} from 'vue'
    import * as basicRoleMenuApi from '../api'
    import {ElMessage} from 'element-plus'

    export default defineComponent({
        name: 'basicRoleMenu-edit',
        props: ['id'],
        emits: ['success'],
        setup(props, content) {
            const basicRoleMenuFormRef = ref(null)

            const data = reactive({
                form: {
                    id:'',
                    roleId:'',
                    menuId:'',
                    authorityType:'',
                }
            })

            /** 获取角色菜单信息 **/
            const getUser = () => {
                if (props.id) {
                    basicRoleMenuApi.getById({id: props.id}).then(res => {
                        if (res.code == 200) {
                            for(let key in data.form){
                                data.form[key] = res.data.basicRoleMenu[key]
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
                roleId: [
                    {required: true, message: '角色id不能为空'},
                ],
                menuId: [
                    {required: true, message: '菜单id不能为空'},
                ],
                authorityType: [
                    {required: true, message: '权限类型(1、新增，2、编辑，3、删除，4、查询，5、导出，6、导入)不能为空'},
                ],
            })

            /** 提交保存 **/
            const submitForm = async (form) => {
                form = form || basicRoleMenuFormRef.value
                await form.validate((valid, fields) => {
                    if (valid) {
                        let form = JSON.parse(JSON.stringify(data.form))

                        let method = props.id ? basicRoleMenuApi.update : basicRoleMenuApi.save
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
                form = form || basicRoleMenuFormRef.value
                form.resetFields()
            }

            getUser()

            return {
                ...toRefs(data),
                basicRoleMenuFormRef,
                rules,
                submitForm,
                resetForm,
            }
        }
    })
</script>