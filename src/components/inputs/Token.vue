<script setup lang="ts">
defineProps<{
  text: string;
  action?: () => void | undefined;
}>();
</script>

<template>
  <button
    @click="action ? action() : ''"
    class="w-full p-5 border rounded-lg text-slate-600 border-amber-300 tokenGradient"
  >
    {{ text }}
  </button>
</template>
