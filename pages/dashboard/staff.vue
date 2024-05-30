<template>
  <NuxtLayout name="owner">
    <h1 class="m-2 text-center font-bold">STAFF</h1>
    <div class="overflow-x-auto">
      <table class="w-full table-auto">
        <thead>
          <tr class="">
            <th v-for="header in headers" :key="header">
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="bg-violet-100 transition duration-150 hover:bg-violet-300">
            <td>
              <div class="flex justify-center">
                <input
                  v-model="newEmployee.userName"
                  placeholder="Username"
                  maxlength="8"
                />
              </div>
            </td>
            <td>
              <div class="flex justify-center">
                <input
                  v-model="newEmployee.password"
                  placeholder="Password"
                  maxlength="8"
                />
              </div>
            </td>
            <td class="flex items-center justify-center">
              <IconAdd @click="addEmployee" />
            </td>
          </tr>
          <tr
            v-for="(user, index) in users"
            :key="index"
            class="border-t transition duration-150"
          >
            <td>
              {{ user.userName }}
            </td>
            <td>
              {{ user.password }}
            </td>
            <td class="flex items-center justify-center">
              <IconDelete @click="deleteEmployee(index)" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref } from "vue";

const headers = ref(["USER NAME", "PASSWORD", "ACTION"]);

const users = ref([
  {
    userName: "staff01",
    password: "staff01",
  },
  {
    userName: "staff02",
    password: "staff02",
  },
  {
    userName: "staff03",
    password: "staff03",
  },
  {
    userName: "staff04",
    password: "staff04",
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
