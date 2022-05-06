<template>
    <div class="basicMenu-page">
        <div class="search-box">
            <el-input v-model="data.searchData.name" placeholder="名称" style="width: 200px;" class="mr-20" />
            <el-input v-model="data.searchData.router" placeholder="路由" style="width: 200px;" class="mr-20" />
            <el-input v-model="data.searchData.authCode" placeholder="权限标识" style="width: 200px;" class="mr-20" />
            <el-button class="mr-10" type="primary" @click="search">查询</el-button>
            <el-button class="mr-10" @click="reset">重设</el-button>
            <el-button type="success" @click="handlerAdd" style="float: right">添加</el-button>
        </div>
        <div class="data-list" v-loading="data.loading">
            <el-table :data="data.basicMenuList" style="width: 100%" row-key="id">
                <el-table-column prop="pname" label="父级菜单" />
                <el-table-column prop="name" label="名称" width="120" />
                <el-table-column prop="router" label="路由" />
                <el-table-column prop="authCode" label="权限标识" />
                <el-table-column prop="icon" label="图标" width="80" />
                <el-table-column prop="sort" label="排序" width="80" />
                <el-table-column prop="remark" label="菜单说明" />
                <el-table-column prop="createTime" label="创建时间" />
<!--                <el-table-column prop="updateTime" label="更新时间" />-->
                <el-table-column label="操作" width="200" >
                    <template #default="{row}">
                        <el-tag class="mr-10" @click="handlerEdit(row)" type="danger" >编辑</el-tag>
                        <el-tag class="mr-10" @click="handlerDelete(row)" type="danger" >删除</el-tag>
                    </template>
                </el-table-column>
            </el-table>

            <el-pagination
                    v-model:currentPage="data.searchData.pageNum"
                    v-model:page-size="data.searchData.pageSize"
                    :hide-on-single-page="hidePager"
                    :page-sizes="data.pageSizeOption"
                    small
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="data.total"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
            />
        </div>

        <el-dialog v-model="data.modelVisible" :title="data.modelTitle" width="30%"
                   :close-on-click-modal="false"
                   :close-on-press-escape="false"
                   @closed="modelClosed"
        >
            <edit :id="data.basicMenuId" @success="addSuccess" v-if="data.modelVisible"/>
        </el-dialog>
    </div>
</template>

<script setup>
import {reactive,computed,onMounted} from 'vue'
import * as basicMenuApi from './api'
import {ElMessageBox, ElMessage} from 'element-plus'
import edit from './components/edit'

const data = reactive({
    pageSizeOption:[10,20,50,100],
    searchData: {
        pageNum: 1,
        pageSize: 10,
        name:undefined,//名称
        router:undefined,//路由
        authCode:undefined,//权限标识
    },
    basicMenuList: [],
    total: 0,
    loading: true,
    modelVisible: false,
    modelTitle: '添加菜单',
    basicMenuId: undefined,
})

/** 是否隐藏分页组件，当数据总条数小于每页显示的数据条数时隐藏 **/
let hidePager = computed(()=>{
    return Math.floor(data.total / data.searchData.pageSize) == 0
})

/** 查询、搜索菜单 **/
const search = () => {
        basicMenuApi.query(data.searchData).then(res => {
        if (res.code == 200) {
            data.total = res.data.total
            data.basicMenuList = res.data.list
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

/** 删除菜单 **/
const handlerDelete = (basicMenu) => {
    ElMessageBox.confirm(`选中菜单下所有子菜单也将被删除，同时还将删除关联该菜单及所有子菜单的角色，确认删除?`, `删除提示`,
            {
                confirmButtonText: '删除',
                cancelButtonText: '取消',
                type: 'warning',
            })
            .then(() => {
                    basicMenuApi.del({id: basicMenu.id}).then(res => {
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

/** 显示添加菜单弹窗 **/
const handlerAdd = () => {
    data.modelTitle = '添加菜单'
    data.modelVisible = true
}

/** 显示编辑弹窗 **/
const handlerEdit = (basicMenu) => {
    data.basicMenuId = basicMenu.id
    data.modelTitle = '编辑菜单'
    data.modelVisible = true
}

/** 添加成功回调 **/
const addSuccess = () => {
    data.modelVisible = false
    reset()
}

/** 弹窗关闭之后 **/
const modelClosed = () => {
    data.basicMenuId = undefined
}

/** 重置查询 **/
const reset = () => {
    data.searchData = {
        pageNum: 1,
        pageSize: 10,
        name:undefined,//名称
        router:undefined,//路由
        authCode:undefined,//权限标识
    }
    search()
}

onMounted(()=>{
    search()
})
</script>

<style scoped lang="scss">
    .basicMenu-page {
        background: #fff;
        padding: 20px;
        height: calc(100vh - 138px);

        .data-list {
            margin-top: 20px;
        }
    }
</style>