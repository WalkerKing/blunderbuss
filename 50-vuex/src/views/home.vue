<template>
  <div>
    <h2>用vuex实现组件通信</h2>
    <div>{{count}}</div>
    <button @click="increment">increment</button>
    <hr>
    <h2>以下用vue bus实现兄弟组件通信</h2>
    <panel  />
    <side  />
  </div>
</template>

<script>
import store from '@/store'
import panel from './panel'
import side from './aside'
  export default {
    name: "home",
    data () {
      return {}
    },
    mounted(){
	console.log(123)
    },
    methods: {
      increment () {
        store.dispatch('increment',2);
      }
    },
    components: {
        panel,
        side
    },
    computed: {
      count () {
        return store.state.count
      }
    }
  }
</script>

<style scoped>

</style>
