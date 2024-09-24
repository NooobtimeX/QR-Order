<template>
  <h1 class="mt-4 text-center text-3xl font-bold">{{ restaurantName }}</h1>
  <p class="text-center text-white">{{ address }}</p>
  <p class="text-center text-white">Table: {{ tableNo }}</p>
  <div class="mx-auto max-w-5xl items-center">
    <slot />
  </div>
  <div class="fixed bottom-4 right-4 z-50 grid grid-cols-1 gap-2">
    <!-- Notification Button -->
    <button
      @click="showPopup = true"
      class="flex h-12 w-12 items-center justify-center rounded-full bg-orange-04"
    >
      <img src="/icon/notification.svg" class="h-7 w-7" />
    </button>
    <!-- Cart Button -->
    <a :href="`/${table}/cart`">
      <!-- Use dynamic route for table/cart -->
      <button
        class="flex h-12 w-12 items-center justify-center rounded-full bg-orange-04"
      >
        <img src="/icon/clipboard.svg" class="h-7 w-7" />
      </button>
    </a>
    <!-- Popup -->
    <div
      v-if="showPopup"
      class="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-75"
    >
      <div class="rounded-xl bg-white p-4 shadow-lg">
        <p class="text-gray-800">Call the staff?</p>
        <button @click="showPopup = false" class="mt-2 bg-green-500 text-white hover:bg-green-700">Confirm</button>
        <button @click="showPopup = false" class="mt-2 bg-red-500 text-white hover:bg-red-02">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router"; // Import useRoute

const route = useRoute(); // Get the route object

const restaurantName = "Res Name";
const address = "bababa";

// Use the table parameter from the route
const table = route.params.table || "defaultTable"; // Get table from the route params, fallback to 'defaultTable'

const tableNo = "2";
// Popup control
const showPopup = ref(false);
</script>
