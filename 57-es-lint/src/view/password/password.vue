<template>
    <div class="password">
        <div class="content-container">
            <header>
                <img @click="toLogin" :src="require('../../assets/images/login-and-password-logo@2x.png')" alt="档案管理系统">
                <p>已有账号 <router-link class="link" to="/login">马上登陆</router-link></p>
            </header>
            <div class="content">
                <div class="title">
                    <p>找回密码</p>
                </div>

                <div class="form-container">

                    <!-- step1 -->
                    <div class="form-step1" v-if="state === 'step1'">
                        <div class="form-item">
                            <input type="text" data-test-mobile placeholder="手机号" v-model="form.step1.mobile">
                        </div>
                        <div class="form-item clearfix">
                            <input type="text" placeholder="验证码" style="width:262px" v-model="form.step1.code" data-test-code>
                            <button class="button" @click="sendSMSHandler" data-test-sendSMS>
                                {{ sms.text }}
                            </button>
                        </div>
                        <button class="button-next" @click="nextStep('step2')" data-test-step1Btn>
                            下一步 安全验证
                        </button>
                    </div>

                    <!-- step2 -->
                    <div class="form-step2" v-if="state === 'step2'">
                        <div class="form-item">
                            <input type="password" placeholder="设置新密码" v-model="form.step2.newPassword" data-test-newPassword>
                        </div>
                        <div class="form-item">
                            <input type="password" placeholder="确认新密码" v-model="form.step2.repeatNewPassword" data-test-repeatNewPassword>
                        </div>
                        <button class="button-next" @click="nextStep('step3')" data-test-step2Btn>
                            下一步
                        </button>
                    </div>

                    <!-- step3 -->
                    <div class="form-step3" v-if="state === 'step3'">
                        <p>您已设置新密码，请用新密码登陆</p>
                        <button class="button-next" @click="nextStep('step4')" data-test-step3Btn>
                            登陆房互网后台管理系统
                        </button>
                    </div>

                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import * as ajax from '@/api'

    export default {
        data () {
            return {
                state: 'step1', // step1 -> step2 -> step3
                form: {
                    'step1': {
                        mobile: '',
                        code: '',
                        token: '',
                    },
                    'step2': {
                        newPassword: '',
                        repeatNewPassword: '',
                    },
                    'step3': {},
                },
                sms: {
                    text: '发送验证码',
                    state: 'init',
                },
            }
        },
        methods: {
            _checkMobile () {
                // 检查参数，验证成功返回参数
                const code = this.form.step1.code
                const mobile = this.form.step1.mobile

                if (mobile.length !== 11) {
                    this.$Notice.info({
                        title: '请输入正确的手机号',
                    })
                    return false
                }
                if (code.length === 0) {
                    this.$Notice.info({
                        title: '请输入验证码',
                    })
                    return false
                }
                if (this.sms.state === 'init') {
                    this.$Notice.info({
                        title: '请发送验证码',
                    })
                    return false
                }

                return {
                    mobile,
                    code,
                }
            },
            _checkPassword () {
                // 检查参数，验证成功返回参数
                const newpwd = this.form.step2.newPassword
                const chknewpwd = this.form.step2.repeatNewPassword
                const token = this.form.step1.token

                if (newpwd === '' || chknewpwd === '') {
                    this.$Notice.info({
                        title: '请输入新密码',
                    })
                    return false
                }

                if (newpwd !== chknewpwd) {
                    this.$Notice.info({
                        title: '两次密码输入不一致',
                    })
                    return false
                }

                if (token === '') {
                    this.$Notice.info({
                        title: '短信验证token过期',
                    })
                    return false
                }

                return {
                    newpwd,
                    chknewpwd,
                    token,
                }
            },
            async nextStep (step) {
                const nextStep = () => {
                    this.state = step
                    if (this.state === 'step4') {
                        this.$router.push('/login')
                    }
                }

                if (this.state === 'step1') {
                    const canCheck = this._checkMobile()
                    if (canCheck) {
                        const { error_code, data, message } = await ajax.checkSMS({
                            mobile: canCheck.mobile,
                            smsCode: canCheck.code,
                        })

                        if (error_code === 0) {
                            this.form.step1.token = data
                            nextStep()
                        } else {
                            this.$Notice.info({
                                title: message,
                            })
                        }
                    }
                }

                if (this.state === 'step2') {
                    const canChangePassword = this._checkPassword()

                    if (canChangePassword) {
                        const { error_code, message, data } = await ajax.resetPassord(canChangePassword)

                        if (error_code === 0) {
                            this.$Notice.info({
                                title: data,
                                desc: message,
                            })
                            nextStep()
                        } else {
                            this.$Notice.info({
                                title: '修改失败',
                                desc: message,
                            })
                        }
                    }
                }

                if (this.state === 'step3') {
                    nextStep()
                }
            },
            async sendSMSHandler () {
                const mobile = this.form.step1.mobile

                if (mobile.length !== 11) {
                    this.$Notice.info({
                        title: '请输入正确的手机号',
                    })
                    return
                }

                if (this.sms.state === 'loading') {
                    return
                }
                const { error_code, message } = await ajax.sendSMS()

                if (error_code === 0) {
                    if (this.sms.state === 'init' || this.sms.state === 'finished') {
                        let time = 60
                        this.sms.state = 'loading'
                        this.sms.text = `${time} s`

                        var timeID = setInterval(() => {
                            time--
                            if (time === 0) {
                                this.sms.state = 'finished'
                                this.sms.text = '重新发送'
                                clearInterval(timeID)
                            } else {
                                this.sms.text = `${time} s`
                            }
                        }, 1000)
                    }
                } else {
                    this.$Notice.info({
                        title: message,
                    })
                    this.sms.state = 'finished'
                    this.sms.text = '重新发送'
                }
            },
            toLogin () {
                this.$router.push('/login')
            },
        },
    }
</script>

<style lang="less" scoped>
    .clearfix:after {content:"."; display:block; height:0; visibility:hidden; clear:both; }
    .clearfix { *zoom:1; }
    .password {
        background: #eeefef;
        width: 100%;
        height: 100%;
        .content-container {
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            margin: 123px auto 0 auto;
            width: 66%;
            height: 560px;
            header {
                overflow: hidden;
                img {
                    float: left;
                    width: 114px;
                    height: 35px;
                    cursor: pointer;
                }
                p {
                    font-size: 18px;
                    color: #3a3a3a;
                    line-height: 32px;
                    float: right;
                    .link {
                        color: #4e7eff;
                        &:hover {
                            text-decoration: underline;
                        }
                    }
                }
            }
            .content {
                margin-top: 12px;
                .title {
                    height: 100px;
                    border-top: 3px solid #4e7eff;
                    background: #fff;
                    p {
                        line-height: 100px;
                        text-align: center;
                        font-size: 30px;
                        color: #000;
                    }
                }

                .form-container {
                    background: #fbfbfb;
                    opacity: .8;
                    height: 354px;
                    overflow: hidden;

                    .button-mixin {
                        background-color: #4e7eff;
                        border-radius: 5px;
                        font-size: 14px;
                        color: #fff;
                        outline: none;
                        border: none;
                        cursor: pointer;
                    }

                    .form-step1,
                    .form-step2,
                    .form-step3 {
                        width: 428px;
                        margin: 48px auto 0 auto;
                        .form-item {
                            overflow: hidden;
                            &:nth-child(1) {
                                margin: 48px 0 17px 0;
                            }
                            input {
                                width: 428px;
                                height: 42px;
                                border: solid 1px #dedede;
                                outline: none;
                                color: #333;
                                font-size: 14px;
                                text-indent: 23px;
                                &::-webkit-input-placeholder {
                                    font-size: 17px;
                                    text-align: left;
                                    color: #9c9c98;
                                }
                            }
                            .button {
                                .button-mixin();
                                float: right;
                                width: 152px;
                                height: 42px;
                            }
                        }
                        .button-next {
                            .button-mixin();
                            margin-top: 37px;
                            width: 428px;
                            height: 42px;
                        }
                    }

                    .form-step3 {
                        p {
                            margin-top: 80px;
                            font-size: 14px;
                            color: #9c9c98;
                            text-align: center;
                        }
                    }
                }

            }
        }
    }
</style>
