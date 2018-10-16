<template>
    <button @click=countChange>click</button>
</template>
<script>
    import eventHub from '@/store/eventHub'
    export default {
        data () {
            return {
                
            }
        },
        methods: {
            countChange () {
                console.log('bus触发事件');
                eventHub.$emit('countChange', 2);
            }
        }
    }

</script>
<style lang="scss" scoped>

</style>
