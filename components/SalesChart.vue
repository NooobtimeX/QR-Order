<template>
  <div class="mt-5">
    <div class="flex items-center justify-start">
      <div class="flex flex-col items-start">
        <div class="mb-3 font-bold">ยอดขาย</div>

        <select v-model="selectedYear" class="border p-2">
          <option v-for="year in years" :key="year" :value="year">
            {{ year }}
          </option>
        </select>
      </div>
    </div>

    <!-- Chart container -->
    <div class="mt-5 rounded-lg border md:p-3">
      <Line :data="salesData" :options="options" />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "vue-chartjs";
import { ref, computed } from "vue";
Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

// Refs and computed properties
const options = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      intersect: false,
    },
  },
  scales: {
    y: {
      grid: {
        color: "#E2E8F0",
      },
      ticks: {
        color: "#94A3B8",
      },
    },
    x: {
      grid: {
        color: "#E2E8F0",
      },
      ticks: {
        color: "#94A3B8",
      },
    },
  },
}));

const years = ref<number[]>([2021, 2022, 2023, 2024]);
const selectedYear = ref<number>(years.value[0]);

const salesData = computed(() => ({
  labels: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  datasets: [
    {
      label: "Sales",
      backgroundColor: "#FFFFFF",
      tension: 0.4,
      borderColor: "#0F803D",
      borderWidth: 2,
      pointBackgroundColor: "#0F803D",
      data: getSalesData(selectedYear.value),
    },
  ],
}));

// Function to get sales data based on selected year
function getSalesData(year: number): number[] {
  // Example data, replace with actual data retrieval logic
  switch (year) {
    case 2021:
      return [
        1000, 1100, 1200, 1000, 1400, 1200, 1300, 1400, 1500, 1600, 1700, 1500,
      ];
    case 2022:
      return [
        1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000,
      ];
    default:
      return [];
  }
}
</script>
