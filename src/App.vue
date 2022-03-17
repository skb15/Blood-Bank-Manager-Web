<template>
  <div class="flex flex-col gap-8 my-3 items-stretch max-w-fit mx-auto">
    <SearchBar @search="search" />
    <p>{{ this.banks.length }} Result Found</p>
    <div class="flex flex-col gap-8 my-3 items-stretch max-w-fit mx-auto">
      <BloodBankCard v-for="bank in banks" :key="bank.id" :info="bank" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BloodBankCard from "./components/BloodBankCard.vue";
import SearchBar from "./components/SearchBar.vue";

export interface Bank {
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
    SearchBar,
  },
  data() {
    return {
      banks: [] as Bank[],
    };
  },
  methods: {
    search(value: Bank[]) {
      // console.log(value);
      this.banks = value;
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
