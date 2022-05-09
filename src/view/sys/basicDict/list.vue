<template>
    <div class="basicDict-page">
        <div class="search-box">
            <el-input v-model="data.searchData.name" placeholder="名称" style="width: 200px;" class="mr-20" />
            <el-input v-model="data.searchData.code" placeholder="值" style="width: 200px;" class="mr-20" />
            <el-input v-model="data.searchData.type" placeholder="分类" style="width: 200px;" class="mr-20" />
            <el-input v-model="data.searchData.remark" placeholder="描述" style="width: 200px;" class="mr-20" />
            <el-button class="mr-10" type="primary" @click="search" v-auth="'query'">查询</el-button>
            <el-button class="mr-10" @click="reset">重设</el-button>
            <el-button type="success" @click="handlerAdd" style="float: right" v-auth="'add'">添加</el-button>
        </div>
        <div class="data-list" v-loading="data.loading">
            <el-table :data="data.basicDictList" style="width: 100%">
                <el-table-column prop="name" label="名称" />
                <el-table-column prop="code" label="值" />
                <el-table-column prop="type" label="分类" />
                <el-table-column prop="remark" label="描述" />
                <el-table-column prop="createTime" label="创建时间" />
<!--                <el-table-column prop="updateTime" label="更新时间" />-->
                <el-table-column label="操作" width="200" >
                    <template #default="{row}">
                        <el-tag class="mr-10" @click="handlerEdit(row)" type="danger" v-auth="'edit'">编辑</el-tag>
                        <el-tag class="mr-10" @click="handlerDelete(row)" type="danger" v-auth="'delete'">删除</el-tag>
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
            <edit :id="data.basicDictId" @success="addSuccess" v-if="data.modelVisible"/>
        </el-dialog>
    </div>
</template>

<script setup>
import {ref, reactive, toRefs, computed,onMounted} from 'vue'
import * as basicDictApi from './api'
import {ElMessageBox, ElMessage} from 'element-plus'
import edit from './components/edit'

const data = reactive({
    pageSizeOption:[10,20,50,100],
    searchData: {
        pageNum: 1,
        pageSize: 10,
        name:undefined,//名称
        code:undefined,//值
        type:undefined,//分类
        remark:undefined,//描述
    },
    basicDictList: [],
    total: 0,
    loading: true,
    modelVisible: false,
    modelTitle: '添加字典',
    basicDictId: undefined,
})

/** 是否隐藏分页组件，当数据总条数小于每页显示的数据条数时隐藏 **/
let hidePager = computed(()=>{
    return Math.floor(data.total / data.searchData.pageSize) == 0
})

/** 查询、搜索字典 **/
const search = () => {
        basicDictApi.query(data.searchData).then(res => {
        if (res.code == 200) {
            data.total = res.data.total
            data.basicDictList = res.data.list
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

/** 删除字典 **/
const handlerDelete = (basicDict) => {
    ElMessageBox.confirm(`确认删除`, `删除提示`,
            {
                confirmButtonText: '删除',
                cancelButtonText: '取消',
                type: 'warning',
            })
            .then(() => {
                    basicDictApi.del({id: basicDict.id}).then(res => {
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

/** 显示添加字典弹窗 **/
const handlerAdd = () => {
    data.modelTitle = '添加字典'
    data.modelVisible = true
}

/** 显示编辑弹窗 **/
const handlerEdit = (basicDict) => {
    data.basicDictId = basicDict.id
    data.modelTitle = '编辑字典'
    data.modelVisible = true
}

/** 添加成功回调 **/
const addSuccess = () => {
    data.modelVisible = false
    reset()
}

/** 弹窗关闭之后 **/
const modelClosed = () => {
    data.basicDictId = undefined
}

/** 重置查询 **/
const reset = () => {
    data.searchData = {
        pageNum: 1,
        pageSize: 10,
        name:undefined,//名称
        code:undefined,//值
        type:undefined,//分类
        remark:undefined,//描述
    }
    search()
}

onMounted(()=>{
    search()
})
</script>

<style scoped lang="scss">
    .basicDict-page {
        background: #fff;
        padding: 20px;
        height: calc(100vh - 138px);

        .data-list {
            margin-top: 20px;
        }
    }
</style>