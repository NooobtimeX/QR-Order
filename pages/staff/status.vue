<template>
  <NuxtLayout name="staff">
    <div class="container mx-auto">
      <h1 class="mb-8">STATUS</h1>
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-green-700">
          <tr>
            <th>โต๊ะอาหาร</th>
            <th>อาหาร</th>
            <th>สถานะ</th>
            <th>เวลา</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 bg-white">
          <tr
            v-for="(order, index) in orders"
            :key="index"
            class="border-t transition duration-150"
          >
            <td class="whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ order.table }}</div>
            </td>
            <td class="whitespace-nowrap text-center">
              <div class="text-sm text-gray-900">{{ order.name }}</div>
            </td>
            <td class="text-center">
              <div class="flex h-full items-center justify-center">
                <span
                  :class="{
                    'inline-block rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-800':
                      order.status === 'เสร็จสิ้น',
                    'inline-block rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-800':
                      order.status === 'ยกเลิก',
                    'inline-block rounded-full bg-yellow-100 px-2 py-1 text-xs font-semibold text-yellow-800':
                      order.status !== 'เสร็จสิ้น' && order.status !== 'ยกเลิก',
                  }"
                >
                  {{ order.status }}
                </span>
                <button class="ml-2 w-fit rounded-xl bg-blue-500 p-1">
                  <img height="30px" width="30px" src="/icon/edit.png" />
                </button>
              </div>
            </td>
            <td class="whitespace-nowrap px-6 py-4">
              <div class="text-sm text-gray-900">{{ order.time }}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </NuxtLayout>
</template>

<script setup>
const orders = [
  { table: "1", name: "Order 1", status: "เสร็จสิ้น", time: "10:00 AM" },
  { table: "3", name: "Order 2", status: "กำลังจัดเตรียม", time: "11:30 AM" },
  { table: "5", name: "Order 3", status: "ยกเลิก", time: "1:45 PM" },
];
</script>
