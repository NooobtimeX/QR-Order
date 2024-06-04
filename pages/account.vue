<template>
  <NuxtLayout name="owner">
    <div class="overflow-hidden rounded-lg border bg-white">
      <div class="px-4 py-5 text-center sm:px-6">
        <h3 class="text-lg font-medium leading-6 text-gray-900">
          User Profile
        </h3>
      </div>
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
                  class="h-auto w-auto rounded-lg text-white"
                >
                  บันทึก
                </button>
                <button
                  @click="cancelEdit(index)"
                  class="h-auto w-auto rounded-lg text-white"
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
    label: "ชื่อ - นามสกุล",
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
    value: "123 Main St<br />Anytown, USA 12345",
    editing: false,
    editedValue: "",
  },
  {
    label: "ชื่อร้านอาหาร",
    value: "ก๊วยเตี๋ยว RS trophy",
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
