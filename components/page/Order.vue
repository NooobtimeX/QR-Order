<template>
  <div>
    <h1 class="pb-6 text-center text-5xl font-bold text-orange-04">Order</h1>
    <div class="mb-4 flex flex-wrap items-center">
      <label
        v-for="status in availableStatuses"
        :key="status"
        class="mr-4 inline-flex items-center"
      >
        <input
          type="checkbox"
          v-model="selectedStatuses"
          :value="status"
          class="mr-2"
        />
        {{ status }}
      </label>
    </div>
    <table class="min-w-full rounded-md bg-gray-300">
      <thead>
        <tr>
          <th class="text-lg text-black">Table</th>
          <th class="text-lg text-black">Menu</th>
          <th class="text-lg text-black">Date</th>
          <th class="text-lg text-black">Status</th>
        </tr>
      </thead>
      <tbody class="bg-gray-200 text-black">
        <tr
          v-for="order in filteredOrders"
          :key="order.id"
          @click="selectOrder(order)"
        >
          <td class="text-base">{{ order.table }}</td>
          <td class="text-base">{{ order.menuName }}</td>
          <td class="text-base">{{ formatDate(order.time) }}</td>
          <td class="text-base">
            <span
              class="rounded-xl px-2 py-1"
              :class="statusClass(order.status)"
            >
              {{ order.status }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Popup Modal -->
  <div
    v-if="selectedOrder"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div class="w-64 rounded-lg bg-white p-4 text-black">
      {{ selectedOrder.id }}
      <h2 class="text-center">Table: {{ selectedOrder.table }}</h2>
      <select
        v-model="selectedOrder.status"
        class="mb-1 w-full rounded-xl border-2 bg-gray-200"
      >
        <option value="finish">finish</option>
        <option value="pending">pending</option>
        <option value="cancel">cancel</option>
      </select>

      <!-- Display menu name and price -->
      <div v-if="selectedOrder.menuName && selectedOrder.menuPrice">
        <div class="font-bold">
          เมนู: <span class="font-normal">{{ selectedOrder.menuName }}</span>
        </div>
        <div class="font-bold">
          ราคา: <span class="font-normal">{{ selectedOrder.menuPrice }}฿</span>
        </div>
      </div>

      <!-- Display order items and options -->
      <div
        v-for="(item, index) in selectedOrder.items || []"
        :key="index"
        class="mb-1 rounded-xl border border-gray-500 bg-green-03 p-2 transition duration-150"
      >
        <div>
          <strong>{{ item.optionName }}</strong> - {{ item.choicePrice }}฿
        </div>
        <div>• {{ item.selectedChoice }}</div>
      </div>

      <!-- OK button to update order status -->
      <button
        @click="updateOrderStatus"
        class="mt-2 w-full rounded-xl bg-blue-500 p-2 hover:bg-blue-700"
      >
        OK
      </button>

      <!-- Close button -->
      <button
        @click="closePopup"
        class="mt-2 w-full rounded-xl bg-red-500 p-2 hover:bg-red-700"
      >
        Close
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import axios from "axios";
import Cookies from "js-cookie";

type OrderStatus = "pending" | "finish" | "cancel";

interface OrderOption {
  name: string;
  selectedChoice: string;
  choicePrice: number;
}

interface OrderItem {
  selectedChoice: string;
  choicePrice: string;
  optionName: string;
  name: string;
  options: OrderOption[];
  price: number;
}

interface Order {
  id: number; // Ensure each order has a unique ID
  table: string;
  status: OrderStatus;
  items?: OrderItem[];
  time: string;
  menuName?: string;
  menuPrice?: number;
}

const orders = ref<Order[]>([]);
const availableStatuses: OrderStatus[] = ["pending", "finish", "cancel"];
const selectedOrder = ref<Order | null>(null);
const selectedStatuses = ref<OrderStatus[]>([]);

// Fetch branchId from cookies
const branchId = Cookies.get("branchId");

// Fetch orders from API on component mount
const fetchOrders = async () => {
  try {
    const response = await axios.post("/api/restaurant/getOrders", {
      branchId,
    });
    orders.value = response.data;
    console.log(orders.value); // Debug API response
    sortOrders();
  } catch (error) {
    console.error("Failed to fetch orders:", error);
  }
};

// Run on component mount
onMounted(fetchOrders);

const selectOrder = (order: Order) => {
  selectedOrder.value = order;
  console.log("Selected order ID:", order.id); // Ensure that the selected order has a valid ID
};

const updateOrderStatus = async () => {
  if (!selectedOrder.value) return;

  try {
    console.log("Updating order with ID:", selectedOrder.value.id); // Debug log
    // Call API to update the order status
    const response = await axios.post("/api/orders/updateStatus", {
      orderMenuId: selectedOrder.value.id, // Pass the ID to the backend as orderMenuId
      status: selectedOrder.value.status, // Pass the status to the backend
    });

    console.log("Order status updated successfully:", response.data);
    closePopup(); // Close the popup after a successful update
  } catch (error) {
    console.error("Failed to update order status:", error);
  }
};

const sortOrders = () => {
  const orderPriority: Record<OrderStatus, number> = {
    pending: 1,
    finish: 2,
    cancel: 3,
  };
  orders.value.sort(
    (a, b) => orderPriority[a.status] - orderPriority[b.status],
  );
};

const filteredOrders = computed(() => {
  return selectedStatuses.value.length === 0
    ? orders.value
    : orders.value.filter((order) =>
        selectedStatuses.value.includes(order.status),
      );
});

const statusClass = (status: OrderStatus) => {
  return {
    "bg-green-400 text-green-900": status === "finish",
    "bg-yellow-400 text-yellow-900": status === "pending",
    "bg-red-400 text-red-900": status === "cancel",
  };
};

const formatDate = (time: string) => {
  const date = new Date(time);
  return date.toLocaleString("th-TH", {
    dateStyle: "short",
    timeStyle: "short",
  });
};

const closePopup = () => {
  selectedOrder.value = null;
};

watch(orders, sortOrders, { deep: true });
</script>
