<template>
  <main class="min-h-screen flex items-center justify-center p-6">
    <SignUp />
  </main>
</template>

<script>
import { SignUp } from '@clerk/vue'

export default {
  components: {
    SignUp,
  },
  data() {
    return {}
  },
}
</script>
