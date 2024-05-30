<template>
  <NuxtLayout name="owner">
    <div class="my-4 grid grid-cols-2 gap-2 md:grid-cols-4">
      <div
        v-for="(item, index) in menuItems"
        :key="index"
        class="m-1 h-full w-full rounded-lg border hover:shadow-lg"
      >
        <a
          :href="`/dashboard/${item.route}`"
          class="relative m-auto grid grid-cols-1 text-center"
        >
          <div class="flex h-full w-full items-center justify-center">
            <img
              :src="item.src"
              class="w-full transform rounded-lg transition duration-300"
            />
          </div>
          <h2 class="text-center">{{ item.name }}</h2>
        </a>
      </div>
    </div>
  </NuxtLayout>
</template>
<script lang="ts" setup>
const menuItems = [
  { name: "STAFF", route: "staff", src: "/icon/staff.png" },
  { name: "TABLE", route: "table", src: "/icon/table.png" },
  { name: "MENU", route: "menu", src: "/icon/menu.png" },
  { name: "SALE", route: "sales", src: "/icon/sales.png" },
];
</script>
