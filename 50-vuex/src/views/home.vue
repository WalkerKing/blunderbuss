<template>
  <div>
    <div>{{count}}</div>
    <button @click="increment">increment</button>
  </div>
</template>

<script>
  import store from '@/store'
  export default {
    name: "home",
    data () {
      return {}
    },
    methods: {
      increment () {
        store.commit('increment');
      }
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
