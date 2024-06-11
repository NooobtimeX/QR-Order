<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-100">
    <div class="grid grid-cols-1 gap-4">
      <button
        @click="orderFood"
        class="rounded-md bg-green-500 px-4 py-2 text-white shadow-md hover:bg-green-700"
      >
        สั่งอาหาร
      </button>
      <button
        @click="callStaff"
        class="rounded-md bg-blue-500 px-4 py-2 text-white shadow-md hover:bg-blue-700"
      >
        เรียกพนักงาน
      </button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    callStaff() {
      alert("เรียกพนักงาน");
    },
    orderFood() {
      alert("สั่งอาหาร");
    },
  },
};
</script>

<style scoped>
/* คุณสามารถเพิ่มการสไตล์เพิ่มเติมได้ที่นี่ */
</style>
