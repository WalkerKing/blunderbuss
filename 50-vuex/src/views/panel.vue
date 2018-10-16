<template>
    <div>
        <h2>----</h2>
        <span>{{count}}</span>
    </div>
</template>
<script>
    import eventHub from '@/store/eventHub'
    export default {
        data () {
            return {
                count: 0
            }
        },
        created: function () {
            
            eventHub.$on('countChange', this.changeCount)
        },
        methods: {
            changeCount (num) {
                console.log('事件回调');
                this.count += num;
            }
        },
        computed: {
            
        }
    }

</script>
<style lang="scss" scoped>

</style>
