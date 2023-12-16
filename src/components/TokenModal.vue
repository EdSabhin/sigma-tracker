<script setup lang="ts">

import { Currency } from "../models/currency.model";
import { formatText } from "../utils/formatText";
import { extractDate } from "../utils/extractDate";
import { formatChange } from "../utils/formatChange";


interface Props {
  singleCurrency: Currency | null;
  closeModal: () => void;
}

const props = withDefaults(defineProps<Props>(), {
  singleCurrency: null,
  closeModal: () => {},
});

const USDArray = props.singleCurrency && Object.entries(props.singleCurrency.quotes.USD)

const USDData = USDArray?.filter(([key, value]) => typeof value !== 'object');

const USDInfo = USDData && USDData.map(([key, value]) => ({ key, value }));

</script>
 
<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    @click="closeModal"
  >
    <!-- MODAL -->
    <div
      class="!w-86 !h-86 flex flex-col justify-center items-center relative px-28 py-48  text-slate-300 modalGradient border-l-2 border-orange-300 rounded-md"
    >
      <span @click="closeModal" class="absolute top-8 right-8 px-5 py-3 text-3xl border-2 rounded-full border-orange-300 hover:text-orange-600 active:text-white cursor-pointer transition duration-100 hover:animate-pulse active:animate-ping"
        >&#119831</span
      >

      <div class="w-full flex justify-start px-12 py-10 bg-gradient-to-r gap-12 from-slate-950 to-slate-800 rounded-md">
        <div class="flex flex-col"><h1 class="text-orange-400">{{ singleCurrency?.name }}</h1>
        <div class="flex flex-col text-orange-200"><h4>Symbol<span class="text-white">: </span><span class="text-teal-400 p-1">{{ singleCurrency?.symbol }}</span></h4>
        </div>
        <div class="flex flex-col text-orange-200"><h4>Rank<span class="text-white">: </span><span class="text-teal-400 p-1">{{ singleCurrency?.rank }}</span></h4>
        </div>
        <div class="flex flex-col text-orange-200"><h4>Circulating Supply<span class="text-white">: </span><span class="text-teal-400 p-1">{{ singleCurrency?.circulating_supply }}</span></h4>
        </div>
        <div class="flex flex-col text-orange-200"><h4>Total Supply<span class="text-white">: </span><span class="text-teal-400 p-1">{{ singleCurrency?.total_supply }}</span></h4>
        </div>
        <div class="flex flex-col text-orange-200"><h4>Max Supply<span class="text-white">: </span><span class="text-teal-400 p-1">{{ singleCurrency?.max_supply }}</span></h4>
        </div>
        <div class="flex flex-col text-orange-200"><h4>Beta Value<span class="text-white">: </span><span class="text-teal-400 p-1">{{ singleCurrency?.beta_value }}</span></h4>
        </div>
        <div class="flex flex-col text-orange-200"><h4>First Data On<span class="text-white">: </span><span class="text-teal-400 p-1">{{ extractDate(singleCurrency?.first_data_at) }}</span></h4>
        </div>
        <div class="flex flex-col text-orange-200"><h4>Last Updated<span class="text-white">: </span><span class="text-teal-400 p-1">{{ extractDate(singleCurrency?.last_updated) }}</span></h4>
        </div>
      </div>

      <!-- Quotes Object   -->
        <div class="flex flex-col text-orange-400"> <span>USD</span><h4 v-for="(change, index) in USDInfo" :key="index" class="text-orange-200">{{ formatText(change.key) }}<span class="text-white">: </span><span class="text-teal-400 p-1">{{ formatChange(change.key, change.value, "ath_date") }}</span></h4></div>
      </div>   
  
    </div>
  </div>
</template>

<style>
/* Estilos para el modal */
/* Asegurar que el modal esté en el centro verticalmente */
.modal-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
