<template>
  <div>
    <HamburgerMenu @click="toggleSidebar" aria-controls="default-sidebar" />
    <aside
      id="default-sidebar"
      :class="{
        '-translate-x-full': !isSidebarOpen,
        'translate-x-0': isSidebarOpen,
      }"
      class="fixed left-0 top-0 z-40 h-screen w-64 transition-transform sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div class="relative h-full overflow-y-auto bg-green-900 px-3 py-4">
        <div class="items-center justify-center text-white">
          <img width="50px" src="/logo/logo.png" />
          <div>Pizza Store</div>
        </div>
        <IconClose @click="toggleSidebar" />
        <ul class="mt-2 space-y-2 font-medium">
          <li v-for="item in menuItems" :key="item.text">
            <a
              :href="item.link"
              class="group flex items-center rounded-xl p-2 text-white hover:bg-green-700"
            >
              <img width="25px" height="25px" :src="item.icon" />
              <span class="ms-3">{{ item.text }}</span>
              <span
                v-if="item.badge"
                class="ms-3 inline-flex items-center justify-center rounded-full px-2 text-sm font-medium"
              >
                {{ item.badge }}
              </span>
            </a>
          </li>
        </ul>
        <button @click="signOut" class="bg-red-500 hover:bg-red-700">
          ออกจากระบบ
        </button>
      </div>
    </aside>
  </div>
  <div class="p-1 sm:ml-64">
    <slot class="container mx-auto p-1" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const menuItems = ref([
  {
    text: "แดชบอร์ด",
    link: "/dashboard",
    icon: "/icon/",
  },
  {
    text: "โต๊ะอาหาร",
    link: "/table",
    icon: "/icon/",
  },
  {
    text: "ออเดอร์",
    link: "/order",
    icon: "/icon/",
  },
  {
    text: "เมนู",
    link: "/menu",
    icon: "/icon/",
  },
  {
    text: "ใบเสร็จ",
    link: "/receipt",
    icon: "/icon/",
  },
  {
    text: "ที่อยู่ร้านอาหาร",
    link: "/address",
    icon: "/icon/",
  },
  {
    text: "พนักงาน",
    link: "/staff",
    icon: "/icon/",
  },
]);

const router = useRouter();
const isSidebarOpen = ref(false);

function signOut() {
  router.push("/authentication");
}
function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value;
}
</script>
