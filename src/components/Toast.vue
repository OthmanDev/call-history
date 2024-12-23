<template>
  <div
    class="fixed bottom-4 right-0 z-[10000] transition-transform transform duration-300"
    :class="[visible ? '-translate-x-4' : 'translate-x-full']"
  >
    <div
      @click="hide"
      class="rounded-lg p-5 min-w-[350px] max-w-[500px] flex items-center justify-between gap-5 cursor-pointer"
      :class="[type === 'error' ? 'bg-danger-100' : 'bg-success-100']"
    >
      <p class="text-[17px] font-medium text-white-100 drop-shadow-md">{{ message }}</p>
      <span class="block -mx-1 mt-[1px] text-white-100"
        ><CircleX :size="20" :stroke-width="1.75"
      /></span>
    </div>
  </div>
</template>

<script>
import { useToastStore } from '@/stores/toast'
import { CircleX } from 'lucide-vue-next'
export default {
  components: {
    CircleX,
  },
  setup() {
    const toastStore = useToastStore();
    return { toastStore };
  },
  computed: {
    visible() {
      return this.toastStore.visible
    },
    message() {
      return this.toastStore.message
    },
    type() {
      return this.toastStore.type
    },
  },
  methods: {
    hide() {
      this.toastStore.hide();
    },
  },
}
</script>
