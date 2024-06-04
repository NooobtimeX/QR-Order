<template>
  <div class="mx-auto my-10 max-w-xl items-center justify-center">
    <h1 class="">Restaurant SIGN UP</h1>
    <form class="space-y-4" @submit.prevent="submitForm">
      <div class="grid gap-2 rounded-lg border p-2 md:grid-cols-2">
        <div>
          <label for="name" class="block text-sm font-medium">Name</label>
          <input
            id="name"
            v-model="form.name"
            type="text"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <div>
          <label for="email" class="block text-sm font-medium">Email</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <div>
          <label for="password" class="block text-sm font-medium"
            >Password</label
          >
          <input
            id="password"
            v-model="form.password"
            type="password"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>

        <div>
          <label for="phoneNumber" class="block text-sm font-medium"
            >Phone Number</label
          >
          <input
            id="phoneNumber"
            v-model="form.phoneNumber"
            type="text"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
      </div>
      <div class="grid gap-2 rounded-lg border p-2 md:grid-cols-2">
        <div>
          <label for="no" class="block text-sm font-medium">No</label>
          <input
            id="no"
            v-model="form.no"
            type="text"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <div>
          <label for="street" class="block text-sm font-medium">Street</label>
          <input
            id="street"
            v-model="form.street"
            type="text"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <div>
          <label for="subdistrict" class="block text-sm font-medium"
            >Subdistrict</label
          >
          <input
            id="subdistrict"
            v-model="form.subdistrict"
            type="text"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <div>
          <label for="district" class="block text-sm font-medium"
            >District</label
          >
          <input
            id="district"
            v-model="form.district"
            type="text"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <div>
          <label for="province" class="block text-sm font-medium"
            >Province</label
          >
          <input
            id="province"
            v-model="form.province"
            type="text"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <div>
          <label for="zipCode" class="block text-sm font-medium"
            >Zip Code</label
          >
          <input
            id="zipCode"
            v-model="form.zipCode"
            type="text"
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
    //auto login
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while creating the restaurant.");
  }
};
</script>
