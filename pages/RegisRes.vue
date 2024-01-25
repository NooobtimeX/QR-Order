<template>
    <div>

        <div class="isolate bg-white px-6 py-16  ">
            <!-- หัว-->
            <div class="mx-auto max-w-2xl text-center">
                <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Your Restuarant </h2>

            </div>
            <form action="#" method="POST" class="mx-auto mt-16 max-w-xl sm:mt-20">
                <h3 class="text-lg font-semibold text-black">Contact Information</h3>
                <!-- ฟอร์มคอนแทค-->
                <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div>
                        <label for="first-name" class="block text-sm font-semibold leading-6 text-black">First name</label>
                        <div class="mt-2.5">
                            <input type="text" name="" id="" autocomplete="given-name"
                                class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm shadow-blue-500 ring-1 ring-inset ring-blue-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6">
                        </div>
                    </div>
                    <div>
                        <label for="last-name" class="block text-sm font-semibold leading-6 text-black">Last name</label>
                        <div class="mt-2.5">
                            <input type="text" name="" id="" autocomplete="family-name"
                                class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset shadow-blue-500 ring-blue-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6">
                        </div>
                    </div>

                    <div class="sm:col-span-2">
                        <label for="company" class="block text-sm font-semibold leading-6 text-black">Phone Number</label>
                        <div class="mt-2.5">
                            <input type="text" name="" id="" autocomplete="Phone"
                                class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset shadow-blue-500 ring-blue-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6">
                        </div>
                    </div>
                    <div class="sm:col-span-2">
                        <label for="email" class="block text-sm font-semibold leading-6 text-black">Email</label>
                        <div class="mt-2.5">
                            <input type="email" name="" id="" autocomplete="email"
                                class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset shadow-blue-500 ring-blue-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6">
                        </div>
                    </div>

                    <div class="sm:col-span-2">
                        <label for="company" class="block text-sm font-semibold leading-6 text-black">Company</label>
                        <div class="mt-2.5">
                            <input type="text" name="" id="" autocomplete="organization"
                                class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset shadow-blue-500 ring-blue-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6">
                        </div>
                    </div>
                </div>
                
                <h3 class="text-lg font-semibold text-black pt-4">Restuarant Information</h3>
                 <!-- ฟอร์มร้านอาหาร-->
                <div>
                    <div>
                        <p class="text-lg font-semibold text-black">เลือกรูปแบบร้านอาหารของคุณ</p>
                        <input type="radio" id="" name="" value="">
                        <label for="html" class="text-sm font-semibold leading-6 text-black">ร้านอาหาร</label><br>
                        <input type="radio" id="" name="f" value="">
                        <label for="css" class=" text-sm font-semibold leading-6 text-black">ร้านบุฟเฟต์</label><br>
                    </div>
                    <div>
                        <label for="Res-name" class="block text-sm font-semibold leading-6 text-black">ชื่อร้านอาหาร</label>
                        <div class="mt-2.5">
                            <input type="text" name="" id="" autocomplete="e"
                                class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm shadow-blue-500 ring-1 ring-inset ring-blue-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6">
                        </div>
                    </div>

                </div>
                <div class="mt-10">
                    <button type="submit"
                        class="block w-full rounded-md bg-cyan-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Submit</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    setup() {


        return {}
    }
}
</script>

<style lang="scss" scoped></style>