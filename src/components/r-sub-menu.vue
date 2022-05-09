<template>
  <template v-for="(item,index) in data">
    <el-sub-menu index="" v-if="item.children.length" v-for="(child,idx) in item.children" :key="idx">
      <template #title>
        <i :class="['iconfont',item.icon]"></i>
        <span>{{ item.name }}</span>
      </template>
      <el-menu-item :index="child.route">
        <i :class="['iconfont',child.icon]"></i>
        <span>{{ child.name }}</span>
      </el-menu-item>
      <r-sub-menu v-if="child.children.length" :data="child.children"/>
    </el-sub-menu>
    <el-menu-item v-else :index="item.route">
      <i :class="['iconfont',item.icon]"></i>
      <span>{{ item.name }}</span>
    </el-menu-item>
  </template>
</template>

<script>
import {reactive, toRefs} from 'vue'

export default {
  name: "r-sub-menu",
  props: ['data'],
  setup() {
    const data = reactive({
      arrowVisible: false
    })

    return {
      ...toRefs(data)
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