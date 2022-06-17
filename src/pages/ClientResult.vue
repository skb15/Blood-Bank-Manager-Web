<template>
  <div class="flex flex-col py-3 items-stretch max-w-full h-screen">
    <SearchBar @search="getBanks" :term="pincode || bloodBankName" :blood="bloodGroup" />
    <p v-if="!!error.length" class="mx-auto my-2 px-4 w-full max-w-[625px] font-bold text-red-500">
      {{ error }}
    </p>
    <p v-else class="mx-auto my-2 px-4 w-full max-w-[625px]">{{ banks.length }} Result Found</p>
    <ul class="overflow-y-auto">
      <li class="flex flex-col gap-8 mb-3 items-stretch max-w-fit mx-auto">
        <BloodBankCard v-for="bank in banks" :key="bank.id" :info="bank" :group="bloodGroup" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

import BloodBankCard, { Bank } from "../components/BloodBankCard.vue";
import SearchBar from "../components/SearchBar.vue";

export default defineComponent({
  name: "ClientResult",
  components: {
    BloodBankCard,
    SearchBar,
  },
  data() {
    return {
      banks: [] as Bank[],
      error: "",
      bloodBankName: "",
      pincode: 0,
      bloodGroup: "",
    };
  },
  methods: {
    searchBanks(value: {
      error: string;
      isSearchTypeName: boolean;
      bloodBankName: string;
      pincode: number;
      bloodGroup: string;
    }) {
      this.banks = [];
      this.error = value.error;
      this.bloodGroup = value.bloodGroup;

      if (value.error.length) {
        return;
      }

      console.log(value.isSearchTypeName ? value.bloodBankName : value.pincode, value.bloodGroup);
      const params = new URLSearchParams();

      if (value.isSearchTypeName === false) {
        if (value.pincode !== null) {
          this.pincode = value.pincode;
          params.append("pincode", "" + value.pincode);
        }
        if (value.bloodGroup !== "") {
          params.append("bloodGroup", "" + value.bloodGroup);
        }
      } else {
        if (value.bloodBankName !== undefined) {
          this.bloodBankName = value.bloodBankName;
          params.append("name", "" + value.bloodBankName);
        }
      }

      axios
        .get(`${process.env.VUE_APP_API_URL}/hospitals?${params.toString()}`)
        .then((response: { data: Bank[] }) => {
          this.banks = [...response.data];
        });
    },
    getBanks(value: {
      error: string;
      isSearchTypeName: boolean;
      bloodBankName: string;
      pincode: number;
      bloodGroup: string;
    }) {
      this.searchBanks(value);
      this.$router.replace({
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
  beforeMount() {
    console.log("API URL: ", process.env.VUE_APP_API_URL);

    const value = {
      error: String(this.$route.query.error),
      isSearchTypeName: Boolean(Number(this.$route.query.isSearchTypeName)),
      bloodBankName: String(this.$route.query.bloodBankName),
      pincode: Number(this.$route.query.pincode),
      bloodGroup: (this.$route.query.bloodGroup == undefined ? "" : String(this.$route.query.bloodGroup))
    }

    this.searchBanks(value);
  },
});
</script>