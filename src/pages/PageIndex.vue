<template>
  <div class="flex justify-center items-center w-screen h-screen">
    <SearchBar />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SearchBar from "../components/SearchBar.vue";

export default defineComponent({
  name: "PageIndex",
  components: { SearchBar },
});
</script>