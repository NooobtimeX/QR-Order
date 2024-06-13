<template>
  <NuxtLayout>
    <h1>ที่อยู่ร้านอาหาร</h1>
    <div class="overflow-hidden rounded-xl border bg-white">
      <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl class="sm:divide-y sm:divide-gray-200">
          <div
            v-for="(field, index) in profileFields"
            :key="index"
            class="py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5"
          >
            <dt class="text-sm font-medium text-gray-500">
              {{ field.label }} &nbsp;
            </dt>
            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <template v-if="!field.editing" class="text-center">
                {{ field.value }}
                <IconEdit @click="editField(index)" />
              </template>
              <template v-else>
                <input
                  v-model="field.editedValue"
                  class="rounded-md border border-gray-300 px-2 py-1"
                />
                <button
                  @click="saveField(index)"
                  class="h-auto w-auto rounded-xl text-white"
                >
                  บันทึก
                </button>
                <button
                  @click="cancelEdit(index)"
                  class="h-auto w-auto rounded-xl text-white"
                >
                  ยกเลิก
                </button>
              </template>
            </dd>
          </div>
        </dl>
      </div>
    </div></NuxtLayout
  >
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
    label: "email",
    value: "johndoe@example.com",
    editing: false,
    editedValue: "",
  },
  {
    label: "phoneNumber",
    value: "(123) 456-7890",
    editing: false,
    editedValue: "",
  },
  {
    label: "no",
    value: "123",
    editing: false,
    editedValue: "",
  },
  {
    label: "street",
    value: "Main St",
    editing: false,
    editedValue: "",
  },
  {
    label: "subdistrict",
    value: "Anytown",
    editing: false,
    editedValue: "",
  },
  {
    label: "district",
    value: "Anytown",
    editing: false,
    editedValue: "",
  },
  {
    label: "province",
    value: "USA",
    editing: false,
    editedValue: "",
  },
  {
    label: "zipCode",
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
