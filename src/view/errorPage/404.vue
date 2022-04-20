<template>
  <div class="page-404">
    <div class="content"></div>
  </div>
</template>
<script >
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'page-404',
  setup () {
    return {

    }
  }
})
</script>

<style lang='scss' scoped>
.page-404 {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;

  .content{
    width: 50%;
    height: 50%;
    background: url(~@/assets/img/404.png) no-repeat;
    background-size: 100% 100%;
  }
}
</style>