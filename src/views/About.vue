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
      class="w-[50%] lg:w-[20%] h-[2.7rem] flex justify-center items-center relative bottom-4 lg:absolute lg:top-[3.9rem] lg:left-[44rem] 2xl:left-[53rem] z-10 lg:px-6 py-3 lg:py-2 bg-gradient-to-r from-slate-800 to-slate-900 text-rose-500 border border-rose-500 rounded-md"
      >There was an issue while loading the page. Please refresh.
    </span>
  </div>
  <div v-else class="h-full w-full">
    <Hero :currencies="currencies" :error="error" />
  </div>
</template>
