<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="content">
            <div class="picture"></div>
            <div class="form-container">
                <div class="title clearfix">
                    <img :src="require('../../assets/images/login-and-password-logo@2x.png')" alt="档案管理系统">
                    <h1>档案管理系统</h1>
                </div>
                <div class="form">
                    <div class="form-item">
                        <input type="text" placeholder="手机号码" v-model="form.userName">
                    </div>
                    <div class="form-item">
                        <input type="password" placeholder="密码" v-model="form.password">
                    </div>
                    <div class="form-item clearfix">
                        <input type="text" placeholder="验证码" v-model="form.code">
                        <img class="code" :src="imgSrc" alt="" @click="changeSrc">
                    </div>

                    <button class="button" @click="handleSubmit"><i>登录</i></button>

                    <!-- <router-link class="link" to="/password">忘记密码?</router-link> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Cookies from 'js-cookie'
    import * as ajax from '@/api'
    import qs from 'qs'


    export default {
        data () {
            return {
                imgSrc: '//dangan.fanghuwang.com/login/showCaptcha',
                form: {
                    userName: '', // 18310617105
                    password: '', // 123qwe
                    code: '', // qwe
                },
            }
        },
        methods: {
            changeSrc () {
                this.imgSrc = this.imgSrc + `?random=${Math.random()}`
            },
            async handleSubmit () {
                const o = {
                    url: '/login/dologin',
                    data: qs.stringify({
                                mobile: this.form.userName,
                                pwd: this.form.password,
                                code: this.form.code,
                            }),
                    method: 'post',
                }

                const { data } = await ajax.login(o);
                if (data.error_code === 0) {
                    const menus = data.data.auth.map(item => item.url)
                    Cookies.set('menus', JSON.stringify(menus),{expires: 44})
                    Cookies.set('user_info', data.data.user_info,{expires: 44})
                    this.$router.push('/home')
                } else if (data.error_code === '1002') {
                    this.changeSrc()
                    this._noticeError(data.message)
                } else {
                    this._noticeError(data.message)
                }
            },
            _noticeError (message) {
                this.$Notice.error({
                    title: '登录失败',
                    desc: message,
                })
            },
        },
    }
</script>

<style lang="less" scoped>
    .clearfix:after {content:"."; display:block; height:0; visibility:hidden; clear:both; }
    .clearfix { *zoom:1; }
    .login{
        width: 100%;
        height: 100%;
        background: url('../../assets/images/login/bg.png') 0 0 no-repeat;
        background-size: cover;

        .content {
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            height: 500px;
            width: 1100px;
            border-radius: 18px;
            background: #fff;
            .picture {
                width: 580px;
                height: 500px;
                background: url('../../assets/images/login/people.png') 0 0 no-repeat;
                background-size: 580px 500px;
                float: left;
            }
            .form-container {
                float: right;
                width: 520px;
                .title {
                    height: 32px;
                    margin: 0 auto;
                    margin-top: 69px;
                    width: 350px;

                    img {
                        float: left;
                        width: 112px;
                        height: 32px;
                    }
                    h1 {
                        float: left;
                        margin-left: 24px;
                        font-size: 24px;
                        color: #525252;
                        line-height: 32px;
                    }
                }
                .form {
                    margin: 0 auto;
                    margin-top: 40px;
                    width: 350px;
                    .form-item {
                        position: relative;
                        left: 0;
                        top: 0;
                        width: 100%;
                        height: 59px;
                        border-bottom: 1px solid #eeeeee;

                        input {
                            width: 100%;
                            height: 100%;
                            font-size: 17px;
                            color: #333333;
                            border: none;
                            outline:none;
                            text-indent: 2px;
                        }
                        input::-webkit-input-placeholder {
                            font-size: 17px;
                            text-align: left;
                            color: #a9a9a9;
                        }

                        .code {
                            position: absolute;
                            top: 0;
                            right: 0;
                            height: 58px;
                            cursor: pointer;
                        }
                    }
                    .button {
                        margin-top: 50px;
                        width: 376px;
                        height: 88px;
                        background: url('../../assets/images/login/botton.png') 0 0 no-repeat;
                        background-size: 100% 100%;
                        border-radius: 23px;
                        color: #fff;
                        border: none;
                        outline:none;
                        cursor: pointer;
                        font-size: 18px;
                        i{
                            position: relative;
                            top: -5px;
                            font-style: normal;
                        }
                    }
                    .link {
                        font-size: 14px;
                        color: #333;
                        float: right;
                        margin-top: 21px;
                        line-height: 14px;
                        &:hover {
                            text-decoration: underline;
                        }
                    }
                }

            }
        }
    }
</style>
