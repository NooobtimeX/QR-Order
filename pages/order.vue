<template>
  <NuxtLayout>
    <div class="sm:mr-64">
      <h1 class="mb-8">ออเดอร์</h1>
      <table class="min-w-full">
        <thead class="bg-green-700">
          <tr>
            <th>โต๊ะ</th>
            <th>เวลา</th>
            <th>สถานะ</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 bg-white">
          <tr
            v-for="(order, index) in sortedOrders"
            :key="index"
            @click="selectOrder(order)"
            class="cursor-pointer border-t transition duration-150"
          >
            <td class="whitespace-nowrap text-center">
              <span class="text-sm">{{ order.table }}</span>
            </td>
            <td class="whitespace-nowrap">
              <span class="text-sm">{{ order.time }}</span>
            </td>
            <td class="whitespace-nowrap">
              <span
                class="rounded-xl px-2 py-1 text-sm"
                :class="{
                  'bg-green-300 text-green-900': order.status === 'เสร็จสิ้น',
                  'bg-yellow-300 text-yellow-900':
                    order.status === 'กำลังจัดเตรียม',
                  'bg-red-300 text-red-900': order.status === 'ยกเลิก',
                }"
              >
                {{ order.status }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </NuxtLayout>
  <aside
    class="fixed right-0 top-0 z-40 h-screen w-64 bg-green-900 py-2 text-white transition-transform sm:translate-x-0 md:block"
    aria-label="Sidebar"
  >
    <div v-if="selectedOrder" class="p-4">
      <h2 class="text-lg font-bold text-white">
        โต๊ะ {{ selectedOrder.table }} เวลา {{ selectedOrder.time }}
      </h2>
      <select
        v-model="selectedOrder.status"
        @change="updateOrderStatus"
        class="rounded-xl text-black"
      >
        <option value="เสร็จสิ้น">เสร็จสิ้น</option>
        <option value="กำลังจัดเตรียม">กำลังจัดเตรียม</option>
        <option value="ยกเลิก">ยกเลิก</option>
      </select>
      <div
        v-for="(item, index) in selectedOrder.items || []"
        :key="index"
        class="transition duration-150"
      >
        {{ item.name }} {{ item.price }}
        <div
          v-for="(option, index) in item.options"
          :key="index"
          class="-mt-2 text-gray-300"
        >
          &nbsp;{{ option }}
        </div>
      </div>
    </div>
    <div v-else class="p-4">
      <h2 class="text-lg font-bold">Order Status</h2>
      <p>No order selected</p>
    </div>
  </aside>
</template>

<script setup>
import { ref, computed } from "vue";

const orders = ref([
  {
    table: "1",
    status: "เสร็จสิ้น",
    items: [
      { name: "Pizza", options: ["XXL", "more ch"], price: 100 },
      { name: "Pizza B", options: ["XL"], price: 90 },
    ],
    time: "10:00 AM",
  },
  { table: "3", status: "กำลังจัดเตรียม", time: "11:30 AM" },
  { table: "5", status: "ยกเลิก", time: "1:45 PM" },
]);

const selectedOrder = ref(null);

const selectOrder = (order) => {
  selectedOrder.value = order;
};

const updateOrderStatus = () => {
  const orderIndex = orders.value.findIndex(
    (o) =>
      o.table === selectedOrder.value.table &&
      o.time === selectedOrder.value.time,
  );
  if (orderIndex !== -1) {
    orders.value[orderIndex].status = selectedOrder.value.status;
  }
};

const sortedOrders = computed(() => {
  return [...orders.value].sort((a, b) => {
    const order = { กำลังจัดเตรียม: 1, เสร็จสิ้น: 2, ยกเลิก: 3 };
    return order[a.status] - order[b.status];
  });
});
</script>
