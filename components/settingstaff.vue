<template>
  <h1>ตั้งค่าพนักงาน</h1>
  <table class="min-w-full">
    <thead>
      <tr class="">
        <th v-for="header in headers" :key="header">
          {{ header }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(user, index) in users"
        :key="index"
        class="border-t transition duration-150"
      >
        <td>
          {{ user.userName }}
        </td>
        <td class="flex items-center justify-center">
          <IconDelete @click="deleteEmployee(index)" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { ref } from "vue";

const headers = ref(["USER NAME", "ACTION"]);

const users = ref([
  {
    userName: "staff01",
  },
  {
    userName: "staff02",
  },
  {
    userName: "staff03",
  },
  {
    userName: "staff04",
  },
]);

const newEmployee = ref({
  userName: "",
  password: "",
});

const addEmployee = () => {
  if (newEmployee.value.userName && newEmployee.value.password) {
    const usernameRegex = /^[a-zA-Z]+$/;
    if (!usernameRegex.test(newEmployee.value.userName)) {
      alert("Username must consist only of letters (A-Z, a-z) with no spaces.");
      return;
    }

    // Add the employee
    users.value.push({
      userName: newEmployee.value.userName,
      password: newEmployee.value.password,
    });
    newEmployee.value.userName = "";
    newEmployee.value.password = "";
  }
};

const deleteEmployee = (index: number) => {
  users.value.splice(index, 1);
};
</script>
