<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <r-menu />
      </el-aside>
      <el-container>
        <el-header>
          <r-header />
        </el-header>
        <r-breadcrumb />
        <el-main>
          <router-view></router-view>
        </el-main>
<!--        <el-footer>Footer</el-footer>-->
      </el-container>
    </el-container>
  </div>
</template>

<script >
import { defineComponent, getCurrentInstance} from 'vue'
import { useRoute, useRouter } from "vue-router"

export default defineComponent({
  setup(props, context){
    const { proxy, ctx } = getCurrentInstance()
    const _this = ctx

    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath)
    }
    const handleClose = (key, keyPath) => {
      console.log(key, keyPath)
    }

    return {
      handleOpen,
      handleClose
    }
  }
})
</script>

<style scoped lang="scss">
  .el-header{
    border-bottom: 1px solid #eee;
    //box-shadow: 0 0 5px rgba(0, 0, 0, .4);
  }
  .el-main{
    background: #f7f7f7;
    min-width: 880px;
  }
</style>