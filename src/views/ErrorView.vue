<template>
  <div class="flex items-center justify-center h-screen">
    <div class="text-center px-4">
      <h1 class="text-9xl font-extrabold leadnin-none mb-4 text-heading-100">404</h1>
      <p class="mb-3 text-xl font-bold text-heading-100">
        Oops, The page you are looking for is not available.
      </p>
      <p class="max-w-[400px] w-full mx-auto mb-10">
        We are sorry for the inconvenience, The page you are trying to access has been removed or
        never been existed.
      </p>
      <div>
        <RouterLink
          :to="{ name: 'dashboard' }"
          class="inline-flex items-center justify-center h-11 gap-2 px-4 bg-primary-100 text-white-100 rounded-md leading-none transition-all duration-150 hover:brightness-125 font-medium"
        >
          <span>
            <ArrowLeft :size="18" :stroke-width="1.75" class="mt-[2px]" />
          </span>
          Back to dashboard
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
import { ArrowLeft } from 'lucide-vue-next'
export default {
  components: {
    ArrowLeft,
  },
}
</script>
