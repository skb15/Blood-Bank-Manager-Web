<template>
  <div class="flex flex-col gap-8 my-3 items-stretch max-w-fit mx-auto">
    <button
      @click="getBanks()"
      class="bg-red-600 text-white px-3 py-2 rounded-md"
    >
      Get Data
    </button>
    <p v-if="banks.length == 0">No data found</p>
    <div
      v-else
      class="flex flex-col gap-8 my-3 items-stretch max-w-fit mx-auto"
    >
      <BloodBankCard v-for="bank in banks" :key="bank.id" :info="bank" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import BloodBankCard from "./components/BloodBankCard.vue";

interface Bank {
  id: number;
  tags: string[];
  name: string;
  address: string;
  pincode: number;
  stocks: {
    A: { "+": number; "-": number };
    B: { "+": number; "-": number };
    AB: { "+": number; "-": number };
    O: { "+": number; "-": number };
  };
  lastUpdate: Date;
}

export default defineComponent({
  name: "App",
  components: {
    BloodBankCard,
  },
  data() {
    return {
      banks: [
        {
          id: 7,
          tags: ["govt", "verified"],
          name: "Subhashgram General Hospital",
          address: "Subhasgram, Kolkata, West Bengal",
          pincode: 700147,
          stocks: {
            A: { "+": 23, "-": 12 },
            B: { "+": 3, "-": 1 },
            AB: { "+": 123, "-": 2 },
            O: { "+": 28, "-": 0 },
          },
          lastUpdate: "2022-03-04T09:06:00.000Z",
        },
      ],
    };
  },
  methods: {
    getBanks() {
      axios.get("http://127.0.0.1:5000/hospitals").then((res) => {
        /*   console.log(res.data); */
        this.banks = this.banks.concat(res.data);
      });
    },
  },
});
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;1,400&display=swap");

#app {
  font-family: "Poppins", sans-serif;
}
</style>
