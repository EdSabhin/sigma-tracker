<script setup></script>

<template>
  <div class="w-full">
    <nav
      class="w-full flex flex-col lg:flex-row justify-between items-center gap-8 py-10 px-14 border-b-2 border-orange-100 bgGradient"
    >
      <div class="w-full flex justify-center items-center gap-4">
        <div
          class="lg:w-[25%] flex items-center gap-4 px-4 lg:px-5 pb-3 border-2 border-orange-100 rounded-md tokenGradient"
        >
          <img
            src="../assets/gold-icon.png"
            alt="gold-icon"
            class="w-10 lg:w-12"
          />
          <h1 class="pt-6 text-xl lg:text-2xl font- text-slate-700">
            <span class="font-bold">Σ</span>-Tracker
          </h1>
        </div>
      </div>
      <ul
        class="w-full flex justify-center items-start gap-8 pt-8 font-semibold text-slate-300"
      >
        <li class="hover:text-violet-300 cursor-pointer">Cryptocurrencies</li>
        <li class="hover:text-violet-300 cursor-pointer">Exchanges</li>
        <li class="hover:text-violet-300 cursor-pointer">About</li>
      </ul>
    </nav>
  </div>
</template>
