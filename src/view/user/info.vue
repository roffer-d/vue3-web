<template>
  <div class="user-info">
    <div class="box">
      <edit :id="user.id" />
    </div>
  </div>
</template>
<script>
import {ref, reactive, toRefs, defineComponent} from 'vue'
import edit from './components/edit'
import {getLoginInfo} from "@/config/utils";

export default defineComponent({
  name: 'user-info',
  components: {edit},
  setup(props, content) {
    const data = reactive({
      user: getLoginInfo()
    })

    return {
      ...toRefs(data),
    }
  }
})
</script>
<style scoped lang="scss">
.user-info {
  width: calc(100% - 40px);
  padding: 20px;
  background: #fff;
  border-radius: 8px;

  .box{
    width: 40%;
  }
}
</style>