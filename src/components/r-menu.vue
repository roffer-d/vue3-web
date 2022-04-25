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
      <el-menu-item index="/basicUser">
        <i class="iconfont icon-user"></i>
        <span>用户管理</span>
      </el-menu-item>
      <el-menu-item index="/basicRole">
        <i class="iconfont icon-role"></i>
        <span>角色管理</span>
      </el-menu-item>
      <el-menu-item index="/basicMenu">
        <i class="iconfont icon-menu"></i>
        <span>菜单管理</span>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script>
import {reactive,toRefs} from 'vue'
import {useRoute} from 'vue-router'

export default {
  name: "r-menu",
  setup(){
    const route = useRoute()
    const data = reactive({
      defaultActive: route.path,
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

  .iconfont{
    margin-right: 5px;
  }
}
</style>