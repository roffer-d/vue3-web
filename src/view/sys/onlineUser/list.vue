<template>
  <div class="basicLog-page">
    <div class="total">
      <span>在线人数：<span class="count">{{data.list.length}}</span></span>
    </div>
    <div class="data-list" v-loading="data.loading">
      <el-table :data="data.list" style="width: 100%">
        <el-table-column prop="account" label="登录账号"/>
        <el-table-column prop="name" label="真实姓名"/>
        <el-table-column prop="lastLoginTime" label="登录时间"/>
        <el-table-column label="操作">
          <template #default="{row}">
            <el-tag class="mr-10" @click="offUser(row)" type="danger" v-auth="'offLine'">下线</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup>
import {reactive, onMounted, onBeforeUnmount} from 'vue'
import {query, offLine} from './api'
import {ElMessage, ElMessageBox} from 'element-plus'

const data = reactive({
  list: [],
  loading: true,
})

/** 查询、搜索操作日志 **/
const search = () => {
  query().then(res => {
    if (res.code == 200) {
      data.list = res.data.list
    }
  }).finally(() => {
    data.loading = false
  })
}

/** 将用户踢下线 **/
const offUser = (row) => {
  ElMessageBox.confirm(`确认将用户：${row.account}踢下线吗？`, `下线提示`,
      {
        confirmButtonText: '下线',
        cancelButtonText: '取消',
        closeOnPressEscape: false,
        closeOnClickModal: false,
        showClose: false,
        type: 'warning',
      }).then(() => {
    offLine({userId: row.id}).then(res => {
      if (res.code == 200) {
        ElMessage({
          type: 'success',
          message: `已将用户[${row.account}]踢下线!`
        })
        search()
      }
    })
  })
}

let interval = null

onMounted(() => {
  search()
  interval = setInterval(() => {
    search()
  }, 3000)
})

onBeforeUnmount(() => {
  interval && clearInterval(interval)
})
</script>

<style scoped lang="scss">
.basicLog-page {
  background: #fff;
  padding: 20px;
  height: calc(100vh - 138px);

  .total{
    font-size: 13px;
    color: #555;

    .count{
      color: #c32026;
      font-weight: 700;
    }
  }

  .data-list {
    margin-top: 20px;
  }
}
</style>