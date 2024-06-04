<template>
  <div class="mx-auto my-10 max-w-xl items-center justify-center">
    <h1 class="">Restaurant SIGN UP</h1>
    <form @submit.prevent="submitForm" class="space-y-4">
      <div class="grid gap-2 rounded-lg border p-2 md:grid-cols-2">
        <div>
          <label for="name" class="block text-sm font-medium">Name</label>
          <input
            type="text"
            v-model="form.name"
            id="name"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <div>
          <label for="email" class="block text-sm font-medium">Email</label>
          <input
            type="email"
            v-model="form.email"
            id="email"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <div>
          <label for="password" class="block text-sm font-medium"
            >Password</label
          >
          <input
            type="password"
            v-model="form.password"
            id="password"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>

        <div>
          <label for="phoneNumber" class="block text-sm font-medium"
            >Phone Number</label
          >
          <input
            type="text"
            v-model="form.phoneNumber"
            id="phoneNumber"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
      </div>
      <div class="grid gap-2 rounded-lg border p-2 md:grid-cols-2">
        <div>
          <label for="no" class="block text-sm font-medium">No</label>
          <input
            type="text"
            v-model="form.no"
            id="no"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <div>
          <label for="street" class="block text-sm font-medium">Street</label>
          <input
            type="text"
            v-model="form.street"
            id="street"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <div>
          <label for="subdistrict" class="block text-sm font-medium"
            >Subdistrict</label
          >
          <input
            type="text"
            v-model="form.subdistrict"
            id="subdistrict"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <div>
          <label for="district" class="block text-sm font-medium"
            >District</label
          >
          <input
            type="text"
            v-model="form.district"
            id="district"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <div>
          <label for="province" class="block text-sm font-medium"
            >Province</label
          >
          <input
            type="text"
            v-model="form.province"
            id="province"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <div>
          <label for="zipCode" class="block text-sm font-medium"
            >Zip Code</label
          >
          <input
            type="text"
            v-model="form.zipCode"
            id="zipCode"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
      </div>

      <button type="submit" class="mx-auto w-full p-2">Sign Up</button>
      Already a member? <a href="/signin" class="text-green-700">SIGN IN</a>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const form = ref({
  name: "",
  email: "",
  password: "",
  phoneNumber: "",
  no: "",
  street: "",
  subdistrict: "",
  district: "",
  province: "",
  zipCode: "",
});

const submitForm = async () => {
  try {
    const response = await axios.post("/api/restaurant/signup", form.value);
    alert("Restaurant created successfully!");
    console.log(response.data);
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while creating the restaurant.");
  }
};
</script>
