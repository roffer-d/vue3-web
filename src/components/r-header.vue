<template>
  <div class="b-header">
    <el-dropdown trigger="click" @command="handlerCommand">
        <span class="el-dropdown-link">
          <span class="user-head">{{ user.name.slice(0,1) }}</span>
          <el-icon class="el-icon--right"><arrow-down/></el-icon>
        </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="info">
            <el-icon>
              <Avatar/>
            </el-icon>
            个人信息
          </el-dropdown-item>
          <el-dropdown-item command="logout">
            <el-icon>
              <Back/>
            </el-icon>
            退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script>
import {defineComponent} from 'vue'
import {logOut} from "@/view/login/api";
import router from "@/router";
import {getLoginInfo, removeLoginInfo} from '@/config/utils'
import {ElMessageBox} from 'element-plus'

export default defineComponent({
  name: 'rHeader',
  setup(props, content) {
    const user = getLoginInfo()
    const handlerLogOut = () => {
      ElMessageBox.confirm(`确认退出？`,
          {
            confirmButtonText: '退出',
            cancelButtonText: '取消',
            type: 'warning',
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
    const handlerCommand = (command) => {
      switch (command) {
        case 'info':
          router.push('/userInfo')
          break;
        case 'logout':
          handlerLogOut()
          break;
      }
    }
    return {
      handlerCommand,
      user
    }
  }
})
</script>

<style scoped lang="scss">
.b-header {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  .el-dropdown-link {
    display: flex;
    align-items: center;
    cursor: pointer;

    .user-head {
      text-align: center;
      width: 30px;
      height: 30px;
      line-height: 30px;
      border-radius: 50%;
      background: #545c64;
      color: #fff;
    }
  }
}
</style>