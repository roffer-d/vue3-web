<template>
  <el-menu
      active-text-color="#ffd04b"
      background-color="#545c64"
      class="el-menu-vertical-demo"
      :default-active="defaultActive"
      text-color="#fff"
      :router="true"
      @open="handleOpen"
      @close="handleClose"
  >
    <el-sub-menu index="/home">
      <template #title>
        <el-icon>
          <platform/>
        </el-icon>
        <span>系统管理</span>
      </template>
      <el-menu-item :index="item.route" v-for="(item,index) in menuList" :key="index">
        <i :class="['iconfont',item.icon]"></i>
        <span>{{item.name}}</span>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script>
import {reactive, toRefs} from 'vue'
import {useRoute} from 'vue-router'
import {getAuth} from '@/config/utils'

export default {
  name: "r-menu",
  setup() {
    const route = useRoute()
    const data = reactive({
      defaultActive: route.path,
      menuList: getAuth().menuList
    })

    return {
      ...toRefs(data)
    }
  }
}
</script>

<style scoped lang="scss">
.el-menu {
  height: 100vh;
  //background: #545c64;

  .iconfont {
    margin-right: 5px;
  }
}
</style>