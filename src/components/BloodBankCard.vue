<template>
  <div class="grid p-4 rounded-lg m-2 border-2 border-slate-400/70">
    <div class="row-start-1 row-span-1 col-start-1 col-span-1 flex gap-2">
      <span
        class="
          text-xs
          md:text-sm
          py-1
          px-2
          border-2 border-red-500
          text-red-500
          font-semibold
          rounded-md
          uppercase
          h-max
        "
        v-for="tag in info.tags"
        :key="tag"
        >{{ tag }}</span
      >
    </div>
    <em
      class="
        text-xs
        md:text-sm
        row-start-1 row-span-1
        col-start-3 col-span-2
        justify-self-end
      "
      >Last Updated:{{ lastUpdate }}</em
    >
    <div class="row-start-2 row-span-1 col-start-1 col-span-2">
      <h1 class="text-2xl md:text-[26px] font-bold my-3">{{ info.name }}</h1>
      <h3 class="text-md md:text-lg">
        <img class="inline-block" src="../assets/geo-alt-fill.svg" alt="Geo" />
        {{ info.address }},{{ info.pincode }}
      </h3>
    </div>
    <button
      class="
        row-start-2 row-span-1
        col-start-4 col-span-1
        px-4
        py-2
        font-semibold
        bg-red-500
        hover:bg-red-600
        text-white
        rounded-lg
        shadow-md
        w-max
        h-max
        justify-self-end
        self-center
        md:self-end
        whitespace-nowrap
      "
    >
      <img
        class="inline-block mr-1"
        src="../assets/compass-fill.svg"
        alt="Compass"
      />
      Get Direction
    </button>
    <section
      class="
        row-start-3 row-span-1
        col-start-1 col-span-4
        border-t-2 border-dashed border-black/30
        mt-4
      "
    >
      <h4 class="font-bold text-sm md:text-base my-2">Available Supplies</h4>
      <ul
        class="
          text-base
          md:text-xl
          mt-3
          flex flex-wrap
          md:flex-nowrap
          gap-4
          justify-evenly
        "
      >
        <li
          class="flex flex-col"
          v-for="stock in ['A', 'B', 'AB', 'O']"
          :key="stock"
        >
          <h4 class="p-auto font-bold border-2 text-center rounded-md mb-2">
            {{ stock }}
          </h4>
          <div class="flex gap-2">
            <div
              class="bg-red-100 px-6 py-4 rounded-md flex flex-col items-center"
            >
              <span class="text-red-500 font-bold">+</span>
              <span class="unit">{{ info.stocks[stock]["+"] }}</span>
            </div>
            <div
              class="bg-red-100 px-6 py-4 rounded-md flex flex-col items-center"
            >
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
import { formatDistance } from "date-fns";

export default defineComponent({
  name: "BloodBankCard",
  props: ["info"],
  data() {
    return {};
  },
  computed: {
    lastUpdate() {
      return formatDistance(this.info.lastUpdateDate, new Date(), {
        addSuffix: true,
      });
    },
  },
  methods: {},
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
