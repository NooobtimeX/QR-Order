<template>
  <nav class="bg-white p-6 shadow-xl">
    <div class="container mx-auto flex max-w-7xl items-center justify-between">
      <h1 class="text-3xl font-bold text-black">
        Restaurants <span class="text-3xl text-orange-04">.</span>
      </h1>
      <button
        @click="signOut"
        class="rounded-xl bg-orange-04 p-2 text-white shadow-xl hover:bg-orange-03"
      >
        Log out
      </button>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import Cookies from "js-cookie";

const router = useRouter();
const signOut = () => {
  Cookies.remove("userId");
  router.push("/");
};
</script>
