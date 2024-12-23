import { defineStore } from 'pinia';

export const useToastStore = defineStore('toast', {
  state: () => ({
    visible: false,
    message: '',
    type: '',
    timeout: null,
  }),
  actions: {
    show(message, type = 'success', duration = 3000) {
      this.message = message;
      this.type = type;
      this.visible = true;
      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.hide();
      }, duration);
    },
    hide() {
      this.visible = false;
    },
  },
});
