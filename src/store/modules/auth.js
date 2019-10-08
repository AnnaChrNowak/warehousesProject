import axios from 'axios';
import store from '../index'

const state = {
    auth_token: localStorage.getItem('user_token'),
    userId: null,
    user: null
  };

const getters = {
  user (state) {
    return state.user
  },
  isAuthenticated : () => {
    if (localStorage.getItem('user_token')=== null) {
      return false;
    }
    else {
      return true;
    }

    }
}
const actions = {
  setLogoutTimer ({commit}, expirationTime) {
      setTimeout(() => {
        commit('clearAuthData')
      }, expirationTime * 1000)
    },
   login ({commit, dispatch}, user_data) {
    return new Promise((resolve, reject) => {
     axios({
         method: 'POST',
         url: 'https://web4wms.herokuapp.com/auth/token/create',
         data: JSON.stringify(
           {
             'password': user_data.password,
             'username': user_data.username
           }),

         headers: { 'Content-Type': "application/json" }
       },
     )
       .then(res => {
          // const now = new Date()
          // const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000)

          localStorage.setItem('user_token', res.data.auth_token)
          // localStorage.setItem('userId', res.data.localId)
          // localStorage.setItem('expirationDate', expirationDate)

          // commit('authUser', {
          //   user_token: res.data.auth_token,
          //   userId: res.data.localId
          // })
          // dispatch('setLogoutTimer', res.data.expiresIn)
         resolve(res)
       })
       .catch(err => {
         console.log(err)
         reject(err)
       })
    })
   }
}

const mutations = {
   authUser (state, userData) {
      state.auth_token = userData.user_token
      state.userId = userData.userId
    },
    storeUser (state, user) {
      state.user = user
    },
    clearAuthData (state) {
      state.auth_token = null
      state.userId = null
    },
}

export default {
  state,
  actions,
  getters,
  mutations
}

