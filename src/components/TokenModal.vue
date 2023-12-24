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
    class=" flex items-center justify-center fixed inset-0 z-10 bg-slate-950 bg-opacity-80"
    @click="closeModal"
  >
    <!-- MODAL -->
    <div
      class="w-full lg:w-[40%] flex flex-col justify-center items-center px-4 py-4 lg:px-6 lg:py-6 text-slate-300 modalGradient rounded-md"
    >
     <div class="w-full flex flex-col lg:flex-row justify-start relative gap-12 p-4 lg:p-12 bgGradient rounded-md">
        <span @click="closeModal" class="absolute top-6 right-6 lg:top-8 lg:right-8 px-3 py-1 lg:text-2xl border-2 rounded-full text-teal-300 border-orange-300 hover:border-teal-400 hover:text-orange-400 cursor-pointer transition duration-500 ease-in-out hover:animate-ping"
        >&#119831
        </span>
        <div class="flex flex-col"><h1 class="pb-3 text-orange-400 underline underline-offset-4">{{ singleCurrency?.name }}</h1>
        <div class="flex flex-col text-orange-200 hover:text-rose-400"><h4>Symbol<span class="text-white">: </span><span class="text-teal-400 p-1">{{ singleCurrency?.symbol }}</span></h4>
        </div>
        <div class="flex flex-col text-orange-200 hover:text-rose-400"><h4>Rank<span class="text-white">: </span><span class="text-teal-400 p-1">{{ singleCurrency?.rank }}</span></h4>
        </div>
        <div class="flex flex-col text-orange-200 hover:text-rose-400"><h4>Circulating Supply<span class="text-white">: </span><span class="text-teal-400 p-1">{{ singleCurrency?.circulating_supply }}</span></h4>
        </div>
        <div class="flex flex-col text-orange-200 hover:text-rose-400"><h4>Total Supply<span class="text-white">: </span><span class="text-teal-400 p-1">{{ singleCurrency?.total_supply }}</span></h4>
        </div>
        <div class="flex flex-col text-orange-200 hover:text-rose-400"><h4>Max Supply<span class="text-white">: </span><span class="text-teal-400 p-1">{{ singleCurrency?.max_supply }}</span></h4>
        </div>
        <div class="flex flex-col text-orange-200 hover:text-rose-400"><h4>Beta Value<span class="text-white">: </span><span class="text-teal-400 p-1">{{ singleCurrency?.beta_value }}</span></h4>
        </div>
        <div class="flex flex-col text-orange-200 hover:text-rose-400"><h4>First Data On<span class="text-white">: </span><span class="text-teal-400 p-1">{{ extractDate(singleCurrency?.first_data_at) }}</span></h4>
        </div>
        <div class="flex flex-col text-orange-200 hover:text-rose-400"><h4>Last Updated<span class="text-white">: </span><span class="text-teal-400 p-1">{{ extractDate(singleCurrency?.last_updated) }}</span></h4>
        </div>
      </div>

      <!-- Quotes Object   -->
        <div class="flex flex-col text-orange-400"> <span class="pb-3 text-orange-400 underline underline-offset-4">USD</span><h4 v-for="(change, index) in USDInfo" :key="index" class="text-orange-200 hover:text-rose-400">{{ formatText(change.key) }}<span class="text-white">: </span><span class="text-teal-400 p-1">{{ formatChange(change.key, change.value, "ath_date") }}</span></h4></div>
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
