<template>
  <NuxtLayout name="customer">
    <div>
      <section class="overflow-hidden rounded-lg border text-gray-700">
        <div class="container mx-auto p-4">
          <div class="mx-auto grid grid-cols-1 gap-x-8 md:grid-cols-2 lg:w-4/5">
            <img
              alt="ecommerce"
              class="m-auto w-full rounded-lg border border-gray-200 object-cover object-center"
              :src="menuItem.img"
            />
            <div class="mt-4 lg:mt-0 lg:p-2">
              <h1 class="mb-2 text-left font-semibold tracking-wide">
                {{ menuItem.name }}
              </h1>
              <span class="font-bold">{{ totalPrice }} ฿</span>

              <div>
                <div
                  v-for="(option, index) in menuItem.options"
                  :key="index"
                  class="mb-1"
                >
                  <span class="mr-3">{{ option.optionName }}</span>
                  <div class="flex flex-wrap">
                    <label
                      v-for="(subOption, subIndex) in option.choices"
                      :key="subIndex"
                      class="mb-1 mr-2 flex cursor-pointer items-center justify-center rounded-lg border border-green-600 p-2 text-sm text-green-700 hover:shadow-lg"
                      :class="{
                        'bg-green-600 text-white':
                          selectedOptions[index] === subIndex,
                      }"
                    >
                      <input
                        v-model="selectedOptions[index]"
                        type="radio"
                        :name="String(index)"
                        :value="subIndex"
                        class="hidden"
                      />
                      <span>
                        {{ subOption.name }} {{ subOption.price }} ฿
                      </span>
                    </label>
                  </div>
                </div>
              </div>
              <div class="flex items-center space-x-2">
                Quantity:
                <IconDecrease
                  class="disabled:opacity-50"
                  :disabled="quantity <= 1"
                  @click="decrementQuantity"
                />

                <div class="rounded-lg px-3 py-1">{{ quantity }}</div>
                <IconIncrease @click="incrementQuantity" />
              </div>
            </div>
          </div>
          <div class="mt-4">
            <label for="message" class="mb-2 block text-sm font-medium"
              >NOTE</label
            >
            <textarea
              id="message"
              rows="4"
              class="block w-full rounded-lg border p-2.5 text-sm"
              placeholder=""
            />
          </div>
          <div class="mt-6 flex">
            <button
              class="flex w-full justify-center rounded disabled:opacity-50"
              @click="addToCart"
            >
              ADD TO CART
            </button>
            <button
              class="flex w-full justify-center rounded disabled:opacity-50"
              @click="buy"
            >
              ORDER
            </button>
          </div>
        </div>
      </section>
    </div></NuxtLayout
  >
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

const menuItem = {
  name: "Burger",
  price: 40,
  img: "/menu/burger.jpg",
  options: [
    {
      optionName: "Size and Extras",
      choices: [
        { name: "Small", price: 5 },
        { name: "Medium", price: 10 },
        { name: "Large", price: 15 },
      ],
    },
    {
      optionName: "Add-ons",
      choices: [
        { name: "Extra Cheese", price: 3 },
        { name: "Bacon", price: 6 },
        { name: "Avocado", price: 9 },
      ],
    },
  ],
};

const selectedOptions = ref(Array(menuItem.options.length).fill(0));
const quantity = ref(1);

const addToCart = () => {
  window.location.replace("/customer");
};
const buy = () => {
  window.location.replace("/customer/cart");
};
const incrementQuantity = () => {
  quantity.value++;
};

const decrementQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--;
  }
};

const totalPrice = computed(() => {
  let total = menuItem.price;
  menuItem.options.forEach((option, index) => {
    const optionIndex = selectedOptions.value[index];
    if (optionIndex !== undefined) {
      total += option.choices[optionIndex].price;
    }
  });
  return total * quantity.value;
});

onMounted(() => {
  selectedOptions.value = Array(menuItem.options.length).fill(0);
});
</script>
