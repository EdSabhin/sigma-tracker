<script setup lang="ts">
interface Props {
  text: string;
  action: () => void;
}

const props = withDefaults(defineProps<Props>(), {
  text: "",
  action: () => {},
});
</script>

<template>
  <button
    @click="action ? action() : ''"
    class="w-full lg:w-[16rem] h-max py-3 px-3 lg:px-0 rounded-lg text-slate-600 border border-slate-100 tokenGradient hover:text-slate-300 hover:border-violet-400 hover:bg-violet-300 hover:bg-gradient-to-r hover:from-violet-900 hover:to-slate-900 active:border-orange-200 active:text-orange-400"
  >
    {{ text }}
  </button>
</template>
