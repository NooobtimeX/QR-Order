<template>
  <div class="p-6">
    <h1 class="pb-6 text-center text-4xl font-bold text-orange-500">
      Dashboard
    </h1>

    <div class="py-5">
      <!-- Status Cards -->
      <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="sale in salesData"
          :key="sale.label"
          class="rounded-lg border border-orange-500 bg-white p-6 shadow-md transition-transform duration-300 hover:scale-105"
        >
          <div class="flex items-center justify-between">
            <p class="text-sm font-medium text-gray-700">{{ sale.label }}</p>
          </div>
          <p class="mt-2 text-2xl font-extrabold text-gray-900">
            {{ sale.amount }}
          </p>
          <p class="mt-1 text-sm text-orange-600">{{ sale.increase }}</p>
        </div>
      </div>

      <!-- Sales Chart -->
      <div class="mt-8">
        <div class="mb-5 flex items-center justify-between">
          <div class="flex flex-col">
            <h3 class="text-lg font-bold text-gray-800">ยอดขาย</h3>
            <select
              v-model="selectedYear"
              @change="fetchChartData"
              class="mt-2 w-40 rounded border border-gray-300 p-2 text-gray-700 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option v-for="year in years" :key="year" :value="year">
                {{ year }}
              </option>
            </select>
          </div>
        </div>

        <!-- Chart Container -->
        <div class="rounded-lg border border-gray-200 p-4 shadow-md">
          <Line :data="chartData" :options="chartOptions" class="h-64" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Line } from "vue-chartjs";
import { ref, computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
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

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const route = useRoute();
const branchId = ref(route.params.branchId);

const salesData = ref([
  {
    label: "ยอดขายประจำเดือน",
    amount: "$45,231.89",
    increase: "20% มากกว่าเดือนที่แล้ว",
  },
  {
    label: "ยอดขายประจำวัน",
    amount: "$12,231",
    increase: "13.2% มากกว่าเมื่อวาน",
  },
]);

const years = ref<number[]>([2021, 2022, 2023, 2024]);
const selectedYear = ref<number>(years.value[0]);

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: { intersect: false },
  },
  scales: {
    y: {
      grid: { color: "#E2E8F0" },
      ticks: { color: "#94A3B8" },
    },
    x: {
      grid: { color: "#E2E8F0" },
      ticks: { color: "#94A3B8" },
    },
  },
}));

const chartData = ref({
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
      data: [],
    },
  ],
});

function getSalesData(year: number): number[] {
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

async function fetchChartData() {
  chartData.value.datasets[0].data = getSalesData(selectedYear.value);
}

onMounted(() => {
  fetchChartData();
});

watch(selectedYear, fetchChartData);
</script>
