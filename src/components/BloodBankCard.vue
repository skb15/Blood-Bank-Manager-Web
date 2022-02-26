<template>
  <div class="wrapper p-4 rounded-lg m-4 border-2 border-slate-400/70">
    <div class="tags flex gap-2">
      <span class="py-1 px-2 border-2 border-red-500 text-red-500 font-semibold rounded-md uppercase">Private</span>
      <span class="py-1 px-2 border-2 border-red-500 text-red-500 font-semibold rounded-md uppercase">Verfied</span>
    </div>
    <span class="update">Last Updated: {{ lastUpdate }}</span>
    <div class="info">
      <h1 class="text-3xl font-bold my-3">{{ name }}</h1>
      <h3 class="text-lg">{{ address }}, {{ pincode }}</h3>
    </div>
    <button
      @click="getDirection"
      class="
        px-4
        py-2
        font-semibold
        bg-red-500
        hover:bg-red-600
        text-white
        rounded-lg
        shadow-md
        w-max
      "
    >
      Get Direction
    </button>
    <section class="supplies border-t-2 border-dashed border-black/30 mt-4">
      <h4 class="font-bold text-lg my-2">Available Supplies</h4>
      <ul class="mt-2 flex gap-4">
        <li class="text-xl flex flex-col" v-for="stock in stocks" :key="stock.type">
          <h4 class="p-auto font-bold border-2 text-center rounded-md mb-2">{{stock.type}}</h4>
          <div class="flex gap-2">
            <div class="bg-red-100 px-6 py-4 rounded-md flex flex-col items-center">
              <span class="text-red-500 font-bold">+</span>
              <span class="unit">{{ stock.units["+"] }}</span>
            </div>
            <div class="bg-red-100 px-6 py-4 rounded-md flex flex-col items-center">
              <span class="text-red-500 font-bold">-</span>
              <span class="unit">{{ stock.units["-"] }}</span>
            </div>
          </div>
        </li>
        
      </ul>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BloodBankCard",
  data() {
    return {
      isShow: false,
      name: "Subhashgram General Hospital",
      address: "Subhasgram, Kolkata, West Bengal",
      pincode: 700147,
      stocks: [
        {type: "A", units:{ "+": 23, "-": 12 }},
        {type: "B", units:{ "+": 3, "-": 1 }},
        {type: "AB", units:{ "+": 123, "-": 2 }},
        {type: "O", units:{ "+": 28, "-": 0 }},
      ],
      lastUpdate: new Date(),
    };
  },
  methods: {
    getDirection() {
      this.isShow = !this.isShow;
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.wrapper {
  display: grid;
  grid-template-rows: repeat(3, auto);

  .tags {
    grid-row: 1 / span 1;
  }

  .update {
    grid-row: 1 / span 1;
  }

  .info {
    grid-row: 2 / span 1;
  }

  .supplies {
    grid-row: 3 / span 1;
  }
}
</style>
