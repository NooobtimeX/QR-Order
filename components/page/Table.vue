<template>
  <div>
    <h1 class="pb-6 text-center text-5xl font-bold text-orange-04">Table</h1>
    <div class="grid grid-cols-2 gap-1 sm:grid-cols-4 md:grid-cols-6">
      <button
        v-for="table in tables"
        :key="table.id"
        class="max-w-30 flex h-32 w-32 flex-col items-center justify-center bg-gray-200 shadow-md hover:bg-gray-400"
        :class="getTableClass(table)"
        @click="selectTable(table)"
      >
        <img src="/table.png" class="h-14 w-14" />
        <p class="text-sm font-medium text-black">
          <span class="text-sm font-bold text-black">Table:</span>
          {{ table.name }}
        </p>
        <p class="text-sm font-medium text-black">
          <span class="text-sm font-bold text-black">Seat:</span>
          {{ table.capacity }}
        </p>
      </button>
    </div>
    <div class="mt-4">
      <button
        @click="showCreateTableForm"
        class="rounded-lg bg-green-500 px-4 text-base text-white hover:bg-green-700"
      >
        Add Table
      </button>
    </div>
  </div>

  <!-- Table Details Modal -->
  <div
    v-if="selectedTable"
    class="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50"
  >
    <div class="w-96 rounded-lg bg-white p-4">
      <p class="text-center text-2xl text-black">
        Table : <span class="font-bold">{{ selectedTable.name }}</span>
      </p>
      <div class="ms-auto mt-2 grid justify-center gap-1">
        <button
          v-if="canReserveTable"
          @click="updateTable('isReserved')"
          class="rounded bg-green-500 px-2 py-1 text-lg text-white hover:bg-green-700"
        >
          จองโต๊ะอาหาร
        </button>
        <button
          v-if="selectedTable.status === 'isOpen'"
          @click="updateTable('isUnavailable')"
          class="rounded bg-red-500 p-2 px-2 py-1 text-lg text-white hover:bg-red-02"
        >
          ใช้การไม่ได้
        </button>
      </div>
      <div
        v-if="selectedTable.status === 'isReserved'"
        class="ms-auto mt-2 grid justify-center gap-1"
      >
        <div v-if="selectedTable.qrCodeId" class="text-center">
          <p>QR Code:</p>
          <div id="printable-area">
            <vue-qrcode
              :value="`http://localhost:4000/${selectedTable.qrCodeId}`"
              :size="128"
            />
          </div>
          <span>{{ "http://localhost:4000/" + selectedTable.qrCodeId }}</span>
          <button
            @click="printQRCode"
            class="mt-2 rounded bg-green-500 px-2 py-1 text-lg text-white hover:bg-green-700"
          >
            Print QR Code
          </button>
        </div>

        <button
          @click="orderFood"
          class="rounded bg-orange-05 px-2 py-1 text-lg text-white hover:bg-yellow-600"
        >
          สั้งอาหาร
        </button>
        <button
          @click="updateTable('isOpen')"
          class="rounded bg-red-500 p-2 px-2 py-1 text-lg text-white hover:bg-red-02"
        >
          ปิดโต๊ะอาหาร
        </button>
      </div>
      <div
        v-if="selectedTable.status === 'isUnavailable'"
        class="ms-auto mt-2 grid justify-center gap-1"
      >
        <button
          @click="updateTable('isOpen')"
          class="rounded bg-green-600 px-2 py-1 text-lg text-white"
        >
          Make available
        </button>
      </div>
      <!-- Close Modal Button -->
      <div class="mt-4 flex justify-end">
        <button
          @click="selectedTable = null"
          class="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-02"
        >
          Close
        </button>
      </div>
    </div>
  </div>

  <!-- Create Table Modal -->
  <div
    v-if="isCreateTableFormVisible"
    class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50"
  >
    <div class="rounded-lg bg-white p-4">
      <h2 class="mb-4 text-lg font-bold text-black">Create New Table</h2>
      <input
        v-model="newTableName"
        placeholder="Table Name"
        class="mb-2 block w-full rounded-md border-gray-400 bg-white shadow-sm focus:outline-none focus:ring-2 sm:text-base"
      />
      <input
        v-model.number="newTableCapacity"
        placeholder="Capacity"
        type="number"
        class="mb-4 block w-full rounded-md border-gray-400 bg-white shadow-sm focus:outline-none focus:ring-2 sm:text-base"
      />
      <div class="flex justify-end">
        <button
          @click="createTable"
          class="rounded-mb mr-2 border border-transparent bg-green-500 px-4 py-2 text-sm text-white hover:bg-green-700"
        >
          Create
        </button>
        <button
          @click="cancelCreateTable"
          class="rounded-mb mr-2 rounded-md border bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-02"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>

  <!-- Order Food Modal -->
  <div
    v-if="isOrderFoodModalVisible"
    class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50"
  >
    <div class="rounded-lg bg-white p-4">
      <h2 class="mb-4 text-lg font-bold">เลือกเมนูอาหาร</h2>
      <div
        v-for="item in menuItems"
        :key="item.id"
        class="flex items-center justify-between"
      >
        <p>{{ item.name }}</p>
        <button
          @click="toggleMenuItem(item)"
          :class="{
            'bg-blue-600 text-white': selectedMenuItems.includes(item.id),
            'bg-gray-200 text-black': !selectedMenuItems.includes(item.id),
          }"
          class="rounded px-4 py-2"
        >
          {{ selectedMenuItems.includes(item.id) ? "ยกเลิก" : "เลือก" }}
        </button>
      </div>
      <div class="mt-4 flex justify-end">
        <button
          @click="submitOrder"
          class="mr-2 rounded  px-4 py-2  bg-green-500 text-white hover:bg-green-700"
        >
          สั่งอาหาร
        </button>
        <button
          @click="cancelOrder"
          class="rounded px-4 py-2  bg-red-500 text-white hover:bg-red-02"
        >
          ยกเลิก
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import VueQrcode from "@chenfengyuan/vue-qrcode";

// State variables
const tables = ref([]);
const selectedTable = ref(null);
const isCreateTableFormVisible = ref(false);
const newTableName = ref("");
const newTableCapacity = ref(4);

// Fetch `restaurantId` and `branchId` from localStorage
const restaurantId = localStorage.getItem("restaurantId");
const branchId = localStorage.getItem("branchId");

// Current URL for QR code generation
const currentUrl = computed(() => {
  const baseUrl = process.client ? window.location.origin : ""; // Ensure this runs only on the client-side
  return `${baseUrl}/`; // Modify URL if needed
});

// New state variables for ordering food
const isOrderFoodModalVisible = ref(false);
const selectedMenuItems = ref([]);
const menuItems = ref([]);

const selectTable = (table) => {
  selectedTable.value = table;
};

onMounted(async () => {
  await fetchTables();
});

const fetchTables = async () => {
  try {
    const response = await axios.get(
      `/api/restaurant/${restaurantId}/branch/${branchId}/getTableById`,
    );
    tables.value = response.data.body || [];
  } catch (error) {
    console.error("Error fetching tables:", error);
  }
};

const createTable = async () => {
  try {
    const response = await axios.post(
      `/api/restaurant/${restaurantId}/branch/${branchId}/createTable`,
      {
        name: newTableName.value,
        capacity: newTableCapacity.value,
      },
    );

    if (response.data.statusCode === 201) {
      tables.value.push(response.data.body);
      cancelCreateTable();
    } else {
      console.error("Unexpected response format:", response.data);
    }
  } catch (error) {
    console.error("Error creating table:", error);
  }
};

const updateTable = async (newStatus) => {
  try {
    const oldStatus = selectedTable.value.status;
    selectedTable.value.status = newStatus;

    // If closing the table, disconnect the bill
    if (newStatus === "isOpen" && oldStatus === "isReserved") {
      await disconnectBillFromTable();
    }

    const response = await axios.post(
      `/api/restaurant/${restaurantId}/branch/${branchId}/updateTableStatus`,
      {
        tableId: selectedTable.value.id,
        status: newStatus,
      },
    );

    if (response.data.statusCode !== 200) {
      selectedTable.value.status = oldStatus;
      console.error("Failed to update table status:", response.data);
    } else {
      const updatedTable = response.data.body;
      const tableIndex = tables.value.findIndex(
        (table) => table.id === selectedTable.value.id,
      );
      if (tableIndex !== -1) {
        tables.value[tableIndex] = updatedTable;
      }

      if (newStatus === "isReserved") {
        await genQRCode();
      }
    }
  } catch (error) {
    console.error("Error updating table status:", error);
    selectedTable.value.status = oldStatus;
  }
};

const disconnectBillFromTable = async () => {
  try {
    const response = await axios.post(
      `/api/restaurant/${restaurantId}/branch/${branchId}/disconnectBill`,
      {
        tableId: selectedTable.value.id,
      },
    );

    if (response.data.statusCode !== 200) {
      console.error("Failed to disconnect bill:", response.data);
    }
  } catch (error) {
    console.error("Error disconnecting bill:", error);
  }
};

const canReserveTable = computed(
  () =>
    selectedTable.value &&
    selectedTable.value.status !== "isReserved" &&
    selectedTable.value.status !== "isUnavailable",
);

const showCreateTableForm = () => {
  isCreateTableFormVisible.value = true;
};

const cancelCreateTable = () => {
  isCreateTableFormVisible.value = false;
  newTableName.value = "";
  newTableCapacity.value = 4;
};

const getTableClass = (table) => {
  switch (table.status) {
    case "isUnavailable":
      return "bg-red-200 hover:bg-red-500";
    case "isReserved":
      return "bg-green-200 hover:bg-green-500";
    default:
      return "bg-gray-300 hover:bg-gray-500";
  }
};

const genQRCode = async () => {
  try {
    const qrCodeId = Math.random().toString(36).substring(2, 12).toUpperCase();
    selectedTable.value.qrCodeId = qrCodeId;

    const response = await axios.post(
      `/api/restaurant/${restaurantId}/branch/${branchId}/updateQRCode`,
      {
        tableId: selectedTable.value.id,
        qrCodeId,
      },
    );

    if (response.data.statusCode !== 200) {
      console.error("Failed to update QRCode:", response.data);
      selectedTable.value.qrCodeId = null;
    } else {
      const updatedTable = response.data.body;
      const tableIndex = tables.value.findIndex(
        (table) => table.id === selectedTable.value.id,
      );
      if (tableIndex !== -1) {
        tables.value[tableIndex] = updatedTable;
      }
    }
  } catch (error) {
    console.error("Error generating QRCode:", error);
    selectedTable.value.qrCodeId = null;
  }
};

const orderFood = () => {
  isOrderFoodModalVisible.value = true;
  fetchMenuItems(); // Fetch the menu items when the modal is opened
};

const fetchMenuItems = async () => {
  try {
    const response = await axios.post(
      `/api/restaurant/${restaurantId}/branch/${branchId}/getAllMenu`,
    );

    if (response.status === 200 && response.data.body) {
      menuItems.value = response.data.body;
    } else {
      console.error("Unexpected response format:", response.data);
    }
  } catch (error) {
    console.error("Error fetching menu items:", error);
  }
};

const toggleMenuItem = (item) => {
  const index = selectedMenuItems.value.indexOf(item.id);
  if (index === -1) {
    selectedMenuItems.value.push(item.id);
  } else {
    selectedMenuItems.value.splice(index, 1);
  }
};

const cancelOrder = () => {
  isOrderFoodModalVisible.value = false;
  selectedMenuItems.value = [];
};

const submitOrder = async () => {
  try {
    const response = await axios.post(
      `/api/restaurant/${restaurantId}/branch/${branchId}/submitOrder`,
      {
        tableId: selectedTable.value.id,
        menuItems: selectedMenuItems.value,
      },
    );

    if (response.data.statusCode === 201) {
      console.log("Order submitted successfully:", response.data);
      cancelOrder();
    } else {
      console.error("Unexpected response format:", response.data);
    }
  } catch (error) {
    console.error("Error submitting order:", error);
  }
};
</script>
