<template>
  <div class="r-icon">
    <div class="item" v-for="(item,index) in data.iconList" :key="index" @click="getIcon(item)">
      <i :class="['iconfont',item]"/>
    </div>
  </div>
</template>
<script setup>
import {reactive, defineProps,defineEmits} from 'vue'

const props = defineProps({
  modelValue: String
})

const emit = defineEmits(['update:modelValue','success'])

const data = reactive({
  iconList: [
    'icon-arrow-right',
    'icon-arrow-left',
    'icon-tianjia',
    'icon-shanchu',
    'icon-shanchu',
    'icon-rizhi',
    'icon-logout',
    'icon-logout',
    'icon-login',
    'icon-role',
    'icon-user',
    'icon-menu',
    'icon-password',
    'icon-account'
  ]
})

const getIcon = (icon) => {
  emit('update:modelValue',icon)
  emit('success')
}

</script>
<style scoped lang="scss">
.r-icon {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  .item {
    margin: 8px;
    padding: 8px;
    cursor: pointer;
    transition: all .5s;

    &:hover {
      transform: scale(2);
    }
  }
}
</style>