<template>
  <div class="dark">
    <div
      class="mx-auto py-4 w-full min-h-screen text-gray-900 dark:text-gray-100 bg-white dark:bg-zinc-900"
    >
      <nuxt />
    </div>
  </div>
</template>

<script>
import appHeader from '@/components/header'

export default {
  name: 'DefaultLayout',
  components: { appHeader }
}
</script>
