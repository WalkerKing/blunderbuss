<template>
    <div>
        {{ greeting }} world!

    </div>
</template>

<script>
    module.exports = {
        data: function(){
            return {
                greeting: 'Hello'
            }
        }
    }

</script>

<style scoped>
    div{
        font-size: 2rem;
        text-align: center;
    }
</style>