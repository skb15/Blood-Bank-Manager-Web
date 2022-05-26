<template>
  <div class="flex flex-col gap-6 w-[475px] mb-20">
    <div
      v-for="group in ['+', '-']"
      :key="group"
      class="flex justify-between text-2xl font-medium text-red-500 pl-[24px]"
    >
      <span>A{{ group }}</span>
      <span class="italic">255</span>
      <input type="number" class="border-2 text-black w-36" />
    </div>
  </div>
</template>