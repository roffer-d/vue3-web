<template>
  <div class="r-menu" @mouseover="arrowVisible=true" @mouseleave="arrowVisible=false">
    <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-demo"
        :default-active="defaultActive"
        text-color="#fff"
        :router="true"
        :collapse="isCollapse"
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
          <span>{{ item.name }}</span>
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
    <div class="collapse" @click="toggleCollapse" :style="{width:arrowVisible?'20px':0}">
      <i class="iconfont icon-arrow-right" v-if="isCollapse"></i>
      <i class="iconfont icon-arrow-left" v-else></i>
    </div>
  </div>
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
      menuList: getAuth().menuList,
      isCollapse: localStorage.getItem('menu_collapse'),
      arrowVisible: false
    })

    let isCollapse = localStorage.getItem('menu_collapse')
    data.isCollapse = isCollapse == 'true'

    /** 此处输入注释 **/
    const toggleCollapse = ()=>{
      data.isCollapse = !data.isCollapse
      localStorage.setItem('menu_collapse',data.isCollapse)
    }

    return {
      ...toRefs(data),
      toggleCollapse
    }
  }
}
</script>

<style scoped lang="scss">
.r-menu {
  display: flex;
  height: 100%;

  .el-menu {
    height: 100vh;
    //background: #545c64;
    border-right: 1px solid rgba(247, 247, 247, .1);

    .iconfont {
      margin-right: 5px;
    }
  }

  .collapse {
    height: 100%;
    background: #545c64;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all .4s;

    .iconfont {
      color: #bab9b9;
    }
  }
}
</style>