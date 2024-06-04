<template>
  <NuxtLayout name="owner">
    <h1 class="m-2 text-center font-bold">TABLE</h1>
    <div class="mx-auto w-full px-3">
      <table class="w-full border-collapse bg-white shadow-md">
        <!-- Table Header -->
        <thead>
          <tr class="bg-green-600">
            <th>TABLE</th>
            <th>SEAT</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <!-- Table Body -->
        <tbody>
          <!-- New Table Row -->
          <tr class="bg-green-100 transition duration-150 hover:bg-green-300">
            <td>
              <input v-model="newTable.number" type="text" placeholder="name" />
            </td>
            <td>
              <input v-model="newTable.seats" type="text" placeholder="seats" />
            </td>
            <td>
              <div class="flex items-center justify-center">
                <IconAdd @click="addTable" />
              </div>
            </td>
          </tr>
          <!-- Existing Table Rows -->
          <tr
            v-for="(table, index) in tables"
            :key="index"
            class="border-t transition duration-150"
          >
            <td>
              <span v-if="index !== editedIndex">{{ table.number }}</span>
              <input
                v-if="index === editedIndex"
                v-model="editedTable.number"
                type="text"
                @keyup.enter="updateTable"
              />
            </td>
            <td>
              <span v-if="index !== editedIndex">{{ table.seats }}</span>
              <input
                v-if="index === editedIndex"
                v-model="editedTable.seats"
                type="text"
                @keyup.enter="updateTable"
              />
            </td>
            <td>
              <IconEdit
                v-if="index !== editedIndex"
                @click="editTable(index)"
              />
              <button v-if="index === editedIndex" @click="updateTable">
                OK
              </button>
              <IconDelete @click="removeTable(index)" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { ref } from "vue";

const tables = ref([
  { number: "A", seats: "4" },
  { number: "B", seats: "4" },
  { number: "C", seats: "4" },
  { number: "D", seats: "4" },
  { number: "E", seats: "4" },
  { number: "F", seats: "4" },
  { number: "G", seats: "4" },
  { number: "H", seats: "4" },
  { number: "I", seats: "4" },
  { number: "J", seats: "4" },
  { number: "K", seats: "4" },
]);

const newTable = ref({ number: "", seats: "" });
const editedIndex = ref(-1);
const editedTable = ref({ number: "", seats: "" });

const addTable = () => {
  if (
    newTable.value.number.trim() !== "" &&
    newTable.value.seats.trim() !== ""
  ) {
    tables.value.push({
      number: newTable.value.number,
      seats: newTable.value.seats,
    });
    newTable.value.number = "";
    newTable.value.seats = "";
  }
};

const editTable = (index) => {
  editedIndex.value = index;
  editedTable.value.number = tables.value[index].number;
  editedTable.value.seats = tables.value[index].seats;
};

const updateTable = () => {
  if (
    editedTable.value.number.trim() !== "" &&
    editedTable.value.seats.trim() !== ""
  ) {
    tables.value[editedIndex.value].number = editedTable.value.number;
    tables.value[editedIndex.value].seats = editedTable.value.seats;
    editedIndex.value = -1;
    editedTable.value.number = "";
    editedTable.value.seats = "";
  }
};

const removeTable = (index) => {
  tables.value.splice(index, 1);
  if (editedIndex.value === index) {
    editedIndex.value = -1;
    editedTable.value.number = "";
    editedTable.value.seats = "";
  }
};
</script>

<style></style>
