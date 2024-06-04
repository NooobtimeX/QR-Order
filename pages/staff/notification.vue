<template>
  <NuxtLayout name="staff">
    <div class="container mx-auto">
      <h1 class="mb-8">NOTIFICATION</h1>
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-green-700">
          <tr>
            <th>TABLE</th>
            <th>TIME</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 bg-white">
          <tr
            v-for="(notification, index) in notifications"
            :key="index"
            class="bnotification-t transition duration-150"
          >
            <td class="whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ notification.table }}</div>
            </td>

            <td class="whitespace-nowrap px-6 py-4">
              <div class="text-sm text-gray-900">{{ notification.time }}</div>
            </td>
            <td class="text-center">
              <div class="flex h-full items-center justify-center">
                <span
                  :class="{
                    'inline-block rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-800':
                      notification.status === 'ยกเลิก',
                  }"
                >
                  {{ notification.status }}
                </span>
                <IconDelete @click="deleteNotification(index)" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { ref } from "vue";

const notifications = ref([
  { table: "5", time: "1:45 PM" },
  // Add more notifications if needed
]);

const deleteNotification = (index) => {
  notifications.value.splice(index, 1);
};
</script>
