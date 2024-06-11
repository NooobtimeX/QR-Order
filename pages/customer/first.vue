<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="grid grid-cols-1 gap-4">
        <button @click="orderFood" class="bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-700">
        สั่งอาหาร
      </button>
      <button @click="callStaff" class="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700">
        เรียกพนักงาน
      </button>
      
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    callStaff() {
      alert('เรียกพนักงาน');
    },
    orderFood() {
      alert('สั่งอาหาร');
    }
  }
}
</script>

<style scoped>
/* คุณสามารถเพิ่มการสไตล์เพิ่มเติมได้ที่นี่ */
</style>
