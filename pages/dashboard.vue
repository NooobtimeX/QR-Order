<template>
  <div class="container mx-auto p-8">
    <h1 class="text-2xl font-bold mb-4">ยอดขายรายเดือน</h1>
    <div class="grid grid-cols-2 gap-4">
      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-lg font-semibold mb-2">สินค้าที่ขายได้</h2>
        <ul>
          <li v-for="(product, index) in products" :key="index" class="mb-2">{{ product.name }} - {{ product.sales }} หน่วย</li>
        </ul>
      </div>
      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-lg font-semibold mb-2">Visualization</h2>
        <!-- ตรวจสอบว่ามี library อะไรใช้สำหรับ visualization มั้ย -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [
        { name: 'สินค้า A', sales: 100 },
        { name: 'สินค้า B', sales: 150 },
        { name: 'สินค้า C', sales: 200 }
      ]
    }
  }
}
</script>

<style scoped>
/* เรียกใช้ Tailwind CSS classes ได้ตรงนี้ */
</style>
