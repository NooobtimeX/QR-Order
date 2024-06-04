<template>
  <div class="mx-auto my-10 max-w-xl items-center justify-center">
    <h1 class="text-center">SIGN IN</h1>
    <div class="w-full rounded-lg border bg-white p-2">
      <form
        v-if="showRestaurantForm"
        @submit.prevent="handleSubmitRestaurant"
        class="p-2"
      >
        <div class="grid grid-cols-2">
          <button
            @click="showRestaurantForm = true"
            class="text-center text-2xl"
          >
            RESTAURANT
          </button>
          <button
            @click="showRestaurantForm = false"
            class="border border-violet-700 bg-white text-center text-2xl text-violet-700 hover:text-white"
          >
            STAFF
          </button>
        </div>
        <h2 class="my-2 text-center">SIGN IN FOR RESTAURANT</h2>

        <div class="mb-4">
          <label class="block text-gray-700">Email</label>
          <input
            v-model="emailRestaurant"
            type="emailRestaurant"
            class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Password</label>
          <input
            v-model="passwordRestaurant"
            type="passwordRestaurant"
            class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
            required
          />
        </div>
        <button type="submit" class="w-full">SIGN IN</button>
        <div v-if="errorMessage" class="mt-4 text-red-500">
          {{ errorMessage }}
        </div>
      </form>
      <form v-else @submit.prevent="handleSubmitStaff" class="p-2">
        <div class="grid grid-cols-2">
          <button
            @click="showRestaurantForm = true"
            class="border border-violet-700 bg-white text-center text-2xl text-violet-700 hover:text-white"
          >
            RESTAURANT
          </button>
          <button
            @click="showRestaurantForm = false"
            class="text-center text-2xl"
          >
            STAFF
          </button>
        </div>
        <h2 class="my-2 text-center">SIGN IN FOR STAFF</h2>
        <div class="mb-4">
          <label class="block text-gray-700">Email </label>
          <input
            v-model="emailStaff"
            type="emailStaff"
            class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Password</label>
          <input
            v-model="passwordStaff"
            type="passwordStaff"
            class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
            required
          />
        </div>
        <button type="submit" class="w-full">SIGN IN</button>
        <div v-if="errorMessage" class="mt-4 text-red-500">
          {{ errorMessage }}
        </div>
      </form>
      Not a member yet? <a href="/signup" class="text-violet-700">SIGN UP</a>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const emailRestaurant = ref("");
const passwordRestaurant = ref("");
const emailStaff = ref("");
const passwordStaff = ref("");
const errorMessage = ref(null);
const showRestaurantForm = ref(true); // Reactive variable to toggle between forms
const router = useRouter();

const handleSubmitRestaurant = async () => {
  try {
    errorMessage.value = null;
    const response = await axios.post("/api/restaurant/signin", {
      email: emailRestaurant.value,
      password: passwordRestaurant.value,
    });

    if (response.status === 200) {
      router.push("/dashboard");
    } else {
      errorMessage.value = response.data.statusMessage;
    }
  } catch (error) {
    errorMessage.value = "An unexpected error occurred";
  }
};

const handleSubmitStaff = async () => {
  try {
    errorMessage.value = null;
    const response = await axios.post("/api/staff/signin", {
      email: emailStaff.value,
      password: passwordStaff.value,
    });

    if (response.status === 200) {
      router.push("/staff");
    } else {
      errorMessage.value = response.data.statusMessage;
    }
  } catch (error) {
    errorMessage.value = "An unexpected error occurred";
  }
};
</script>
