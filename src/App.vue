<template>
  <router-view v-if="isRouterActive" />
</template>

<script setup>
import { ref, provide, nextTick } from 'vue'
import webSocket from '@/config/websocket'
import {checkLogin,getUser} from "@/config/utils"

if(checkLogin()){
  const user = getUser()
  const socket = new webSocket(`localhost/api/websocket/${user.id}`)

  provide('websocket', () => {
    return socket
  })
}

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
