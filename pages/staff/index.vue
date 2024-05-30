<template>
  <NuxtLayout name="staff">
    <div class="my-4 grid grid-cols-2 gap-2 md:grid-cols-4">
      <div
        v-for="(item, index) in menuItems"
        :key="index"
        class="m-1 h-full w-full rounded-lg border hover:shadow-lg"
      >
        <a
          :href="`/staff/${item.route}`"
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
<script setup lang="ts">
const menuItems = [
  { name: "CREATE ORDER", route: "createOrder", src: "/icon/status.png" },
  { name: "STATUS", route: "status", src: "/icon/order.png" },
  { name: "TABLE", route: "table", src: "/icon/table.png" },

  {
    name: "NOTIFICATION",
    route: "notification",
    src: "/icon/notification.png",
  },
];
</script>
