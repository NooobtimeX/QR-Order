<template>
  <NuxtLayout name="owner">
    <div>
      <h1>SALES REVENUE</h1>
      <div class="date-inputs m-auto items-center justify-end md:flex">
        <div class="m-1 items-center md:flex">
          <label for="start-date" class="whitespace-nowrap">START END:</label>
          <input
            type="date"
            v-model="startDate"
            id="start-date"
            class="border"
          />
        </div>
        <div class="m-1 items-center md:flex">
          <label for="end-date" class="whitespace-nowrap">END DATE:</label>
          <input type="date" v-model="endDate" id="end-date" class="border" />
        </div>
        <IconFilter @click="filterSales" />
      </div>

      <div class="m-auto"></div>

      <table class="my-2 w-full table-auto">
        <thead>
          <tr class="bg-green-600">
            <th>DATE</th>
            <th>NAME</th>
            <th>QUANTITY</th>
            <th>PRICE</th>
            <th>TOTAL</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in filteredSales"
            :key="index"
            class="border-t transition duration-150"
          >
            <td>{{ item.date }}</td>
            <td>{{ item.menuName }}</td>
            <td>{{ item.qty }}</td>
            <td>{{ item.price }}</td>
            <td>{{ item.qty * item.price }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { ref } from "vue";

const startDate = ref("");
const endDate = ref("");

const sales = [
  { menuName: "Burger", qty: 10, price: 5, date: "2024-05-01" },
  { menuName: "Pizza", qty: 5, price: 8, date: "2024-05-02" },
  { menuName: "Salad", qty: 15, price: 3, date: "2024-05-03" },
];
const filteredSales = ref([]);

const filterSales = () => {
  if (!startDate.value || !endDate.value) {
    alert("Please select both start and end dates.");
    return;
  }
  if (startDate.value > endDate.value) {
    [startDate.value, endDate.value] = [endDate.value, startDate.value];
  }
  filteredSales.value = sales.filter((sale) => {
    return sale.date >= startDate.value && sale.date <= endDate.value;
  });
};

filteredSales.value = sales;
</script>
