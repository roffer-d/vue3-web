<template>
  <div class="login">
    <div class="login-box">
      <div class="title">登录</div>
      <div class="form">
        <div class="form-item">
          <span class="iconfont icon-account"></span>
          <input type="text" v-model="form.account" placeholder="登录账号" @input="checkAccount"
                 @keyup.enter="handlerLogin">
          <div class="error" v-show="accountError">{{ accountError }}</div>
        </div>
        <div class="form-item">
          <span class="iconfont icon-password"></span>
          <input type="password" v-model="form.password" placeholder="登录密码" @input="checkPassword"
                 @keyup.enter="handlerLogin">
          <div class="error" v-show="passwordError">{{ passwordError }}</div>
        </div>
        <div class="login-btn" @click="handlerLogin">
          <span class="iconfont icon-login"></span>
          <div class="login-handler">登录</div>
        </div>
      </div>
    </div>

    <el-dialog v-model="modelVisible" width="400px"
               :close-on-click-modal="false"
               :show-close="false"
               :close-on-press-escape="false">
      <vcode v-if="modelVisible"
             @success="imageSuccess"
             @close="modelVisible=false"
             :validateImage="validateImage"
             :slideImage="slideImage"
             :y="y"
      />
    </el-dialog>
  </div>
</template>
<script>
import {defineComponent, reactive, ref, toRefs, onMounted} from 'vue'
import {login} from './api'
import {setAuth} from "@/config/utils";
import router from '@/router'
import md5 from 'js-md5'
import vcode from '@/components/vcode'

export default defineComponent({
  name: 'login',
  components: {vcode},
  setup(props, content) {
    const data = reactive({
      modelVisible: false,
      accountError: '',
      passwordError: '',
      form: {
        account: '',
        password: ''
      }
    })

    /** 检查账号是否为空 **/
    const checkAccount = () => {
      if (data.form.account == '') {
        data.accountError = '登录账号不能为空'
      } else {
        data.accountError = ''
      }
    }

    /** 检查密码是否为空 **/
    const checkPassword = () => {
      if (data.form.password == '') {
        data.passwordError = '登录密码不能为空'
      } else {
        data.passwordError = ''
      }
    }

    /** 滑动图片验证成功 **/
    const imageSuccess = async () => {
      data.modelVisible = false

      let form = JSON.parse(JSON.stringify(data.form))
      form.password = md5(form.password)
      const res = await login(form)
      if (res.code == 200) {
        localStorage.setItem("token", `Bearer ${res.data.token}`)
        localStorage.setItem("user", JSON.stringify(res.data.user))

        /** 设置用户权限 **/
        await setAuth()
        router.replace('/')
      }
    }

    //登录
    const handlerLogin = () => {
      checkAccount()
      checkPassword()

      data.modelVisible = data.form.account !== '' && data.form.password !== ''
    }

    onMounted(() => {
    })

    return {
      ...toRefs(data),
      handlerLogin,
      checkAccount,
      checkPassword,
      imageSuccess
    }
  }
})
</script>
<style scoped lang="scss">
.login {
  width: 100vw;
  height: 100vh;
  background: url(~@/assets/img/login_bg.png) no-repeat;
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .login-box {
    font-family: "PingFang SC";
    width: 300px;
    height: 300px;
    background: rgba(0, 0, 0, .3);
    border-radius: 8px;
    box-shadow: 0 0 20px #6c7d79;
    color: #fff;
    padding: 20px;

    .title {
      font-size: 24px;
    }

    .form {
      margin-top: 20px;

      .form-item {
        display: flex;
        align-items: center;
        width: 80%;
        margin: 36px auto 0 auto;
        position: relative;

        .iconfont {
          margin-right: 5px;
          font-size: 24px;
        }

        input {
          height: 30px;
          outline: none;
          border: none;
          border-bottom: 1px solid rgba(255, 255, 255, .8);
          background: none;
          color: #ccebf7;
          width: 80%;
          font-size: 16px;
        }

        input[type=text]::placeholder {
          color: rgba(226, 226, 226, .5);
          font-size: 16px;
        }

        .error {
          position: absolute;
          bottom: -24px;
          left: 28px;
          font-size: 13px;
          color: #ff6600;
        }
      }
    }

    .login-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 60px auto 0 auto;
      background: rgba(6, 123, 226, 0.6);
      width: 76%;
      cursor: pointer;
      border-radius: 4px;
      height: 40px;

      &:hover {
        background: rgba(0, 136, 255, 0.6);
      }

      .iconfont {
        font-size: 24px;
        margin-right: 10px;
        color: #08e3e3;
      }

      .login-handler {

      }
    }
  }

  ::v-deep .el-dialog__header {
    display: none;
  }

  ::v-deep .el-dialog__body {
    padding: 0px;
  }
}
</style>