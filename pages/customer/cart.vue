<template>
  <NuxtLayout name="customer">
    <div>
      <div v-if="cart.length > 0" class="w-full rounded-xl border bg-white p-2">
        <h1 class="text-3xl font-bold">CART</h1>
        <div class="mb-4">
          <div
            v-for="(product, index) in cart"
            :key="index"
            class="flex items-center border-b py-4 last:border-none"
          >
            <img
              class="mr-4 h-16 w-16 rounded-xl object-cover"
              :src="product.image"
              alt="Product image"
            />
            <div class="flex-1">
              <h2 class="text-lg font-semibold">{{ product.name }}</h2>
              <p class="text-gray-500">
                {{ truncateDescription(product.description) }}
              </p>
              <p class="text-gray-500">{{ product.price }} ฿</p>
            </div>
            <div class="flex items-center">
              <button
                class="flex h-8 w-8 items-center justify-center"
                @click="updateQuantity(index, -1)"
              >
                -
              </button>
              <span class="w-8 text-center text-gray-700">{{
                product.quantity
              }}</span>
              <button
                class="flex h-8 w-8 items-center justify-center"
                @click="updateQuantity(index, 1)"
              >
                +
              </button>
            </div>
          </div>
        </div>
        <div class="my-auto mb-4 flex justify-between text-lg font-bold">
          <span>Total {{ cartTotal }} ฿</span>
        </div>
        <div class="grid gap-2 md:grid-cols-2">
          <button class="py-3 text-lg text-white" @click="orderMore">
            ORDER MORE
          </button>
          <button class="py-3 text-lg text-white" @click="confirmOrder">
            ORDER
          </button>
        </div>
      </div>
      <div class="my-4">
        <div class="rounded-xl border bg-white p-4">
          <div class="mb-6 flex items-center justify-between">
            <h2 class="text-2xl font-bold">ORDER HISTORY</h2>
          </div>
          <table class="w-full table-auto border-collapse">
            <thead>
              <tr>
                <th class="border p-3">MENU</th>
                <th class="border p-3">PRICE</th>
                <th class="border p-3">STATUS</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in buy" :key="index">
                <td class="border">{{ item.name }}</td>
                <td class="border text-center">{{ item.price }} ฿</td>
                <td class="border text-right">
                  <span
                    :class="{
                      'bg-green-300 text-green-900':
                        item.status === 'เสร็จสิ้น',
                      'bg-yellow-300 text-yellow-900':
                        item.status === 'กำลังจัดเตรียม',
                      'bg-red-300 text-red-900': item.status === 'ยกเลิก',
                    }"
                    class="rounded-xl px-2 py-1 text-sm font-medium"
                    >{{ item.status }}</span
                  >
                </td>
              </tr>
            </tbody>
          </table>
          <span class="text-right font-bold">Total {{ buyTotal }} ฿</span>
        </div>
      </div>
    </div></NuxtLayout
  >
</template>
<script setup lang="ts">
import { ref, computed } from "vue";

const truncateDescription = (description: string, maxLength: number = 10) => {
  if (description.length <= maxLength) return description;
  return `${description.slice(0, maxLength)}...`;
};

const orderMore = () => {
  window.location.replace("/customer/");
};
const confirmOrder = () => {
  window.location.replace("/customer/cart");
};

const updateQuantity = (index: number, amount: number) => {
  const newQuantity = cart.value[index].quantity + amount;
  if (newQuantity < 1) {
    cart.value.splice(index, 1);
  } else {
    cart.value[index].quantity = newQuantity;
  }
};

const buy = ref([
  {
    name: "ไก่ทอด",
    description: "Deep fried chicken",
    price: 200,
    status: "จัดส่งแล้ว",
    quantity: 1,
  },
  {
    name: "ไอศกรีม",
    description: "Vanilla ice cream",
    price: 200,
    status: "กำลังจัดเตรียม",
    quantity: 1,
  },
  {
    name: "ก๊วยเตี๋ยว",
    description: "Noodle soup",
    price: 200,
    status: "ยกเลิก",
    quantity: 1,
  },
]);

const cart = ref([
  {
    name: "Burger",
    description: "Extra cheese",
    image: "/menu/burger.jpg",
    price: 50,
    quantity: 1,
  },
  {
    name: "Burger",
    description:
      "Double beef patty with crispy bacon, lettuce, tomato, and mayo",
    image: "/menu/burger.jpg",
    price: 150,
    quantity: 2,
  },
]);

const buyTotal = computed(() => {
  return buy.value.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
});

const cartTotal = computed(() =>
  cart.value.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0,
  ),
);
</script>
