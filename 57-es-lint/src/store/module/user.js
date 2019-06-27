import * as ajax from '@/api'
import { setToken, getToken } from '@/libs/util';
import Cookies from 'js-cookie';

export default {
    state: {
        userName: '',
        userId: '',
        avatorImgPath: require('@/assets/images/fhw-icon.png'),
        token: getToken(),
        access: '',
        hasGetInfo: false,
        userInfo: '{"name": "","position_name": "","section_name": ""}',
    },
    mutations: {
        setUserInfo (state, userInfo) {
            state.userInfo = userInfo
        },
        setAvator (state, avatorPath) {
            state.avatorImgPath = avatorPath
        },
        setUserId (state, id) {
            state.userId = id
        },
        setUserName (state, name) {
            state.userName = name
        },
        setAccess (state, access) {
            state.access = access
        },
        setToken (state, token) {
            state.token = token
            setToken(token)
        },
        setHasGetInfo (state, status) {
            state.hasGetInfo = status
        },
    },
    actions: {
        // 登录
        handleLogin ({ commit }, { userName, password }) {
            userName = userName.trim()
            return new Promise((resolve, reject) => {
                ajax.login({
                    userName,
                    password,
                }).then(res => {
                    const data = res.data
                    commit('setToken', data.token)
                    resolve()
                }).catch(err => {
                    reject(err)
                })
            })
        },
        // 退出登录
        handleLogOut ({ state, commit }) {
            return new Promise((resolve, reject) => {
                ajax.logout().then(res => {
                    localStorage.removeItem('userInfo')
                    resolve(res)
                });
            })
        },
        // 获取用户相关信息
        getUserInfo ({ state, commit }) {
            return new Promise((resolve, reject) => {
                try {
                    ajax.getUserInfo(state.token).then(res => {
                        const data = res.data
                        commit('setAvator', data.avator)
                        commit('setUserName', data.name)
                        commit('setUserId', data.user_id)
                        commit('setAccess', data.access)
                        commit('setHasGetInfo', true)
                        resolve(data)
                    }).catch(err => {
                        reject(err)
                    })
                } catch (error) {
                    reject(error)
                }
            })
        }
    },
}
