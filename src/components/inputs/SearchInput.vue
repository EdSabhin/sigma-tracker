<script setup lang="ts">
interface Props {
  search: string;
}

const props = withDefaults(defineProps<Props>(), {
  search: "",
});

const emits = defineEmits(['update:search']);
let searchValue = props.search;

function updateSearch(event: Event) {
  const inputValue = (event.target as HTMLInputElement).value;
  searchValue = inputValue;
  emits('update:search', inputValue);
}
</script>


<template>
   <input type="text" placeholder="Cryptocurrency Search" v-model="searchValue" @input="updateSearch"
    class="w-full lg:w-[33%] px-3 py-2 text-sm text-slate-700 border-2 border-orange-300 rounded-md focus:outline-none focus:border-purple-500" />
</template>
