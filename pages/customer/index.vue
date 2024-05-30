<template>
  <NuxtLayout name="customer">
    <div>
      <nav
        class="sticky top-0 z-50 flex overflow-x-auto rounded-lg border bg-white"
      >
        <div
          v-for="category in categories"
          :key="category.name"
          class="px-2 py-4"
        >
          <a :href="'#' + category.name" class="text-violet-900">{{
            category.name
          }}</a>
        </div>
      </nav>
      <div class="mt-4">
        <div
          v-for="category in categories"
          :key="category.name"
          class="mb-2 rounded-lg border p-2"
          :id="category.name"
        >
          <h2 class="text-2xl font-semibold">{{ category.name }}</h2>
          <div class="grid grid-cols-2 gap-2 lg:grid-cols-3 xl:grid-cols-4">
            <router-link
              :to="`/customer/singleproduct`"
              class="block rounded-lg border bg-white p-2 transition-shadow duration-300 hover:shadow-lg"
              v-for="menu in category.menus"
              :key="menu.id"
            >
              <img :src="menu.src" class="c-t-lg h-32 w-full object-cover" />
              <div class="p-1">
                <h2 class="text-xl font-semibold">{{ menu.name }}</h2>
                <p class="text-gray-700">{{ menu.price }}฿</p>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div></NuxtLayout
  >
</template>

<script setup lang="ts">
import { ref } from "vue";

const categories = ref([
  {
    name: "Burger",
    menus: [{ id: 1, name: "Burger A", price: 100, src: "/menu/burger.jpg" }],
  },
  {
    name: "Pizza",
    menus: [{ id: 1, name: "Pizza A", price: 100, src: "/menu/pizza.jpg" }],
  },
]);
</script>
