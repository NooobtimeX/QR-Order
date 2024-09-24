<template>
  <section class="mx-auto items-center">
    <h2 class="pb-6 text-center text-5xl font-bold text-orange-04">Staff</h2>
    <!-- Search Input -->
    <div class="flex cursor-pointer items-center justify-center space-x-4">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search by email..."
        class="w-3/5 rounded-xl border border-black p-2 focus:outline-none focus:ring-2"
      />
      <button
        class="rounded-lg bg-green-500 text-white hover:bg-green-700"
        @click="showAddModal = true"
      >
        Add Employee
      </button>
    </div>
    <div
      v-for="roleGroup in filteredGroups"
      :key="roleGroup.role"
      class="grid grid-cols-2 gap-2 pt-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
    >
      <div
        v-for="staff in roleGroup.staffs"
        :key="staff.id"
        class="flex cursor-pointer flex-col items-center justify-center rounded-xl bg-white p-4 shadow-md hover:bg-gray-100"
      >
        <div class="mt-2 flex flex-col justify-center text-center text-sm">
          <span class="text-sm text-black">
            <span class="text-sm font-bold text-black">Email:</span>
            {{ staff.email }}</span
          >
          <span v-if="roleGroup.role === 'owner'" class="text-sm text-black"
            ><span class="text-sm font-bold text-black">Role:</span> Owner</span
          >
          <span v-else class="text-sm text-black"
            ><span class="text-sm font-bold text-black">Role:</span> Staff</span
          >
          <button
            @click="deleteStaff(staff.id)"
            class="mt-2 bg-red-500 text-white hover:bg-red-02"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
    <!-- Add Employee Modal -->
    <div
      class="fixed inset-0 z-50 flex items-center justify-center"
      v-if="showAddModal"
      @keydown.escape="showAddModal = false"
    >
      <div
        class="w-80 rounded-lg border-2 border-gray-300 bg-white p-6 shadow-xl"
      >
        <h2 class="mb-2 text-xl font-bold text-black">Add New Employee</h2>
        <form @submit.prevent="addEmployee">
          <div class="mb-4">
            <label for="email" class="block text-base font-bold text-black"
              >Email</label
            >
            <input
              type="email"
              id="email"
              v-model="newEmployee.email"
              required
              placeholder="name@company.com"
              class="mt-1 block w-full rounded-md border-gray-400 bg-white shadow-sm focus:outline-none focus:ring-2 sm:text-base"
            />
          </div>
          <div class="mb-4">
            <label for="role" class="block text-base font-bold text-black"
              >Role</label
            >
            <select
              id="role"
              v-model="newEmployee.role"
              class="mt-1 block w-full rounded-md border-2 border-gray-400 bg-white text-black shadow-sm focus:outline-none focus:ring-2 sm:text-base"
            >
              <option value="owner">Owner</option>
              <option value="staff">Staff</option>
            </select>
          </div>
          <div class="flex justify-end">
            <button
              type="button"
              @click="showAddModal = false"
              class="mr-2 rounded-md border bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-02"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="rounded-md border border-transparent bg-green-500 px-4 py-2 pl-3 pr-3 text-sm text-white hover:bg-green-700"
            >
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

// Define the Staff interface
interface Staff {
  id: number;
  email: string;
  role: "owner" | "staff";
}

// States
const staffs = ref<Staff[]>([]);
const showAddModal = ref(false);
const newEmployee = ref<{ email: string; role: "owner" | "staff" }>({
  email: "",
  role: "staff",
});
const searchQuery = ref("");

// Router
const router = useRouter();

// Local Storage
const restaurantId = parseInt(localStorage.getItem("restaurantId") || "0", 10);
const userId = parseInt(localStorage.getItem("userId") || "0", 10);

// Fetch Staffs
const fetchStaffs = async () => {
  try {
    const { data } = await axios.get<{ body: Staff[] }>(
      "/api/restaurant/getStaffById",
      {
        params: { restaurantId },
      },
    );
    staffs.value = data.body.map(({ id, email, role }) => ({
      id,
      email,
      role,
    }));
  } catch (error) {
    console.error("Error fetching staff:", error);
  }
};

// Computed Properties
const filteredGroups = computed(() => {
  const query = searchQuery.value.toLowerCase();
  const grouped: { owner: Staff[]; staff: Staff[] } = { owner: [], staff: [] };
  staffs.value.forEach((staff) => {
    if (staff.email.toLowerCase().includes(query)) {
      grouped[staff.role].push(staff);
    }
  });
  return [
    { role: "owner", staffs: grouped.owner },
    { role: "staff", staffs: grouped.staff },
  ];
});

// Check Ownership
const checkOwnership = async () => {
  const { data } = await axios.get<{ isOwner: boolean }>(
    "/api/restaurant/isOwner",
    {
      params: { userId, restaurantId },
    },
  );
  return data.isOwner;
};

// Add Employee
const addEmployee = async () => {
  try {
    const isOwner = await checkOwnership();
    if (isOwner || newEmployee.value.role === "owner") {
      await axios.post("/api/restaurant/assignUserRole", {
        ...newEmployee.value,
        restaurantId,
      });
      resetModal();
      fetchStaffs();
    } else {
      alert("Only the restaurant owner can add staff members.");
    }
  } catch (error) {
    console.error("Error adding employee:", error);
    alert("Failed to add employee. Please try again.");
  }
};

// Delete Employee
const deleteStaff = async (id: number) => {
  try {
    const isOwner = await checkOwnership();
    if (isOwner) {
      await axios.delete("/api/restaurant/deleteStaff", { params: { id } });
      fetchStaffs();
    } else {
      alert("Only the restaurant owner can delete staff members.");
    }
  } catch (error) {
    console.error("Error deleting staff:", error);
    alert("Failed to delete staff. Please try again.");
  }
};

// Reset Modal
const resetModal = () => {
  showAddModal.value = false;
  newEmployee.value.email = "";
};

// Redirect if not owner
onMounted(async () => {
  const isOwner = await checkOwnership();
  if (!isOwner) {
    router.push("/dashboard");
    alert("กรุณาติดต่อเจ้าของร้าน");
  } else {
    fetchStaffs();
  }
});
</script>
