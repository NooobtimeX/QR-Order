<template>
  <NuxtLayout>
    <div class="sm:mr-64">
      <h1>โต๊ะอาหาร</h1>
      <div class="grid grid-cols-4 gap-1 md:grid-cols-8">
        <button
          v-for="table in tables"
          :key="table.id"
          class="max-w-30 flex h-28 w-full flex-col items-center justify-center"
          :class="[getTableClass(table)]"
          @click="selectTable(table)"
        >
          <img src="/table.png" class="h-14 w-14" />
          <p class="text-sm">โต๊ะ {{ table.name }}</p>
          <p class="text-sm">{{ table.capacity }} ที่นั่ง</p>
        </button>
      </div>
    </div>
    <aside
      class="fixed right-0 top-0 z-40 ml-2 hidden h-screen w-64 bg-green-900 py-2 text-white transition-transform sm:translate-x-0 md:block"
      aria-label="Sidebar"
    >
      <div v-if="selectedTable" class="mx-2 rounded bg-white shadow-md">
        <p class="text-center text-2xl text-green-600">
          โต๊ะ {{ selectedTable.tableName }}
        </p>
        <div class="ms-auto mt-2 grid justify-center gap-1">
          <button
            v-if="
              selectedTable.status !== 'isReserved' &&
              selectedTable.status !== 'isUnavailable'
            "
            @click="openTable"
            class="rounded bg-green-600 px-2 py-1 text-lg text-white"
          >
            จองโต๊ะอาหาร
          </button>
          <button
            v-if="selectedTable.status === 'isOpen'"
            @click="makeUnavailable"
            class="rounded bg-red-600 px-2 py-1 text-lg text-white"
          >
            ใช้การไม่ได้
          </button>
        </div>
        <div
          v-if="selectedTable.status === 'isReserved'"
          class="ms-auto mt-2 grid justify-center gap-1"
        >
          <button
            @click="showPhoto"
            class="rounded bg-blue-600 px-2 py-1 text-lg text-white"
          >
            Show photo
          </button>
          <button
            @click="orderFood"
            class="rounded bg-yellow-600 px-2 py-1 text-lg text-white"
          >
            สั้งอาหาร
          </button>
          <button
            @click="closeTable"
            class="rounded bg-red-600 px-2 py-1 text-lg text-white"
          >
            ปิดโต๊ะอาหาร
          </button>
        </div>
        <div
          v-if="selectedTable.status === 'isUnavailable'"
          class="ms-auto mt-2 grid justify-center gap-1"
        >
          <button
            @click="makeAvailable"
            class="rounded bg-green-600 px-2 py-1 text-lg text-white"
          >
            Make available
          </button>
        </div>
      </div>
      <div v-else class="text-center">กรุณาเลือกโต๊ะอาหาร</div>
    </aside>
  </NuxtLayout>
</template>
<script setup>
import { ref, onMounted } from "vue";
import Cookies from "js-cookie";
import axios from "axios";

const tables = ref([]);
const selectedTable = ref(null);

const fetchTables = async () => {
  const restaurantId = Cookies.get("resId");
  console.log("Restaurant ID:", restaurantId); // Log the restaurant ID

  try {
    const response = await axios.get(`/api/restaurant/getTableById`, {
      params: { restaurantId },
    });
    console.log(
      "Request URL:",
      `/api/restaurant/getTableById?restaurantId=${restaurantId}`,
    ); // Log the request URL
    tables.value = response.data.body || [];
    console.log("Tables fetched:", tables.value); // Debugging log
  } catch (error) {
    console.error("Error fetching tables:", error);
  }
};

onMounted(() => {
  fetchTables();
});

const selectTable = (table) => {
  selectedTable.value = table;
};

const openTable = () => {
  if (selectedTable.value && selectedTable.value.status !== "isReserved") {
    selectedTable.value.status = "isReserved"; // Set the table's status to "isReserved"
  }
};

const makeUnavailable = () => {
  if (selectedTable.value && selectedTable.value.status === "isOpen") {
    selectedTable.value.status = "isUnavailable"; // Set the table's status to "isUnavailable"
  }
};

const showPhoto = () => {
  // Logic to show photo
};

const closeTable = () => {
  if (selectedTable.value && selectedTable.value.status === "isReserved") {
    selectedTable.value.status = "isOpen"; // Set the table's status back to "isOpen"
  }
};

const makeAvailable = () => {
  if (selectedTable.value && selectedTable.value.status === "isUnavailable") {
    selectedTable.value.status = "isOpen"; // Set the table's status to "isOpen"
  }
};

const getTableClass = (table) => {
  if (table.status === "isUnavailable") {
    return "bg-red-600 hover:bg-red-800"; // Red background when the table is unavailable
  } else if (table.status === "isReserved") {
    return "bg-green-600 hover:bg-green-800"; // Green background when the table is reserved
  } else {
    return "bg-gray-600 hover:bg-gray-800"; // Gray background when the table is available
  }
};
</script>
