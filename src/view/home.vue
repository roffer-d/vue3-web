<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <r-menu />
      </el-aside>
      <el-container>
        <el-header>
          <r-header />
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
<!--        <el-footer>Footer</el-footer>-->
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import {provide} from 'vue'
import {ElMessageBox} from 'element-plus'
import webSocket from '@/config/websocket'
import router from '@/router/index'
import {checkLogin,getUser,removeLoginInfo} from "@/config/utils"
import {logOut} from "@/view/login/api";

/** 被动踢出登录 **/
const offLineHandler = (data)=>{
  /** 被动踢出登录 **/
  if(data.code == 10004){
    ElMessageBox.confirm(`您已被管理员踢出登录`,'下线提示',{
      confirmButtonText: '知道了',
      showCancelButton:false,
    })
        .then(() => {
          logOut().then(res => {
            if (res.code == 200) {
              removeLoginInfo()
              router.replace('/login')
            }
          })
        })
  }
}

if(checkLogin()){
  const user = getUser()
  const socket = new webSocket(`${process.env.VUE_APP_WEBSOCKET_URL}/api/websocket/${user.id}`)
  socket.addHandler(socket.type.OFF_LINE_USER,offLineHandler)

  provide('websocket', () => {
    return socket
  })
}

</script>

<style scoped lang="scss">
  .el-header{
    border-bottom: 1px solid #eee;
    //box-shadow: 0 0 5px rgba(0, 0, 0, .4);
  }
  .el-main{
    background: #f7f7f7;
    min-width: 880px;
  }

  .el-aside{
    width: auto !important;
    max-width: 220px;
  }
</style>