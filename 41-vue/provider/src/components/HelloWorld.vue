<template>
  <div class="hello">
    <son @my-event="handler" msg="Hello"></son>
  </div>
</template>

<script>
import Son from "./son";
export default {
  name: "HelloWorld",
  inject: ["foo"],
  props: {
    msg: String
  },
  components: {
    Son
  },
  created() {
    // console.log(this.foo);
  },
  methods: {
    handler(n) {
        // console.log(n)
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
