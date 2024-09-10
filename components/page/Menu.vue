<template>
  <div class="mx-auto max-w-7xl px-4 py-2">
    <h1 class="mb-5 text-center text-3xl font-bold">เมนู</h1>
    <!-- Add Menu Button -->
    <div class="fixed bottom-4 right-4 z-50 grid grid-cols-1 gap-2">
      <!-- Notification Button -->
      <button
        @click="openCreateMenuModal"
        class="bg-green-500 text-white hover:bg-green-600"
      >
        +
      </button>
    </div>
    <!-- Category List -->
    <div v-if="categories.length">
      <nav
        class="sticky top-0 z-50 flex overflow-x-auto rounded-xl border bg-white"
      >
        <div
          v-for="category in categories"
          :key="category.name"
          class="px-2 py-4"
        >
          <a :href="'#' + category.name" class="text-green-900">
            {{ category.name }}
          </a>
        </div>
      </nav>
      <div class="mt-4">
        <div
          v-for="category in categories"
          :key="category.name"
          class="mb-2 rounded-xl border p-2"
          :id="category.name"
        >
          <h2 class="text-2xl font-semibold">{{ category.name }}</h2>
          <div class="grid grid-cols-2 gap-2 lg:grid-cols-3 xl:grid-cols-4">
            <router-link
              :to="`/customer/singleproduct`"
              class="block rounded-xl border bg-white p-2 transition-shadow duration-300 hover:shadow-lg"
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
    </div>
    <!-- Message if no categories are available -->
    <div v-else class="text-center">
      No categories available. Please add a category and menus.
    </div>
    <!-- Modal Popup -->
    <div
      v-if="isModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div
        class="relative max-h-full w-full max-w-full rounded-lg bg-green-05 p-8 shadow-lg"
      >
        <!-- Close Button -->
        <button @click="closeModal" class="absolute left-2 top-2 text-white">
          &times;
        </button>
        <!-- Content for the modal -->
        <div>
          <createMenu />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import Cookies from "js-cookie";

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
const isModalOpen = ref(false);

// Open the Create Menu Modal
const openCreateMenuModal = () => {
  isModalOpen.value = true;
};

// Close the Modal
const closeModal = () => {
  isModalOpen.value = false;
};

onMounted(async () => {
  const resId = Cookies.get("restaurantId");
  if (resId) {
    try {
      const response = await axios.post("/api/restaurant/getAllMenu", {
        resId,
      });
      const menus = response.data.body;

      // Map menus to categories
      const categoryMap = new Map();
      menus.forEach((menu: any) => {
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
      console.error("Failed to fetch menus:", error);
    }
  } else {
    console.error("Restaurant ID not found in cookies");
  }
});
</script>
