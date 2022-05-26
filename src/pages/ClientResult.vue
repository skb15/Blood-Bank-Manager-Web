<template>
  <div class="flex flex-col my-3 items-stretch max-w-fit mx-auto">
    <div class="fixed top-0 left-0 right-0">
      <SearchBar
        @search="getBanks"
        :term="pincode || bloodBankName"
        :blood="bloodGroup"
      />
    </div>
    <p v-if="!!error.length" class="mt-16 mb-2 font-bold text-red-500">
      {{ error }}
    </p>
    <p v-else class="mt-16 mb-2">{{ this.banks.length }} Result Found</p>
    <div class="flex flex-col gap-8 mb-3 items-stretch max-w-fit mx-auto">
      <BloodBankCard
        v-for="bank in banks"
        :key="bank.id"
        :info="bank"
        :group="bloodGroup"
      />
    </div>
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
      console.log(value);

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
        .then((res: { data: Bank[] }) => {
          // console.log(res.data);
          this.banks = [...res.data];
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
    if (this.bloodGroup) {
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