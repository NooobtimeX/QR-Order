<template>
  <NuxtLayout>
    <h1 class="text-2xl font-semibold text-center my-4">ที่อยู่ร้านอาหาร</h1>
    <div class="overflow-hidden rounded-lg border bg-white shadow-md">
      <div class="border-t border-gray-200 p-3">
        <dl class="divide-y divide-gray-200">
          <div
            v-for="(field, index) in profileFields"
            :key="index"
            class="py-2 grid grid-cols-3 gap-2 px-4"
          >
            <dt class="text-sm font-medium text-gray-700">
              {{ field.label }}
            </dt>
            <dd class="mt-1 text-sm text-gray-900 col-span-2 mt-0">
              <template v-if="!field.editing">
                <div class="flex justify-between items-center">
                  <span class="text-base">{{ field.value }}</span>
                  <IconEdit @click="editField(index)" class="cursor-pointer text-blue-500" />
                </div>
              </template>
              <template v-else>
                <input
                  v-model="field.editedValue"
                  class="rounded-md border border-gray-300 px-2 py-1 mr-2 text-sm flex-1"
                />
                <button
                  @click="saveField(index)"
                  class="h-auto w-auto rounded-md bg-green-500 text-white text-sm px-2 py-1 mr-2 hover:bg-green-600 transition-colors"
                >
                  บันทึก
                </button>
                <button
                  @click="cancelEdit(index)"
                  class="h-auto w-auto rounded-md bg-red-500 text-white text-sm px-2 py-1 hover:bg-red-600 transition-colors"
                >
                  ยกเลิก
                </button>
              </template>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { ref } from "vue";

const profileFields = ref([
  {
    label: "ชื่อร้านอาหาร",
    value: "John Doe",
    editing: false,
    editedValue: "",
  },
  {
    label: "อีเมล",
    value: "johndoe@example.com",
    editing: false,
    editedValue: "",
  },
  {
    label: "เบอร์โทร",
    value: "(123) 456-7890",
    editing: false,
    editedValue: "",
  },
  {
    label: "ที่อยู่",
    value: "123",
    editing: false,
    editedValue: "",
  },
  {
    label: "ถนน",
    value: "Main St",
    editing: false,
    editedValue: "",
  },
  {
    label: "ตำบล",
    value: "Anytown",
    editing: false,
    editedValue: "",
  },
  {
    label: "อำเภอ",
    value: "Anytown",
    editing: false,
    editedValue: "",
  },
  {
    label: "จังหวัด",
    value: "USA",
    editing: false,
    editedValue: "",
  },
  {
    label: "ไปรษณีย์",
    value: "12345",
    editing: false,
    editedValue: "",
  },
  { label: "รูปภาพ", value: "รูปภาพ", editing: false, editedValue: "" },
]);

const editField = (index) => {
  profileFields.value[index].editing = true;
  profileFields.value[index].editedValue = profileFields.value[index].value;
};

const saveField = (index) => {
  profileFields.value[index].value = profileFields.value[index].editedValue;
  profileFields.value[index].editing = false;
};

const cancelEdit = (index) => {
  profileFields.value[index].editing = false;
};
</script>
