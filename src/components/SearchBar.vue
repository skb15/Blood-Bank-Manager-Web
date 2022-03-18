<template>
  <div class="flex gap-4 relative">
    <img
      src="../assets/search.svg"
      alt="Search"
      class="absolute left-3 top-2 w-6 h-6"
    />
    <input
      v-model="pincode"
      type="text"
      class="pl-12 py-1 pr-4 border-[2.5px] border-slate-600 rounded-md w-full"
    />
    <!-- This example requires Tailwind CSS v2.0+ -->
    <div class="absolute inline-block text-left right-24">
      <div>
        <button
          @click="toggleDropdown"
          type="button"
          class="
            inline-flex
            justify-center
            w-fit
            h-10
            right-24
            rounded-tr-md rounded-br-md
            px-4
            py-2
            bg-slate-800
            text-sm
            font-medium
            text-white
            hover:bg-slate-900
          "
        >
          Group
          <img src="../assets/caret.svg" alt="caret" class="w-6 h-6" />
        </button>
      </div>
      <div
        v-if="isDropdown"
        class="
          absolute
          right-0
          mt-2
          w-[128px]
          rounded-md
          shadow-lg
          bg-slate-800
          focus:outline-none
        "
      >
        <div class="py-1">
          <div v-for="group in ['A', 'B', 'AB', 'O']" :key="group" class="flex">
            <button class="text-white px-4 py-2 w-1/2 text-sm hover:bg-red-500">
              {{ group }}+
            </button>
            <button class="text-white px-4 py-2 w-1/2 text-sm hover:bg-red-500">
              {{ group }}-
            </button>
          </div>
        </div>
      </div>
    </div>
    <button
      @click="getBanks()"
      class="bg-red-600 text-white px-3 py-2 rounded-md"
    >
      Search
    </button>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent } from "vue";
import { Bank } from "../App.vue";

export default defineComponent({
  name: "SearchBar",
  data() {
    return { pincode: 700149, isDropdown: false };
  },
  methods: {
    getBanks() {
      axios
        .get(`http://127.0.0.1:5000/hospitals?pincode=${this.pincode}`)
        .then((res: { data: Bank[] }) => {
          /*   console.log(res.data); */
          this.$emit("search", [...res.data]);
        });
    },
    toggleDropdown() {
      this.isDropdown = !this.isDropdown;
    },
  },
});
</script>

<style lang="scss" scoped>
input::before {
  content: url("../assets/search.svg");
}
</style>

