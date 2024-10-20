<template>
  <div
    v-if="qrCodeId"
    class="fixed inset-0 z-20 flex items-center justify-center bg-gray-800 bg-opacity-50"
  >
    <div class="w-96 rounded-lg bg-white p-4">
      <p class="text-center text-2xl text-black">QR Code ID: {{ qrCodeId }}</p>

      <!-- Your order food form or functionality here -->
      <div class="mt-4">
        <p>Order form goes here...</p>
        <!-- Add more form content as needed -->
      </div>

      <!-- Close Modal Button -->
      <div class="mt-4 flex justify-end">
        <button
          @click="closeModal"
          class="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-700"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  qrCodeId: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["close"]);

const closeModal = () => {
  emit("close");
};
</script>
