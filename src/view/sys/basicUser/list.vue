<template>
  <div class="basicUser-page">
    <div class="search-box">
      <el-input v-model="data.searchData.name" placeholder="真实姓名" style="width: 200px;" class="mr-20"/>
      <el-input v-model="data.searchData.account" placeholder="登录账号" style="width: 200px;" class="mr-20"/>
      <el-input v-model="data.searchData.email" placeholder="邮箱" style="width: 200px;" class="mr-20"/>
      <el-select v-model="data.searchData.status" style="width: 200px;" placeholder="用户状态" class="mr-20">
        <el-option label="启用" value="1"></el-option>
        <el-option label="禁用" value="0"></el-option>
      </el-select>
      <el-button class="mr-10" type="primary" @click="search" v-auth="'query'">查询</el-button>
      <el-button class="mr-10" @click="reset">重设</el-button>
      <el-button type="success" @click="handlerAdd" style="float: right" v-auth="'add'">添加</el-button>
    </div>
    <div class="data-list" v-loading="data.loading">
      <el-table :data="data.basicUserList" style="width: 100%">
        <el-table-column prop="name" label="真实姓名" width="120" />
        <el-table-column prop="account" label="登录账号" width="100" />
        <el-table-column prop="email" label="邮箱"/>
        <el-table-column prop="createTime" label="创建时间" width="180" />
        <el-table-column prop="updateTime" label="更新时间" width="180" />
        <el-table-column prop="status" label="用户状态">
          <template #default="{row}">
            <span class="danger-text" v-if="row.status == '0'">已禁用</span>
            <span class="success-text" v-else-if="row.status == '1'">已启用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="280">
          <template #default="{row}">
            <template v-if="row.id != data.loginUser.id && row.id != '1516296092063412225'">
              <el-tag class="mr-10" @click="toggleStatus(row)" type="success" v-if="row.status == '0'" v-auth="'enable'">启用</el-tag>
              <el-tag class="mr-10" @click="toggleStatus(row)" type="danger" v-else-if="row.status == '1'" v-auth="'disable'">禁用</el-tag>
              <el-tag class="mr-10" @click="handlerEdit(row)" type="success" v-auth="'edit'">编辑</el-tag>
              <el-tag class="mr-10" @click="handlerDelete(row)" type="danger" v-auth="'delete'">删除</el-tag>
              <el-tag class="mr-10" @click="handlerSetRole(row)" type="success" v-auth="'role_config'">角色配置</el-tag>
            </template>
            <span v-else-if="row.id == data.loginUser.id" class="success-text">当前登录,不可操作</span>
            <span v-else-if="row.id == '1516296092063412225'" class="success-text">不可操作超级管理员</span>
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
      <edit :id="data.basicUserId" @success="addSuccess" v-if="data.modelVisible"/>
    </el-dialog>

    <!-- 角色配置 -->
    <el-dialog v-model="data.roleVisible" title="角色配置" width="50%"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               @closed="roleClosed"
    >
      <user-role :user="data.user" v-if="data.roleVisible" @success="handlerRoleSuccess"  />
    </el-dialog>
  </div>
</template>

<script setup>
import {computed, onMounted, reactive,inject} from 'vue'
import * as basicUserApi from './api'
import {ElMessage, ElMessageBox} from 'element-plus'
import {getUser} from "@/config/utils";
import edit from './components/edit'
import userRole from './components/userRole'

/** 接收websocket推送的消息 **/
const userListHandler = (msg)=>{
  console.log(msg)
}
const websocket = inject('websocket')()
websocket.addHandler('init',userListHandler)

const data = reactive({
  pageSizeOption: [10, 20, 50, 100],
  searchData: {
    pageNum: 1,
    pageSize: 10,
    name: undefined,//真实姓名
    account: undefined,//登录账号
    email: undefined,//邮箱
    status: undefined,//用户状态（0禁用，1启用）
  },
  basicUserList: [],
  total: 0,
  loading: true,
  modelVisible: false,
  modelTitle: '添加用户',
  basicUserId: undefined,
  loginUser: getUser(),
  user:{},
  roleVisible:false,
})

/** 是否隐藏分页组件，当数据总条数小于每页显示的数据条数时隐藏 **/
let hidePager = computed(() => {
  return Math.floor(data.total / data.searchData.pageSize) == 0
})

/** 查询、搜索用户 **/
const search = () => {
  basicUserApi.query(data.searchData).then(res => {
    if (res.code == 200) {
      data.total = res.data.total
      data.basicUserList = res.data.list
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

/** 启用、禁用用户 **/
const toggleStatus = (user) => {
  let title = user.status == 0 ? '启用' : '禁用'
  let status = user.status == 0 ? '1' : '0'
  ElMessageBox.confirm(`确认${title}用户：${user.account}`, `${title}提示`,
      {
        confirmButtonText: title,
        cancelButtonText: '取消',
        type: 'warning',
        // center:true,
      })
      .then(() => {
        basicUserApi.update({id: user.id, status}).then(res => {
          if (res.code == 200) {
            ElMessage({
              type: 'success',
              message: `${title}成功!`
            })
            search()
          }
        })
      })
      .catch(() => {
      })
}

/** 删除用户 **/
const handlerDelete = (basicUser) => {
  ElMessageBox.confirm(`将删除该用户以及该用户拥有的所有角色和权限，确认删除？`, `删除提示`,
      {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning',
      })
      .then(() => {
        basicUserApi.del({id: basicUser.id}).then(res => {
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

/** 配置角色 **/
const handlerSetRole = (basicUser)=>{
  data.user = basicUser
  data.roleVisible = true
}

/** 保存用户角色成功 **/
const handlerRoleSuccess = () =>{
  ElMessage({
    type: 'success',
    message: `角色配置成功!`
  })
  data.roleVisible = false
}

/** 角色弹窗关闭之后 **/
const roleClosed = ()=>{

}

/** 显示添加用户弹窗 **/
const handlerAdd = () => {
  data.modelTitle = '添加用户'
  data.modelVisible = true
}

/** 显示编辑弹窗 **/
const handlerEdit = (basicUser) => {
  data.basicUserId = basicUser.id
  data.modelTitle = '编辑用户'
  data.modelVisible = true
}

/** 添加成功回调 **/
const addSuccess = () => {
  data.modelVisible = false
  reset()
}

/** 弹窗关闭之后 **/
const modelClosed = () => {
  data.basicUserId = undefined
}

/** 重置查询 **/
const reset = () => {
  data.searchData = {
    pageNum: 1,
    pageSize: 10,
    name: undefined,
    account: undefined,
    email: undefined,
    createTime: undefined,
    updateTime: undefined,
    status: undefined,
  }
  search()
}

onMounted(() => {
  search()
})
</script>

<style scoped lang="scss">
.basicUser-page {
  background: #fff;
  padding: 20px;
  height: calc(100vh - 138px);

  .data-list {
    margin-top: 20px;
  }
}
</style>