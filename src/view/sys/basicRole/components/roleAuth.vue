<template>
  <div class="role-auth">
    <div class="role-name">角色名称：{{ props.role.name }}</div>
    <div class="search-box">
      <el-input v-model="data.searchData.name" placeholder="菜单名称" style="width: 200px;" class="mr-20" size="small"/>
      <el-button class="mr-10" type="primary" @click="getMenuList" size="small">查询</el-button>
      <el-button class="mr-10" @click="reset" size="small">重设</el-button>
    </div>
    <el-table :data="data.basicMenuList" style="width: 100%" row-key="id" size="small">
      <el-table-column prop="pname" label="父级菜单"/>
      <el-table-column prop="name" label="菜单名称"/>
      <el-table-column label="权限" width="580">
        <template #default="{row}">
          <div style="display: flex" v-if="row.auth.length">
            <el-checkbox
                v-model="row.checkAll"
                size="small" label="all"
                style="margin-right: 20px"
                @change="(val)=>handlerCheckAll(val,row)">全选
            </el-checkbox>
            <el-checkbox-group size="small" v-model="row.checkedList" @change="(val)=>handlerAuthChange(val,row)">
              <el-checkbox :key="index" v-for="(item,index) in row.authList" :label="item.code">{{
                  item.name
                }}
              </el-checkbox>
            </el-checkbox-group>
          </div>
          <span v-else class="danger-text">暂无权限，请在菜单管理中配置</span>
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

    <div class="btn-list">
      <el-button size="small" @click="cancelSave">取消</el-button>
      <el-button type="primary" size="small" @click="saveRoleAuth">保存</el-button>
    </div>
  </div>
</template>
<script setup>
import {reactive, onBeforeMount, computed, defineProps, defineEmits} from 'vue'
import {getRoleAuth as getRoleAuthApi, saveRoleAuth as saveRoleAuthApi} from '../api'
import * as basicMenuApi from "../../basicMenu/api";

const props = defineProps({
  role: {}
})
const emit = defineEmits(['success', 'cancel']);

const data = reactive({
  pageSizeOption: [10, 20, 50, 100],
  basicMenuList: [],
  searchData: {
    pageNum: 1,
    pageSize: 5,
    name: undefined,//名称
  },
  total: 0,
  loading: true,
  checkedInfo: {}
})

/** 全选、取消全选 **/
const handlerCheckAll = (checked, row) => {
  if (checked) {
    row.checkedList = row.authList.map(t => t.code)
    data.checkedInfo[row.id] = row.checkedList
  } else {
    row.checkedList = []
    delete data.checkedInfo[row.id]
  }
}

/** 权限勾选、取消勾选 **/
const handlerAuthChange = (val, row) => {
  data.checkedInfo[row.id] = val
}

/** 是否隐藏分页组件，当数据总条数小于每页显示的数据条数时隐藏 **/
let hidePager = computed(() => {
  return Math.floor(data.total / data.searchData.pageSize) == 0
})

/** 获取了新数据时，选中之前已经选择了的权限 **/
const checkedAuth = (dataList) => {
  dataList = dataList || data.basicMenuList

  dataList.forEach(item => {
    if (data.checkedInfo[item.id]) {
      item.checkedList = data.checkedInfo[item.id]
      item.checkAll = data.checkedInfo[item.id].length == item.authList.length//判断是否全选
    }

    /** 递归匹配选中 **/
    if (item.children && item.children.length) {
      checkedAuth(item.children)
    }
  })
}

/** 查询、搜索菜单 **/
const getMenuList = () => {
  basicMenuApi.query(data.searchData).then(res => {
    if (res.code == 200) {
      res.data.list.forEach(item=>{
        item.authList = item.auth ? JSON.parse(item.auth) : []
      })

      data.total = res.data.total
      data.basicMenuList = res.data.list
      checkedAuth()
    }
  }).finally(() => {
    data.loading = false
  })
}

/** 重置查询 **/
const reset = () => {
  data.searchData.name = ''
  getMenuList()
}

/** 每页显示条数改变 **/
const handleSizeChange = (pageSize) => {
  data.searchData.pageSize = pageSize
  getMenuList()
}

/** 页码改变 **/
const handleCurrentChange = (pageNum) => {
  data.searchData.pageNum = pageNum
  getMenuList()
}

/** 获取角色关联的权限 **/
const getRoleAuth = async () => {
  const res = await getRoleAuthApi({roleId: props.role.id})
  if (res.code == 200) {
    res.data.list.forEach(item => {
      data.checkedInfo[item.menuId] = item.authorityType.split(',')
    })
  }
}

/** 保存角色权限 **/
const saveRoleAuth = () => {
  let params = {
    roleId: props.role.id,
    auth: []
  }
  for (let key in data.checkedInfo) {
    params.auth.push({
      menuId: key,
      authorityType: data.checkedInfo[key].join(',')
    })
  }
  saveRoleAuthApi(params).then(res => {
    if (res.code == 200) {
      emit('success')
    }
  })
}

/** 取消保存 **/
const cancelSave = () => {
  emit('cancel')
}

onBeforeMount(() => {
  // getTypeList()
  getRoleAuth()
  getMenuList()
})
</script>
<style scoped lang="scss">
.role-auth {
  .role-name {
    margin-bottom: 20px;
  }

  .search-box {
    margin-bottom: 20px;
  }

  .btn-list {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
  }
}
</style>