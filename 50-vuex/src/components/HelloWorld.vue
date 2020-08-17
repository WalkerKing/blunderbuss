<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <button class="animate__animated animate__tada">动画测试</button>
        <button>trigger</button>
        <h1 class="animate__animated animate__swing">An animated element</h1>
    </div>
</template>

<script>
export default {
    name: 'HelloWorld',
    data() {
        return {
            msg: 'Welcome to animate.css',
        };
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
