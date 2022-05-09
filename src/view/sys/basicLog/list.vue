<template>
    <div class="basicLog-page">
        <div class="search-box">
            <el-input v-model="data.searchData.remark" placeholder="操作描述" style="width: 200px;" class="mr-20" />
            <el-input v-model="data.searchData.userName" placeholder="操作用户" style="width: 200px;" class="mr-20" />
            <el-button class="mr-10" type="primary" @click="search" v-auth="'query'">查询</el-button>
            <el-button class="mr-10" @click="reset">重设</el-button>
        </div>
        <div class="data-list" v-loading="data.loading">
            <el-table :data="data.basicLogList" style="width: 100%">
                <el-table-column prop="remark" label="操作描述" />
                <el-table-column prop="userName" label="操作用户" />
                <el-table-column prop="createTime" label="操作时间" />
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
    </div>
</template>

<script setup>
import {ref, reactive, toRefs, computed,onMounted} from 'vue'
import * as basicLogApi from './api'

const data = reactive({
    pageSizeOption:[10,20,50,100],
    searchData: {
        pageNum: 1,
        pageSize: 10,
        remark:undefined,//操作描述
        userName:undefined,//操作用户
    },
    basicLogList: [],
    total: 0,
    loading: true,
})

/** 是否隐藏分页组件，当数据总条数小于每页显示的数据条数时隐藏 **/
let hidePager = computed(()=>{
    return Math.floor(data.total / data.searchData.pageSize) == 0
})

/** 查询、搜索操作日志 **/
const search = () => {
        basicLogApi.query(data.searchData).then(res => {
        if (res.code == 200) {
            data.total = res.data.total
            data.basicLogList = res.data.list
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

/** 重置查询 **/
const reset = () => {
    data.searchData = {
        pageNum: 1,
        pageSize: 10,
        remark:undefined,//操作描述
        userName:undefined,//操作用户
    }
    search()
}

onMounted(()=>{
    search()
})
</script>

<style scoped lang="scss">
    .basicLog-page {
        background: #fff;
        padding: 20px;
        height: calc(100vh - 138px);

        .data-list {
            margin-top: 20px;
        }
    }
</style>