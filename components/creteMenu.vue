<template>
  <div class="container mx-auto w-full p-6">
    <h1 class="mb-8 text-center text-3xl font-bold">Create Menu</h1>
    <form class="space-y-8" @submit.prevent="createMenu">
      <div>
        <label
          for="menuPhoto"
          class="mb-2 block text-lg font-medium text-gray-800"
          >รูปภาพเมนู</label
        >
        <input
          id="menuPhoto"
          type="file"
          accept="image/*"
          class="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none"
          @change="handleFileUpload"
        />
      </div>

      <div class="space-y-6">
        <div
          class="flex flex-col space-y-6 md:flex-row md:space-x-6 md:space-y-0"
        >
          <div class="w-full">
            <label
              for="menuName"
              class="mb-2 block text-lg font-medium text-gray-800"
              >ชื่ออาหาร</label
            >
            <input
              id="menuName"
              v-model="menuName"
              type="text"
              placeholder="ชื่ออาหาร"
              required
              class="block w-full rounded-lg border border-gray-300 p-1 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div class="w-full">
            <label
              for="menuPrice"
              class="mb-2 block text-lg font-medium text-gray-800"
              >ราคา</label
            >
            <input
              id="menuPrice"
              v-model.number="menuPrice"
              type="number"
              placeholder="ราคา"
              required
              class="block w-full rounded-lg border border-gray-300 p-1 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
        </div>
        <div>
          <label
            for="menuDescription"
            class="mb-2 block text-lg font-medium text-gray-800"
            >คำอธิบาย</label
          >
          <input
            id="menuDescription"
            v-model="menuDescription"
            type="text"
            placeholder="คำอธิบาย"
            required
            class="block w-full rounded-lg border border-gray-300 p-1 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>
      </div>

      <div
        v-for="(section, index) in menusections"
        :key="index"
        class="space-y-6"
      >
        <div
          class="flex flex-col space-y-6 md:flex-row md:space-x-6 md:space-y-0"
        >
          <div class="w-full">
            <label
              :for="'sectionName' + index"
              class="mb-2 block text-lg font-medium text-gray-800"
              >ประเภทตัวเลือก</label
            >
            <input
              :id="'sectionName' + index"
              v-model="section.name"
              type="text"
              placeholder="ประเภทตัวเลือก"
              required
              class="block w-full rounded-lg border border-gray-300 p-1 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div class="flex items-end">
            <button
              type="button"
              class="rounded-lg bg-red-500 px-4 py-2 text-white shadow-md transition hover:bg-red-600"
              @click="removesection(index)"
            >
              ลบประเภทตัวเลือก
            </button>
          </div>
        </div>

        <div
          v-for="(option, sIndex) in section.options"
          :key="sIndex"
          class="grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          <div>
            <label
              :for="'optionName' + index + '-' + sIndex"
              class="mb-2 block text-lg font-medium text-gray-800"
              >ชื่อตัวเลือก</label
            >
            <input
              :id="'optionName' + index + '-' + sIndex"
              v-model="option.name"
              type="text"
              placeholder="ชื่อตัวเลือก"
              required
              class="block w-full rounded-lg border border-gray-300 p-1 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label
              :for="'optionPrice' + index + '-' + sIndex"
              class="mb-2 block text-lg font-medium text-gray-800"
              >ราคาตัวเลือก</label
            >
            <input
              :id="'optionPrice' + index + '-' + sIndex"
              v-model.number="option.price"
              type="number"
              placeholder="ราคาตัวเลือก"
              required
              class="block w-full rounded-lg border border-gray-300 p-1 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div class="flex items-end">
            <button
              type="button"
              class="rounded-lg bg-red-500 px-4 py-2 text-white shadow-md transition hover:bg-red-600"
              @click="removeoption(index, sIndex)"
            >
              ลบตัวเลือก
            </button>
          </div>
        </div>
        <div class="flex justify-end">
          <button
            type="button"
            class="rounded-lg bg-green-500 px-4 py-2 text-white shadow-md transition hover:bg-green-600"
            @click="addoption(index)"
          >
            เพิ่มตัวเลือก
          </button>
        </div>
      </div>

      <div class="flex flex-col items-center space-y-4">
        <button
          type="button"
          class="rounded-lg bg-blue-500 px-6 py-2 text-white shadow-md transition hover:bg-blue-600"
          @click="addsection"
        >
          เพิ่มประเภทตัวเลือก
        </button>
        <button
          type="submit"
          class="rounded-lg bg-green-500 px-6 py-2 text-white shadow-md transition hover:bg-green-600"
        >
          เพิ่มเมนูอาหาร
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";

const menuName = ref("");
const menuDescription = ref("");
const menuPrice = ref(null);
const menusections = ref([
  {
    name: "",
    options: [
      {
        name: "",
        price: null,
      },
    ],
  },
]);

async function createMenu() {
  // Implement createMenu logic here
}

function addsection() {
  menusections.value.push({
    name: "",
    options: [
      {
        name: "",
        price: null,
      },
    ],
  });
}

function addoption(index) {
  menusections.value[index].options.push({
    name: "",
    price: null,
  });
}

function removeoption(sectionIndex, optionIndex) {
  menusections.value[sectionIndex].options.splice(optionIndex, 1);
}

function removesection(index) {
  menusections.value.splice(index, 1);
}
</script>
