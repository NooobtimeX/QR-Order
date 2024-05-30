<template>
  <div class="w-full">
    <div class="mb-4 rounded-lg bg-white p-6 shadow-md">
      <table class="w-full">
        <thead>
          <tr>
            <th class="text-left font-semibold">อาหาร</th>
            <th class="text-left font-semibold">ราคา</th>
            <th class="text-left font-semibold">จำนวน</th>
            <th class="text-left font-semibold">ทั้งหมด</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in products" :key="index">
            <td class="py-4">
              <div class="grid md:grid-cols-2">
                <img
                  class="mr-4 h-16 w-16"
                  :src="product.image"
                  alt="Product image"
                />
                <span class="m-auto font-semibold">{{ product.name }}</span>
              </div>
            </td>
            <td class="py-4">{{ product.price }} ฿</td>
            <td class="py-4">
              <div class="flex items-center">
                <button class="w-10">-</button>
                <span class="w-8 text-center">{{ product.quantity }}</span>
                <button class="w-10">+</button>
              </div>
            </td>
            <td class="py-4">{{ product.total }} ฿</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup lang="ts">
const products = [
  {
    name: "Burger",
    image: "/menu/burger.jpg",
    price: "150",
    quantity: 1,
    total: "150",
  },
];
</script>
