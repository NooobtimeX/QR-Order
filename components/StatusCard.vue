<template>
  <div>
    <div class="grid gap-5 md:grid-cols-2">
      <div
        v-for="sale in salesData"
        :key="sale.label"
        class="bg-card rounded-lg border p-6"
      >
        <div class="flex items-center justify-between">
          <p class="text-sm font-medium">{{ sale.label }}</p>
        </div>
        <p class="mt-1.5 text-xl font-extrabold">{{ sale.amount }}</p>
        <p class="text-muted-foreground text-xs">{{ sale.increase }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const salesData = [
  {
    label: "ยอดขายประจำเดือน  ",
    amount: "$45,231.89",
    iconName: "heroicons:banknotes",
    increase: "20% มากกว่าเดือนที่แล้ว",
  },
  {
    label: "ยอดขายประจำวัน",
    amount: "$12,231",
    iconName: "heroicons:credit-card",
    increase: "13.2% มากกว่าเมื่อวาน",
  },
];
</script>
