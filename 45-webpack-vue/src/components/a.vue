<template>
    <div @click="emitEvent">
        <slot name="header">no header</slot>
        <p>{{Hello}}</p>
        <br>
        <p>{{number}}</p>
        <slot name="footer">no footer</slot>
    </div>
</template>
<script>
    export default {
        props:[ 'number' ],
        data () {
            return {
                Hello: '这是子组件A',
                eventMsg: '组件A触发了事件，并返回此信息'
            }
        },
        methods: {
            emitEvent(){
                this.$emit('myEvent', this.number);
            }
        }
    }
</script>