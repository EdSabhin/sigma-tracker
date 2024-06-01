<script setup>
import { ref, watch } from "vue";
import { useFetch } from "../service/fetch.js";
import Hero from "../components/Hero.vue";

const currencies = ref([]);
const { data, error } = useFetch("https://api.coinpaprika.com/v1/tickers");

watch(data, (current, old) => {
  currencies.value = current;
});
</script>

<template>
  <div v-if="error">
    <span
      class="w-[50%] lg:w-[20%] h-[3rem] flex justify-center items-center relative bottom-[50%] z-10 lg:px-6 py-4 lg:py-2 bg-gradient-to-r from-slate-800 to-slate-900 text-rose-500 border border-rose-500 rounded-md"
      >There was an issue while loading the page. Please refresh.
    </span>
  </div>
  <div v-else class="h-full w-full">
    <Hero :currencies="currencies" :error="error" />
  </div>
</template>
