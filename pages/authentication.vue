<template>
  <div class="mx-auto my-10 max-w-xl items-center justify-center">
    <div class="w-full rounded-xl border bg-white p-2">
      <div class="grid grid-cols-2">
        <button
          @click="showSignUp = true"
          :class="{
            'border-green-700 bg-white text-green-700 hover:text-white':
              !showSignUp,
            'text-center text-2xl': showSignUp,
          }"
        >
          สมัคร
        </button>
        <button
          @click="showSignUp = false"
          :class="{
            'border-green-700 bg-white text-green-700 hover:text-white':
              showSignUp,
            'text-center text-2xl': !showSignUp,
          }"
        >
          เข้าสู่ระบบ
        </button>
      </div>

      <form
        @submit.prevent="showSignUp ? handleSignup() : handleSignin()"
        class="p-2"
      >
        <h1 class="my-2 text-center">
          {{ showSignUp ? "สมัคร" : "เข้าสู่ระบบ" }}
        </h1>

        <div class="mb-4">
          <label class="block text-gray-700">อีเมล</label>
          <input
            v-model="email"
            type="email"
            class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">รหัสผ่าน</label>
          <input
            v-model="password"
            type="password"
            class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
            required
          />
        </div>
        <button type="submit" class="w-full">
          {{ showSignUp ? "สมัคร" : "เข้าสู่ระบบ" }}
        </button>
        <div v-if="errorMessage" class="mt-4 text-red-500">
          {{ errorMessage }}
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
const errorMessage = ref(null);
const showSignUp = ref(true);
const email = ref("");
const password = ref("");
const router = useRouter();

const handleSignin = async () => {
  try {
    errorMessage.value = null;
    const response = await axios.post("/api/user/signin", {
      email: email.value,
      password: password.value,
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

const handleSignup = async () => {
  try {
    errorMessage.value = null;
    const response = await axios.post("/api/user/signup", {
      email: email.value,
      password: password.value,
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
</script>
