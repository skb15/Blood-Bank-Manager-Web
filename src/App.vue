<template>
  <BloodBankCard />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BloodBankCard from "./components/BloodBankCard.vue";

export default defineComponent({
  name: "App",
  components: {
    BloodBankCard,
  },
});
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;1,400&display=swap");
#app {
  font-family: "Poppins", sans-serif;
}
</style>
