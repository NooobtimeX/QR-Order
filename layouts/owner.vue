<template>
  <AppHeader class="sticky top-0 z-50" :navigation-items="navigationItems" />

  <div class="mx-auto max-w-6xl items-center">
    <slot />
  </div>
</template>
<script setup lang="ts">
const navigationItems = [
  { label: "HOME", link: "/dashboard" },
  { label: "STAFF", link: "/dashboard/staff" },
  { label: "TABLE", link: "/dashboard/table" },
  { label: "MENU", link: "/dashboard/menu" },
  { label: "SALE", link: "/dashboard/sales" },
];
</script>
