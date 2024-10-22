<template>
  <div>
    <h1 class="pb-6 text-center text-5xl font-bold text-orange-500">
      Notifications for Tables
    </h1>

    <!-- Display tables with notifications in a table format -->
    <div v-if="tablesWithNotifications.length > 0" class="flex justify-center">
      <table class="w-full max-w-4xl table-auto rounded-lg bg-white shadow-md">
        <thead class="bg-orange-500 text-white">
          <tr>
            <th class="px-4 py-2 text-center text-lg">Table Name</th>
            <th class="px-4 py-2 text-center text-lg">Notification</th>
            <th class="px-4 py-2 text-center text-lg">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="table in tablesWithNotifications"
            :key="table.id"
            class="hover:bg-gray-100"
          >
            <td class="border px-4 py-2 text-gray-700">{{ table.name }}</td>
            <td class="border px-4 py-2 text-gray-700">
              {{ table.notification }}
            </td>
            <td class="border px-4 py-2 text-center">
              <button
                class="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-700"
                @click="selectTable(table)"
              >
                View
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- No notifications available -->
    <div v-else class="mt-6 text-center text-gray-500">
      No notifications available.
    </div>

    <!-- Notification Details Modal -->
    <div
      v-if="selectedTable"
      class="fixed inset-0 z-20 flex items-center justify-center bg-gray-800 bg-opacity-50"
    >
      <div class="w-96 rounded-lg bg-white p-6 shadow-lg">
        <h2 class="mb-4 text-center text-2xl font-bold text-gray-800">
          Notification for {{ selectedTable.name }}
        </h2>
        <p class="mb-4 text-lg text-gray-600">
          {{ selectedTable.notification }}
        </p>

        <!-- Accept Button -->
        <button
          @click="acceptNotification"
          class="mb-4 w-full rounded-lg bg-green-500 px-4 py-2 text-lg text-white hover:bg-green-700"
        >
          Accept & Clear Notification
        </button>

        <!-- Close Button -->
        <button
          @click="closeModal"
          class="w-full rounded-lg bg-red-500 px-4 py-2 text-lg text-white hover:bg-red-700"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import axios from "axios";

const tables = ref([]);
const selectedTable = ref(null);

// Fetch tables with notifications
const fetchTablesWithNotifications = async () => {
  const branchId = localStorage.getItem("branchId"); // Assuming branchId is stored in localStorage
  const response = await axios.get(`/api/tablesWithNotifications/${branchId}`);
  tables.value = response.data.body || [];
};

// Select table to view notification details
const selectTable = (table) => {
  selectedTable.value = table;
};

// Accept notification and clear it
const acceptNotification = async () => {
  if (!selectedTable.value) return;

  const tableId = selectedTable.value.id;
  await axios.post("/api/clearNotification", { tableId });

  // Clear the notification locally
  selectedTable.value.notification = "";
  // Fetch updated table list
  await fetchTablesWithNotifications();
  // Close the modal
  selectedTable.value = null;
};

const closeModal = () => {
  selectedTable.value = null;
};

// Fetch tables every 5 seconds
onMounted(() => {
  fetchTablesWithNotifications();
  const intervalId = setInterval(fetchTablesWithNotifications, 5000);

  // Clear the interval when the component is unmounted
  onUnmounted(() => {
    clearInterval(intervalId);
  });
});

const tablesWithNotifications = computed(() => {
  return tables.value.filter(
    (table) => table.notification && table.notification.length > 0,
  );
});
</script>
