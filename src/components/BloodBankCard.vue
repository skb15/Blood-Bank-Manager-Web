<template>
  <div class="wrapper p-4 rounded-lg m-4">
    <div class="tags">
      <span>Private</span>
      <span>Verfied</span>
    </div>
    <span class="update">Last Updated: {{ lastUpdate }}</span>
    <div class="info">
      <h1 class="text-3xl font-bold">{{ name }}</h1>
      <h3>{{ address }}, {{ pincode }}</h3>
    </div>
    <button
      @click="getDirection"
      class="
        px-4
        py-2
        font-semibold
        bg-blue-500
        hover:bg-blue-600
        text-white
        rounded-lg
        shadow-md
        w-max
      "
    >
      Get Direction
    </button>
    <p v-show="isShow">{{ address }}</p>

    <section class="supplies">
      <h4>Available Supplies</h4>
      <ul>
        <li>
          <span class="group">A+</span
          ><span class="unit">{{ stock.A["+"] }}</span>
        </li>
        <li>
          <span class="group">A-</span
          ><span class="unit">{{ stock.A["-"] }}</span>
        </li>
        <li>
          <span class="group">B+</span
          ><span class="unit">{{ stock.B["+"] }}</span>
        </li>
        <li>
          <span class="group">B-</span
          ><span class="unit">{{ stock.B["-"] }}</span>
        </li>
        <li>
          <span class="group">AB+</span
          ><span class="unit">{{ stock.AB["+"] }}</span>
        </li>
        <li>
          <span class="group">AB-</span
          ><span class="unit">{{ stock.AB["-"] }}</span>
        </li>
        <li>
          <span class="group">O+</span
          ><span class="unit">{{ stock.O["+"] }}</span>
        </li>
        <li>
          <span class="group">O-</span
          ><span class="unit">{{ stock.O["-"] }}</span>
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
      stock: {
        A: { "+": 23, "-": 12 },
        B: { "+": 3, "-": 19 },
        AB: { "+": 13, "-": 72 },
        O: { "+": 83, "-": 2 },
      },
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
  // padding: 1em 1em;
  // border-radius: 0.6rem;
  // background-color: red;
  display: grid;
  grid-template-rows: repeat(3, auto);
  border: 1px solid #707070;

  .tags {
    grid-row: 1 / span 1;
    display: flex;
    gap: 0.6em;
    span {
      padding: 0.2em 0.5em;
      border: 3px solid #f44336;
      color: #f44336;
      font-weight: 500;
      border-radius: 0.3em;
      text-transform: uppercase;
    }
  }

  .update {
    grid-row: 1 / span 1;
  }

  .info {
    grid-row: 2 / span 1;
  }

  .supplies {
    grid-row: 3 / span 1;
    ul {
      display: flex;
      gap: 1rem;
      list-style: none;

      li {
        display: flex;
        flex-direction: column;
      }
    }
  }
}
</style>
