<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App" @my-event="eventHandler" />
    <h2>{{a}}</h2>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "app",
  data: function() {
    return {
      a: 12
    };
  },
  provide: function() {
    return {
      foo: () => {
        return this.a;
      }
    };
  },
  components: {
    HelloWorld
  },
  methods: {
    eventHandler(n) {
      console.log(n);
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
