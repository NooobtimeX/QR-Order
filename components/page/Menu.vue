<template>
  <div class="p-4">
    <h1 class="mb-4  pb-6 text-center text-4xl font-bold text-orange-04">Branch Menus</h1>
    <div v-if="menus.length === 0" class="text-gray-500">
      No menus available.
    </div>
    <div v-else class="space-y-4">
      <div
        v-for="menu in menus"
        :key="menu.id"
        class="flex items-center justify-between rounded bg-white p-4 shadow-lg border"
      >
        <div>
          <h2 class="text-xl font-semibold">{{ menu.name }}</h2>
          <p class="text-gray-600">{{ menu.description }}</p>
        </div>
        <button
          @click="toggleMenuStatus(menu.id, !menu.isActive)"
          :class="menu.isActive ? 'bg-green-500 text-white hover:bg-green-700' : 'bg-red-500 text-white hover:bg-red-02'"
          class="rounded px-4 py-2 text-white"
        >
          {{ menu.isActive ? "Disable" : "Enable" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const menus = ref([]);

const fetchMenus = async () => {
  const branchId = localStorage.getItem("branchId");
  console.log("Fetching menus for branchId:", branchId); // Debugging
  const response = await axios.post("/api/branchMenu", {
    branchId: parseInt(branchId, 10),
  });
  console.log("API Response:", response); // Debugging
  if (response.status === 200) {
    menus.value = response.data.body.menus;
    console.log("Menus:", menus.value); // Debugging
  }
};

const toggleMenuStatus = async (menuId, isActive) => {
  const branchId = localStorage.getItem("branchId");
  console.log("Toggling menu status:", { branchId, menuId, isActive }); // Debugging
  const response = await axios.post("/api/branchMenu", {
    branchId: parseInt(branchId, 10),
    menuId,
    isActive,
  });
  console.log("Toggle Response:", response); // Debugging
  if (response.status === 200) {
    await fetchMenus();
  }
};

onMounted(fetchMenus);
</script>

<style scoped>
/* Add any additional styling here */
</style>
