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
    <table class="min-w-full bg-gray-200">
      <thead>
        <tr>
          <th>Table</th>
          <th>Menu</th>
          <th>Date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="order in filteredOrders"
          :key="order.table + order.time"
          @click="selectOrder(order)"
        >
          <td>{{ order.table }}</td>
          <td>{{ order.menuName }}</td>
          <td>{{ formatDate(order.time) }}</td>
          <td>
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
    <div class="w-64 rounded-lg bg-green-05 p-4 text-white">
      <h2 class="text-center">โต๊ะ {{ selectedOrder.table }}</h2>
      <select
        v-model="selectedOrder.status"
        @change="updateOrderStatus"
        class="mb-1 w-full rounded-xl"
      >
        <option value="เสร็จสิ้น">เสร็จสิ้น</option>
        <option value="pending">pending</option>
        <option value="ยกเลิก">ยกเลิก</option>
      </select>

      <!-- Display menu name and price -->
      <div v-if="selectedOrder.menuName && selectedOrder.menuPrice">
        <div class="font-bold">เมนู: {{ selectedOrder.menuName }}</div>
        <div>ราคา: {{ selectedOrder.menuPrice }}฿</div>
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

      <button @click="closePopup" class="mt-2 w-full rounded-xl bg-red-600 p-2">
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
  name: string;
  options: OrderOption[];
  price: number;
}

interface Order {
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
    }); // Send branchId in the body
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
};

const updateOrderStatus = () => {
  if (selectedOrder.value) {
    const order = orders.value.find(
      (o) =>
        o.table === selectedOrder.value!.table &&
        o.time === selectedOrder.value!.time,
    );
    if (order) {
      order.status = selectedOrder.value.status;
      sortOrders();
    }
  }
};

const sortOrders = () => {
  const orderPriority: Record<OrderStatus, number> = {
    pending: 1,
    เสร็จสิ้น: 2,
    ยกเลิก: 3,
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
    "bg-green-300 text-green-900": status === "finish",
    "bg-yellow-300 text-yellow-900": status === "pending",
    "bg-red-300 text-red-900": status === "cancel",
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
