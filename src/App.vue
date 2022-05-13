<template>
  <router-view v-if="isRouterActive" />
</template>

<script setup>
import { ref, provide, nextTick,getCurrentInstance } from 'vue'
import webSocket from '@/config/websocket'
import {checkLogin,getUser} from "@/config/utils"

const userListHandler = (msg)=>{
  console.log(msg)
}

if(checkLogin()){
  const {proxy} = getCurrentInstance()
  const user = getUser()
  proxy.socket = new webSocket(`localhost/api/websocket/${user.id}`)
  proxy.socket.addHandler('init',userListHandler)
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
