<template>
  <NuxtLayout>
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
  </NuxtLayout>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import Cookies from "js-cookie"; // Import js-cookie
import axios from "axios";

export default defineComponent({
  setup() {
    const ownerAccess = ref([]);
    const showModal = ref(false);
    const userId = Cookies.get("userId"); // Get userId from cookies
    const newRestaurant = ref({
      id: 0,
      name: "",
      phoneNumber: "",
      userId: userId, // Set userId from cookies
    });

    const fetchOwnerAccess = async () => {
      try {
        const response = await axios.get("/api/restaurant/getByUserId", {
          params: { userId: userId }, // Pass userId from cookies
        });
        const { body } = response.data;
        console.log("Owner access data:", body);
        ownerAccess.value = body;
      } catch (error) {
        console.error("Error fetching owner access:", error);
      }
    };

    const saveResId = (id) => {
      Cookies.set("resId", id); // Save id to js-cookie with name "resId"
    };

    onMounted(() => {
      fetchOwnerAccess();
    });

    return {
      ownerAccess,
      showModal,
      newRestaurant,
      fetchOwnerAccess,
      saveResId,
    };
  },
});
</script>
