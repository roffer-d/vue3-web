<template>
    <div class="basicRoleMenu-page">
        <div class="search-box">
            <el-input v-model="searchData.id" placeholder="" style="width: 200px;" class="mr-20" />
            <el-input v-model="searchData.roleId" placeholder="角色id" style="width: 200px;" class="mr-20" />
            <el-input v-model="searchData.menuId" placeholder="菜单id" style="width: 200px;" class="mr-20" />
            <el-input v-model="searchData.authorityType" placeholder="权限类型(1、新增，2、编辑，3、删除，4、查询，5、导出，6、导入)" style="width: 200px;" class="mr-20" />
            <el-button class="mr-10" type="primary" @click="search">查询</el-button>
            <el-button class="mr-10" @click="reset">重设</el-button>
            <el-button type="success" @click="handlerAdd" style="float: right">添加</el-button>
        </div>
        <div class="data-list" v-loading="loading">
            <el-table :data="userList" style="width: 100%">
                <el-table-column prop="id" label="" />
                <el-table-column prop="roleId" label="角色id" />
                <el-table-column prop="menuId" label="菜单id" />
                <el-table-column prop="authorityType" label="权限类型(1、新增，2、编辑，3、删除，4、查询，5、导出，6、导入)" />
                <el-table-column label="操作" width="200" >
                    <template #default="{row}">
                        <el-tag class="mr-10" @click="handlerEdit(row)" type="danger" >编辑</el-tag>
                        <el-tag class="mr-10" @click="handlerDelete(row)" type="danger" >删除</el-tag>
                    </template>
                </el-table-column>
            </el-table>

            <el-pagination
                    v-model:currentPage="searchData.pageNum"
                    v-model:page-size="searchData.pageSize"
                    :hide-on-single-page="hidePager"
                    :page-sizes="pageSizeOption"
                    small
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
            />
        </div>

        <el-dialog v-model="modelVisible" :title="modelTitle" width="30%"
                   :close-on-click-modal="false"
                   :close-on-press-escape="false"
                   @closed="modelClosed"
        >
            <edit :id="basicRoleMenuId" @success="addSuccess" v-if="modelVisible"/>
        </el-dialog>
    </div>
</template>

<script>
    import {ref, reactive, toRefs, defineComponent,computed} from 'vue'
    import * as basicRoleMenuApi from './api'
    import {ElMessageBox, ElMessage} from 'element-plus'
    import edit from './components/edit'

    export default defineComponent({
        name: "list",
        components: {edit},
        setup(props, content) {
            const data = reactive({
                pageSizeOption:[10,20,50,100],
                searchData: {
                    pageNum: 1,
                    pageSize: 10,
                    id:undefined,
                    roleId:undefined,
                    menuId:undefined,
                    authorityType:undefined,
                },
                basicRoleMenuList: [],
                total: 0,
                loading: true,
                modelVisible: false,
                modelTitle: '添加角色菜单',
                basicRoleMenuId: undefined,
            })

            /** 是否隐藏分页组件，当数据总条数小于每页显示的数据条数时隐藏 **/
            let hidePager = computed(()=>{
                return Math.floor(data.total / data.searchData.pageSize) == 0
            })

            /** 查询、搜索角色菜单 **/
            const search = () => {
                basicRoleMenuApi.query(data.searchData).then(res => {
                    if (res.code == 200) {
                        data.total = res.data.total
                        data.basicRoleMenuList = res.data.list
                    }
                }).finally(() => {
                    data.loading = false
                })
            }

            /** 每页显示条数改变 **/
            const handleSizeChange = (pageSize)=>{
                data.searchData.pageSize = pageSize
                search()
            }

            /** 页码改变 **/
            const handleCurrentChange = (pageNum)=>{
                data.searchData.pageNum = pageNum
                search()
            }

            /** 删除角色菜单 **/
            const handlerDelete = (basicRoleMenu) => {
                ElMessageBox.confirm(`确认删除`, `删除提示`,
                        {
                            confirmButtonText: '删除',
                            cancelButtonText: '取消',
                            type: 'warning',
                        })
                        .then(() => {
                            basicRoleMenuApi.del({id: basicRoleMenu.id}).then(res => {
                                if (res.code == 200) {
                                    ElMessage({
                                        type: 'success',
                                        message: `删除成功!`
                                    })
                                    search()
                                }
                            })
                        })
            }

            /** 显示添加角色菜单弹窗 **/
            const handlerAdd = () => {
                data.modelTitle = '添加角色菜单'
                data.modelVisible = true
            }

            /** 显示编辑弹窗 **/
            const handlerEdit = (basicRoleMenu) => {
                data.basicRoleMenuId = basicRoleMenu.id
                data.modelTitle = '编辑角色菜单'
                data.modelVisible = true
            }

            /** 添加成功回调 **/
            const addSuccess = () => {
                data.modelVisible = false
                reset()
            }

            /** 弹窗关闭之后 **/
            const modelClosed = () => {
                data.basicRoleMenuId = undefined
            }

            const reset = () => {
                data.searchData = {
                    pageNum: 1,
                    pageSize: 10,
                    id:undefined,
                    roleId:undefined,
                    menuId:undefined,
                    authorityType:undefined,
                }
                search()
            }

            search()

            return {
                ...toRefs(data),
                handlerDelete,
                handlerAdd,
                handlerEdit,
                modelClosed,
                addSuccess,
                search,
                reset,
                handleSizeChange,
                handleCurrentChange,
                hidePager,
            }
        }
    })
</script>

<style scoped lang="scss">
    .basicRoleMenu-page {
        background: #fff;
        padding: 20px;
        height: calc(100vh - 190px);

        .data-list {
            margin-top: 20px;
        }
    }
</style>