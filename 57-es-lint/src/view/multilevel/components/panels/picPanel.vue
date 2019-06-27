<template>
    <div>
        <div class="btnContainer" :key="index" v-for="(item,index) in picInfoList">
            <Button :type="(item.pic_num > 0 ? 'primary' : undefined)"
                    :size="item.btnSize ? item.btnSize : undefined"
                    @click="openPhotoDialog(item)">
                <span>{{item.hpc_name}}</span>
                <span>【{{item.pic_num}}】</span>
            </Button>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['picInfoList'],
        components: {

        },
        data () {
            return {

            }
        },
        methods: {
            openPhotoDialog(item) {
                this.$emit('openUploadModal',item);
            }
        }
    }
</script>

<style lang="less" scoped>
.btnContainer {
    margin: 5px;
    display: inline-block;
}
</style>
