<template>
  <NuxtLayout name="staff">
    <h1 class="m-2 text-center font-bold">TABLE</h1>
    <div class="mx-auto w-full px-3">
      <table class="w-full border-collapse bg-white shadow-md">
        <thead>
          <tr class="bg-green-600">
            <th>Table</th>
            <th>Seats</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(table, index) in tables"
            :key="index"
            class="border-t transition duration-150"
          >
            <td>
              <span v-if="index !== editedIndex">{{ table.number }}</span>
              <input
                v-if="index === editedIndex"
                v-model="editedTable.number"
                type="text"
                @keyup.enter="updateTable"
              />
            </td>
            <td>
              <span v-if="index !== editedIndex">{{ table.seats }}</span>
              <input
                v-if="index === editedIndex"
                v-model="editedTable.seats"
                type="text"
                @keyup.enter="updateTable"
              />
            </td>
            <td>
              <button
                v-if="table.status === 'closed'"
                @click="openTable(index)"
              >
                Open Table
              </button>
              <button v-else @click="closeTable(index)">Close Table</button>
              <button v-if="table.status === 'open'" @click="showQRCode(index)">
                Show QR Code
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { ref } from "vue";

const tables = ref([
  { number: "A", seats: "4", status: "closed" },
  { number: "B", seats: "4", status: "closed" },
  { number: "C", seats: "4", status: "closed" },
  { number: "D", seats: "4", status: "closed" },
  { number: "E", seats: "4", status: "closed" },
  { number: "F", seats: "4", status: "closed" },
  { number: "G", seats: "4", status: "closed" },
  { number: "H", seats: "4", status: "closed" },
  { number: "I", seats: "4", status: "closed" },
  { number: "J", seats: "4", status: "closed" },
  { number: "K", seats: "4", status: "closed" },
]);

const editedIndex = ref(-1);
const editedTable = ref({ number: "", seats: "", status: "closed" });

const openTable = (index) => {
  tables.value[index].status = "open";
};

const closeTable = (index) => {
  tables.value[index].status = "closed";
};

const showQRCode = (index) => {
  // Your logic to show the QR code popup goes here
  // You can use a library like 'qrcode.vue' or create your own popup component
};

// Add other functions as needed
</script>

<style></style>
