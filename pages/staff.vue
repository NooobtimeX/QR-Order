<template>
  <NuxtLayout>
    <section>
      <h2 class="text-center">พนักงาน</h2>
      <div
        class="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
      >
        <div
          v-for="staff in staffs"
          :key="staff.id"
          class="flex flex-col items-center justify-center rounded-xl border p-4 hover:bg-gray-50"
        >
          <div
            class="mt-2 flex flex-col justify-center text-center text-sm text-gray-600"
          >
            {{ staff.email }}
            <button @click="deletestaff(staff.id)">delete</button>
          </div>
        </div>
        <div
          class="flex cursor-pointer flex-col items-center justify-center rounded-xl border p-4 hover:bg-gray-50"
          @click="showAddModal = true"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-12 w-12 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 2a1 1 0 0 1 1 1v6h6a1 1 0 0 1 0 2h-6v6a1 1 0 0 1-2 0v-6H3a1 1 0 0 1 0-2h6V3a1 1 0 0 1 1-1z"
              clip-rule="evenodd"
            />
          </svg>
          <p class="mt-2 text-sm text-gray-600">Add Employee</p>
        </div>
      </div>
      <div
        class="fixed inset-0 z-50 flex items-center justify-center"
        v-if="showAddModal"
        @keydown.escape="showAddModal = false"
      >
        <div class="w-80 rounded-lg bg-white p-6 shadow-xl">
          <h2 class="mb-4 text-lg font-semibold">Add New Employee</h2>
          <form @submit.prevent="addEmployee">
            <div class="mb-4">
              <label for="email" class="block text-sm font-medium text-gray-700"
                >Email</label
              >
              <input
                type="email"
                id="email"
                v-model="newEmployee.email"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
              />
            </div>

            <div class="flex justify-end">
              <button
                type="button"
                @click="showAddModal = false"
                class="mr-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="rounded-md border border-transparent px-4 py-2 text-sm text-white focus:outline-none focus:ring-2"
              >
                Add Employee
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import Cookies from "js-cookie";

const staffs = ref<Array<{ id: number; email: string }>>([]);
const showAddModal = ref(false);
const newEmployee = ref({
  email: "",
  picture: "",
});

const restaurantId = parseInt(Cookies.get("resId") || "0", 10);

const fetchStaffs = async () => {
  try {
    const response = await axios.get("/api/restaurant/getStaffById", {
      params: { restaurantId }, // Use the restaurant ID from the cookie
    });
    staffs.value = response.data.body || [];
  } catch (error) {
    console.error("Error fetching staff:", error);
  }
};

onMounted(() => {
  fetchStaffs();
});

const addEmployee = async () => {
  try {
    const response = await axios.post(`/api/restaurant/addStaff`, {
      email: newEmployee.value.email,
      restaurantId, // Use the restaurant ID from the cookie
    });
    showAddModal.value = false;
    newEmployee.value.email = "";
    fetchStaffs();
  } catch (error) {
    console.error("Error adding employee:", error);
  }
};

const deletestaff = async (id: number) => {
  try {
    await axios.delete(`/api/restaurant/deleteStaff`, {
      params: { id },
    });
    fetchStaffs();
  } catch (error) {
    console.error("Error deleting staff:", error);
  }
};
</script>
