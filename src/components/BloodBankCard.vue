<template>
  <div class="wrapper">
    <div class="tags">
      <span>Private</span>
      <span>Verfied</span>
    </div>
    <span class="update">Last Updated: 2 days ago</span>
    <div class="info">
      <h1>Name Of The Organization</h1>
      <h3>Location Of The Organization</h3>
    </div>
    <button class="loc-btn">Get Direction</button>
    <section class="supplies">
      <h4>Available Supplies</h4>
      <ul>
        <li><span class="group">A+</span><span class="unit">56</span></li>
        <li><span class="group">A-</span><span class="unit">52</span></li>
        <li><span class="group">B+</span><span class="unit">3</span></li>
        <li><span class="group">B-</span><span class="unit">1</span></li>
        <li><span class="group">AB+</span><span class="unit">666</span></li>
        <li><span class="group">AB-</span><span class="unit">798</span></li>
        <li><span class="group">O+</span><span class="unit">11</span></li>
        <li><span class="group">O-</span><span class="unit">62</span></li>
      </ul>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BloodBankCard",
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.wrapper {
  padding: 1em 1em;
  border-radius: 0.6rem;
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
