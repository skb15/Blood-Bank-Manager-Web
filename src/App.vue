<template>
  <div class="flex flex-col gap-8 w-screen max-w-fit mx-auto">
    <BloodBankCard :info="banks[0]"/>
    <BloodBankCard :info="banks[1]"/>
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
  data(){return{banks:[{
      tags: ["govt", "verified"],
      name: "Subhashgram General Hospital",
      address: "Subhasgram, Kolkata, West Bengal",
      pincode: 700147,
      stocks: {
        A:{ "+": 23, "-": 12 },
        B:{ "+": 3, "-": 1 },
        AB:{ "+": 123, "-": 2 },
        O:{ "+": 28, "-": 0 },
      },
      lastUpdateDate: new Date(2022,1,27,18,28),
    },
    {
      tags: ["govt", "verified"],
      name: "Baruipur Hospital",
      address: "Subhasgram, Kolkata, West Bengal",
      pincode: 700147,
      stocks: {
        A:{ "+": 23, "-": 12 },
        B:{ "+": 3, "-": 1 },
        AB:{ "+": 123, "-": 2 },
        O:{ "+": 28, "-": 0 },
      },
      lastUpdateDate: new Date(2022,1,27,18,28),
    },]}}
    
});
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;1,400&display=swap");
#app {
  font-family: "Poppins", sans-serif;
}
</style>
