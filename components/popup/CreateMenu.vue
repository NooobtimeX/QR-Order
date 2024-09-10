<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div
      class="relative max-h-[75vh] overflow-y-auto rounded-lg bg-white p-4 shadow-lg"
    >
      <h1 class="mb-5 text-center text-3xl font-bold text-black">
        Create Menu
      </h1>
      <form @submit.prevent="submitForm">
        <!-- Restaurant Selection -->
        <div>
          <label for="restaurant" class="block text-sm font-bold text-black"
            >Select Restaurant</label
          >
          <select
            id="restaurant"
            v-model="selectedRestaurant"
            class="mt-1 block w-full rounded-lg border border-gray-400 p-2 text-black shadow-sm"
            aria-required="true"
            required
          >
            <option
              v-for="restaurant in restaurants"
              :key="restaurant.id"
              :value="restaurant.id"
              class="text-black"
            >
              {{ restaurant.name }}
            </option>
          </select>
        </div>

        <!-- Menu Name and Price -->
        <div class="mt-4 grid grid-cols-1 gap-4">
          <div class="flex space-x-4">
            <div class="w-4/5">
              <label for="menu-name" class="block text-sm font-bold text-black"
                >Menu Name</label
              >
              <input
                id="menu-name"
                v-model="menuName"
                type="text"
                class="mt-1 block w-full border-gray-400 p-2 shadow-sm"
                placeholder="Enter menu name"
                aria-required="true"
                required
              />
            </div>
            <div class="w-1/5">
              <label
                for="price"
                class="block border-gray-400 text-sm font-bold text-black"
                >Price</label
              >
              <input
                id="price"
                v-model.number="price"
                type="number"
                class="mt-1 block w-full border-gray-400 p-2 shadow-sm"
                placeholder="Enter price"
                aria-required="true"
                required
              />
            </div>
          </div>

          <!-- Category Selection -->
          <div>
            <label for="category" class="block text-sm font-bold text-black"
              >Category</label
            >
            <div class="flex items-center space-x-2">
              <select
                id="category"
                v-model="selectedCategory"
                class="mt-1 block w-full rounded-lg border border-gray-400 p-2 text-black shadow-sm"
                aria-required="true"
                required
              >
                <option
                  v-for="category in categories"
                  :key="category.id"
                  :value="category.id"
                  class="text-black"
                >
                  {{ category.name }}
                </option>
              </select>
              <button
                type="button"
                @click="openAddCategoryPopup"
                class="bg-green-500 text-white hover:bg-green-700"
              >
                Add Category
              </button>
            </div>
          </div>

          <!-- Description -->
          <div>
            <label for="description" class="block text-sm font-bold text-black"
              >Description</label
            >
            <textarea
              id="description"
              v-model="description"
              class="mt-1 block w-full rounded-lg border border-gray-400 p-2 text-black shadow-sm"
              placeholder="Enter description"
              aria-required="true"
              required
            ></textarea>
          </div>

          <!-- Sections -->
          <div>
            <label class="block text-sm font-bold text-black">Sections</label>
            <div
              v-for="(section, sectionIndex) in sections"
              :key="sectionIndex"
              class="mb-4 rounded-3xl border border-gray-400 p-2"
            >
              <div class="mb-1 flex items-center justify-between">
                <input
                  v-model="section.name"
                  type="text"
                  class="mb-1 block w-full border-gray-400 p-2 shadow-sm"
                  placeholder="Section Name"
                  aria-required="true"
                  requiredw
                />
                <button
                  type="button"
                  @click="removeSection(sectionIndex)"
                  class="bg-red-500 p-1 text-white hover:bg-red-02"
                >
                  Remove
                </button>
              </div>

              <div
                v-for="(option, optionIndex) in section.options"
                :key="optionIndex"
                class="flex items-center gap-1"
              >
                <input
                  v-model="option.name"
                  type="text"
                  class="w-7/12 border-gray-400 p-2 shadow-sm"
                  placeholder="Option Name"
                  aria-required="true"
                  required
                />
                <input
                  v-model.number="option.price"
                  type="number"
                  class="w-3/12 border-gray-400 p-2 shadow-sm"
                  placeholder="Option Price"
                  aria-required="true"
                  required
                />
                <button
                  type="button"
                  @click="removeOption(sectionIndex, optionIndex)"
                  class="w-2/12 bg-red-500 text-white hover:bg-red-02"
                >
                  Remove
                </button>
              </div>
              <button
                type="button"
                @click="addOption(sectionIndex)"
                class="5 mt-2 w-full bg-green-500 p-2 text-white hover:bg-green-700"
              >
                Add Option
              </button>
            </div>
            <button
              type="button"
              @click="addSection"
              class="w-full bg-green-500 p-2 text-white hover:bg-green-700"
            >
              Add Section
            </button>
          </div>

          <!-- Submit and Cancel Buttons -->
          <div class="flex justify-end space-x-2">
            <button
              type="submit"
              class="w-1/3 bg-green-500 p-2 text-white hover:bg-green-700"
            >
              Create Menu
            </button>
            <button
              @click="closeModal"
              class="w-1/3 bg-red-500 p-2 text-white hover:bg-red-02"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>

    <!-- Popup for adding category -->
    <div
      v-if="showAddCategoryPopup"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="relative max-w-md rounded-lg bg-white p-4 shadow-lg">
        <h2 class="text-lg font-bold text-black">Add New Category</h2>
        <label
          for="new-category-name"
          class="block text-sm font-medium text-black"
          >Category Name</label
        >
        <input
          id="new-category-name"
          v-model="newCategoryName"
          type="text"
          class="mt-1 block w-full border-gray-400 p-2 shadow-sm"
          placeholder="Enter category name"
          aria-required="true"
          required
        />
        <div class="mt-4 flex justify-end space-x-2">
          <button
            @click="submitCategory"
            class="bg-green-500 text-white hover:bg-green-700"
          >
            Add Category
          </button>
          <button
            @click="closeAddCategoryPopup"
            class="bg-red-500 text-white hover:bg-red-02"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, onMounted } from "vue";
import axios from "axios";
import Cookies from "js-cookie";

// Define interfaces for restaurants, categories, sections, and options
interface Restaurant {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
}

interface Section {
  name: string;
  options: Option[];
}

interface Option {
  name: string;
  price: number;
}

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["close"]);

const menuName = ref("");
const description = ref("");
const price = ref<number | null>(null);
const sections = ref<Section[]>([
  { name: "", options: [{ name: "", price: 0 }] },
]);
const categories = ref<Category[]>([]);
const restaurants = ref<Restaurant[]>([]);
const selectedCategory = ref<number | null>(null);
const selectedRestaurant = ref<number | null>(null);
const showAddCategoryPopup = ref(false);
const newCategoryName = ref("");

// Fetch all restaurants owned by the user
const fetchRestaurants = async () => {
  try {
    const response = await axios.get("/api/restaurant/getAllRestaurants", {
      params: { userId: Number(Cookies.get("userId")) },
    });
    restaurants.value = response.data.body.ownedRestaurants;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
  }
};

// Fetch categories for the selected restaurant
const fetchCategories = async () => {
  if (!selectedRestaurant.value) return;

  try {
    const response = await axios.post("/api/get/categories", {
      restaurantId: selectedRestaurant.value,
    });
    categories.value = response.data;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }
};

// Watch the selectedRestaurant for changes and fetch categories accordingly
watch(selectedRestaurant, (newRestaurantId) => {
  if (newRestaurantId) {
    fetchCategories();
  }
});

const addSection = () => {
  sections.value.push({ name: "", options: [{ name: "", price: 0 }] });
};

const removeSection = (index: number) => {
  sections.value.splice(index, 1);
};

const addOption = (sectionIndex: number) => {
  sections.value[sectionIndex].options.push({ name: "", price: 0 });
};

const removeOption = (sectionIndex: number, optionIndex: number) => {
  sections.value[sectionIndex].options.splice(optionIndex, 1);
};

const submitForm = async () => {
  if (!selectedCategory.value || !selectedRestaurant.value) {
    console.error("Restaurant and Category are required.");
    return;
  }

  const data = {
    name: menuName.value,
    description: description.value,
    price: price.value,
    categoryId: selectedCategory.value,
    restaurantId: selectedRestaurant.value,
    sections: sections.value,
  };

  try {
    await axios.post("/api/restaurant/addMenu", data);
    closeModal();
  } catch (error) {
    console.error("Error creating menu:", error);
  }
};

const closeModal = () => {
  emit("close");
};

const openAddCategoryPopup = () => {
  showAddCategoryPopup.value = true;
};

const closeAddCategoryPopup = () => {
  showAddCategoryPopup.value = false;
};

const submitCategory = async () => {
  try {
    await axios.post("/api/restaurant/addCategory", {
      restaurantId: selectedRestaurant.value,
      name: newCategoryName.value,
    });
    await fetchCategories();
    closeAddCategoryPopup();
  } catch (error) {
    console.error("Error adding category:", error);
  }
};

onMounted(() => {
  fetchRestaurants();
});
</script>
