<template>
  <h1>แดชบอร์ดสาขา</h1>
  <div class="py-5 lg:col-span-6">
    <!-- Status Cards -->
    <div class="grid gap-5 md:grid-cols-2">
      <div
        v-for="sale in salesData"
        :key="sale.label"
        class="bg-card rounded-lg border border-green-03 p-6"
      >
        <div class="flex items-center justify-between">
          <p class="text-sm font-medium">{{ sale.label }}</p>
        </div>
        <p class="mt-1.5 text-xl font-extrabold">{{ sale.amount }}</p>
        <p class="text-muted-foreground text-xs">{{ sale.increase }}</p>
      </div>
    </div>

    <!-- Sales Chart -->
    <div class="mt-5">
      <div class="flex items-center justify-start">
        <div class="flex flex-col items-start">
          <div class="mb-3 font-bold">ยอดขาย</div>
          <select
            v-model="selectedYear"
            @change="fetchChartData"
            class="border p-2"
          >
            <option v-for="year in years" :key="year" :value="year">
              {{ year }}
            </option>
          </select>
        </div>
      </div>

      <!-- Chart container -->
      <div class="mt-5 rounded-lg border md:p-3">
        <Line :data="chartData" :options="chartOptions" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Line } from "vue-chartjs";
import { ref, computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router"; // For dynamic route params
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

// Get branchId from the route params
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
  // You can replace this function with an API call
  chartData.value.datasets[0].data = getSalesData(selectedYear.value);

  // If using API:
  /*
  try {
    const response = await axios.get(`/api/branch/${branchId.value}/sales`, {
      params: { year: selectedYear.value },
    });
    chartData.value.datasets[0].data = response.data.salesData;
  } catch (error) {
    console.error("Error fetching sales data:", error);
  }
  */
}

onMounted(() => {
  fetchChartData();
});

watch(selectedYear, fetchChartData);
</script>
