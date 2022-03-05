<template>
  <p v-if="banks.length == 0">No data found</p>
  <div v-else class="flex flex-col gap-8 my-3 items-stretch max-w-fit mx-auto">
    <BloodBankCard v-for="bank in banks" :key="bank.id" :info="bank" />
  </div>
  <button @click="getBanks()">Get Data</button>
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
          id: 1,
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
          lastUpdate: new Date(2022, 1, 27, 18, 28),
        },
      ],
    };
  },
  methods: {
    getBanks() {
      axios.get("http://127.0.0.1:5000/hospitals").then((res) => {
        const data = [res.data[0], res.data[1], res.data[2]];
        console.log(data);
        this.banks.push(data[0]);
        this.banks.push(data[1]);
        this.banks.push(data[2]);
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
