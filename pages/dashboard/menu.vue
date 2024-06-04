<template>
  <NuxtLayout name="owner">
    <h1>MENU</h1>
    <div class="p-2">
      <nav class="sticky top-0 z-40 flex overflow-x-auto border bg-white">
        <IconAdd class="p-2" @click="addNewCategory" />
        <div
          v-for="category in categories"
          :key="category.name"
          class="px-2 py-4"
        >
          <a :href="'#' + category.name">{{ category.name }}</a>
        </div>
      </nav>
      <div class="mt-4">
        <div
          v-for="category in categories"
          :id="category.name"
          :key="category.name"
          class="mb-2 rounded-lg border p-2"
        >
          <div class="flex items-center">
            <h2 class="text-2xl font-semibold">{{ category.name }}</h2>
            <IconEdit @click="editCategoryName(category)" />
          </div>

          <div class="grid grid-cols-2 gap-2 lg:grid-cols-3 xl:grid-cols-4">
            <div
              v-for="menu in category.menus"
              :key="menu.id"
              class="block rounded-lg border bg-white p-2 transition-shadow duration-300 hover:shadow-lg"
            >
              <img :src="menu.src" class="h-32 w-full object-cover" />
              <div class="p-1">
                <h2 class="text-xl font-semibold">{{ menu.name }}</h2>
                <p class="text-gray-700">{{ menu.price }}฿</p>
              </div>
            </div>
            <div
              class="m-auto transform rounded-lg p-2 transition-transform hover:scale-110"
            >
              <IconAdd @click="togglePopup" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showPopup" class="popup relative z-50 w-11/12 overflow-y-auto">
      <button class="absolute right-0 top-0 m-2" @click="togglePopup">
        close
      </button>
      <creteMenu />
    </div>
    <div v-if="showPopup" class="overlay" @click="togglePopup" />
  </NuxtLayout>
</template>

<script setup>
import { ref } from "vue";
const showPopup = ref(false);
const togglePopup = () => {
  showPopup.value = !showPopup.value;
};
const categories = ref([
  {
    name: "Burger",
    menus: [{ id: 1, name: "Burger A", price: 100, src: "/menu/burger.jpg" }],
  },
  {
    name: "Pizza",
    menus: [{ id: 1, name: "Pizza A", price: 100, src: "/menu/pizza.jpg" }],
  },
]);

const editCategoryName = (category) => {
  const newName = prompt("Enter the new category name:", category.name);
  if (newName !== null && newName !== "") {
    category.name = newName;
  }
};

const addNewCategory = () => {
  const categoryName = prompt("Enter the name of the new category:");
  if (categoryName !== null && categoryName !== "") {
    categories.value.push({ name: categoryName, menus: [] });
  }
};
</script>
<style scoped>
.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border: 1px solid #ccc;
  padding: 20px;
  height: 600px;
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Adjust opacity as needed */
  z-index: 49; /* Ensure the overlay is behind the popup but above other content */
}
</style>
