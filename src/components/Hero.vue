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
const openResults = ref<boolean>(false);

const handleSearchUpdate = (value: string) => {
  search.value = value;
};

const searchResult: Ref<Currency[] | undefined> = ref([]);

function filterSearch() {
  openResults.value = true;
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

const closeSearch = () => {
  openResults.value = false;
};

const openSearch = () => {
  openResults.value = true;
};

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
    class="w-full xl:px-72 lg:px-32 md:px-16 sm:px-12 pt-4 pb-20 news-cycle-regular leading-8 tracking-widest bg-gradient-to-br from-neutral-600 via-black to-neutral-600"
    @click="closeSearch"
  >
    <div class="w-full flex justify-center items-center gap-10">
      <div
        class="w-full h-full flex flex-col xl:flex-row justify-start items-center relative px-10 lg:px-0 pt-12 mb-6 gap-12 lg:gap-20 2xl:gap-40"
      >
        <h1
          class="w-full 2xl:w-[71%] text-3xl text-slate-400 border-t border-l p-6 border-t-amber-100 border-l-amber-100 animated-gradient-text rounded-sm"
        >
          Market Cap Updates
        </h1>
        <SearchInput
          :action="openSearch"
          :search="search"
          @update:search="handleSearchUpdate"
        />
        <span
          v-if="search !== '' && !searchResult?.length"
          class="w-full h-[3rem] flex justify-center items-center relative z-10 bg-gradient-to-tr from-neutral-700 to-neutral-900 text-rose-500 border border-rose-500 rounded-md"
          >No results found.
        </span>
        <ul
          v-if="searchResult && searchResult.length && openResults"
          class="w-full xl:w-[20.3rem] relative lg:absolute bottom-12 lg:top-[15.8rem] xl:top-[6.9rem] xl:right-[-0.04rem] 2xl:top-[6.75rem] z-10 overflow-y-auto overflow-x-hidden px-6 py-2 bg-slate-950 text-slate-200 border border-violet-300 rounded-br rounded-bl scrollbar-hidden"
          :class="{
            'h-48': searchResult.length >= 6,
            'h-max': searchResult.length <= 5,
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

    <div
      v-if="!currencies?.length"
      class="w-full flex justify-center items-center py-12"
    >
      <div
        class="w-10 h-10 spinnerGradient inline-block animate-spin rounded-full border-[3px] border-current border-t-transparent text-primary-500`"
        role="status"
        aria-label="loading"
      >
        <span class="sr-only">Loading...</span>
      </div>
    </div>

    <div
      v-else
      class="w-full grid grid-cols-2 xl:grid-cols-4 justify-center items-center gap-12 px-10 lg:px-0 lg:pt-10 pb-20"
      :class="{
        'pt-8': openResults,
        'pt-14': !openResults || search === '',
      }"
    >
      <template v-for="currency in slicedCurrencies" :key="currency?.id">
        <Token :text="currency?.name" :action="() => showModal(currency?.id)" />
      </template>
    </div>

    <div
      class="w-full flex justify-center gap-[3rem] md:gap-[21rem] lg:gap-[35rem] xl:gap-[40rem] 2xl:gap-[70rem]"
      v-if="currencies?.length"
    >
      <button
        v-if="currentPage > 1"
        @click="prevPage()"
        class="w-[7rem] text-slate-300 tracking-widest justify-center px-[1rem] py-2 border border-violet-300 bg-gradient-to-r from-violet-900 to-slate-900 rounded-md hover:border-orange-300 active:text-orange-400 active:scale-105 hover:transition hover:duration-100"
      >
        Previous
      </button>
      <button
        v-if="!endPage"
        @click="nextPage()"
        class="w-[7rem] text-slate-300 tracking-widest justify-center px-[1rem] py-2 border border-violet-300 bg-gradient-to-r from-violet-900 to-slate-900 rounded-md hover:border-orange-300 active:text-orange-400 active:scale-105 hover:transition hover:duration-100"
      >
        Next
      </button>
    </div>
    <template v-if="openModal">
      <TokenModal
        :singleCurrency="singleCurrency"
        :closeModal="() => closeModal()"
      />
    </template>
  </div>
</template>
