<template>
  <main class="
      flex flex-col
      gap-10
      items-center
      justify-center
      w-screen
      h-screen
      p-2
      relative
    ">
    <button @click="beforeLogin" class="
        fixed
        top-2
        right-2
        bg-red-500
        px-8
        py-2
        text-white
        rounded-lg
        font-medium
        border-2
        hover:bg-white hover:border-red-500 hover:text-red-500
      ">
      {{ isLoggedin ? "Logout" : "Login" }}
    </button>
    <img src="../assets/logo.svg" alt="logo" class="w-full max-w-sm" />
    <SearchBar @search="getBanks" />
    <AppAuth v-if="isModelOpen" @login="afterLogin" />
    <span class="text-center">
      Welcome to Blood Bank Manager. Searching and get the details of blood
      <br />stocks in your fingertip.
    </span>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SearchBar from "../components/SearchBar.vue";
import AppAuth from "../components/AppAuth.vue";

export default defineComponent({
  name: "PageIndex",
  components: { SearchBar, AppAuth },
  data() {
    return { isLoggedin: false, isModelOpen: false };
  },
  methods: {
    getBanks(value: {
      error: string;
      isSearchTypeName: boolean;
      bloodBankName: string;
      pincode: number;
      bloodGroup: string;
    }) {
      this.$router.push({
        name: "result",
        query: {
          error: value.error,
          isSearchTypeName: Number(value.isSearchTypeName),
          bloodBankName: value.bloodBankName,
          pincode: value.pincode,
          bloodGroup: value.bloodGroup,
        },
      });
    },
    beforeLogin() {
      if (!this.isLoggedin) {
        this.isModelOpen = !this.isModelOpen;
      } else {
        this.isLoggedin = !this.isLoggedin;
      }
    },
    afterLogin($isLoggedIn: boolean) {
      this.isLoggedin = $isLoggedIn;
      this.isModelOpen = !$isLoggedIn;
    },
  },
});
</script>