import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { clerkPlugin } from '@clerk/vue'
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env.local file')
}
const app = createApp(App)
app.use(clerkPlugin, {
  publishableKey: PUBLISHABLE_KEY,
})
app.use(createPinia())
app.use(router)
app.mount('#app')
