<template>
  <main class="mx-10 my-5 flex flex-col gap-10">
    <section class="flex items-center justify-between">
      <img src="../assets/logo.svg" alt="logo" />
      <button class="bg-red-500 px-12 py-3 text-white rounded font-medium">
        Log out
      </button>
    </section>
    <section class="flex flex-col gap-3">
      <h3 class="text-2xl">Welcome to your dashboard</h3>
      <h1 class="text-6xl font-bold">Hospital Name Here</h1>
      <h6 class="text-xl">Elachi narandrapur Kolkata 700103</h6>
    </section>
    <section>
      <span
        class="
          bg-red-100/60
          text-red-500 text-xl
          font-medium
          py-3
          px-6
          max-w-full
          block
          mb-20
        "
        >Update blood supply details</span
      >
      <div class="grid grid-cols-2 mx-6 max-w-fit gap-x-20">
        <div
          v-for="i in [0, 1]"
          :key="i"
          class="flex justify-between text-lg mb-6 pr-6 pl-2"
        >
          <span>Group</span>
          <span>Current</span>
          <span>your entry</span>
        </div>
        <BloodInput v-for="type in ['A', 'AB', 'B', 'O']" :key="type" />
      </div>
    </section>
  </main>
</template>
<script lang="ts">
import { defineComponent } from "vue";

import BloodInput from "../components/BloodInput.vue";

export default defineComponent({
  name: "AdminDashboard",
  components: {
    BloodInput,
  },
});
</script>