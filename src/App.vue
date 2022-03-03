<template>
  <div class="flex flex-col gap-8 w-screen max-w-fit mx-auto">
    <BloodBankCard v-for="bank in banks" :key="bank.id" :info="bank" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BloodBankCard from "./components/BloodBankCard.vue";

export default defineComponent({
  name: "App",
  components: {
    BloodBankCard,
  },
  data() {
    return {
      banks: [
        {
          id: 2,
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
          lastUpdateDate: new Date(2022, 1, 27, 18, 28),
        },
        {
          id: 3,
          tags: ["govt", "verified"],
          name: "Baruipur S D Hospital",
          address: "Kulpi Road, Baruipur, Kolkata",
          pincode: 700144,
          stocks: {
            A: { "+": 7, "-": 12 },
            B: { "+": 0, "-": 0 },
            AB: { "+": 17, "-": 9 },
            O: { "+": 5, "-": 0 },
          },
          lastUpdateDate: new Date(2022, 2, 3, 6, 49),
        },
        {
          id: 4,
          tags: ["govt", "verified"],
          name: "Ramakrishna Mission Seva Pratishthan(Sishu Mangal)",
          address: "Sarat Bose Road, Hazra, Kalighat, Kolkata, West Bengal",
          pincode: 700029,
          stocks: {
            A: { "+": 17, "-": 5 },
            B: { "+": 13, "-": 0 },
            AB: { "+": 5, "-": 0 },
            O: { "+": 3, "-": 1 },
          },
          lastUpdateDate: new Date(2022, 2, 3, 8, 18),
        },
      ],
    };
  },
});
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;1,400&display=swap");
#app {
  font-family: "Poppins", sans-serif;
}
</style>
