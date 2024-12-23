<template>
  <div
    v-if="isLoading"
    class="bg-opacity-40 fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-heading-100 text-white-100"
  >
    <LoaderCircle :size="50" :stroke-width="1" class="spin" />
  </div>
</template>

<script>
import { useLoaderStore } from '@/stores/loader'
import { LoaderCircle } from 'lucide-vue-next'
export default {
  components: {
    LoaderCircle,
  },
  setup() {
    const loaderStore = useLoaderStore()
    return { loaderStore }
  },
  computed: {
    isLoading() {
      return this.loaderStore.loading
    },
  },
}
</script>
