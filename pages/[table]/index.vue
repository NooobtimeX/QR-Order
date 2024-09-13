<template>
  <NuxtLayout name="customer">
    <div>
      <nav
        class="sticky top-0 z-50 flex overflow-x-auto rounded-xl border-2 bg-white border-gray-300 shadow-md"
      >
        <div
          v-for="category in categories"
          :key="category.name"
          class="px-2 py-4"
        >
          <a :href="'#' + category.name" class="text-black font-bold">
            {{ category.name }}
          </a>
        </div>
      </nav>
      <div class="mt-4">
        <div
          v-for="category in categories"
          :key="category.name"
          class="mb-2 rounded-xl border-2 p-2 border-gray-300 shadow-md "
          :id="category.name"
        >
          <h2 class="text-2xl font-bold">{{ category.name }}</h2>
          <div class="grid grid-cols-2 gap-2 lg:grid-cols-3 xl:grid-cols-4">
            <router-link
              :to="`/${qrCodeId}/${menu.id}`"
              class="block rounded-xl border-2 bg-white p-2 transition-shadow duration-300 hover:shadow-lg border-gray-300 shadow-sm"
              v-for="menu in category.menus"
              :key="menu.id"
            >
              <img :src="menu.src" class="c-t-lg h-32 w-full object-cover" />
              <div class="p-1">
                <h2 class="text-xl font-semibold">{{ menu.name }}</h2>
                <p class="text-black">{{ menu.price }}฿</p>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router"; // Import useRoute to get the qrCodeId from the URL
import axios from "axios";

// Define interfaces for Menu and Category
interface Menu {
  id: number;
  name: string;
  price: number;
  src: string;
}

interface Category {
  name: string;
  menus: Menu[];
}

const categories = ref<Category[]>([]);

// Ensure qrCodeId is either string or null
const qrCodeId = ref<string | null>(null);

// Fetch the route information when the component is mounted
onMounted(async () => {
  const route = useRoute();

  // Handle dynamic params.table safely
  const routeTableParam = route.params.table;
  qrCodeId.value = Array.isArray(routeTableParam)
    ? routeTableParam[0]
    : routeTableParam;

  if (qrCodeId.value) {
    try {
      // Step 1: Get the restaurantId from the Table based on qrCodeId
      const tableResponse = await axios.get(`/api/table/${qrCodeId.value}`);
      const restaurantId = tableResponse.data.restaurantId;

      if (restaurantId) {
        // Step 2: Fetch all menus for the restaurantId
        const menuResponse = await axios.post(
          "/api/restaurant/getMenusByQRCodeId",
          { restaurantId },
        );
        const menus = menuResponse.data.body;

        // Map menus to categories
        const categoryMap = new Map<string, Menu[]>();
        menus.forEach((menu: any) => {
          if (!categoryMap.has(menu.category.name)) {
            categoryMap.set(menu.category.name, []);
          }
          categoryMap.get(menu.category.name)?.push({
            id: menu.id,
            name: menu.name,
            price: menu.price,
            src: menu.imageUrl,
          });
        });

        // Update the categories array with the mapped categories and menus
        categories.value = Array.from(categoryMap, ([name, menus]) => ({
          name,
          menus,
        }));
      } else {
        console.error("Restaurant ID not found for the given QR Code");
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  } else {
    console.error("QR Code ID not found in URL");
  }
});
</script>
