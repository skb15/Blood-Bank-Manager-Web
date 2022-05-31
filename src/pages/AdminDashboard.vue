<template>
  <main class="px-10 py-2 flex flex-col gap-8 relative h-screen">
    <section class="flex items-center justify-between">
      <img src="../assets/logo.svg" alt="logo" />
      <button
        class="
          bg-red-500
          px-12
          py-3
          text-white
          rounded
          font-medium
          hover:border-2
          hover:bg-white
          hover:border-red-500
          hover:text-red-500
          hover:font-medium
        "
      >
        Log out
      </button>
    </section>
    <section class="flex flex-col gap-3 text-center text-gray-800">
      <h3 class="text-2xl uppercase text-red-500 font-medium">
        Welcome to your dashboard
      </h3>
      <h1 class="text-6xl font-bold">Hospital Name Here</h1>
      <h6 class="text-xl mt-4">
        <img class="inline-block" src="../assets/geo-alt-fill.svg" alt="Geo" />
        Elachi narandrapur Kolkata 700103
      </h6>
    </section>
    <section class="flex flex-row gap-8">
      <section class="w-3/5">
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
          <div v-for="group in ['A', 'B', 'AB', 'O']" :key="group">
            <BloodInput
              v-for="rh in ['+', '-']"
              :key="rh"
              :group="group"
              :rh="rh"
              :oldCount="oldStocks[group][rh]"
              @update="updateCount"
            />
          </div>
        </div>
      </section>
      <section class="w-2/5">
        <div class="bg-gray-800 text-white flex flex-col p-6 gap-4 rounded">
          <span>Change Hospital Name</span>
          <input type="text" class="p-1 rounded" />
          <span>Change Address</span>
          <input type="text" class="p-1 rounded" />
          <button
            class="
              rounded
              bg-gray-800
              p-1
              border-2 border-white
              mt-4
              hover:bg-red-500 hover:border-red-500 hover:font-medium
            "
          >
            Add Google map Location
          </button>
        </div>
        <input
          type="checkbox"
          id="checkbox"
          name="checkbox"
          class="mr-2 mt-5"
        />
        <label for="checkbox">
          by checking this box you confirm to give us the permission to make
          your edited changes and show it to the end users live.</label
        >
        <button
          @click="submitCount"
          class="
            rounded
            bg-red-500
            text-white
            h-12
            p-3
            mt-3
            w-full
            hover:border-2
            hover:bg-white
            hover:border-red-500
            hover:text-red-500
            hover:font-medium
          "
        >
          save all changes and update
        </button>
      </section>
    </section>
    <section>
      <div
        class="
          text-center
          items-center
          py-4
          bg-slate-800
          text-white
          w-full
          absolute
          bottom-0
          left-0
        "
      >
        <h4 class="text-lg inline mr-4">
          contact us : 9825641245 | 7851151542
        </h4>
        <h4 class="text-lg inline">Mail us : info@bloodbankmanager.com</h4>
        <p class="mt-2">This is a demo Website of Bloodbank manager</p>
      </div>
    </section>
  </main>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import BloodInput from "../components/BloodInput.vue";

const Stocks = {
  A: 0,
  B: 0,
  AB: 0,
  O: 0,
};
const Rh = {
  "+": 0,
  "-": 0,
};

export default defineComponent({
  name: "AdminDashboard",
  components: {
    BloodInput,
  },
  data() {
    return {
      oldStocks: {
        A: { "+": 255, "-": 14 },
        B: { "+": 55, "-": 550 },
        AB: { "+": 15, "-": 105 },
        O: { "+": 250, "-": 25 },
      },
      newStocks: {
        A: { "+": 0, "-": 0 },
        B: { "+": 0, "-": 0 },
        AB: { "+": 0, "-": 0 },
        O: { "+": 0, "-": 0 },
      },
    };
  },
  methods: {
    updateCount(input: {
      group: keyof typeof Stocks;
      rh: keyof typeof Rh;
      newCount: number;
    }) {
      console.log("in Admin Dashboard", input);

      this.newStocks[input.group][input.rh] = input.newCount;
    },
    submitCount() {
      console.log(this.newStocks);

      axios.put("http://127.0.0.1:5000/hospitals/4", {
        name: "Subhasgram Government Hospital",
        address: "Subhasgram, Kolkata, West Bengal, South 24 Paragans",
        pincode: 700147,
        coordinate: {
          lat: 22.4127,
          long: 88.4331,
        },
        stock: this.newStocks,
      });
    },
  },
});
</script>