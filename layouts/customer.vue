<template>
  <h1 class="mt-4 text-center text-3xl font-bold">{{ restaurantName }}</h1>
  <p class="text-center text-gray-600">{{ address }}</p>
  <p class="text-center text-gray-600">Table: {{ tableNo }}</p>
  <div class="mx-auto max-w-6xl items-center">
    <slot />
  </div>
  <div class="fixed bottom-4 right-4 z-50 grid grid-cols-1 gap-2">
    <!-- Notification Button -->
    <button
      class="flex h-12 w-12 items-center justify-center rounded-full bg-green-600"
      @click="showPopup = true"
    >
      <img src="/icon/notification.svg" class="h-7 w-7" />
    </button>
    <!-- Cart Button -->
    <a href="/customer/cart">
      <button
        class="flex h-12 w-12 items-center justify-center rounded-full bg-green-600"
      >
        <img src="/icon/clipboard.png" class="h-7 w-7" />
      </button>
    </a>
    <!-- Popup -->
    <div
      v-if="showPopup"
      class="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-75"
    >
      <div class="rounded-lg bg-white p-4 shadow-lg">
        <p class="text-gray-800">Call the staff?</p>
        <button class="mt-2" @click="showPopup = false">Confirm</button>
        <button class="mt-2" @click="showPopup = false">Cancel</button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
const restaurantName = "Res Name";
const address = "bababa";
const tableNo = 1;
const showPopup = ref(false);
</script>
