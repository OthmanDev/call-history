import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => {
    let user = localStorage.getItem('user') || false
    user = user ? user : {}
    return {
      user: user,
      token: '',
      toast: {
        show: false,
        message: '',
        type: '',
      },
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
    showToast(message, type) {
      this.toast.show = true
      this.toast.message = message
      this.toast.type = type
    },
    hideToast() {
      this.toast.show = false
    },
  },
})
