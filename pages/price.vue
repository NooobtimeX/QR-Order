<template>
	<div class="mt-10">
		<div>
			<h2>เลือกแพ๊คเกจที่เหมาะกับคุณ &nbsp;

			</h2>
			<div class="pt-4"></div>
			<hr class="my-2 border-b-4 border-blue-500 w-full " />

		</div>
		<!-- เลือกโปร -->
		<div class="pt-4">
			<div class="flex justify-center ">
				<!-- โปร-->
				<div class="h-auto w-8/12 h-fit bg-gray-200 rounded-lg">
					<div>
						<p class="font-serif text-5xl text-center">Standard</p>
						<p class="text-center text-base pt-2 "> ตอบโจทย์ทุกความต้องการ กับระบบ POS
							จัดการร้านค้าที่ครบและดีที่สุดจาก Qashier
						</p>
						<p class="text-center text-base pt-2 ">ในราคาที่คุ้มค่า ให้คุณขยายธุรกิจได้อย่างง่ายดาย และสะดวก</p>
						<p class="text-center text-base pt-2 ">ให้คุณจัดการและยกระดับร้านได้ตามใจฝัน</p>
					</div>
					<!-- pic slide -->
					<div>


						<div id="animation-carousel" class="relative w-full" data-carousel="static">
							<!-- Carousel wrapper -->
							<div class="relative h-56 overflow-hidden rounded-lg md:h-96">
								<!-- Item 1 -->
								<div class="hidden duration-200 ease-linear" data-carousel-item>
									<img src="https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?cs=srgb&dl=pexels-jaime-reimer-2662116.jpg&fm=jpg"
										class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
										alt="...">
								</div>
								<!-- Item 2 -->
								<div class="hidden duration-200 ease-linear" data-carousel-item>
									<img src="https://img.freepik.com/premium-photo/breathtaking-view-sunset-fusine-lake-with-mangart-peak-background_761071-1117.jpg?size=626&ext=jpg&ga=GA1.1.632798143.1705622400&semt=ais"
										class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
										alt="...">
								</div>
								<!-- Item 3 -->
								<div class="hidden duration-200 ease-linear" data-carousel-item="active">
									<img src="https://images.unsplash.com/photo-1589670301572-734d642c53d2?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmF0dXJlJTIwdmlld3xlbnwwfHwwfHx8MA%3D%3D"
										class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
										alt="...">
								</div>
								<!-- Item 4 -->
								<div class="hidden duration-200 ease-linear" data-carousel-item>
									<img src="https://assets-global.website-files.com/63d2b478db5869f15ce40d81/641b2b496047282488dcbb69_Skamania%20Lodge_Exterior_River%20View.webp"
										class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
										alt="...">
								</div>
								<!-- Item 5 -->
								<div class="hidden duration-200 ease-linear" data-carousel-item>
									<img src="https://a.travel-assets.com/findyours-php/viewfinder/images/res40/481000/481689-Ocean-View-Norfolk.jpg"
										class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
										alt="...">
								</div>
							</div>
							<!-- Slider controls -->
							<button type="button"
								class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
								data-carousel-prev>
								<span
									class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
									<svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
										<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
											stroke-width="2" d="M5 1 1 5l4 4" />
									</svg>
									<span class="sr-only">Previous</span>
								</span>
							</button>
							<button type="button"
								class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
								data-carousel-next>
								<span
									class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
									<svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
										<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
											stroke-width="2" d="m1 9 4-4-4-4" />
									</svg>
									<span class="sr-only">Next</span>
								</span>
							</button>
						</div>

					</div>
					<!-- button -->
					<div class="flex justify-around">
						<div class="">
							<span class="text-xs">บาท</span>
							<span class="text-base">750</span>
							<span class="text-xs">/เดือน.</span>
						</div>
						<div class="">
							<span class="text-xs">บาท</span>
							<span class="text-base">9000</span>
							<span class="text-xs">/ปี.</span>
						</div>
					</div>

					<div class="flex justify-around">

						<button type="button"
							class=" w-32 h-14 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">รายเดือน</button>
						<button type="button"
							class="w-32 h-14 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">รายปี</button>

					</div>
				</div>

			</div>
		</div>
	</div>
	<!-- โชว์ฟีเจอ -->
	<div class="pt-14">
		<div>
			<h2 class="flex justify-center mb-6">ฟีเจอร์ระบบที่สำหรับคุณ</h2>
		</div>
		<!-- การ์ดฟีเจอ -->
		<div class="flex gap-6 " >


			<div
				class="block max-w-[18rem] rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
				<div class="relative overflow-hidden bg-cover bg-no-repeat">
					<img class="rounded-t-lg" src="https://tecdn.b-cdn.net/img/new/standard/city/062.jpg" alt="" />
				</div>
				<div class="p-6">
					<h5 class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
						Card title
					</h5>
					<p class="text-base text-neutral-600 dark:text-neutral-200">
						Some quick example text to build on the card title and make up the
						bulk of the card's content.
					</p>
				</div>

				
			</div>
			<div
				class="block max-w-[18rem] rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
				<div class="relative overflow-hidden bg-cover bg-no-repeat">
					<img class="rounded-t-lg" src="https://tecdn.b-cdn.net/img/new/standard/city/062.jpg" alt="" />
				</div>
				<div class="p-6">
					<h5 class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
						Card title
					</h5>
					<p class="text-base text-neutral-600 dark:text-neutral-200">
						Some quick example text to build on the card title and make up the
						bulk of the card's content.
					</p>
				</div>

				
			</div>




		</div>
	</div>
	<div class="pt-10"></div>
</template>

<script>
export default {

}
</script>

<style ></style>