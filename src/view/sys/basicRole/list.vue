<template>
  <div class="basicRole-page">
    <div class="search-box">
      <el-input v-model="data.searchData.name" placeholder="角色名称" style="width: 200px;" class="mr-20"/>
      <el-button class="mr-10" type="primary" @click="search" v-auth="query">查询</el-button>
      <el-button class="mr-10" @click="reset">重设</el-button>
      <el-button type="success" @click="handlerAdd" style="float: right" v-auth="'add'">添加</el-button>
    </div>
    <div class="data-list" v-loading="data.loading">
      <el-table :data="data.basicRoleList" style="width: 100%">
        <el-table-column prop="name" label="角色名称"/>
        <el-table-column prop="createTime" label="创建时间"/>
        <el-table-column prop="updateTime" label="更新时间"/>
        <el-table-column label="操作" width="260">
          <template #default="{row}">
            <template v-if="row.id != '1518424205647986689'">
              <el-tag class="mr-10" @click="handlerEdit(row)" type="success" v-auth="'edit'">编辑</el-tag>
              <el-tag class="mr-10" @click="handlerAuth(row)" type="success" v-auth="'menu_auth'">菜单权限</el-tag>
              <el-tag class="mr-10" @click="handlerDelete(row)" type="danger" v-auth="'delete'">删除</el-tag>
            </template>
            <span v-else-if="row.id == '1518424205647986689'" class="success-text">不可操作超级管理员角色</span>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
          v-model:currentPage="data.searchData.pageNum"
          v-model:page-size="data.searchData.pageSize"
          :hide-on-single-page="hidePager"
          :page-sizes="pageSizeOption"
          small
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
      />
    </div>

    <el-dialog v-model="data.modelVisible" :title="data.modelTitle" width="30%"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               @closed="modelClosed"
    >
      <edit :id="data.basicRoleId" @success="addSuccess" v-if="data.modelVisible"/>
    </el-dialog>

    <!-- 菜单权限配置 -->
    <el-dialog v-model="data.authVisible" title="菜单权限配置" width="60%"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               @closed="authClosed"
    >
      <role-auth :role="data.role" @success="handlerAuthSuccess" @cancel="handlerAuthCancel" v-if="data.authVisible"/>
    </el-dialog>
  </div>
</template>

<script setup>
import {reactive,computed, onMounted} from 'vue'
import * as basicRoleApi from './api'
import {ElMessageBox, ElMessage} from 'element-plus'
import edit from './components/edit'
import roleAuth from './components/roleAuth'
import {setAuth} from "@/config/utils";
import {inject} from 'vue'
const reload = inject('reload')

const data = reactive({
  pageSizeOption: [10, 20, 50, 100],
  searchData: {
    pageNum: 1,
    pageSize: 10,
    name: undefined,//角色名称
  },
  basicRoleList: [],
  total: 0,
  loading: true,
  modelVisible: false,
  authVisible: false,
  modelTitle: '添加角色',
  basicRoleId: undefined,
  role: undefined,
})

/** 是否隐藏分页组件，当数据总条数小于每页显示的数据条数时隐藏 **/
let hidePager = computed(() => {
  return Math.floor(data.total / data.searchData.pageSize) == 0
})

/** 查询、搜索角色 **/
const search = () => {
  basicRoleApi.query(data.searchData).then(res => {
    if (res.code == 200) {
      data.total = res.data.total
      data.basicRoleList = res.data.list
    }
  }).finally(() => {
    data.loading = false
  })
}

/** 每页显示条数改变 **/
const handleSizeChange = (pageSize) => {
  data.searchData.pageSize = pageSize
  search()
}

/** 页码改变 **/
const handleCurrentChange = (pageNum) => {
  data.searchData.pageNum = pageNum
  search()
}

/** 删除角色 **/
const handlerDelete = (basicRole) => {
  ElMessageBox.confirm(`将删除角色、用户关联的该角色、角色关联的权限,确认删除？`, `删除提示`,
      {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning',
      })
      .then(() => {
        basicRoleApi.del({id: basicRole.id}).then(res => {
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

/** 显示菜单权限配置弹窗 **/
const handlerAuth = (basicRole) => {
  data.role = basicRole
  data.authVisible = true
}

/** 保存菜单权限成功 **/
const handlerAuthSuccess = async () =>{
  ElMessage({
    type: 'success',
    message: `菜单权限配置成功!`
  })
  data.authVisible = false

  /** 重新获取用户权限 **/
  await setAuth()
  reload()
}

/** 取消菜单权限 **/
const handlerAuthCancel = ()=>{
  data.authVisible = false
}

/** 显示添加角色弹窗 **/
const handlerAdd = () => {
  data.modelTitle = '添加角色'
  data.modelVisible = true
}

/** 显示编辑弹窗 **/
const handlerEdit = (basicRole) => {
  data.basicRoleId = basicRole.id
  data.modelTitle = '编辑角色'
  data.modelVisible = true
}

/** 添加成功回调 **/
const addSuccess = async () => {
  data.modelVisible = false
  /** 重新获取用户权限 **/
  await setAuth()
  reload()
}

/** 新增、编辑弹窗关闭之后 **/
const modelClosed = () => {
  data.basicRoleId = undefined
}

/** 角色权限弹窗关闭之后 **/
const authClosed = ()=>{

}

/** 重置查询 **/
const reset = () => {
  data.searchData = {
    pageNum: 1,
    pageSize: 10,
    name: undefined,//角色名称
  }
  search()
}

onMounted(() => {
  search()
})
</script>

<style scoped lang="scss">
.basicRole-page {
  background: #fff;
  padding: 20px;
  height: calc(100vh - 138px);

  .data-list {
    margin-top: 20px;
  }
}
</style>