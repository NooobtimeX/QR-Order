<template>
  <NuxtLayout>
    <div class="sm:mr-64">
      <h1>โต๊ะอาหาร</h1>
      <div class="grid grid-cols-4 gap-1 md:grid-cols-8">
        <button v-for="table in tables" :key="table.tableId"
          class="max-w-30 flex h-28 w-full flex-col items-center justify-center" :class="[getTableClass(table)]"
          @click="selectTable(table)">
          <img src="/table.png" class="h-14 w-14" />
          <p class="text-sm">โต๊ะ {{ table.tableName }}</p>
          <p class="text-sm">{{ table.seat }} ที่นั่ง</p>
        </button>
      </div>
    </div>
    <aside
      class="fixed right-0 top-0 z-40 ml-2 hidden h-screen w-64 bg-green-900 py-2 text-white transition-transform sm:translate-x-0 md:block"
      aria-label="Sidebar">

      <div v-if="selectedTable" class="bg-white p-2 md:p-3 rounded shadow-md max-w-sm mx-auto">
  <p class="text-2xl text-center text-green-600">โต๊ะ {{ selectedTable.tableName }}</p>
  <div class="ms-auto grid justify-center gap-1 mt-2">
    <button
      v-if="
        selectedTable.status !== 'isReserved' &&
        selectedTable.status !== 'isUnavailable'
      "
      @click="openTable"
      class="bg-green-600 text-white text-lg py-1 px-2 rounded"
    >
      จองโต๊ะอาหาร
    </button>
    <button
      v-if="selectedTable.status === 'isOpen'"
      @click="makeUnavailable"
      class="bg-red-600 text-white text-lg py-1 px-2 rounded"
    >
      ใช้การไม่ได้
    </button>
  </div>
  <div v-if="selectedTable.status === 'isReserved'" class="ms-auto grid justify-center gap-1 mt-2">
    <button @click="showPhoto" class="bg-blue-600 text-white text-lg py-1 px-2 rounded">
      Show photo
    </button>
    <button @click="" class="bg-yellow-600 text-white text-lg py-1 px-2 rounded">
      สั้งอาหาร
    </button>
    <button @click="closeTable" class="bg-red-600 text-white text-lg py-1 px-2 rounded">
      ปิดโต๊ะอาหาร
    </button>
  </div>
  <div v-if="selectedTable.status === 'isUnavailable'" class="ms-auto grid justify-center gap-1 mt-2">
    <button @click="makeAvailable" class="bg-green-600 text-white text-lg py-1 px-2 rounded">
      Make available
    </button>
  </div>
</div>





      <div v-else class="text-center">กรุณาเลือกโต๊ะอาหาร</div>
    </aside>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref } from "vue";

const tables = ref([
  {
    tableId: "1",
    tableName: "1",
    status: "isOpen",
    seat: 4,
  },
  {
    tableId: "2",
    tableName: "2",
    status: "isOpen",
    seat: 4,
  },
  {
    tableId: "3",
    tableName: "3",
    status: "isOpen",
    seat: 4,
  },
  {
    tableId: "4",
    tableName: "4",
    status: "isReserved",
    seat: 4,
  },
  {
    tableId: "5",
    tableName: "5",
    status: "isReserved",
    seat: 4,
  },
  {
    tableId: "6",
    tableName: "6",
    status: "isUnavailable",
    seat: 4,
  },
  {
    tableId: "7",
    tableName: "7",
    status: "isUnavailable",
    seat: 4,
  },
  {
    tableId: "8",
    tableName: "8",
    status: "isUnavailable",
    seat: 4,
  },
  {
    tableId: "9",
    tableName: "9",
    status: "isUnavailable",
    seat: 4,
  },
  {
    tableId: "10",
    tableName: "10",
    status: "isUnavailable",
    seat: 4,
  },
]);

const selectedTable = ref(null);

const selectTable = (table: null) => {
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
    return "bg-green-600 hover:bg-green-800"; // Gray background when the table is reserved
  } else {
    return "bg-gray-600 hover:bg-gray-800 "; // Green background when the table is available
  }
};
</script>

<style scoped>
button {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
