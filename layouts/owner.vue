<template>
  <nav
    class="z-50 mx-auto mb-2 w-full items-center rounded-b-lg bg-green-700 bg-transparent p-6"
  >
    <div class="mx-auto flex max-w-5xl items-center justify-between">
      <div class="md:hidden">
        <button @click="drawer">
          <svg
            class="h-8 w-8 fill-current text-white"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
      <div class="mx-auto hidden md:block">
        <ul class="flex space-x-8 font-sans text-sm">
          <li v-for="(item, index) in navigationItems" :key="index">
            <a :href="item.link" class="font-bold text-white">{{
              item.label
            }}</a>
          </li>
        </ul>
      </div>
      <a href="/account" class="hidden md:block">
        <img width="50px" height="50px" src="/logo/logo.png" />
      </a>
      <transition
        enter-class="opacity-0"
        enter-active-class="ease-out transition-medium"
        enter-to-class="opacity-100"
        leave-class="opacity-100"
        leave-active-class="ease-out transition-medium"
        leave-to-class="opacity-0"
      >
        <div
          @keydown.esc="isOpen = false"
          v-show="isOpen"
          class="fixed inset-0 z-10 transition-opacity"
        >
          <div
            @click="isOpen = false"
            class="absolute inset-0 bg-black opacity-50"
            tabindex="0"
          ></div>
        </div>
      </transition>
      <aside
        class="fixed left-0 top-0 z-30 h-full w-64 transform overflow-auto bg-white p-5 transition-all duration-300 ease-in-out"
        :class="isOpen ? 'translate-x-0' : '-translate-x-full'"
      >
        <div class="close">
          <button
            class="absolute right-0 top-0 mr-4 mt-4"
            @click="isOpen = false"
          >
            <svg
              class="h-6 w-6"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <a href="/" class="block md:hidden">
          <img width="50px" height="50px" src="/logo/logo.png" />
        </a>
        <span
          @click="isOpen = false"
          class="flex w-full items-center border-b p-4"
        >
        </span>
        <ul class="divide-y font-sans">
          <li v-for="(item, index) in navigationItems" :key="index">
            <a class="my-4 inline-block font-bold" :href="item.link">{{
              item.label
            }}</a>
          </li>
        </ul>
      </aside>
    </div>
  </nav>
  <div class="mx-auto max-w-5xl items-center">
    <slot />
  </div>
</template>
<script setup>
import { ref, watch, onMounted } from "vue";
const isOpen = ref(false);
const navigationItems = [
  { label: "HOME", link: "/dashboard" },
  { label: "STAFF", link: "/dashboard/staff" },
  { label: "TABLE", link: "/dashboard/table" },
  { label: "MENU", link: "/dashboard/menu" },
  { label: "SALE", link: "/dashboard/sales" },
];
const drawer = () => {
  isOpen.value = !isOpen.value;
};
watch(isOpen, (isOpen) => {
  if (process.client) {
    if (isOpen) document.body.style.setProperty("overflow", "hidden");
    else document.body.style.removeProperty("overflow");
  }
});
onMounted(() => {
  document.addEventListener("keydown", (e) => {
    if (e.keyCode == 27 && isOpen.value) isOpen.value = false;
  });
});
</script>
