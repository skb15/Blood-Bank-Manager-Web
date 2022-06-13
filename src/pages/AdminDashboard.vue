<template>
  <main class="relative px-10 py-2 flex flex-col gap-6">
    <section class="flex items-center justify-between">
      <img src="../assets/logo.svg" alt="logo" class="w-56" />
      <button @click="logout" class="
          bg-red-500
          px-8
          py-2
          text-white
          rounded-lg
          font-medium
          border-2
          hover:bg-white
          hover:border-red-500
          hover:text-red-500
        ">
        Log out
      </button>
    </section>
    <section class="flex flex-col gap-3 text-center text-gray-800">
      <h3 class="text-xl uppercase text-red-500 font-medium">
        Welcome to your dashboard
      </h3>
      <h1 class="text-5xl font-bold">{{ name }}</h1>
      <h6 class="text-lg mt-4">
        <img class="inline-block" src="../assets/geo-alt-fill.svg" alt="Geo" />
        {{ address }}
      </h6>
    </section>
    <section class="flex flex-col gap-8 ">
      <span class="
        inline-block
        bg-red-100/60
        text-red-500 text-xl
        font-medium
        py-3
        px-6
        max-w-full
      ">Blood Supply Details</span>
      <div class="grid grid-cols-2 max-w-3xl md:mx-auto mx-6 gap-x-20 gap-y-10">
        <div v-for="i in [0, 1]" :key="i" class="flex justify-between gap-10 text-lg pr-6 pl-2">
          <span>Group</span>
          <span>Current</span>
          <span>your entry</span>
        </div>
        <div v-for="group in ['A', 'AB', 'B', 'O']" :key="group" class="flex flex-col gap-10">
          <BloodInput v-for="rh in ['+', '-']" :key="rh" :group="group" :rh="rh" :oldCount="stocks.old[group][rh]"
            :newCount="stocks.new[group][rh]" @update="updateCount" />
        </div>
      </div>
      <button @click="submitCount" class="
          bg-red-500
          px-12
          py-3
          text-white
          rounded
          font-medium
          border-2
          hover:bg-white
          hover:border-red-500
          hover:text-red-500
        ">
        Update
      </button>
    </section>

  </main>
  <section>
    <div class="
          text-center
          items-center
          py-4
          bg-slate-800
          text-white
          w-full
          bottom-0
          left-0
        ">
      <h4 class="text-lg inline mr-4">
        contact us : 9825641245 | 7851151542
      </h4>
      <h4 class="text-lg inline">Mail us : info@bloodbankmanager.com</h4>
      <p class="mt-2">This is a demo Website of Bloodbank manager</p>
    </div>
  </section>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import { formatISO } from "date-fns";
import BloodInput from "../components/BloodInput.vue";

export default defineComponent({
  name: "AdminDashboard",
  components: {
    BloodInput,
  },
  data() {
    return {
      id: 0,
      name: '',
      address: '',
      stocks: {
        old: {
          A: { "+": 0, "-": 0 },
          B: { "+": 0, "-": 0 },
          AB: { "+": 0, "-": 0 },
          O: { "+": 0, "-": 0 },
        },
        new: {
          A: { "+": 0, "-": 0 },
          B: { "+": 0, "-": 0 },
          AB: { "+": 0, "-": 0 },
          O: { "+": 0, "-": 0 },
        }
      }
    };
  },
  methods: {
    updateCount(input: {
      group: "A" | "B" | "AB" | "O";
      rh: "+" | "-";
      newCount: number;
    }) {
      this.stocks.new[input.group][input.rh] = input.newCount;
    },
    async submitCount() {
      const response = await axios.put(`http://127.0.0.1:5000/stocks/${this.id}`, {
        stock: this.stocks.new,
        timestamp: formatISO(new Date())
      })

      this.stocks.new = {
        A: { "+": 0, "-": 0 },
        B: { "+": 0, "-": 0 },
        AB: { "+": 0, "-": 0 },
        O: { "+": 0, "-": 0 },
      }
      this.stocks.old = response.data.stock
    },
    logout() {
      this.$router.replace('/')
    }
  },
  async beforeMount() {
    this.id = Number(this.$route.query.id)
    const response = await axios.get(`http://127.0.0.1:5000/hospitals/${this.id}`);
    this.name = response.data.name
    this.address = response.data.address
    this.stocks.old = response.data.stocks
  }
});
</script>