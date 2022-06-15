<template>
  <div class="flex flex-col py-3 items-stretch max-w-full h-screen">
    <SearchBar @search="getBanks" :term="pincode || bloodBankName" :blood="bloodGroup" />
    <p v-if="!!error.length" class="mx-auto my-2 px-4 w-full max-w-[625px] font-bold text-red-500">
      {{ error }}
    </p>
    <p v-else class="mx-auto my-2 px-4 w-full max-w-[625px]">{{ banks.length }} Result Found</p>
    <ul class="overflow-y-scroll">
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
  name: "App",
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
    getBanks(value: {
      error: string;
      isSearchTypeName: boolean;
      bloodBankName: string;
      pincode: number;
      bloodGroup: string;
    }) {
      this.banks = [];
      this.error = value.error;

      if (value.error.length) {
        return;
      }
      const params = new URLSearchParams();

      if (value.isSearchTypeName === false) {
        if (value.pincode !== null) {
          params.append("pincode", "" + value.pincode);
        }
        if (value.bloodGroup !== "") {
          this.bloodGroup = value.bloodGroup;
          params.append("bloodGroup", "" + value.bloodGroup);
        }
      } else {
        if (value.bloodBankName !== undefined) {
          this.bloodBankName = value.bloodBankName;
          params.append("name", "" + value.bloodBankName);
        }
      }

      axios
        .get("http://127.0.0.1:5000/hospitals?" + params.toString())
        .then((response: { data: Bank[] }) => {
          // console.log(res.data);
          this.banks = [...response.data];
        });
    },
  },
  beforeMount() {
    const error = String(this.$route.query.error);
    const isSearchTypeName = Boolean(
      Number(this.$route.query.isSearchTypeName)
    );
    this.bloodBankName = String(this.$route.query.bloodBankName);
    this.pincode = Number(this.$route.query.pincode);
    this.bloodGroup = String(this.$route.query.bloodGroup);
    if (!this.bloodGroup) {
      this.bloodGroup = "";
    }
    /*  const { bloodBankName, pincode, bloodGroup, isSearchTypeName, error } =
      this.$route.query; */
    const bloodBankName = this.bloodBankName;
    const pincode = this.pincode;
    const bloodGroup = this.bloodGroup;
    console.log(this.bloodBankName, this.pincode, this.bloodGroup);
    this.getBanks({
      error,
      isSearchTypeName,
      bloodBankName,
      pincode,
      bloodGroup,
    });
  },
});
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;1,400&display=swap");

#app {
  font-family: "Poppins", sans-serif;
}
</style>
