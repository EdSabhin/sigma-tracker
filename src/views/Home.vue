<script setup>
import { ref, watch } from "vue";
import { useFetch } from "../service/fetch.js";
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
import Hero from "../components/Hero.vue";

const currencies = ref([]);
const { data, error } = useFetch("https://api.coinpaprika.com/v1/tickers");

watch(data, (current, old) => {
  currencies.value = current;
});

</script>

<template>
  <Navbar />
  <Hero :currencies="currencies" :error="error"/>
  <Footer />
</template>
