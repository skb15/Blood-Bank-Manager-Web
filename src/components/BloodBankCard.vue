<template>
  <div class="grid p-4 rounded-lg border-2 bg-white border-slate-400/70">
    <div class="row-start-1 row-span-1 col-start-1 col-span-1 flex gap-2">
      <span class="
          py-1
          px-1
          border-2 border-red-500
          text-red-500 text-xs
          md:text-sm
          font-semibold
          rounded-md
          uppercase
          h-max
        " v-for="tag in info.tags" :key="tag">
        {{ tag }}
      </span>
    </div>
    <em class="
        row-start-1 row-span-1
        col-start-2 col-span-2
        justify-self-end
        text-xs
        md:text-sm
      ">
      Last Updated : {{ lastUpdate }}
    </em>
    <div class="row-start-2 row-span-1 col-start-1 col-span-2 mt-3 mr-2">
      <h1 class="text-2xl md:text-[26px] font-bold mb-3 max-w-fit">
        {{ info.name }}
      </h1>
      <h3 class="text-md md:text-lg max-w-fit">
        <img class="inline-block" src="../assets/geo-alt-fill.svg" alt="Geo" />
        {{ info.address }}, {{ info.pincode }}
      </h3>
    </div>
    <a :href="`https://www.google.com/maps/search/?api=1&query=${info.plusCode}&query_place_id=${info.placeID}`"
      target="_blank" class="
        row-start-2 row-span-1
        col-start-3 col-span-1
        justify-self-end
        self-center
        md:self-end
        px-4
        py-2
        font-semibold
        text-xs
        md:text-sm
        bg-red-500
        hover:bg-red-600
        text-white
        rounded-lg
        shadow-md
        w-max
        h-max
      ">
      <img class="inline-block mr-1" src="../assets/compass-fill.svg" alt="Compass" />
      Get Direction
    </a>
    <section class="
        row-start-3 row-span-1
        col-start-1 col-span-3
        mt-3
        border-t-2 border-dashed border-black/30
      ">
      <h4 class="text-sm md:text-base font-bold my-2">Available Supplies :</h4>
      <ul class="
          text-base
          md:text-xl
          mt-2
          flex flex-wrap
          md:flex-nowrap
          justify-around
          md:justify-between
          gap-4
        ">
        <li class="flex flex-col w-1/3" v-for="(stock, group) in availableStocks" :key="group">
          <h4 class="p-auto font-bold border-2 text-center rounded-md mb-2">
            {{ group }}
          </h4>
          <div class="flex gap-2">
            <div class="
                flex flex-col
                px-4
                py-2
                md:px-5 md:py-2.5
                rounded-md
                items-center
                w-1/2
              " :class="[stock['+'] ? 'bg-red-500' : 'bg-red-100']">
              <span class="font-bold" :class="[stock['+'] ? 'text-red-100' : 'text-red-500',
              ]">+</span>
              <span :class="[stock['+'] ? 'text-red-100' : 'text-black',
              ]">{{ info.stocks[group]["+"] }}</span>
            </div>
            <div class="
                flex flex-col
                px-4
                py-2
                md:px-5 md:py-2.5
                rounded-md
                items-center
                w-1/2
              " :class="[stock['-'] ? 'bg-red-500' : 'bg-red-100']">
              <span class="font-bold" :class="[stock['-'] ? 'text-red-100' : 'text-red-500',
              ]">-</span>
              <span :class="[stock['-'] ? 'text-red-100' : 'text-black',
              ]">{{ info.stocks[group]["-"] }}</span>
            </div>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { formatDistanceToNowStrict } from "date-fns";

const CompatibilityList = {
  "A+": ["A+", "A-", "O+", "O-"],
  "A-": ["A-", "O-"],
  "B+": ["B+", "B-", "O+", "O-"],
  "B-": ["B-", "O-"],
  "AB+": ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
  "AB-": ["AB-", "A-", "B-", "O-"],
  "O+": ["O+", "O-"],
  "O-": ["O-"],
};

export interface Bank {
  id: number;
  tags: string[];
  name: string;
  address: string;
  pincode: number;
  plusCode: string;
  placeID: string;
  stocks: {
    A: { "+": number; "-": number };
    B: { "+": number; "-": number };
    AB: { "+": number; "-": number };
    O: { "+": number; "-": number };
  };
  lastUpdate: Date;
}

export default defineComponent({
  name: "BloodBankCard",
  props: ["info", "group"],
  computed: {
    lastUpdate(): string {
      return formatDistanceToNowStrict(new Date(this.info.lastUpdate), {
        addSuffix: true,
      });
    },
  },
  data() {
    return {
      availableStocks: {
        A: { "+": false, "-": false, },
        B: { "+": false, "-": false, },
        AB: { "+": false, "-": false, },
        O: { "+": false, "-": false, },
      }
    }
  },
  beforeMount() {
    const highlight = (group: keyof typeof CompatibilityList, stocks: number) => {
      if (this.group === "") {
        return false;
      }

      const bloodGroup: keyof typeof CompatibilityList = this.group;
      return CompatibilityList[bloodGroup].includes(group) && stocks > 0;
    }

    for (const group in this.availableStocks) {
      this.availableStocks[group as 'A' | 'B' | 'AB' | 'O']["+"] = highlight(group + "+" as 'A+' | 'B+' | 'AB+' | 'O+' | 'A-' | 'B-' | 'AB-' | 'O-', this.info.stocks[group]['+'])
      this.availableStocks[group as 'A' | 'B' | 'AB' | 'O']["-"] = highlight(group + "-" as 'A+' | 'B+' | 'AB+' | 'O+' | 'A-' | 'B-' | 'AB-' | 'O-', this.info.stocks[group]['-'])
    }
  }
});
</script>