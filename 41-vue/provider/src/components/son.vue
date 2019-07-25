<template>
  <div class="hello" @click="triggerEvent">{{msg}}</div>
</template>

<script>
export default {
  name: "HelloWorld",
  inject: ["foo"],
  props: {
    msg: String
  },
  created() {
    console.log(this.foo());
  },
  methods: {
      triggerEvent() {
          this.$emit('my-event', 1)
      }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
