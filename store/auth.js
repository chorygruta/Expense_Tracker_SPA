import {
    setIdToken,
    lfSaveUser,
    isLoggedIn,
    lfGetUser,
    getIdToken,
    logout
  } from '../utils'

export const state = () => ({
    loginStatus: false,
    token: null,
    user: null
})
  
export const actions = {
    async loginUser ({commit}, bodyData) {
        this.$toast.info('Logging in...', {icon: "fingerprint"})
        const auth = await this.$axios.$post('/users/login', bodyData)
        if (auth.success) {
            this.$toast.success('Successfully Logged In', {icon: "done"})
            this.$axios.setToken(auth.data.token, 'Bearer')
            // localforage
            setIdToken(auth.data.token)
            lfSaveUser(auth.data.user)
            // mutation
            commit('SET_AUTH_TOKEN', auth.data.token)
            commit('SET_AUTH_LOGIN_STATUS', true)
            commit('SET_AUTH_USER', auth.data.user)
        } else {
            this.$toast.error('Failed Logging In. Invalid email or password', {icon: "error_outline"})
        }
    },
    
    async signupUser ({commit}, bodyData) {
        this.$toast.info('Signing up...', {icon: "fingerprint"})
        const auth = await this.$axios.$post('/users/signup', bodyData)
        if (auth.success) {
            this.$toast.success('Successfully Signed Up', {icon: "done"})
            this.$axios.setToken(auth.data.token, 'Bearer')
            // localforage
            setIdToken(auth.data.token)
            lfSaveUser(auth.data.user)
            // mutations
            commit('SET_AUTH_TOKEN', auth.data.token)
            commit('SET_AUTH_LOGIN_STATUS', true)
            commit('SET_AUTH_USER', auth.data.user)
        } else {
            this.$toast.error('Failed Signing Up. ' + auth.error, {icon: "error_outline"})
        }
    },

    async logoutUser ({commit}, data) {
        const self = this
        this.$toast.show('Logging out...', {icon: "fingerprint"})
        logout()
        commit('SET_AUTH_LOGIN_STATUS', false)
        commit('SET_AUTH_USER', '')
        commit('SET_AUTH_TOKEN', '')
        this.$axios.setToken(false)
        setTimeout(function(){ 
            self.$toast.success('Successfully Logged Out', {icon: "done"})
        }, 1000);
    },

    async checkAuth ({commit}, data) {
        const isTokenStillValid = await isLoggedIn()
        if (isTokenStillValid) {
            const user = await lfGetUser()
            commit('SET_AUTH_USER', user)
            const token = await getIdToken()
            this.$axios.setToken(token, 'Bearer')
            commit('SET_AUTH_TOKEN', token)
            commit('SET_AUTH_LOGIN_STATUS', true)            
        }
    }
}

export const mutations = {
    SET_AUTH_TOKEN (state, payload) {
        state.token = payload
        // console.log('succesfully mutated auth.token')
    },
    
    SET_AUTH_LOGIN_STATUS (state, payload) {
        state.loginStatus = payload
        // console.log('succesfully mutated auth.loginStatus')
    },
    
    SET_AUTH_USER (state, payload) {
        state.user = payload
        // console.log('succesfully mutated auth.user')
    }
}

export const getters = {
    token: state => state.token,
    loginStatus: state => state.loginStatus,
    user: state => state.user
}