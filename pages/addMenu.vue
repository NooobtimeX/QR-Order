<template>
    <div class="max-w-lg mx-auto py-10">
      <h1 class="text-2xl font-bold mb-5">Upload Product</h1>
      <form @submit.prevent="submitForm" class="grid grid-cols-1 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Product Image</label>
          <input type="file" @change="handleFileUpload" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>
  
        <div>
          <label class="block text-sm font-medium text-gray-700">Product Name</label>
          <input v-model="productName" type="text" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>
  
        <div>
          <label class="block text-sm font-medium text-gray-700">Product Category</label>
          <select v-model="productCategory" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
            <option value="" disabled>Select a category</option>
            <option value="เนื้อวัว">เนื้อวัว</option>
            <option value="หมู">หมู</option>
            <option value="ไก่">ไก่</option>
          </select>
        </div>
  
        <div>
          <label class="block text-sm font-medium text-gray-700">Options</label>
          <div v-for="(option, index) in soupOptions" :key="index" class="grid grid-cols-2 gap-4">
            <input v-model="option.name" type="text" class="block w-full border border-gray-300 rounded-md shadow-sm p-2" placeholder="Enter Option Name" />
            <input v-model="option.price" type="number" class="block w-full border border-gray-300 rounded-md shadow-sm p-2" placeholder="Enter Option Price" />
            <button type="button" @click="removeSoupOption(index)" class="col-span-2 bg-red-500 text-white py-2 rounded-md shadow-sm hover:bg-red-600">Remove</button>
          </div>
          <button type="button" @click="addSoupOption" class="mt-2 w-full bg-green-500 text-white py-2 rounded-md shadow-sm hover:bg-green-600">Add Option</button>
        </div>
  
        <button type="submit" class="mt-5 w-full bg-blue-500 text-white py-2 rounded-md shadow-sm hover:bg-blue-600">Upload</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        productName: '',
        productCategory: '',
        productImage: null,
        soupOptions: [{ name: '', price: '' }],
      };
    },
    methods: {
      handleFileUpload(event) {
        this.productImage = event.target.files[0];
      },
      addSoupOption() {
        this.soupOptions.push({ name: '', price: '' });
      },
      removeSoupOption(index) {
        this.soupOptions.splice(index, 1);
      },
      submitForm() {
        const formData = new FormData();
        formData.append('name', this.productName);
        formData.append('category', this.productCategory);
        formData.append('image', this.productImage);
        formData.append('soupOptions', JSON.stringify(this.soupOptions));
  
        this.$axios.post('/api/products', formData)
          .then(response => {
            console.log('Product uploaded:', response.data);
            // Reset form or perform other actions as needed
          })
          .catch(error => {
            console.error('Error uploading product:', error);
          });
      },
    },
  };
  </script>
  
  <style>
  /* Additional styles can be added here if needed */
  </style>
  