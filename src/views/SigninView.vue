<template>
  <main class="min-h-screen flex items-center justify-center p-6">
    <SignIn />
  </main>
</template>

<script>
import { SignIn } from '@clerk/vue'

export default {
  components: {
    SignIn,
  },
  data() {
    return {}
  },
}
</script>
