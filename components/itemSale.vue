<template>
  <div class="container mx-auto p-4">
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="">
          <tr>
            <th
              scope="col"
              class="px-6 py-3 text-xs font-medium uppercase tracking-wider"
            >
              เมนู
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-xs font-medium uppercase tracking-wider"
            >
              ยอดขายทั้งหมด
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 bg-white">
          <tr v-for="(item, index) in menuItems" :key="index">
            <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
              {{ item.name }}
            </td>
            <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
              {{ item.price }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuItems: [
        { name: "Burger", price: "$5.99" },
        { name: "Pizza", price: "$8.99" },
        { name: "Salad", price: "$4.99" },
        // Add more items as needed
      ],
    };
  },
};
</script>

<style scoped>
/* Optional: Additional styles */
</style>
