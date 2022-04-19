<template>
  <el-breadcrumb>
    <el-breadcrumb-item
        v-for="(item,index) in breadcrumbData"
        :key="index"
        :to="{ path: item.path }">
      <!-- 不可点击项 -->
      <span v-if="index === breadcrumbData.length - 1">{{item.meta.title}}</span>
      <!-- 可点击项 -->
      <router-link v-else :to="{path:item.path}">{{item.meta.title}}</router-link>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
import {ref,defineComponent,watch} from 'vue'
import {useRouter,useRoute} from 'vue-router'
export default defineComponent({
  name: "r-breadcrumb",
  setup(props,content){
    const router = useRouter()
    const route = useRoute()
    const breadcrumbData = ref([])
    const getBreadcrumbData = () => {
      breadcrumbData.value = route.matched.filter(
          item => item.meta && item.meta.title
      )
    }
    // 监听路由变化时触发
    watch(route,() => {
          getBreadcrumbData()
        },{immediate: true}
    )
    return {
      breadcrumbData
    }
  },
})
</script>

<style scoped lang="scss">
.el-breadcrumb{
  padding: 20px;
}
</style>