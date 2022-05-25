<template>
  <div class="bg-white px-2 py-4">
    <div class="flex gap-4 relative max-w-full md:max-w-xl mx-auto">
      <img
        src="../assets/search.svg"
        alt="Search"
        class="absolute left-3 top-2 w-6 h-6"
      />
      <input
        @keypress.enter="search()"
        v-model="searchTerm"
        type="text"
        class="
          pl-12
          py-1
          pr-4
          border-[2.5px] border-slate-600
          rounded-md
          w-full
        "
      />
      <div class="absolute inline-block text-left right-24">
        <div>
          <button
            @click="toggleDropdown"
            type="button"
            class="
              inline-flex
              justify-center
              items-center
              w-fit
              h-10
              right-24
              rounded-tr-md rounded-br-md
              px-4
              py-2
              bg-slate-800
              text-sm
              font-medium
              text-white
              hover:bg-slate-900
            "
          >
            Group
            <img
              src="../assets/caret.svg"
              alt="caret"
              :class="{ '-rotate-90': !!group.length }"
              class="w-6 h-6 transition-transform ease-out duration-300"
            />
            {{ group }}
          </button>
        </div>
        <div
          v-if="isDropdown"
          class="
            absolute
            right-0
            mt-2
            w-[128px]
            rounded-md
            shadow-lg
            bg-slate-800
            focus:outline-none
          "
        >
          <div class="py-1">
            <div
              v-for="group in ['A', 'B', 'AB', 'O']"
              :key="group"
              class="flex"
            >
              <button
                @click="selectGroup(`${group}+`)"
                class="text-white px-4 py-2 w-1/2 text-sm hover:bg-red-500"
              >
                {{ group }}+
              </button>
              <button
                @click="selectGroup(`${group}-`)"
                class="text-white px-4 py-2 w-1/2 text-sm hover:bg-red-500"
              >
                {{ group }}-
              </button>
            </div>
          </div>
        </div>
      </div>
      <button
        @click="search()"
        class="bg-red-600 text-white px-3 py-2 rounded-md"
      >
        Search
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SearchBar",
  props: ["term", "blood"],
  data() {
    return {
      isDropdown: false,
      searchTerm: this.term || "",
      isSearchTypeName: true,
      bloodBankName: "",
      pincode: 700148,
      group: this.blood || "",
    };
  },
  methods: {
    selectGroup(group: string) {
      this.group = group;
      this.isDropdown = false;
    },
    search() {
      //this is checked by only the first digit/letter that it is a pincode or name
      if (isNaN(parseInt(this.searchTerm)) === false) {
        console.log("this is the pincode");
        this.pincode = parseInt(this.searchTerm);
        this.isSearchTypeName = false;
      } else {
        console.log("this is the BloodBank Name");
        this.bloodBankName = this.searchTerm;
        this.isSearchTypeName = true;
      }

      if (this.isSearchTypeName === true) {
        if (this.bloodBankName.length > 0) {
          this.$emit("search", {
            error: "",
            isSearchTypeName: this.isSearchTypeName,
            bloodBankName: this.bloodBankName,
          });
        } else {
          this.$emit("search", { error: "Wrong Name Entered!!!" });
        }
      } else {
        if (this.pincode.toString().length === 6) {
          this.$emit("search", {
            error: "",
            isSearchTypeName: this.isSearchTypeName,
            pincode: this.pincode,
            bloodGroup: this.group,
          });
        } else {
          this.$emit("search", { error: "Wrong Pincode Entered!!!" });
        }
      }
    },
    toggleDropdown() {
      this.isDropdown = !this.isDropdown;
    },
  },
});
</script>

<style lang="scss" scoped>
</style>

