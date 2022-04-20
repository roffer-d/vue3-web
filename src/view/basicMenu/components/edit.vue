<template>
    <div class="basicMenu-edit">
        <el-form ref="basicMenuFormRef" :model="form" :rules="rules" label-width="80px">
            <el-form-item label="" prop="id">
                <el-input v-model="form.id" placeholder=""/>
            </el-form-item>
            <el-form-item label="父级菜单id" prop="parentId">
                <el-input v-model="form.parentId" placeholder="父级菜单id"/>
            </el-form-item>
            <el-form-item label="名称" prop="name">
                <el-input v-model="form.name" placeholder="名称"/>
            </el-form-item>
            <el-form-item label="路由" prop="router">
                <el-input v-model="form.router" placeholder="路由"/>
            </el-form-item>
            <el-form-item label="图标" prop="icon">
                <el-input v-model="form.icon" placeholder="图标"/>
            </el-form-item>
            <el-form-item label="排序" prop="sort">
                <el-input v-model="form.sort" placeholder="排序"/>
            </el-form-item>
            <el-form-item label="菜单说明" prop="remark">
                <el-input v-model="form.remark" placeholder="菜单说明"/>
            </el-form-item>
            <el-form-item label="创建时间" prop="createTime">
                <el-input v-model="form.createTime" placeholder="创建时间"/>
            </el-form-item>
            <el-form-item label="更新时间" prop="updateTime">
                <el-input v-model="form.updateTime" placeholder="更新时间"/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm(basicMenuFormRef)">保存</el-button>
                <el-button @click="resetForm(basicMenuFormRef)">重设</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import {ref, reactive, toRefs, defineComponent} from 'vue'
    import * as basicMenuApi from '../api'
    import {ElMessage} from 'element-plus'

    export default defineComponent({
        name: 'basicMenu-edit',
        props: ['id'],
        emits: ['success'],
        setup(props, content) {
            const basicMenuFormRef = ref(null)

            const data = reactive({
                form: {
                    id:'',
                    parentId:'',
                    name:'',
                    router:'',
                    icon:'',
                    sort:'',
                    remark:'',
                    createTime:'',
                    updateTime:'',
                }
            })

            /** 获取菜单信息 **/
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

            /** 表单验证配置 **/
            const rules = reactive({
                id: [
                    {required: true, message: '不能为空'},
                ],
                parentId: [
                    {required: true, message: '父级菜单id不能为空'},
                ],
                name: [
                    {required: true, message: '名称不能为空'},
                ],
                router: [
                    {required: true, message: '路由不能为空'},
                ],
                icon: [
                    {required: true, message: '图标不能为空'},
                ],
                sort: [
                    {required: true, message: '排序不能为空'},
                ],
                remark: [
                    {required: true, message: '菜单说明不能为空'},
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

                                content.emit('success', form)
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

            getUser()

            return {
                ...toRefs(data),
                basicMenuFormRef,
                rules,
                submitForm,
                resetForm,
            }
        }
    })
</script>