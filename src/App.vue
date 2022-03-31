<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <home :title="val"></home>
  <button @click="msg++">点击+1</button>
  <button @click="name=Date.now()">改变name</button>
</template>

<script>
import home from './components/home'
import {ref,toRefs,reactive,watch,computed,onMounted,onBeforeMount} from 'vue'
export default {
  components:{home},
  props: {
    user: {
      type: String,
      default:'123'
    }
  },
  setup(props,content){
    let msg = ref(1)
    // let msg1 = reactive({a:'a1'})
    let name = ref('abcd')
    watch(name,(newVal,oldVal)=>{
      console.log(newVal,oldVal)
    })
    const val = computed(()=>msg.value * 2)
    onMounted(()=>{
      console.log('onMounted')
    })
    onBeforeMount(()=>{
      console.log('onBeforeMount')
    })
    return {
      msg,
      val,
      name
    }
  },
  mounted(){
    console.log('mounted')
  }
}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
