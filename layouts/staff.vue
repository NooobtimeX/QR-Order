<template>
  <AppHeader class="sticky top-0 z-50" :navigation-items="navigationItems" />

  <div class="mx-auto max-w-6xl items-center">
    <slot />
  </div>
</template>
<script setup lang="ts">
const navigationItems = [
  { label: "HOME", link: "/staff" },
  { label: "CREATE ORDER", link: "/staff/createOrder" },
  { label: "STATUS", link: "/staff/status" },
  { label: "TABLE", link: "/staff/table" },
  { label: "NOTIFICATION  ", link: "/staff/notification" },
];
</script>
