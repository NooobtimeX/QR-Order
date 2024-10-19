<template>
  <NuxtLayout name="customer">
    <div>
      <section
        class="overflow-hidden rounded-xl border-2 border-gray-300 text-white shadow-xl"
      >
        <div class="container mx-auto px-6 py-12">
          <div class="mx-auto grid grid-cols-1 gap-x-8 md:grid-cols-2 lg:w-4/5">
            <img
              v-if="menuItem"
              alt="ecommerce"
              class="m-auto w-full rounded-lg border border-gray-200 object-cover object-center"
              :src="menuItem?.img"
            />
            <div v-if="menuItem" class="mt-6 lg:mt-0 lg:py-6">
              <h1 class="mb-2 text-2xl font-semibold tracking-wide text-black">
                {{ menuItem?.name }}
              </h1>
              <span class="font-bold text-black">{{ totalPrice }} ฿</span>
              <div v-if="menuItem?.options">
                <div
                  v-for="(option, index) in menuItem?.options"
                  :key="index"
                  class="mb-1 font-semibold text-black"
                >
                  <span class="mr-3">{{ option.optionName }}</span>
                  <div class="flex flex-wrap">
                    <label
                      v-for="(subOption, subIndex) in option.choices"
                      :key="subIndex"
                      class="mb-1 mr-2 flex cursor-pointer items-center justify-center rounded-lg border border-green-500 p-2 text-sm text-green-700 hover:shadow-lg"
                      :class="{
                        'bg-green-500': selectedOptions[index] === subIndex,
                      }"
                    >
                      <input
                        type="radio"
                        :name="`option-${index}`"
                        :value="subIndex"
                        v-model="selectedOptions[index]"
                        class="hidden"
                      />
                      <span
                        :class="{
                          'text-white': selectedOptions[index] === subIndex,
                        }"
                      >
                        {{ subOption.name }} {{ subOption.price }} ฿
                      </span>
                    </label>
                  </div>
                </div>
              </div>
              <div class="flex items-center space-x-2">
                <button
                  class="flex items-center rounded-lg border bg-red-500 px-2 py-1 disabled:opacity-50"
                  @click="decrementQuantity"
                  :disabled="quantity <= 1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      class="text-white"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M20 12H4"
                    />
                  </svg>
                </button>
                <div class="rounded-lg px-3 py-1 text-black">
                  {{ quantity }}
                </div>
                <button
                  class="flex items-center rounded-lg border bg-green-400 px-2 py-1"
                  @click="incrementQuantity"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      class="text-white"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div v-if="menuItem" class="mt-4">
            <label for="message" class="mb-2 block text-sm font-medium"
              >NOTE</label
            >
            <textarea
              id="message"
              rows="4"
              v-model="note"
              class="block w-full rounded-lg border-2 border-gray-300 p-2.5 text-sm"
              placeholder="Leave a note"
            ></textarea>
          </div>
          <div v-if="menuItem" class="mt-6 flex">
            <button
              class="flex w-full justify-center bg-green-500 disabled:opacity-50"
              @click="addToCart"
              :disabled="!menuItem || quantity < 1"
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </section>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect } from "vue";
import { useRoute, useFetch } from "#app";

// Types
interface MenuItem {
  name: string;
  price: number;
  img: string;
  options: Array<{
    optionName: string;
    choices: Array<{
      name: string;
      price: number;
    }>;
  }>;
}

// Route parameters
const route = useRoute();
const qrCodeId = route.params.table; // Capture the table parameter
const menuId = route.params.menu; // Capture the menu parameter

// Fetch the menu item based on both qrCodeId and menuId
const { data: menuItem } = await useFetch<MenuItem | null>(
  `/api/menu/${menuId}`, // Fetch based on qrCodeId and menuId
);

// Reactive states
const selectedOptions = ref<number[]>([]);
const quantity = ref(1);
const note = ref<string>(""); // Added note field

// Initialize selected options when the menu item is fetched
watchEffect(() => {
  if (menuItem.value?.options) {
    selectedOptions.value = Array(menuItem.value.options.length).fill(0);
  }
});

// Helper function to generate a unique identifier for cart items
const generateOptionIdentifier = () => {
  if (!menuItem.value) return "";

  const selectedOptionsString = selectedOptions.value
    .map((optionIndex, index) => {
      const option = menuItem.value?.options[index];
      const choice = option?.choices[optionIndex];
      return `${option?.optionName}:${choice?.name}`;
    })
    .join("|");

  return `${menuId}-${selectedOptionsString}`;
};

// Add item to the cart
const addToCart = () => {
  if (menuItem.value) {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const itemKey = generateOptionIdentifier();
    const existingItemIndex = cart.findIndex(
      (item: any) => item.key === itemKey,
    );

    if (existingItemIndex !== -1) {
      cart[existingItemIndex].quantity += quantity.value;
    } else {
      cart.push({
        key: itemKey,
        menuId,
        name: menuItem.value.name,
        price: menuItem.value.price,
        quantity: quantity.value,
        note: note.value, // Add the note to the cart item
        options: menuItem.value.options.map((option, index) => ({
          optionName: option.optionName,
          selectedChoice: option.choices[selectedOptions.value[index]].name,
          choicePrice: option.choices[selectedOptions.value[index]].price,
        })),
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.replace(`/${qrCodeId}`);
  }
};

// Quantity increment and decrement
const incrementQuantity = () => quantity.value++;
const decrementQuantity = () => quantity.value > 1 && quantity.value--;

// Compute total price with checks to avoid undefined values
const totalPrice = computed(() => {
  if (!menuItem.value) return 0;

  let total = menuItem.value.price;
  menuItem.value.options?.forEach((option, index) => {
    const optionIndex = selectedOptions.value[index];
    if (optionIndex !== undefined && option?.choices) {
      total += option.choices[optionIndex]?.price || 0;
    }
  });
  return total * quantity.value;
});
</script>
