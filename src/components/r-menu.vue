<template>
  <el-menu
      active-text-color="#ffd04b"
      background-color="#545c64"
      class="el-menu-vertical-demo"
      default-active="/user"
      text-color="#fff"
      :router="true"
      @open="handleOpen"
      @close="handleClose"
  >
    <el-sub-menu index="1">
      <template #title>
        <el-icon>
          <platform/>
        </el-icon>
        <span>系统管理</span>
      </template>
      <el-menu-item index="/user">
        <el-icon>
          <medal/>
        </el-icon>
        <span>用户管理</span>
      </el-menu-item>
      <el-menu-item index="/basicRole">
        <el-icon>
          <medal/>
        </el-icon>
        <span>角色管理</span>
      </el-menu-item>
      <el-menu-item index="/basicMenu">
        <el-icon>
          <medal/>
        </el-icon>
        <span>菜单管理</span>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script>
export default {
  name: "r-menu"
}
</script>

<style scoped lang="scss">
.el-menu {
  height: 100vh;
  //background: #545c64;
}
</style>