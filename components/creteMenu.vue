<template>
  <div class="container mx-auto w-full p-6">
    <h1 class="mb-8 text-center text-3xl font-bold">Create Menu</h1>
    <form @submit.prevent="createMenu" class="space-y-8">
      <div>
        <label
          for="menuPhoto"
          class="mb-2 block text-lg font-medium text-gray-800"
          >รูปภาพเมนู</label
        >
        <input
          type="file"
          id="menuPhoto"
          accept="image/*"
          @change="handleFileUpload"
          class="block w-full cursor-pointer rounded-xl border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none"
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
              v-model="menuName"
              id="menuName"
              type="text"
              placeholder="ชื่ออาหาร"
              required
              class="block w-full rounded-xl border border-gray-300 p-1 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div class="w-full">
            <label
              for="menuPrice"
              class="mb-2 block text-lg font-medium text-gray-800"
              >ราคา</label
            >
            <input
              v-model.number="menuPrice"
              id="menuPrice"
              type="number"
              placeholder="ราคา"
              required
              class="block w-full rounded-xl border border-gray-300 p-1 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
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
            v-model="menuDescription"
            id="menuDescription"
            type="text"
            placeholder="คำอธิบาย"
            required
            class="block w-full rounded-xl border border-gray-300 p-1 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
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
              v-model="section.name"
              :id="'sectionName' + index"
              type="text"
              placeholder="ประเภทตัวเลือก"
              required
              class="block w-full rounded-xl border border-gray-300 p-1 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div class="flex items-end">
            <button
              @click="removesection(index)"
              type="button"
              class="rounded-xl bg-red-500 px-4 py-2 text-white shadow-md transition hover:bg-red-600"
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
              v-model="option.name"
              :id="'optionName' + index + '-' + sIndex"
              type="text"
              placeholder="ชื่อตัวเลือก"
              required
              class="block w-full rounded-xl border border-gray-300 p-1 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label
              :for="'optionPrice' + index + '-' + sIndex"
              class="mb-2 block text-lg font-medium text-gray-800"
              >ราคาตัวเลือก</label
            >
            <input
              v-model.number="option.price"
              :id="'optionPrice' + index + '-' + sIndex"
              type="number"
              placeholder="ราคาตัวเลือก"
              required
              class="block w-full rounded-xl border border-gray-300 p-1 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div class="flex items-end">
            <button
              @click="removeoption(index, sIndex)"
              type="button"
              class="rounded-xl bg-red-500 px-4 py-2 text-white shadow-md transition hover:bg-red-600"
            >
              ลบตัวเลือก
            </button>
          </div>
        </div>
        <div class="flex justify-end">
          <button
            @click="addoption(index)"
            type="button"
            class="rounded-xl bg-green-500 px-4 py-2 text-white shadow-md transition hover:bg-green-600"
          >
            เพิ่มตัวเลือก
          </button>
        </div>
      </div>

      <div class="flex flex-col items-center space-y-4">
        <button
          @click="addsection"
          type="button"
          class="rounded-xl bg-blue-500 px-6 py-2 text-white shadow-md transition hover:bg-blue-600"
        >
          เพิ่มประเภทตัวเลือก
        </button>
        <button
          type="submit"
          class="rounded-xl bg-green-500 px-6 py-2 text-white shadow-md transition hover:bg-green-600"
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
