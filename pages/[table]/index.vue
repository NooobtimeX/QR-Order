<template>
  <NuxtLayout name="customer">
    <div>
      <nav
        class="sticky top-0 z-50 flex overflow-x-auto rounded-xl border-2 border-gray-300 bg-white shadow-md"
      >
        <div
          v-for="category in categories"
          :key="category.name"
          class="px-2 py-4"
        >
          <a :href="'#' + category.name" class="font-bold text-black">{{
            category.name
          }}</a>
        </div>
      </nav>
      <div class="mt-4">
        <div
          v-for="category in categories"
          :key="category.name"
          class="mb-2 rounded-xl border-2 border-gray-300 p-2 shadow-md"
          :id="category.name"
        >
          <h2 class="text-2xl font-bold">{{ category.name }}</h2>
          <div class="grid grid-cols-2 gap-2 lg:grid-cols-3 xl:grid-cols-4">
            <nuxt-link
              :to="`/${qrCodeId}/${menu.id}`"
              class="block rounded-xl border-2 border-gray-300 bg-white p-2 shadow-sm transition-shadow duration-300 hover:shadow-lg"
              v-for="menu in category.menus"
              :key="menu.id"
            >
              <img :src="menu.src" class="c-t-lg h-32 w-full object-cover" />
              <div class="p-1">
                <h2 class="text-xl font-semibold">{{ menu.name }}</h2>
                <p class="text-black">{{ menu.price }}฿</p>
              </div>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

const categories = ref([]);
const qrCodeId = ref(null);

onMounted(async () => {
  const route = useRoute();
  qrCodeId.value = route.params.table;

  if (qrCodeId.value) {
    try {
      const response = await axios.get(
        `/api/getMenusByQRCodeId/${qrCodeId.value}`,
      );
      const { menus } = response.data.body;

      const categoryMap = new Map();
      menus.forEach((menu) => {
        if (!categoryMap.has(menu.category.name)) {
          categoryMap.set(menu.category.name, []);
        }
        categoryMap.get(menu.category.name).push({
          id: menu.id,
          name: menu.name,
          price: menu.price,
          src: menu.imageUrl,
        });
      });

      categories.value = Array.from(categoryMap, ([name, menus]) => ({
        name,
        menus,
      }));
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  }
});
</script>
