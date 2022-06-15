<template>
  <!-- v-for="rh in ['+', '-']"
      :key="rh" -->
  <div class="flex justify-between text-2xl font-medium text-red-500 pl-[24px]">
    <span>{{ group }}{{ rh }}</span>
    <span class="italic">{{ oldCount }}</span>
    <input
      type="number"
      min="0"
      v-model="count"
      @input="updateCount"
      class="border-2 text-black w-36 text-center"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BloodInput",
  props: ["group", "rh", "oldCount", "newCount"],
  emits: ["update"],
  data() {
    return { count: 0 };
  },
  methods: {
    updateCount() {
      this.$emit("update", {
        group: this.group,
        rh: this.rh,
        newCount: this.count,
      });
    },
  },
  watch: {
    newCount() {
      this.count = this.newCount;
    },
  },
});
</script>