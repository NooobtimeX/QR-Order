<template>
  <div class="p-4">
    <h2 class="mb-4 text-2xl font-bold">Owner</h2>
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="item in ownerAccess"
        :key="item.id"
        class="rounded-lg bg-white p-4 shadow-md"
        @click="saveResId(item.id)"
      >
        <p class="text-gray-700">
          <span class="font-semibold">ID:</span> {{ item.id }}
        </p>
        <p class="text-gray-700">
          <span class="font-semibold">Name:</span> {{ item.name }}
        </p>
      </div>
      <div>
        <button
          @click="showModal = true"
          class="rounded bg-blue-500 px-4 py-2 text-white"
        >
          Create New
        </button>
      </div>
    </div>

    <div
      v-if="showModal"
      class="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Cookies from "js-cookie";

const router = useRouter();
const ownerAccess = ref([]);
const showModal = ref(false);
const userId = Cookies.get("userId");

const fetchOwnerAccess = async () => {
  try {
    const response = await fetch(
      `/api/restaurant/getByUserId?userId=${userId}`,
    );
    const data = await response.json();
    ownerAccess.value = data.body || [];
  } catch (error) {
    console.error("Error fetching owner access:", error);
  }
};

const saveResId = (id) => {
  Cookies.set("resId", id);
  console.log("resId set to:", id); // Debugging log
  router.push("/dashboard");
};

onMounted(() => {
  if (userId) {
    fetchOwnerAccess();
  } else {
    alert("Need to sign in to access this page");
    router.push("/authentication");
  }
});
</script>
