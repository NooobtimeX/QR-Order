<template>
  <div v-if="orders.length > 0">
    <h2 class="mt-4 text-2xl font-bold">Orders</h2>
    <div
      v-for="(order, index) in orders"
      :key="index"
      class="my-2 rounded-lg border-2 border-gray-300 bg-gray-100 p-4 shadow-lg"
    >
      <h3 class="font-semibold">Order: {{ order.name }}</h3>
      <p>Quantity: {{ order.quantity }}</p>
      <p>Total Price: {{ order.totalPrice }} ฿</p>
      <div v-if="order.options.length > 0">
        <h4>Options:</h4>
        <ul>
          <li v-for="(option, idx) in order.options" :key="idx">
            {{ option.optionName }}: {{ option.selectedChoice }} (+{{
              option.choicePrice
            }}
            ฿)
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router"; // Import useRoute to get route parameters

// Define the type for an order
interface Order {
  name: string;
  quantity: number;
  totalPrice: number;
  options: Array<{
    optionName: string;
    selectedChoice: string;
    choicePrice: number;
  }>;
}

const orders = ref<Order[]>([]);

// Get the route parameter 'table' which contains the qrCodeId
const route = useRoute();
const qrCodeId = route.params.table as string; // Capture 'table' parameter as qrCodeId

const fetchOrders = async () => {
  try {
    const response = await axios.post("/api/user/orders", { qrCodeId });
    if (response.status === 200 && response.data?.data?.orders) {
      orders.value = response.data.data.orders;
    }
  } catch (error) {
    console.error("Error fetching orders:", error);
  }
};

onMounted(() => {
  fetchOrders();
});
</script>
