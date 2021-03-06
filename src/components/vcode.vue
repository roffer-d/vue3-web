<template>
  <div id="container" v-if="data.validateImage">
    <div class="imageDiv" :style="{width:`${data.width}px`,height:`${data.height}px`}">
      <img id="validateImage" :src="data.validateImage" style="width: 100%;height: 100%"/>
      <img class="slideImage" :style="{left:`${data.left}px`,top:`${data.y+1}px`}" :src="data.slideImage"/>
    </div>
    <div class="result-msg"
         :class="{success:data.success,fail:!data.success}"
         :style="{height:`${data.msgHeight}px`}">
      <div class="msg">{{ data.success ? '验证通过' : '验证失败' }}</div>
    </div>
    <div class="sliderOuter"
         @mousedown="sliderDown"
         @touchstart="touchStart"
         @touchmove="touchMove"
         @touchend="touchEnd"
         :style="{width:`${data.width}px`,height:`40px`}">
      <div class="dragDiv">拖动滑块完成拼图</div>
      <div class="sliderInner" :style="{left:`${data.left}px`}"></div>
    </div>
    <div class="btn-action">
      <i class="iconfont icon-refresh" @click="refresh"></i>
      <i class="iconfont icon-close" @click="close"></i>
    </div>
  </div>
  <div class="imageLoding" v-else v-loading="data.validateImage" element-loading-text="图片加载中..."></div>
</template>

<script setup>
import {ref, onBeforeMount, reactive, defineProps, defineEmits, onBeforeUnmount, onMounted, nextTick} from 'vue';
import {createImg, checkImg} from "../view/login/api";

const props = defineProps({})

const emit = defineEmits(['refresh', 'success', 'close']);
const data = reactive({
  vcCacheKey: '',
  validateImage: '',
  slideImage: '',
  width: 400,
  height: 200,
  left: 0,
  y: 0,
  success: false,
  msgHeight: 0,
})

/** 刷新验证码 **/
const refresh = async () => {
  await getImage()
  emit('refresh')
}

/** 关闭验证码 **/
const close = async () => {
  emit('close')
}

/** 验证滑块图片 **/
const validateImg = async () => {
  let res = await checkImg({cacheKey: data.cacheKey, left: data.left})

  data.left = 0
  data.msgHeight = 20

  if (res.code == 200 && res.data.valid) {
    data.success = true
    emit('success')
  } else {
    data.success = false
    refresh()
  }
}

/** 获取图形验证码 **/
const getImage = async () => {
  const res = await createImg();
  data.validateImage = `data:image/png;base64,${res.data.validateImage}`;
  data.slideImage = `data:image/png;base64,${res.data.slideImage}`;
  data.cacheKey = res.data.cacheKey
  data.y = res.data.y - 1;
};

/** 拖动滑块 **/
const sliderDown = (e) => {
  if (e.target.className !== 'sliderInner') return
  data.originX = e.clientX;
  data.originY = e.clientY;
  data.isMouseDown = true;
};

/** 绑定拖拽事件 **/
const bindEvt = () => {
  const moveEvt = (e) => {
    if (!data.isMouseDown) return;
    const moveX = e.clientX - data.originX;
    const moveY = e.clientY - data.originY;
    if (moveX < 0 || moveX + 43 >= data.width) return;
    data.left = moveX;
  };

  const upEvt = (e) => {
    if (!data.isMouseDown) return;
    data.isMouseDown = false;
    if (e.clientX === data.originX) return;
    validateImg();
  };

  document.addEventListener('mousemove', moveEvt);
  document.addEventListener('mouseup', upEvt);

  onBeforeUnmount(() => {
    document.removeEventListener('mousemove', moveEvt);
    document.removeEventListener('mouseup', upEvt);
  })
};

const touchStart = (e) => {
  if (data.success) return;
  data.originX = e.changedTouches[0].pageX;
  data.originY = e.changedTouches[0].pageY;
  data.isMouseDown = true;
};
const touchMove = (e) => {
  if (!data.isMouseDown) return;
  const moveX = e.changedTouches[0].pageX - data.originX;
  const moveY = e.changedTouches[0].pageY - data.originY;
  if (moveX < 0 || moveX + 43 >= data.width) return;
  data.left = moveX;
};
const touchEnd = (e) => {
  if (!data.isMouseDown) return;
  data.isMouseDown = false;
  if (e.changedTouches[0].pageX === data.originX) return;
  validateImg();
};

onBeforeMount(() => {
  getImage()
})

onMounted(() => {
  bindEvt()
})

</script>
<style lang="scss" scoped>
#container {
  width: 100%;

  .imageDiv {
    position: relative;

    .slideImage {
      position: absolute;
      height: 45px;
      width: 50px;
      top: 5px;
      left: 0;
    }
  }

  .sliderOuter {
    margin: 12px auto;
    border-radius: 4px;
    box-shadow: 0 0 10px -2px darkgrey;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    .dragDiv {
      width: 100%;
      height: 40px;
      position: absolute;
      color: #77ba93;
      text-align: center;
      line-height: 40px;
      user-select: none;
    }

    .sliderInner {
      width: 40px;
      height: 40px;
      border-radius: 4px;
      font-size: 2rem;
      background-color: #28a745;
      cursor: pointer;
      position: absolute;
      left: 0;
    }
  }

  .result-msg {
    display: flex;
    align-items: center;
    font-size: 12px;
    color: #fff;
    transition: all .5s;

    &.success {
      background: #28a745;
    }

    &.fail {
      background: #f56c6c;
    }

    .msg {
      padding: 4px 8px;
    }
  }

  .btn-action {
    padding: 0 10px 10px 10px;
    display: flex;
    align-items: center;
    justify-content: center;

    .iconfont {
      font-size: 20px;
      margin-right: 10px;
      cursor: pointer;
      transition: all .5s;

      &:hover {
        transform: scale(1.2);
      }

      &.icon-refresh {
        color: #28a745;
      }

      &.icon-close {
        color: #f56c6c;
      }
    }
  }
}
.imageLoding{
  width: 100%;
  height: 296px;
}
</style>
