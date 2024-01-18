<template>
  <div>
    <form
      class="mx-auto max-w-xs rounded-lg border border-gray-300 p-2"
      method="POST"
    >
      <h1 class="text-xl md:text-2xl font-bold text-center">
        Create your account
      </h1>
      <div class="grid grid-cols-1">
        <label for="uname"><b>Username</b></label>
        <input type="email" name="" id="" placeholder="Enter Email Address" />
      </div>
      <div class="grid grid-cols-1">
        <label for="psw"><b>Password</b></label>
        <input type="password" name="" id="" placeholder="Enter Password" />
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
</template>
<style>
input {
  @apply bg-black rounded-lg p-1 m-1;
}
</style>
