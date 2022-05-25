<template>
  <div class="flex justify-center items-center w-screen h-screen">
    <SearchBar @search="getBanks" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SearchBar from "../components/SearchBar.vue";

export default defineComponent({
  name: "PageIndex",
  components: { SearchBar },
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
  },
});
</script>