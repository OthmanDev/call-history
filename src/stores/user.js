import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => {
    let user = localStorage.getItem('user') || false
    user = user ? user : {}
    return {
      user: user,
      token: ''
    }
  },
  actions: {
    setUser(user) {
      this.user = user
      localStorage.setItem('user', JSON.stringify(user))
    },
    setToken(token) {
      this.token = token
    },
  },
})
