<script setup lang="ts">
import { Currency } from "../models/currency.model";
import SearchInput from "./inputs/SearchInput.vue";

import Token from "./inputs/Token.vue";
import TokenModal from "./TokenModal.vue";
import { ref, watch, Ref } from "vue";

interface Props {
  currencies: Currency[] | null;
  error: boolean | null;
}

const props = withDefaults(defineProps<Props>(), {
  currencies: null,
  error: null,
});

// TOKEN MODAL
const openModal = ref(false);
const singleCurrency = ref<Currency | null>(null);

const showModal = (id: string) => {
  openModal.value = true;
  if (props.currencies) {
    const foundCurrency = props.currencies.find(
      (currency) => currency.id === id
    );
    console.log(foundCurrency);
    if (foundCurrency) {
      singleCurrency.value = foundCurrency;
    }
  }

  document.body.classList.add("overflow-hidden");
};

const closeModal = () => {
  openModal.value = false;
  document.body.classList.remove("overflow-hidden");
};

// SEARCH
const search = ref<string>("");
const handleSearchUpdate = (value: string) => {
  search.value = value;
};

const searchResult: Ref<Currency[] | undefined> = ref([]);

function filterSearch() {
  const searchText = search.value.toLowerCase().trim();
  if (searchText === "") {
    searchResult.value = [];
    return;
  }

  const filterText = props.currencies?.filter((text) =>
    text.name.toLowerCase().includes(searchText)
  );

  searchResult.value = filterText || [];
}

// PAGINATION
const currentPage = ref<number>(1);
const itemsPerPage = ref<number>(24);
const slicedCurrencies = ref<Currency[]>([]);
const endPage = ref<boolean>(false);

watch(
  () => props.currencies,
  (newCurrencies) => {
    updateSlicedCurrencies(newCurrencies);
  }
);

watch(
  [() => props.currencies, currentPage, itemsPerPage],
  ([newCurrencies]) => {
    updateSlicedCurrencies(newCurrencies);
  }
);

watch(search, filterSearch);

function updateSlicedCurrencies(newCurrencies: Currency[] | null) {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value;
  const endIndex = currentPage.value * itemsPerPage.value;
  slicedCurrencies.value = newCurrencies?.slice(startIndex, endIndex) || [];

  // currentPage = 1 --> startIndex = 0
  // currentPage = 2 --> startIndex = 24
  // currentPage = 3 --> startIndex = 48

  if (props.currencies && endIndex >= props.currencies?.length) {
    endPage.value = true;
  } else {
    endPage.value = false;
  }
}

function nextPage() {
  currentPage.value++;
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}
</script>

<template>
  <div
    class="w-full lg:px-72 md:px-32 sm:px-12 pb-28 bgGradientTwo border-b-2 border-orange-200"
  >
    <div class="w-full flex justify-center items-center pb-8 gap-10">
      <div
        class="w-full h-48 flex flex-col lg:flex-row justify-start items-center relative px-10 lg:px-0 pt-6 lg:pb-0 pb-4 gap-8 lg:gap-20"
      >
        <h1
          class="text-3xl text-slate-300 border-b-2 px-4 py-2 border-orange-200 rounded-md"
        >
          CRYPTO LIST
        </h1>
        <SearchInput :search="search" @update:search="handleSearchUpdate" />

        <ul
          v-if="searchResult && searchResult.length"
          :class="{
            'w-80 h-48 lg:w-86 lg:h-48 absolute top-40 lg:top-[4.2rem] left-14 lg:left-[33rem] z-10 overflow-y-auto px-6 py-2 bg-slate-950 text-slate-200 border-2 border-purple-400 rounded-md transition':
              searchResult.length > 5,
            'w-86 h-max overflow-y-auto px-6 py-2 border border-purple-400 transition':
              searchResult.length <= 5,
          }"
        >
          <li
            v-for="result in searchResult"
            :key="result.id"
            @click="() => showModal(result.id)"
            class="w-max pl-2 pr-5 pt-2 pb-3 border-b-slate-300 rounded-md hover:bg-gradient-to-r hover:from-violet-900 hover:to-slate-900 active:bg-gradient-to-r active:from-violet-900 active:to-slate-300 cursor-pointer hover:transition hover:duration-500"
          >
            {{ result.name }}
          </li>
        </ul>
      </div>
    </div>

    <div v-if="error">
      <span>Fetch Error</span>
    </div>
    <div v-else-if="!currencies?.length" class="text-white">
      <span>Loading...</span>
    </div>

    <div class="w-full grid grid-cols-2 lg:grid-cols-4 gap-12 justify-around px-10 lg:px-0 pt-4 pb-20">
      <template v-for="currency in slicedCurrencies" :key="currency?.id">
        <Token :text="currency?.name" :action="() => showModal(currency?.id)" />
      </template>
    </div>
    <template v-if="openModal">
      <TokenModal
        :singleCurrency="singleCurrency"
        :closeModal="() => closeModal()"
      />
    </template>

    <div class="w-full flex justify-between pl-10 lg:pl-0 pr-10 lg:pr-10 lg:gap-12">
      <button
        v-if="currentPage > 1"
        @click="prevPage()"
        class="text-slate-300 justify-center p-4 border border-violet-300 bg-gradient-to-r from-violet-900 to-slate-900 rounded-md hover:border-orange-300 active:text-orange-400 active:scale-105 hover:transition hover:duration-100"
      >
        Show Previous
      </button>
      <button
        v-if="!endPage"
        @click="nextPage()"
        class="text-slate-300 justify-center p-4 border border-violet-300 bg-gradient-to-r from-violet-900 to-slate-900 rounded-md hover:border-orange-300 active:text-orange-400 active:scale-105 hover:transition hover:duration-100"
      >
        Show More
      </button>
    </div>
  </div>
</template>
