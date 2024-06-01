<script setup lang="ts">
interface Props {
  search: string;
  action?: any;
}

const props = withDefaults(defineProps<Props>(), {
  search: "",
});

const emits = defineEmits(["update:search"]);
let searchValue = props.search;

function updateSearch(event: Event) {
  const inputValue = (event.target as HTMLInputElement).value;
  searchValue = inputValue;
  emits("update:search", inputValue);
}
</script>

<template>
    <input
    type="text"
    placeholder="Cryptocurrency Search"
    @focus="action"
    v-model="searchValue"
    @input="updateSearch"
    class="w-full xl:w-[80%] px-3 py-2 text-sm text-slate-600 border-2 border-orange-200 rounded-md focus:outline-none focus:border-purple-500 tracking-wider"
  />
</template>
