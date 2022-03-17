<template>
  <div class="flex">
    <input
      v-model="pincode"
      type="text"
      class="border-[2.5px] border-slate-600 rounded-md"
    />
    <button
      @click="getBanks()"
      class="bg-red-600 text-white px-3 py-2 rounded-md"
    >
      Search
    </button>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent } from "vue";
import { Bank } from "../App.vue";

export default defineComponent({
  name: "SearchBar",
  data() {
    return { pincode: 700149 };
  },
  methods: {
    getBanks() {
      axios
        .get(`http://127.0.0.1:5000/hospitals?pincode=${this.pincode}`)
        .then((res: { data: Bank[] }) => {
          /*   console.log(res.data); */
          this.$emit("search", [...res.data]);
        });
    },
  },
});
</script>

