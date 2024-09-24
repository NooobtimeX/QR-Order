<template>
  <div>
    <!-- Sidebar Toggle Button -->
    <button
      @click="toggleSidebar"
      aria-controls="default-sidebar"
      type="button"
      class="ms-3 mt-2 inline-flex items-center rounded-xl p-2 text-sm focus:outline-none focus:ring-2"
    >
      <span class="sr-only">Open sidebar</span>
      <svg
        class="h-6 w-6"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          clip-rule="evenodd"
          fill-rule="evenodd"
          d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
        />
      </svg>
    </button>

    <!-- Sidebar -->
    <aside
      id="default-sidebar"
      :class="{
        '-translate-x-full': !isSidebarOpen,
        'translate-x-0': isSidebarOpen,
      }"
      class="fixed left-0 top-0 z-40 h-screen w-64 transition-transform md:translate-x-0"
      aria-label="Sidebar"
    >
      <div
        class="relative h-full overflow-y-auto bg-white px-3 py-4 shadow-2xl"
      >
        <!-- Logo -->
        <div class="flex items-center justify-center text-white">
          <img width="50px" src="/logo/logo.png" />
        </div>

        <!-- Restaurant Info -->
        <div
          class="flex flex-col items-center justify-center text-2xl text-black"
        >
          <div>{{ restaurantName }}</div>
          <div>{{ branchName }}</div>
        </div>
        <!-- Close Button (Mobile) -->
        <button
          type="button"
          class="absolute right-4 top-4 inline-flex items-center rounded-xl p-2 text-sm focus:outline-none focus:ring-2 md:hidden"
          @click="toggleSidebar"
        >
          <img src="/icon/close.svg" alt="Close" class="h-6 w-6" />
        </button>

        <!-- Menu Items -->
        <ul class="mt-2 space-y-2 font-medium">
          <li v-for="item in menuItems" :key="item.text">
            <div
              v-if="item.component"
              @click="selectComponent(item)"
              class="group flex items-center rounded-xl p-2 text-black hover:bg-orange-04 active:bg-orange-03"
            >
              <img width="25px" height="25px" :src="item.icon" />
              <span class="ms-3">{{ item.text }}</span>
            </div>
            <router-link
              v-else-if="item.link"
              :to="item.link"
              class="group flex items-center rounded-xl p-2 text-black hover:bg-orange-04"
            >
              <img width="25px" height="25px" :src="item.icon" />
              <span class="ms-3">{{ item.text }}</span>
            </router-link>
          </li>
        </ul>

        <!-- Sign Out Button -->
        <button
          @click="signOut"
          class="mt-6 rounded-xl bg-red-500 p-2 text-white hover:bg-red-02"
        >
          ออกจากระบบ
        </button>
      </div>
    </aside>
    <!-- Dynamic Component -->
    <div
      class="ml-0 overflow-hidden p-2 px-6 sm:ml-2 md:ml-56 lg:ml-60 xl:ml-64"
    >
      <component v-if="currentComponent" :is="currentComponent" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineAsyncComponent, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

// Interfaces
interface MenuItem {
  text: string;
  link?: string;
  icon: string;
  component?: any;
}

// Data and Methods
const menuItems = ref<MenuItem[]>([]);
const isSidebarOpen = ref(false);
const restaurantName = ref("Loading...");
const branchName = ref("Loading...");
const currentComponent = ref<any>(null); // Initialize as null for now
const router = useRouter();

// Functions
function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value;
}

function closeSidebarOnMobile() {
  if (window.innerWidth < 640) isSidebarOpen.value = false;
}

function selectComponent(item: MenuItem) {
  if (item.component) {
    currentComponent.value = item.component;
    // Save selected component text in localStorage
    localStorage.setItem("lastSelectedComponent", item.text);
  }
  closeSidebarOnMobile();
}

async function checkRestaurantAndBranch(
  restaurantId: string,
  branchId: string,
): Promise<boolean> {
  try {
    const { data } = await axios.post("/api/check/checkRestaurantAndBranch", {
      restaurantId,
      branchId,
    });
    if (data.exists) {
      restaurantName.value = data.restaurant.name;
      branchName.value = data.branch.name;
      return true;
    }
  } catch (error) {
    console.error("Error checking restaurant and branch:", error);
  }
  return false;
}

function signOut() {
  router.push("/"); // Redirect to home or login
}

// On Mounted
onMounted(() => {
  menuItems.value = [
    {
      text: "Dashboard",
      link: "/restaurant/dashboard",
      icon: "/icon/dashboard.svg",
      component: defineAsyncComponent(
        () => import("@/components/page/Dashboard.vue"),
      ),
    },
    {
      text: "Table",
      link: "/restaurant/table",
      icon: "/icon/table.svg",
      component: defineAsyncComponent(
        () => import("@/components/page/Table.vue"),
      ),
    },
    {
      text: "Order",
      link: "/restaurant/order",
      icon: "/icon/order.svg",
      component: defineAsyncComponent(
        () => import("@/components/page/Order.vue"),
      ),
    },
    {
      text: "Menu",
      link: "/restaurant/menu",
      icon: "/icon/menu.svg",
      component: defineAsyncComponent(
        () => import("@/components/page/Menu.vue"),
      ),
    },
    {
      text: "Bill",
      link: "/restaurant/receipt",
      icon: "/icon/receipt.svg",
      component: defineAsyncComponent(
        () => import("@/components/page/Receipt.vue"),
      ),
    },
    {
      text: "Staff",
      link: "/restaurant/staff",
      icon: "/icon/staff.svg",
      component: defineAsyncComponent(
        () => import("@/components/page/Staff.vue"),
      ),
    },
    {
      text: "Switch Restaurant",
      link: "/restaurant",
      icon: "/icon/restaurant.svg",
    },
  ];

  const restaurantId = localStorage.getItem("restaurantId");
  const branchId = localStorage.getItem("branchId");

  if (!restaurantId || !branchId) {
    alert("Missing restaurant or branch ID in localStorage");
    signOut();
    return;
  }

  checkRestaurantAndBranch(restaurantId, branchId).then((exists) => {
    if (!exists) {
      alert("Restaurant or Branch does not exist. Redirecting.");
      router.push("/restaurant");
    }
  });

  // Load the last selected component from localStorage
  const lastSelectedComponent = localStorage.getItem("lastSelectedComponent");
  if (lastSelectedComponent) {
    const matchedItem = menuItems.value.find(
      (item) => item.text === lastSelectedComponent,
    );
    if (matchedItem && matchedItem.component) {
      currentComponent.value = matchedItem.component;
    } else {
      // Default to Dashboard if no match
      currentComponent.value = defineAsyncComponent(
        () => import("@/components/page/Dashboard.vue"),
      );
    }
  } else {
    // Default to Dashboard if nothing is saved
    currentComponent.value = defineAsyncComponent(
      () => import("@/components/page/Dashboard.vue"),
    );
  }
});
</script>
