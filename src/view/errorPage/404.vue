<template>
  <div class="wscn-http404-container">
    <div class="wscn-http404">
      <div class="pic-404">
        <img class="pic-404__parent" :src="err404" alt="404" />
        <img class="pic-404__child left" :src="errCloud" alt="404" />
        <img class="pic-404__child mid" :src="errCloud" alt="404" />
        <img class="pic-404__child right" :src="errCloud" alt="404" />
      </div>
    </div>
  </div>
</template>
<script >
import { defineComponent } from 'vue'
import err404 from '@/assets/img/404.png'
import errCloud from '@/assets/img/404_cloud.png'

export default defineComponent({
  name: '404',
  setup () {
    const color = "#000"
    return {
      err404,
      errCloud,
      color
    }
  }
})
</script>

<style lang='scss' scoped>
.wscn-http404-container {
  transform: translate(-50%, -50%);
  position: absolute;
  top: 40%;
  left: 50%;
  .wscn-http404 {
    position: relative;
    width: 1200px;
    padding: 0 50px;
    overflow: hidden;
  }
}
</style>