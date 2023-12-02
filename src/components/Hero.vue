<script setup lang="ts">
import { Currency } from "../models/currency.model";
import SearchInput from "../components/inputs/searchInput.vue";
import Token from "./inputs/Token.vue";
import TokenModal from "./TokenModal.vue";
import { ref } from "vue";

defineProps<{
  currencies?: Currency[];
  error?: boolean;
}>();

const currencyId = ref(null);

const openModal = ref(false);
console.log(openModal.value);
const showModal = () => {
  openModal.value = !openModal.value;
};
</script>

<template>
  <div class="w-full px-10">
    <div class="w-full flex flex-col justify-center items-center p-10 gap-10">
      <h1
        class="text-3xl text-green-300 border-b-2 pb-1 border-green-300 rounded-md"
      >
        Crypto List
      </h1>
      <SearchInput />
    </div>

    <div v-if="error">
      <span>Fetch Error</span>
    </div>
    <div v-if="!currencies?.length">
      <span>Loading...</span>
    </div>

    <div
      class="w-full grid grid-cols-4 gap-12 justify-center py-12 border-b-2 border-green-300 rounded-md"
    >
      <template v-for="currency in currencies" :key="currency.id">
        <Token :text="currency.name" :action="() => showModal()" />
      </template>
    </div>
    <template >
      <TokenModal :currencies="currencies" :currencyId="currencyId" />
    </template>
  </div>
</template>