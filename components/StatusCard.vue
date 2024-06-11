<template>
  <section class="grid gap-5 md:grid-cols-2">
    <!-- Revenue -->
    <div class="bg-card rounded-lg border p-6">
      <div class="flex items-center justify-between">
        <p class="text-sm font-medium">Total Revenue</p>
        <span class="shrink-0">
          <Icon
            name="heroicons:banknotes"
            class="text-muted-foreground h-4 w-4"
          />
        </span>
      </div>

      <p class="mt-1.5 text-xl font-extrabold">$45,231.89</p>
      <p class="text-muted-foreground text-xs">20% more than last month</p>
    </div>
    <!-- Sales -->
    <div class="bg-card rounded-lg border p-6">
      <div class="flex items-center justify-between">
        <p class="text-sm font-medium">Sales</p>
        <span class="shrink-0">
          <Icon
            name="heroicons:credit-card"
            class="text-muted-foreground h-4 w-4"
          />
        </span>
      </div>

      <p class="mt-1.5 text-xl font-extrabold">$12,231</p>
      <p class="text-muted-foreground text-xs">13.2% more than last month</p>
    </div>
  </section>
</template>
