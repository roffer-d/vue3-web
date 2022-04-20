<template>
  <div class="user-page">
    <div class="search-box">
      <el-input v-model="searchData.account" placeholder="登录账号" style="width: 200px;" class="mr-20" />
      <el-input v-model="searchData.name" placeholder="真实姓名" style="width: 200px;" class="mr-20" />
      <el-select v-model="searchData.status" style="width: 200px;" class="mr-20" placeholder="状态">
        <el-option label="启用" value="1"></el-option>
        <el-option label="禁用" value="0"></el-option>
      </el-select>
      <el-button class="mr-10" type="primary" @click="search">查询</el-button>
      <el-button class="mr-10" @click="reset">重设</el-button>
      <el-button type="success" @click="handerAddUser" style="float: right">添加</el-button>
    </div>
    <div class="data-list" v-loading="loading">
      <el-table :data="userList" style="width: 100%">
        <el-table-column prop="account" label="登录账号" />
        <el-table-column prop="name" label="真实姓名" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column prop="createTime" label="创建时间" width="200" />
        <el-table-column prop="updateTime" label="更新时间" width="200" />
        <el-table-column prop="status" label="状态" width="80" >
          <template #default="{row}">
            <span class="danger-text" v-if="row.status == '0'">已禁用</span>
            <span class="success-text" v-else-if="row.status == '1'">已启用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" >
          <template #default="{row}">
            <template v-if="row.id != loginUser.id">
              <el-tag class="mr-10" @click="toggleStatus(row)" type="success" v-if="row.status == '0'">启用</el-tag>
              <el-tag class="mr-10" @click="toggleStatus(row)" type="danger" v-else-if="row.status == '1'">禁用</el-tag>
              <el-tag class="mr-10" @click="handerEditUser(row)" type="danger" >编辑</el-tag>
              <el-tag class="mr-10" @click="deleteUser(row)" type="danger" >删除</el-tag>
            </template>
            <span v-else class="success-text">当前登录,不可操作</span>
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
      <edit :id="userId" @success="addUserSuccess" v-if="modelVisible"/>
    </el-dialog>
  </div>
</template>

<script>
import {ref, reactive, toRefs, defineComponent,computed} from 'vue'
import * as userApi from './api'
import {ElMessageBox, ElMessage} from 'element-plus'
import edit from './components/edit'
import {getLoginInfo} from "@/config/utils";

export default defineComponent({
  name: "list",
  components: {edit},
  setup(props, content) {
    const data = reactive({
      pageSizeOption:[10,20,50,100],
      searchData: {
        pageNum: 1,
        pageSize: 10,
        account: undefined,
        name: undefined,
        status:undefined
      },
      userList: [],
      total: 0,
      loading: true,
      modelVisible: false,
      modelTitle: '添加用户',
      userId: undefined,
      loginUser: getLoginInfo()
    })

    /** 是否隐藏分页组件，当数据总条数小于每页显示的数据条数时隐藏 **/
    let hidePager = computed(()=>{
      return Math.floor(data.total / data.searchData.pageSize) == 0
    })

    /** 查询、搜索用户 **/
    const search = () => {
      userApi.query(data.searchData).then(res => {
        if (res.code == 200) {
          data.total = res.data.total
          data.userList = res.data.list
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
            userApi.update({id: user.id, status}).then(res => {
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
    const deleteUser = (user) => {
      // if (user.status == '1') {
      //   ElMessage({
      //     type: 'warning',
      //     message: `请先禁用用户：${user.account}`,
      //   })
      //   return
      // }
      ElMessageBox.confirm(`确认删除用户：${user.account}`, `删除提示`,
          {
            confirmButtonText: '删除',
            cancelButtonText: '取消',
            type: 'warning',
          })
          .then(() => {
            userApi.del({id: user.id}).then(res => {
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

    /** 显示添加用户弹窗 **/
    const handerAddUser = () => {
      data.modelTitle = '添加用户'
      data.modelVisible = true
    }

    /** 显示编辑用户弹窗 **/
    const handerEditUser = (user) => {
      data.userId = user.id
      data.modelTitle = '编辑用户'
      data.modelVisible = true
    }

    /** 添加成功回调 **/
    const addUserSuccess = () => {
      data.modelVisible = false
      reset()
    }

    /** 弹窗关闭之后 **/
    const modelClosed = () => {
      data.userId = undefined
    }

    const reset = () => {
      data.searchData = {
        pageNum: 1,
        pageSize: 10,
        account: undefined,
        name: undefined,
        status: undefined,
      }
      search()
    }

    search()

    return {
      ...toRefs(data),
      toggleStatus,
      deleteUser,
      handerAddUser,
      handerEditUser,
      modelClosed,
      addUserSuccess,
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
.user-page {
  background: #fff;
  padding: 20px;
  height: calc(100vh - 190px);

  .data-list {
    margin-top: 20px;
  }
}
</style>