<template>
  <div class="pt-10">
    <form
      class="mx-auto w-auto h-auto rounded-lg border border-gray-300 p-2"
      method="POST"
    >
      <h1 class="text-xl md:text-2xl font-bold text-center">
        Create your account
      </h1>
      <!-- เมล ชื่อ -->
      <div class="grid grid-cols-2 gap-2">
        <div class="w-full">
          <label for="email" class="block text-sm font-bold text-gray-700"
            ><b>Email</b></label
          >
          <input
            type="email"
            name=""
            id=""
            placeholder="Enter Email Address"
            class="w-72 py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 bg-white"
          />
        </div>

        <div class="w-full">
          <label for="fullname" class="block text-sm font-bold text-gray-700"
            ><b>Full Name</b></label
          >
          <input
            type="text"
            name=""
            id=""
            placeholder="First Last"
            class="w-72 py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 bg-white"
          />
        </div>
      </div>

      <!-- เบอ วันเกิด -->
      <div class="flex space-x-4 mt-4">
        <div class="w-full">
          <label for="phonenum" class="block text-sm font-bold text-gray-700"
            ><b>Phone Number</b></label
          >
          <input
            type="text"
            name=""
            id=""
            placeholder="Enter Phone Number"
            class="w-72 py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 bg-white"
          />
        </div>

        <div class="w-full">
          <label for="day" class="block text-sm font-bold text-gray-700"
            ><b>Day</b></label
          >
          <select
            name=""
            id=""
            class="w-40 py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          >
            <option value="" disabled selected>Select Day</option>
            <!-- Add options for days here -->
            <!-- Example: -->
            <option value="1">1</option>
            <option value="2">2</option>
            <!-- ... continue for all days -->
          </select>
        </div>

        <div class="w-full">
          <label for="month" class="block text-sm font-bold text-gray-700"
            ><b>Month</b></label
          >
          <select
            name=""
            id=""
            class="w-40 py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          >
            <option value="" disabled selected>Select Month</option>
            <!-- Add options for months here -->
            <!-- Example: -->
            <option value="January">January</option>
            <option value="February">February</option>
            <!-- ... continue for all months -->
          </select>
        </div>

        <div class="w-full">
          <label for="year" class="block text-sm font-bold text-gray-700"
            ><b>Year</b></label
          >
          <select
            name=""
            id=""
            class="w-40 py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          >
            <option value="" disabled selected>Select Year</option>
            <!-- Add options for years here -->
            <!-- Example: -->
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <!-- ... continue for all years -->
          </select>
        </div>
      </div>

      <!-- พาส -->
      <div class="grid grid-cols-1 mt-4">
        <div class="w-full">
          <label for="Password" class="block text-sm font-bold text-gray-700"
            ><b>Password</b></label
          >
          <input
            type="password"
            name=""
            id=""
            placeholder="Enter Password"
            class="w-72 py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 bg-white"
          />
        </div>
        <div class="w-full">
          <label for="Password" class="block text-sm font-bold text-gray-700"
            ><b>Re-Password</b></label
          >
          <input
            type="password"
            name=""
            id=""
            placeholder="Enter Password"
            class="w-72 py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 bg-white"
          />
        </div>
      </div>

      <div class="mx-auto text-center">
        <button
          class="mx-auto text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-6 py-2 mt-2 text-center"
          type="submit"
        >
          Sign up
        </button>
      </div>
    </form>
  </div>
  <div class="pb-10"></div>
</template>
<style>
input {
  @apply bg-black rounded-lg p-1 m-1;
}
</style>
