<template>
  <nav
    class="sticky top-0 z-50 mx-auto mb-2 w-full items-center rounded-b-lg bg-green-700 p-6"
  >
    <div class="mx-auto flex max-w-5xl items-center justify-between">
      <div class="md:hidden">
        <button @click="toggleDrawer">
          <svg
            class="h-8 w-8 fill-current text-white"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
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
      <transition name="drawer">
        <aside
          v-if="isOpen"
          class="fixed left-0 top-0 z-30 h-full w-64 transform overflow-auto bg-white p-5 transition-all duration-300 ease-in-out"
        >
          <div class="close">
            <button
              class="absolute right-0 top-0 mr-4 mt-4"
              @click="toggleDrawer"
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
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <a href="/" class="block md:hidden">
            <img width="50px" height="50px" src="/logo/logo.png" />
          </a>
          <ul class="divide-y font-sans">
            <li v-for="(item, index) in navigationItems" :key="index">
              <a class="my-4 inline-block font-bold" :href="item.link">{{
                item.label
              }}</a>
            </li>
          </ul>
        </aside>
      </transition>
    </div>
  </nav>
  <div class="mx-auto max-w-6xl items-center">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";

const props = defineProps({
  navigationItems: {
    type: Array,
    required: true,
  },
});

const isOpen = ref(false);

const toggleDrawer = () => {
  isOpen.value = !isOpen.value;
};

watch(isOpen, (isOpen: any) => {
  if (import.meta.client) {
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

<style>
.drawer-enter-active,
.drawer-leave-active {
  transition: opacity 0.3s ease;
}
.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
}
</style>
