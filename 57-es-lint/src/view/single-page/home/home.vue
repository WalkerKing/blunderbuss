<template>
    <div>
        <Row>
            <Card shadow>
                <p>你好，{{ userInfo.name }}，欢迎使用档案管理系统.</p>
            </Card>
        </Row>
    </div>
</template>

<script>
    import Cookies from 'js-cookie'
    import * as ajax from '@/api'

    export default {
        name: 'home',
        data () {
            return {}
        },
        mounted() {
            ajax.getDictData().then(res => {
                let {error_code, message, data} = res.data;
                if (error_code) {
                    this.$Message.error(message);
                } else {
                    this.dictData = data;
                }
            }).catch(e => console.log(e));
        },
        computed: {
            userInfo () {
                return JSON.parse(Cookies.get('user_info'))
            },

        },
    }
</script>

<style lang="less">

</style>
