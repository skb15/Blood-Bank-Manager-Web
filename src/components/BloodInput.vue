<template>
  <div class="flex flex-col gap-6 w-[475px] mb-10">
    <!-- v-for="rh in ['+', '-']"
      :key="rh" -->
    <div
      class="flex justify-between text-2xl font-medium text-red-500 pl-[24px]"
    >
      <span>{{ group }}{{ rh }}</span>
      <span class="italic">{{ oldCount }}</span>
      <input
        type="number"
        class="border-2 text-black w-36"
        v-model="newCount"
        @input="updateCount"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BloodInput",
  props: ["group", "rh", "oldCount"],
  emits: ["update"],
  data() {
    return {
      newCount: 0,
    };
  },
  methods: {
    updateCount() {
      console.log(this.group, this.newCount);
      this.$emit("update", {
        group: this.group,
        rh: this.rh,
        newCount: this.newCount,
      });
    },
  },
});
</script>