<template>
  <div class="flex justify-between items-center">
    <div class="mr-10 justify-self-start">
      <!-- สำหรับใส่รูปโปรโมท -->
      <img src="/logo/test.png" alt="teenoi" class="" />
    </div>

    <!-- ล็อกอิน-->
    <div class="pt-10 flex items-center">
      <form
        class="mx-auto w-96 rounded-lg border border-gray-300 p-2"
        method="POST"
      >
        <h1 class="text-xl md:text-2xl font-bold text-center">Login</h1>
        <div class="grid grid-cols-1">
          <label for="uname"><b>Username</b></label>
          <input
            type="email"
            name=""
            id=""
            placeholder="Enter Email Address"
            class="bg-white border border-gray-300 w-80 py-2 px-3"
          />
        </div>
        <div class="grid grid-cols-1">
          <label for="psw"><b>Password</b></label>
          <input
            type="password"
            name=""
            id=""
            placeholder="Enter Password"
            class="bg-white border border-gray-300 w-80 py-2 px-3"
          />
        </div>
        <div class="text-right">
          <a
            href="#"
            class="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700"
            >Forgot Password?
          </a>
        </div>
        <div class="mx-auto text-center">
          <button
            class="mx-auto text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-6 py-2 mt-2 text-center"
            type="submit"
          >
            Login
          </button>
        </div>
        <hr class="my-2 border-gray-300 w-full" />
        <p>
          Need an account?
          <a href="#" class="text-blue-500 hover:text-blue-700 font-semibold"
            >Create an account</a
          >
        </p>
      </form>
    </div>
  </div>
  <div class="pt-10"></div>
</template>
<style>
input {
  @apply bg-black rounded-lg p-1 m-1;
}
</style>
