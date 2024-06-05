<template>
  <NuxtLayout>
    <div v-if="isAdmin">
      <div
        class="mb-2 grid grid-cols-4 gap-2 rounded-xl border p-2 text-center"
      >
        <div
          v-for="component in components"
          :key="component.id"
          :class="{
            'bg-green-600 text-white': currentComponent === component.name,
          }"
          class="rounded-xl p-1 hover:bg-green-700 hover:text-white"
          @click="selectComponent(component.name)"
        >
          {{ component.label }}
        </div>
      </div>
      <settingaddress v-if="currentComponent === 'settingaddress'" />
      <settingmenu v-if="currentComponent === 'settingmenu'" />
      <settingstaff v-if="currentComponent === 'settingstaff'" />
      <settingtable v-if="currentComponent === 'settingtable'" />
    </div>
    <div v-else></div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const isAdmin = ref(true);
const components = [
  { id: 1, name: "settingaddress", label: "ที่อยู่" },
  { id: 2, name: "settingmenu", label: "อาหาร" },
  { id: 3, name: "settingstaff", label: "พนักงาน" },
  { id: 4, name: "settingtable", label: "โต๊ะ" },
];
// Currently selected component
const currentComponent = ref("settingaddress");

// Method to change the selected component
const selectComponent = (componentName: string) => {
  currentComponent.value = componentName;
};
</script>
