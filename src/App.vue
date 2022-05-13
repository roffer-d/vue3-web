<template>
  <router-view v-if="isRouterActive" />
</template>

<script setup>
import { ref, provide, nextTick } from 'vue'
const isRouterActive = ref(true)

provide('reload', () => {
  isRouterActive.value = false
  nextTick(() => {
    isRouterActive.value = true
  })
})
</script>


<style lang="scss">
  body{
    padding: 0;
    margin: 0;
  }
</style>
