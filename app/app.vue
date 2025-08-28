<template>
  <NuxtRouteAnnouncer />
  <NuxtLoadingIndicator />
<div
    v-if="loading"
    class="fixed inset-0 z-50 flex items-center justify-center bg-white"
  >
    <span class="text-2xl font-bold text-blue-600 animate-pulse">
      Loading...
    </span>
  </div>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script setup>
const loading = ref(true);
onMounted(async () => {
  await nextTick()
  loading.value = false;
})
</script>
