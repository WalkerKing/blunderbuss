<template>
    <div class="user-avator-dropdown">
        <Dropdown @on-click="handleClick">
            <Avatar :src="userAvator"/>
            <Icon :size="18" type="md-arrow-dropdown"></Icon>
            <DropdownMenu slot="list">
                <DropdownItem name="logout">退出登录</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    </div>
</template>

<script>
    import './user.less'
    import { mapActions } from 'vuex'
    export default {
        name: 'User',
        props: {
            userAvator: {
                type: String,
                default: '',
            },
        },
        methods: {
            ...mapActions([
                'handleLogOut',
            ]),
            handleClick (name) {
                switch (name) {
                case 'logout':
                    this.handleLogOut().then(result => {
                        result = result.data;
                        if (result.error_code) {
                            this.$Message.error(result.message); 
                        }else{
                            this.$Message.success(result.message); 
                            this.$router.push('/login')
                        }
                    })
                    break
                }
            },
        },
    }
</script>
