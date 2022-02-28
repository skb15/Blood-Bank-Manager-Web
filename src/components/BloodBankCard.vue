<template>
  <div class="grid grid-rows-3 grid-cols-3 p-4 rounded-lg m-auto border-2 border-slate-400/70 w-3/4 h-1/6">
    <div class="row-start-1 row-span-1 col-start-1 col-span-1 flex gap-2">
      <span class="py-1 px-2 border-2 border-red-500 text-red-500 font-semibold rounded-md uppercase h-max" v-for="tag in info.tags" :key="tag">{{tag}}</span>
    </div>
    <span class="row-start-1 row-span-1 col-start-3 col-span-1 update"><em>Last Updated &nbsp;</em> {{ info.lastUpdate }}</span>
    <div class="row-start-2 row-span-1 col-start-1 col-span-2">
      <h1 class="text-3xl font-bold my-3">{{ info.name }}</h1>
      <h3 class="text-lg">{{ info.address }}, {{ info.pincode }}</h3>
    </div>
    <button
      class="row-start-2 row-span-1 col-start-3 col-span-1 px-4 py-2 font-semibold bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-md w-max h-max">
      Get Direction
    </button>
    <section class="row-start-3 row-span-1 col-start-1 col-span-3 border-t-2 border-dashed border-black/30 mt-4">
      <h4 class="font-bold text-lg my-2">Available Supplies</h4>
      <ul class="mt-2 flex gap-4">
       <li class="text-xl flex flex-col" v-for="stock in ['A','B','AB','O']" :key="stock">
          <h4 class="p-auto font-bold border-2 text-center rounded-md mb-2">{{stock}}</h4>
          <div class="flex gap-2">
            <div class="bg-red-100 px-6 py-4 rounded-md flex flex-col items-center">
              <span class="text-red-500 font-bold">+</span>
              <span class="unit">{{ info.stocks[stock]["+"] }}</span>
            </div>
            <div class="bg-red-100 px-6 py-4 rounded-md flex flex-col items-center">
              <span class="text-red-500 font-bold">-</span>
              <span class="unit">{{ info.stocks[stock]["-"] }}</span>
            </div>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { formatDistance } from 'date-fns'

export default defineComponent({
  name: "BloodBankCard",
  props:["info"],
  data() {
    return {}
    /* return {
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
    }; */
  },
  computed: {
    lastUpdate(){
      return formatDistance(this.info.lastUpdateDate, new Date(), { addSuffix: true })
    }
  },
  methods: {
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
