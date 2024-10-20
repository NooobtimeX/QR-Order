<template>
  <div>
    <h1 class="pb-6 text-center text-5xl font-bold text-orange-500">Bills</h1>

    <!-- Bills Table -->
    <table class="min-w-full table-auto border-collapse rounded-md">
      <thead class="bg-orange-500 text-white">
        <tr>
          <th class="px-4 py-2 text-center text-lg font-medium">Bill ID</th>
          <th class="px-4 py-2 text-center text-lg font-medium">
            Total Amount
          </th>
          <th class="px-4 py-2 text-center text-lg font-medium">
            Payment Status
          </th>
          <th class="px-4 py-2 text-center text-lg font-medium">Created At</th>
        </tr>
      </thead>
      <tbody class="bg-gray-100 text-black">
        <tr
          v-for="bill in bills"
          :key="bill.id"
          class="cursor-pointer border-b border-gray-200 transition duration-200 hover:bg-gray-200"
          @click="openBillDetails(bill.id)"
        >
          <td class="px-4 py-2 text-center text-base">{{ bill.id }}</td>
          <td class="px-4 py-2 text-center text-base">
            {{ bill.totalAmount }} ฿
          </td>
          <td class="px-4 py-2 text-center text-base">
            {{ bill.paymentStatus }}
          </td>
          <td class="px-4 py-2 text-center text-base">
            {{ new Date(bill.createdAt).toLocaleString() }}
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Bill Details Modal -->
    <div
      v-if="isModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="w-64 rounded-lg bg-white p-4 text-black">
        <h2 class="pb-4 text-center text-2xl font-bold">Bill Details</h2>
        <div v-if="billDetails">
          <p><strong>Bill ID:</strong> {{ billDetails.id }}</p>
          <p><strong>Total Amount:</strong> {{ billDetails.totalAmount }} ฿</p>
          <p>
            <strong>Payment Status:</strong> {{ billDetails.paymentStatus }}
          </p>
          <p>
            <strong>Created At:</strong>
            {{ new Date(billDetails.createdAt).toLocaleString() }}
          </p>

          <h3 class="mb-2 mt-4 text-xl font-bold">Orders</h3>
          <ul>
            <li
              v-for="order in billDetails.orderMenus"
              :key="order.id"
              class="mb-2 rounded-lg border border-gray-300 bg-gray-100 p-2"
            >
              <p><strong>Menu Name:</strong> {{ order.name }}</p>
              <p><strong>Quantity:</strong> {{ order.quantity }}</p>
              <p><strong>Total Price:</strong> {{ order.totalPrice }} ฿</p>
              <p><strong>Options:</strong></p>
              <ul class="ml-4">
                <li v-for="option in order.orderOptions" :key="option.id">
                  {{ option.name }}: {{ option.selectedChoice }} ({{
                    option.choicePrice
                  }}
                  ฿)
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <!-- Close Modal Button -->
        <button
          @click="closeModal"
          class="mt-4 w-full rounded-xl bg-red-500 p-2 text-white hover:bg-red-700"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

// Bills data
const bills = ref([]);
const billDetails = ref(null);
const isModalOpen = ref(false);

// Fetch branchId from localStorage or set it manually
const branchId = localStorage.getItem("branchId") || 1;

// Fetch all bills for the branch
const fetchBills = async () => {
  try {
    const response = await axios.post("/api/restaurant/bills", { branchId });
    bills.value = response.data;
  } catch (error) {
    console.error("Failed to fetch bills", error);
  }
};

// Fetch bill details when a bill is selected
const fetchBillDetails = async (billId) => {
  try {
    const response = await axios.post(`/api/restaurant/bills/details`, {
      billId,
      branchId,
    });
    billDetails.value = response.data;
  } catch (error) {
    console.error("Failed to fetch bill details", error);
  }
};

// Open bill details modal
const openBillDetails = (billId) => {
  isModalOpen.value = true;
  fetchBillDetails(billId); // Fetch the bill details and show the modal
};

// Close the modal
const closeModal = () => {
  isModalOpen.value = false;
  billDetails.value = null; // Reset bill details when closing
};

onMounted(() => {
  fetchBills();
});
</script>
